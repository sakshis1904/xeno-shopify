const express = require("express");
const router = express.Router();
const { ingestShopifyData } = require("../services/shopifyService");
const { Tenant } = require("../models");

router.get("/:tenantId", async (req, res) => {
  try {
    const tenant = await Tenant.findByPk(req.params.tenantId);
    if (!tenant) return res.status(404).send("Tenant not found");

    console.log(" Ingesting tenant:", tenant.shopDomain);
    console.log(" Token:", tenant.accessToken);


    const result = await ingestShopifyData(tenant);

    res.json({ message: "Ingestion successful", result });
  }
  catch (err) {
    console.log("\n ERROR DURING INGESTION >>>\n", err.response?.data || err.message);
    res.status(500).send(err.response?.data || "Ingestion failed");
  }
});

module.exports = router;
