import express from "express";

import {
  addCatalog,
} from "./addCatalogController.js";

const router = express.Router();

router.post("/", addCatalog);

export default router;