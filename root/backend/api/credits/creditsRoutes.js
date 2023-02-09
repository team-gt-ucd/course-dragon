import express from "express";

import {
  getCredits,
  createCredits,
  updateCredits,
  deleteCredits,
} from "./creditsController.js";

const router = express.Router();

router.get("/", getCredits);
router.post("/", createCredits);
router.patch("/:id", updateCredits);
router.delete("/:id", deleteCredits);

export default router;