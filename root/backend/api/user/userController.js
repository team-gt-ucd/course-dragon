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

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  try {
    // Check if the user exists in the database
    const user = await UserItem.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if the password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ success: true, message: 'Logged in successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to login' });
  }
};




export default router;