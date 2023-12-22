// import express
const express = require("express");
// create an express router
const router = express.Router();
// Import Models Needed in Routes
const Sample = require("../models/Sample.js");

// Reminder, The '/sample' is implied by the prefix
// applied when registering the router in server.js

// INDEX - Get -> "/sample"
// Render all samples
router.get("/", async (req, res) => {
  try {
    const samples = await Sample.find({});
    res.render("samples/index.ejs", { samples: samples });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

// NEW - Show form to create new sample
router.get("/new", (req, res) => {
  res.render("samples/new.ejs");
});

// CREATE - Add new sample to DB
router.post("/", async (req, res) => {
  try {
    await Sample.create(req.body);
    res.redirect("/samples");
  } catch (err) {
    console.log(err);
    res.render("samples/new.ejs");
  }
});

// SHOW - Shows more info about one sample
router.get("/:id", async (req, res) => {
  try {
    const foundsample = await Sample.findById(req.params.id);
    res.render("samples/show.ejs", { sample: foundsample });
  } catch (err) {
    console.log(err);
    res.redirect("/samples");
  }
});

// EDIT - Show edit form for one sample
router.get("/:id/edit", async (req, res) => {
  try {
    const foundsample = await Sample.findById(req.params.id);
    res.render("samples/edit.ejs", { sample: foundsample });
  } catch (err) {
    console.log(err);
    res.redirect("/samples");
  }
});

// UPDATE - Update a particular sample, then redirect somewhere
router.put("/:id", async (req, res) => {
  try {
    await Sample.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/samples/" + req.params.id);
  } catch (err) {
    console.log(err);
    res.redirect("/samples");
  }
});

// DELETE - Delete a particular sample, then redirect somewhere
router.delete("/:id", async (req, res) => {
  try {
    await Sample.findByIdAndDelete(req.params.id);
    res.redirect("/samples");
  } catch (err) {
    console.log(err);
    res.redirect("/samples");
  }
});

module.exports = router;
