import dotenv from 'dotenv';
dotenv.config({ path: './api/config/config.env' });
import express from "express";
import mongoose from "mongoose";
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import UserItem from "./userModel.js";
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';


const router = express.Router();


export const createUser = async (req, res) => {
  
  UserItem.register({ username: req.body.username }, req.body.password, function(err, user) {
    if (err){
      console.error(err);
      res.status(409).json({ success: false, message: 'Failed to create user' });
    } else {
      passport.authenticate("local")(req, res, function(){
        console.log("New User created!")
        res.status(201).json({ success: true, message: 'User created' });
        // cookies can be used to redirect directly to the user flowchart
        // routing to flowchart page is needed
        // for now once the user creates an account, it will need to log in 
      })
    }
  });
};

export const loginUser = async (req, res) => {
  
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ error: "Email and Password are required" });
  } 
  passport.authenticate("local")(req, res, function(){
    console.log("User Logged In!")
    res.status(200).json({ success: true, message: 'User Logged In' });
    // cookies can be used to redirect directly to the user flowchart
    // routing to flowchart page is needed
    // for now once the user creates an account, it will need to log in
  });

};

export const googleSignin = async () => {
  passport.authenticate('google', { scope: ["profile"] })
};

export const googleSignup = async (req, res) => {
  
  passport.authenticate('google', { failureRedirect: "http://localhost:3003" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("http://localhost:3003/");
}
};


export default router;