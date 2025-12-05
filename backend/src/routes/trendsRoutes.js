const express = require("express");
const router = express.Router();

router.get("/", (req,res)=>{
  res.json({ salesTrend: [50, 80, 120, 140, 200], topProduct:"T-shirt" });
});

module.exports = router;
