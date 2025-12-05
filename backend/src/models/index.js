const sequelize = require("../config/db"); 

const Tenant = require("./Tenant"); const Product = require("./Product"); const Order = require("./Order"); 
const Customer = require("./Customer");

async function syncDB() { 
  await sequelize.authenticate(); 
  await sequelize.sync(); 
  console.log("📦 Database synced"); 
} 

syncDB(); 
  
module.exports = { sequelize, Tenant, Product, Order, Customer };