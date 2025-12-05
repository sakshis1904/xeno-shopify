const axios = require("axios");
const { Customer, Product, Order } = require("../models");

async function fetchFromShopify(tenant) {
  const apiVersion = "2024-10";  
  const baseUrl = `https://${tenant.shopDomain}/admin/api/${apiVersion}`;

  console.log("📡 Fetching from:", baseUrl);

  try {
    const headers = {
      "X-Shopify-Access-Token": tenant.accessToken,
      "Content-Type": "application/json"
    };

    const [customersRes, productsRes, ordersRes] = await Promise.all([
      axios.get(`${baseUrl}/customers.json`, { headers }),
      axios.get(`${baseUrl}/products.json`, { headers }),
      axios.get(`${baseUrl}/orders.json`, { headers })
    ]);

    return {
      customers: customersRes.data.customers || [],
      products: productsRes.data.products || [],
      orders: ordersRes.data.orders || []
    };
  }
  catch (err) {
    console.log("API ERROR >>>", err.response?.data || err.message);
    throw err;
  }
}

async function ingestShopifyData(tenant) {
  const { customers, products, orders } = await fetchFromShopify(tenant);

  for (const c of customers) {
    await Customer.upsert({
      id: c.id,
      tenantId: tenant.id,
      firstName: c.first_name,
      lastName: c.last_name,
      email: c.email,
      totalSpent: c.total_spent || 0
    });
  }

  for (const p of products) {
    const v = p.variants?.[0];
    await Product.upsert({
      id: p.id,
      tenantId: tenant.id,
      title: p.title,
      sku: v?.sku || null,
      price: v?.price || 0
    });
  }

  for (const o of orders) {
    await Order.create({
  id: o.id,
  tenantId: tenant.id,
  customerId: o.customer?.id || null,
  totalAmount: o.total_price,
  currency: o.currency,
  createdAtShopify: o.created_at
});

  }

  return { customersCount: customers.length, productsCount: products.length, ordersCount: orders.length };
}

module.exports = { ingestShopifyData };
