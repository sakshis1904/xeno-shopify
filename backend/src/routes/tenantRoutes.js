const express = require("express");
const router = express.Router();
const { registerTenant, loginTenant } = require("../controllers/tenantController");

router.post("/register", registerTenant);
router.post("/login", loginTenant);

module.exports = router;
