import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import {
  addCommentController,
  addNewPostController,
  bookmarkPostController,
  deletePostController,
  dislikePostController,
  getAllPostController,
  getCommentsOfPostController,
  getUserPostController,
  likePostController,
} from "../controllers/post.controller.js";

const router = express.Router();
router.post(
  "/addpost",
  isAuthenticated,
  upload.single("image"),
  addNewPostController
);
router.get("/allpost", isAuthenticated, getAllPostController);
router.get("/userpost/all", isAuthenticated, getUserPostController);
router.post("/like/:id", isAuthenticated, likePostController);
router.post("/dislike/:id", isAuthenticated, dislikePostController);
router.post("/comment/:id", isAuthenticated, addCommentController);
router.post("/comment/all/:id", isAuthenticated, getCommentsOfPostController);
router.delete("/deletepost/:id", isAuthenticated, deletePostController);
router.get("/bookmark/:id", isAuthenticated, bookmarkPostController);

export default router;
