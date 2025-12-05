const { Order, Customer } = require("../models");
const { Sequelize } = require("sequelize");

exports.getSummary = async (req, res) => {
  try {
    const tenantId = req.tenantId;

    const [ordersCount, customersCount, revenue] = await Promise.all([
      Order.count({ where: { tenantId } }),
      Customer.count({ where: { tenantId } }),
      Order.sum("totalPrice", { where: { tenantId } })
    ]);

    res.json({
      totalOrders: ordersCount,
      totalCustomers: customersCount,
      totalRevenue: revenue || 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching summary" });
  }
};

exports.getOrdersByDate = async (req, res) => {
  try {
    const tenantId = req.tenantId;
    const { from, to } = req.query;

    const where = { tenantId };
    if (from || to) {
      where.createdAtShopify = {};
      if (from) where.createdAtShopify[Sequelize.Op.gte] = new Date(from);
      if (to) where.createdAtShopify[Sequelize.Op.lte] = new Date(to);
    }

    const rows = await Order.findAll({
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("createdAtShopify")), "date"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "ordersCount"],
        [Sequelize.fn("SUM", Sequelize.col("totalPrice")), "revenue"]
      ],
      where,
      group: [Sequelize.fn("DATE", Sequelize.col("createdAtShopify"))],
      order: [[Sequelize.fn("DATE", Sequelize.col("createdAtShopify")), "ASC"]]
    });

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching orders by date" });
  }
};

exports.getTopCustomers = async (req, res) => {
  try {
    const tenantId = req.tenantId;

    const rows = await Customer.findAll({
      where: { tenantId },
      order: [["totalSpent", "DESC"]],
      limit: 5
    });

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching top customers" });
  }
};
