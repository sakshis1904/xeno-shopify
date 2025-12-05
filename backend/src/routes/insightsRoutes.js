const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  getSummary,
  getOrdersByDate,
  getTopCustomers
} = require("../controllers/insightsController");

router.get("/summary", auth, getSummary);
router.get("/orders-by-date", auth, getOrdersByDate);
router.get("/top-customers", auth, getTopCustomers);

module.exports = router;
