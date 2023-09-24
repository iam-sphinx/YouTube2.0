import express from "express";
import {
  deleteUser,
  dislikeVideo,
  getUser,
  likeVideo,
  subscribeUser,
  unsubscribeUser,
  updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// update a user
router.put("/:id", verifyToken, updateUser);

// delete a user
router.delete("/:id", verifyToken, deleteUser);

// get a user
router.get("/find/:id", getUser);

// subscribe a user
router.put("/sub/:id", verifyToken, subscribeUser); //here id is of that channel whih we want to subscribe

// unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribeUser); // here also

// like a video
router.put("/like/:videoId", verifyToken, likeVideo);

// dislike a video
router.put("/dislike/:videoId", verifyToken, dislikeVideo);

export default router;
