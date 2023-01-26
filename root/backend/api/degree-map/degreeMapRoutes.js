import express from "express";

import {
  getDegreeMaps,
  getDegreeMap,
  createDegreeMap,
  updateDegreeMap,
  deleteDegreeMap,
} from "./degreeMapControllers.js";

const router = express.Router();

router.get("/", getDegreeMaps);
router.get("/:id", getDegreeMap);
router.post("/", createDegreeMap);
router.patch("/:id", updateDegreeMap);
router.delete("/:id", deleteDegreeMap);

export default router;