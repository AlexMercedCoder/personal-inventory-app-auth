// THIS IS A SAMPLE MODEL FILE

// Import Connection
const mongoose = require("./connection");

// Create a Schema
const sampleSchema = new mongoose.Schema(
  {
    prop1: String,
    prop2: String,
  },
  { timestamps: true }
);

// Create the Model Object
const Sample = mongoose.model("Sample", sampleSchema)

// export the Model
module.exports = Sample
