const express = require("express");
const router = express.Router();
const { Product } = require("../models");

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();

    res.json(
      products.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        image: p.image || "https://via.placeholder.com/200", 
        category: p.category || "General"
      }))
    );
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

module.exports = router;

