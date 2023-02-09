import express from "express";

import {
  getCourses,
  createCourses,
  updateCourses,
  deleteCourses,
} from "./coursesController.js";

const router = express.Router();

router.get("/", getCourses);
router.post("/", createCourses);
router.patch("/:id", updateCourses);
router.delete("/:id", deleteCourses);

export default router;