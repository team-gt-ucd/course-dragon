import express from "express";
import mongoose from "mongoose";
import User from "./userModel.js";

const router = express.Router();


export const createUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("User created: ", username);
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });

  newUser.save(function(err){
    if (err) {
      console.log(err)
    }
    else {
      console.log("New User created!")
      // will be adding the degree map option
      // res.render("Show the degree map");
    }
  })
};

export default router;