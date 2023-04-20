import express from "express";
import mongoose from "mongoose";
import UserItem from "./userModel.js";

const router = express.Router();


export const createUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  const newUserItem = new UserItem({ email, password });

  try {
    // Save the new catalog item to the database
    await newUserItem.save();

    res.status(201).json(newUserItem);
  } catch (err) {
    console.error(err);
    res.status(409).json({ success: false, message: 'Failed to create catalog item' });
  }
};


export default router;