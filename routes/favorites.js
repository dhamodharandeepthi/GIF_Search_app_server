const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");

router.get("/favorites", async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/favorites", async (req, res) => {
  const { gifUrl, title } = req.body;

  const favorite = new Favorite({
    gifUrl,
    title,
  });

  try {
    const newFavorite = await favorite.save();
    res.status(201).json(newFavorite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/favorites/:id", async (req, res) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id);
    res.json({ message: "Favorite deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
