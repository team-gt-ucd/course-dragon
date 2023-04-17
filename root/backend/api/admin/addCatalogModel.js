import mongoose from "mongoose";


// Define schema for catalog item
export const catalogSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true, default: mongoose.Types.ObjectId },
    degree: String,
    catalogYear: String
  })
  

// Define model for catalog item
var CatalogItem = mongoose.model('CatalogItem', catalogSchema);

export default CatalogItem