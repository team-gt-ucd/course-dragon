import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";

//--------------- List of Route Resources (add new file paths to routes here) ---------------
import homeRoutes from "./api/home/homeRoutes.js"
import userRoutes from "./api/users/userRoutes.js"
import creditsRoutes from "./api/credits/creditsRoutes.js"
import coursesRoutes from "./api/courses/coursesRoutes.js"
import instructorScoresRoutes from "./api/instructor-scores/instructorScoresRoutes.js"
import semesterRoutes from "./api/semester/semesterRoutes.js"
//Load config
dotenv.config({ path: "./config/config.env" });

//Create express app
const app = express();

//Grab port number from /config/config.env or defaultly use 4000
const PORT = process.env.PORT || 4000;

//making the server accessible to any domain that requests a resource from your server via a browser
// https://stackoverflow.com/questions/46024363/what-does-app-usecors-do
app.use(cors());

//make the server parse incoming messages as json payloads
app.use(express.json());

//--------------- List of our Routes (add new routes here) ---------------
app.use("/", homeRoutes);
app.use("/users", userRoutes);
app.use("/credits", creditsRoutes);
app.use("/courses",coursesRoutes);
app.use("/instructor-scores", instructorScoresRoutes);
app.use("/semester", semesterRoutes);
// example of a route defined here
/*app.get("/", (req, res) => {
  res.send("employee backende erisildi");
});*/

// Begin listening on the server
app.listen(PORT, () => {
  connectDB(); //Connect to MongoDB
  console.log(`Server is running on port: ${PORT}`);
});