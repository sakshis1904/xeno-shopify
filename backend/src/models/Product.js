const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define("Product", {
  id: { type: DataTypes.BIGINT, primaryKey: true },
  tenantId: DataTypes.INTEGER,
  title: DataTypes.STRING,
  sku: DataTypes.STRING,
  price: DataTypes.FLOAT
}, { timestamps: true });

module.exports = Product;
