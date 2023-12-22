# Explanations of Files in this Folder

## connection.js

```js
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
```

This code snippet demonstrates the setup for connecting a Node.js application to a MongoDB database using Mongoose, a popular ODM (Object Document Mapper) for MongoDB. It starts by loading environment variables from a `.env` file, ensuring sensitive information like the database URL isn't hard-coded into the source. Mongoose is then used to establish a connection to the MongoDB database, with the connection URL retrieved from the environment variables. Additionally, the code sets up event listeners for the Mongoose connection to handle and log various database events such as opening, closing, and errors. Finally, the established Mongoose connection is exported for use in other parts of the application, such as defining models.

## Sample.js

```js
// THIS IS A SAMPLE MODEL FILE

// Import Connection
const mongoose = require("./connection");

console.log(mongoose)

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
```

This snippet illustrates the creation of a Mongoose model in a Node.js application. It begins by importing a pre-established Mongoose connection from another file. After logging the mongoose instance for verification, a new schema is defined using `mongoose.Schema`. This schema, `sampleSchema`, includes two string properties (`prop1` and `prop2`) and is configured to automatically add timestamps to each record. A model named `Sample` is then created from this schema. The model is essentially a blueprint for documents in the MongoDB database, and it is exported for use in other parts of the application. This pattern is a fundamental aspect of working with MongoDB in Node.js using Mongoose, where schemas and models define the structure and methods for interacting with database collections.

## seed.js

```js
// SEED FILE - FOR ONE OFF DATABASE OPERATIONS
// RUN THIS FILE WITH "npm run seed"

// Import Connection
const mongoose = require("./connection.js");

// Import Models
const Sample = require("./Sample.js");

// Delay Seed Code Till Connection Opens with Connection Event
mongoose.connection.on("open", async () => {
  // seed code should be inside this function

  // clear the collection
  await Sample.deleteMany({});

  // add seed data
  const samples = await Sample.create([
    { prop1: "a", prop2: "b" },
    { prop1: "c", prop2: "d" },
    { prop1: "e", prop2: "f" },
  ]);

  // log to confirm it was created
  console.log(samples);
});
```

This code snippet represents a seed file for database operations in a Node.js application using Mongoose. It is typically run as a one-off operation to initialize or reset the database with predefined data. The process begins by importing the Mongoose connection and the required model (`Sample`). Inside an asynchronous function triggered by the 'open' event of the Mongoose connection, the seed file performs two main operations: 

1. **Clearing the Collection**: The `Sample.deleteMany({})` command clears out the existing data in the `Sample` collection.

2. **Adding Seed Data**: Using `Sample.create([...])`, an array of new objects is added to the `Sample` collection. These objects are predefined and serve as the initial dataset.

After executing the seed operations, the results (newly added data) are logged to the console for confirmation.