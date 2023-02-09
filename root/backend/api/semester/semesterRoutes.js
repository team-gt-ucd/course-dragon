import express from "express";

import {
  getSemester,
  getSemesters,
  createSemester,
  updateSemester,
  deleteSemester,
} from "./semesterController.js";

const router = express.Router();

router.get("/", getSemesters);
router.get("/:id", getSemester);
router.post("/", createSemester);
router.patch("/:id", updateSemester);
router.delete("/:id", deleteSemester);

export default router;