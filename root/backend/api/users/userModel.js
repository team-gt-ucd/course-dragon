import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });
import mongoose from "mongoose";
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import { degreeMapSchema } from '../degree-map/degreeMapModel.js';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import findOrCreate from 'mongoose-findorcreate';




const userSchema = new mongoose.Schema ({
  email: String,
  password: String,
  DegreeMap_list: degreeMapSchema,
},{timestamps: true});

userSchema.plugin(passportLocalMongoose);       // this is what access our secretKey from .env file
// userSchema.plugin(findOrCreate);

var UserItem = mongoose.model('useritem', userSchema);

passport.use(UserItem.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


// passport.use(new GoogleStrategy({
//   clientID: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   callbackURL: "http://localhost:3003/auth/google/callback",
//   userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
// },
// function(accessToken, refreshToken, profile, cb) {
//   console.log(profile);

//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }
// ));

export default UserItem