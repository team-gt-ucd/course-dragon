import express from "express";
import mongoose from "mongoose";
import UserItem from "./homeModel.js";

const router = express.Router();

export const getHome = async (req, res) => {
  try {

    res.status(200).send("server is running"); //if you do a HTTP GET on localhost:4001, you will get this as a response
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default router;