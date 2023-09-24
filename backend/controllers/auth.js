import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { name, password, email } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new User({ ...req.body, name, password: hash, email });
    await newUser.save();

    res.status(200).json({
      status: "Success",
      message: "successfully registered user",
      data: { id: newUser._id, user: newUser.name, email: newUser.email },
    });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      return next(createError(404, "user not found!"));
    }

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      return next(createError(400, "Wrong Credentials!"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWTKEY);
    const { password, ...otherData } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        otherData,
      });
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWTKEY);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWTKEY);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    }
  } catch (err) {
    next(err);
  }
};
