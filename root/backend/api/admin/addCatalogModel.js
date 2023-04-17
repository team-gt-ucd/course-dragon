import mongoose from "mongoose";


// Define schema for catalog item
export const catalogSchema = mongoose.Schema({
    degree: String,
    catalogYear: String
  },{timestamps: true})
  

// Define model for catalog item
var CatalogItem = mongoose.model('CatalogItem', catalogSchema);

export default CatalogItem