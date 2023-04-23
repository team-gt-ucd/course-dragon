import express from "express";
import mongoose from "mongoose";
import encrypt from "mongoose-encryption";
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
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  UserItem.findOne({email:email}, function(err, foundUser){
    if (err) {
      console.log(err);
	return res.status(401).json({ error: "Invalid email or password" });
    } else {
      if (foundUser){
        if (foundUser.password == password){
          console.log("User Log in");
	        res.status(200).json({ success: true, message: 'Logged in successfully' });
        }
      }
    }

  })
};




export default router;