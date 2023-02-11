import express from "express";

import {
  getCredits,
  getAllCredits,
  createCredits,
  updateCredits,
  deleteCredits,
} from "./creditsController.js";

const router = express.Router();

router.get("/", getAllCredits);
router.get("/:id", getCredits);
router.post("/", createCredits);
router.patch("/:id", updateCredits);
router.delete("/:id", deleteCredits);

export default router;