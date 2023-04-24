import express from "express";

import {
  createUser,
  loginUser,
  googleSignin,
  googleSignup
} from "./userController.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/auth/google",googleSignin);
router.get("/auth/google/callback",googleSignup);
export default router;