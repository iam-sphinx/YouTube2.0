import express from "express";
import { addComment, deleteComment, getComment } from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

// Create a comment
router.post("/", verifyToken, addComment);

// delete comment
router.delete("/:id", verifyToken, deleteComment);

//get comment
router.get("/:videoId", getComment);

export default router;
