const express = require("express");
const router = express.Router();

const shopifyAuth = require("./shopifyAuth");

const customersRoutes = require("./customerRoutes");
const ordersRoutes = require("./orderRoutes");
const productsRoutes = require("./productRoutes");
const trendsRoutes = require("./trendsRoutes");

const tenantRoutes = require("./tenantRoutes");
const ingestRoutes = require("./ingestRoutes");
const insightsRoutes = require("./insightsRoutes");

router.use("/auth", shopifyAuth);

router.use("/tenants", tenantRoutes);
router.use("/ingest", ingestRoutes);
router.use("/insights", insightsRoutes);

router.use("/customers", customersRoutes);
router.use("/orders", ordersRoutes);
router.use("/products", productsRoutes);
router.use("/trends", trendsRoutes);

module.exports = router;
