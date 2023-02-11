import express from "express";

import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from "./courseController.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/", createCourse);
router.patch("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;