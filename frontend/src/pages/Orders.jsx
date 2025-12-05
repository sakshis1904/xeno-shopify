import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders")
    .then(res => setOrders(res.data))
    .catch(() => console.error("Order fetch failed"));
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{o.id}</td>
                <td className="p-3">{o.customerName}</td>
                <td className="p-3">₹{o.totalAmount}</td>
                <td className="p-3">{new Date(o.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
