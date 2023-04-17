import express from "express";

import {
  addCatalog,
  deleteCatalog,
  getCatalog
} from "./addCatalogController.js";

const router = express.Router();

router.post("/", addCatalog);
router.delete("/:id", deleteCatalog);
router.get("/",getCatalog)
export default router;