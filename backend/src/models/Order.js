module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    id: { type: DataTypes.BIGINT, primaryKey: true },
    tenantId: DataTypes.INTEGER,
    customerId: DataTypes.BIGINT,
    totalAmount: DataTypes.FLOAT,
    currency: DataTypes.STRING,
    createdAtShopify: DataTypes.DATE
  }, { timestamps: false });

  return Order;
};
