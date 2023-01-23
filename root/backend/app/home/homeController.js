import express from "express";
import mongoose from "mongoose";
import UserItem from "./homeModel.js";

const router = express.Router();

export const getHome = async (req, res) => {
  try {

    res.status(200).send("home get greeting");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default router;