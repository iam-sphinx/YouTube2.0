import { createError } from "../error.js";
import Video from "../models/Video.js";
import User from "../models/User.js";

export const addVideo = async (req, res, next) => {
  try {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    const savedVideo = await newVideo.save();

    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) {
      return next(createError(404, "Video Not Found!"));
    }

    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.videoId,
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(updatedVideo);
    } else {
      next(createError(403, "You can only update your video"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) {
      return next(createError(404, "Video Not Found!"));
    }

    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.videoId);

      res.status(200).json("Video successfully deleted!");
    } else {
      next(createError(403, "You can only delete your video"));
    }
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(video);
  } catch (err) {
    console.error("Error finding video:", err);
    next(err);
  }
};

export const incView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.videoId, { $inc: { views: 1 } });
    res.status(200).json("The view has been increased");
  } catch (err) {
    next(err);
  }
};

export const getTrends = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: 1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const getRandom = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const subVideo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

export const getVideoByTags = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const getSearchedvideo = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
