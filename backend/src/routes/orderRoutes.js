const express = require("express");
const router = express.Router();
const models = require("../models");
const Order = models.Order;


router.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    console.log(" ORDER FETCH ERROR >>>", err.message);   
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
});

module.exports = router;
