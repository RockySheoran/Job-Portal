import express from "express";

import { isAuthenticated } from "../Middlewares/isAuthenticated.js";
import { allJob, getJobByAdminId, getJobById, getJobDeleteByAdminId, postJob } from "../Controllers/jobController.js";
import { singleUploadFile } from "../Middlewares/multer.js";


export const jobRouter = express.Router();

jobRouter.route("/post").post(isAuthenticated, postJob);
<<<<<<< HEAD
jobRouter.route("/get").get(allJob);
=======
jobRouter.route("/get").get( allJob);
>>>>>>> 554b88302ae7c8606e8dd9e3ac56e5135d1bb4d5
jobRouter.route("/getAdminJob").get(isAuthenticated, getJobByAdminId);
jobRouter.route("/jobDelete").delete(isAuthenticated, getJobDeleteByAdminId);
jobRouter.route("/get/:id").get(singleUploadFile, getJobById);
