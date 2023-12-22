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
