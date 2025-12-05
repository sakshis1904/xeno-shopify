const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Tenant = sequelize.define("Tenant", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  shopDomain: { type: DataTypes.STRING, allowNull: false },
  accessToken: { type: DataTypes.STRING, allowNull: false }
}, {
  timestamps: true,
  tableName: "tenants"
});

module.exports = Tenant;
