import express from "express";
import {
  login,
  logOut,
  register,
  updateProfile,
} from "../Controllers/userController.js";
import { isAuthenticated } from "../Middlewares/isAuthenticated.js";
import { singleUploadFile } from "../Middlewares/multer.js";

export const userRouter = express.Router();

userRouter.route("/register").post(singleUploadFile, register);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logOut);
userRouter.route("/profile/update").post(isAuthenticated,singleUploadFile, updateProfile);
