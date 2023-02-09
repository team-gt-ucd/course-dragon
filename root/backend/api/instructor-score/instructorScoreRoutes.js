import express from "express";

import {
  getInstructorScores,
  getInstructorScore,
  createInstructorScore,
  updateInstructorScore,
  deleteInstructorScore,
} from "./instructorScoreController.js";

const router = express.Router();

router.get("/", getInstructorScores);
router.get("/:id", getInstructorScore);
router.post("/", createInstructorScore);
router.patch("/:id", updateInstructorScore);
router.delete("/:id", deleteInstructorScore);

export default router;