// THIS IS A SAMPLE MODEL FILE

// Import Connection
const mongoose = require("./connection");

// Create a Schema
const inventorySchema = new mongoose.Schema(
  {
    username: {type: String, required: true},
    title: String,
    description: String
  },
  { timestamps: true }
);

// Create the Model Object
const Inventory = mongoose.model("Inventory", inventorySchema)

// export the Model
module.exports = Inventory