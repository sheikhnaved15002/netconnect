import express from "express";
// import { editProfile, followOrUnfollow, getProfile, getSuggestedUsers, login, logout, register } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import {
  editProfileController,
  followOrUnfollowController,
  getProfileController,
  getSuggestedUsersController,
  loginController,
  logoutController,
  registerController,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", isAuthenticated, logoutController);
router.get("/profile/:id", isAuthenticated, getProfileController);
router.post(
  "/editprofile",
  isAuthenticated,
  upload.single("profilePic"),
  editProfileController
);
router.get("/suggesteduser", isAuthenticated, getSuggestedUsersController);
router.post("/followorunfollow", isAuthenticated, followOrUnfollowController);

export default router;
