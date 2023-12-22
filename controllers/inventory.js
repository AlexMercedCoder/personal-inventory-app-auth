// import express
const express = require("express");
// create an express router
const router = express.Router();
// Import Models Needed in Routes
const Inventory = require("../models/Inventory.js");

// Reminder, The '/inventory' is implied by the prefix
// applied when registering the router in server.js

// INDEX - Get -> "/inventory"
// Render all inventories
router.get("/", async (req, res) => {
  try {
    const username = req.session.username
    const inventories = await Inventory.find({username});
    res.render("inventories/index.ejs", { inventories: inventories });
  } catch (err) {
    console.log(err.message);
    res.redirect("/");
  }
});

// NEW - Show form to create new inventory
router.get("/new", (req, res) => {
  res.render("inventories/new.ejs");
});

// CREATE - Add new inventory to DB
router.post("/", async (req, res) => {
  try {
    req.body.username = req.session.username
    await Inventory.create(req.body);
    res.redirect("/inventory");
  } catch (err) {
    console.log(err.message);
    res.render("inventories/new.ejs");
  }
});

// SHOW - Shows more info about one inventory
router.get("/:id", async (req, res) => {
  try {
    const foundinventory = await Inventory.findById(req.params.id);
    res.render("inventories/show.ejs", { inventory: foundinventory });
  } catch (err) {
    console.log(err.message);
    res.redirect("/inventory");
  }
});

// EDIT - Show edit form for one inventory
router.get("/:id/edit", async (req, res) => {
  try {
    const foundinventory = await Inventory.findById(req.params.id);
    res.render("inventories/edit.ejs", { inventory: foundinventory });
  } catch (err) {
    console.log(err.message);
    res.redirect("/inventory");
  }
});

// UPDATE - Update a particular inventory, then redirect somewhere
router.put("/:id", async (req, res) => {
  try {
    await Inventory.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/inventory");
  } catch (err) {
    console.log(err.message);
    res.redirect("/inventory");
  }
});

// DELETE - Delete a particular inventory, then redirect somewhere
router.delete("/:id", async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.redirect("/inventory");
  } catch (err) {
    console.log(err.message);
    res.redirect("/inventory");
  }
});

module.exports = router;