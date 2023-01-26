import express from "express";

import {
  getHome,
} from "./homeController.js";

const router = express.Router();

router.get("/", getHome);

export default router;