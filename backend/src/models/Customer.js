const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); 

const Customer = sequelize.define("Customer", {
  id: { type: DataTypes.BIGINT, primaryKey: true },
  tenantId: DataTypes.INTEGER,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  totalSpent: DataTypes.FLOAT
}, { timestamps: true });

module.exports = Customer;
