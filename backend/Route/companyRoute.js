import express from "express";

import { isAuthenticated } from "../Middlewares/isAuthenticated.js";
import { companyRegister, getCompany, getCompanyById, getCompDeleteByAdminId, updateCompany } from "../Controllers/companyController.js";
import { singleUploadFile } from "../Middlewares/multer.js";

export const companyRouter = express.Router();

companyRouter.route("/register").post(isAuthenticated, companyRegister);
companyRouter.route("/get").get(isAuthenticated, getCompany);
companyRouter.route("/get/:id").get(isAuthenticated, getCompanyById);
companyRouter.route("/compDelete").delete(isAuthenticated, getCompDeleteByAdminId);
companyRouter.route("/update/:id").put(isAuthenticated,singleUploadFile,updateCompany);
