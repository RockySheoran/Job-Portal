import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./utils/db.js";
import { userRouter } from "./Route/userRoute.js";
import { companyRouter } from "./Route/companyRoute.js";
import { jobRouter } from "./Route/jobRouter.js";
import { applicationRouter } from "./Route/applicationRoute.js";

import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.get("/", (req, res) => {
  res.send("api working");
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

//api

app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

app.listen(port, () => {
  connectDB();
  console.log(`server is listen on part ${port}`);
});
