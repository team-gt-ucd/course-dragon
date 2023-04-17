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

export const deleteCatalog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No catalog with id: ${id}`);

  await CatalogItem.findByIdAndRemove(id);

  res.json({ message: "Catalog deleted successfully." });
};


// Controller function to get all catalog items
export const getCatalog = async (req, res) => {
  try {
    // Find all catalog items in the database
    const catalogItems = await CatalogItem.find();
    // Send the catalog items as a JSON response
    res.json(catalogItems);
  } catch (error) {
    console.error(`Error getting catalog items: ${error}`);
    // Send an error response to the client
    res.status(500).json({ error: 'Internal server error' });
  }
};



export default router;
