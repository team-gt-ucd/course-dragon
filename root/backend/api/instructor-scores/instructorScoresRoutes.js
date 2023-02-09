import express from "express";

import {
  getInstructorScores,
  createInstructorScores,
  updateInstructorScores,
  deleteInstructorScores,
} from "./instructorScoresController.js";

const router = express.Router();

router.get("/", getInstructorScores);
router.post("/", createInstructorScores);
router.patch("/:id", updateInstructorScores);
router.delete("/:id", deleteInstructorScores);

export default router;