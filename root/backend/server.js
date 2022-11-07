import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";

//Load config
dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 4000;
var router = express.Router();

app.use("/", router);
app.listen(PORT, () => {
  connectDB(); //Connect to MongoDB
  console.log(`Server is running on port: ${PORT}`);
});