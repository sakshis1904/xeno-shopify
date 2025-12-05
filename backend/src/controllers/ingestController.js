const { Tenant } = require("../models");
const { ingestShopifyData } = require("../services/shopifyService");

exports.runIngestion = async (req, res) => {
  try {
    const tenantId = req.tenantId;
    const tenant = await Tenant.findByPk(tenantId);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    const stats = await ingestShopifyData(tenant);

    res.json({ message: "Ingestion completed", stats });
  } catch (err) {
    console.error(err?.response?.data || err);
    res.status(500).json({ message: "Ingestion failed" });
  }
};
