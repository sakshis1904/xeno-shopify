const express = require("express");
const router = express.Router();
const { Customer } = require("../models");

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.findAll();

    res.json(
      customers.map(c => ({
        id: c.id,
        name: `${c.firstName || ""} ${c.lastName || ""}`.trim(),
        email: c.email,
        totalOrders: c.totalSpent            
      }))
    );
  } catch (err) {
    res.status(500).json({ message: "Error fetching customers" });
  }
});

module.exports = router;
