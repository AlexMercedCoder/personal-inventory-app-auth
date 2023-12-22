// Load .env variables
require("dotenv").config()
// Import Mongoose
const mongoose = require("mongoose")

// GET DATABASE_URL FROM ENV
const DATABASE_URL = process.env.DATABASE_URL

// Connect to Mongo
mongoose.connect(DATABASE_URL)

// Mongo Connection Events
mongoose.connection
.on("open", () => {console.log("connected to mongo")})
.on("close", () => {console.log("disconnected from mongo")})
.on("error", (error) => {console.log(error)})

// Export the Connection to Import into Models
module.exports = mongoose