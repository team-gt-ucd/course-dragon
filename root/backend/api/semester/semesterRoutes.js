import express from "express";

import {
  getSemester,
  createSemester,
  updateSemester,
  deleteSemester,
} from "./semesterController.js";

const router = express.Router();

router.get("/", getSemester);
router.post("/", createSemester);
router.patch("/:id", updateSemester);
router.delete("/:id", deleteSemester);

export default router;