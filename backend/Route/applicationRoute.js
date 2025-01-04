import express from "express";

import { isAuthenticated } from "../Middlewares/isAuthenticated.js";
import { applyJob, getApplicant, getAppliedJob, updateStatus } from "../Controllers/applicationController.js";


export const applicationRouter = express.Router();

applicationRouter.route("/apply/:id").get(isAuthenticated, applyJob);
applicationRouter.route("/get").get(isAuthenticated, getAppliedJob);
applicationRouter.route("/:id/applicants").get(isAuthenticated, getApplicant);
applicationRouter.route("/status/:id/update").post(isAuthenticated, updateStatus);
