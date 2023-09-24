import express from "express";
import {
  addVideo,
  deleteVideo,
  getRandom,
  getTrends,
  getVideo,
  incView,
  updateVideo,
  subVideo,
  getVideoByTags,
  getSearchedvideo,
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();
// create a video
router.post("/", verifyToken, addVideo);

// update a video
router.put("/:videoId", verifyToken, updateVideo);

// delete a video
router.delete("/:videoId", verifyToken, deleteVideo);

// get a video
router.get("/find/:videoId", getVideo);

// view a video
router.put("/view/:videoId", incView);

// trending videos
router.get("/trend", getTrends);

// random videos
router.get("/random", getRandom);

// subscribed channels video
router.get("/sub", verifyToken, subVideo);

// search by tags
router.get("/tags", getVideoByTags);

// search
router.get("/search", getSearchedvideo);

export default router;
