import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./routes/user.js"

//Load config
dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());
app.use("/users", userRoutes);

//backend greeting page
app.get("/", (req, res) => {
  res.send("employee backende erisildi");
});

app.listen(PORT, () => {
  connectDB(); //Connect to MongoDB
  console.log(`Server is running on port: ${PORT}`);
});