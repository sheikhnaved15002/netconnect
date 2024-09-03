import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import {
  getMessageController,
  sendMessageController,
} from "../controllers/message.controller.js";

const router = express.Router();
router.post("/send/:id", isAuthenticated, sendMessageController);
router.get("/all/:id", isAuthenticated, getMessageController);

export default router;
