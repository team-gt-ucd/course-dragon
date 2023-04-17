import express from "express";
import mongoose from "mongoose";
import CatalogItem from "./addCatalogModel.js";

const router = express.Router();


// API endpoint for creating a new catalog item
export const addCatalog = async (req, res) => {
    const { degree, catalogYear } = req.body;

    // Validate that degree and catalogYear fields are not empty
    if (!degree || !catalogYear) {
      return res.status(400).json({ error: "Degree and Catalog Year are required" });
    }
  
    // Create a new catalog item using the CatalogItem model
    const newCatalogItem = new CatalogItem({ degree, catalogYear });

    
    try {
    // Save the new catalog item to the database
    await newCatalogItem.save();

    res.status(201).json(newCatalogItem);
  } catch (err) {
    console.error(err);
    res.status(409).json({ success: false, message: 'Failed to create catalog item' });
  }
};

export default router;
