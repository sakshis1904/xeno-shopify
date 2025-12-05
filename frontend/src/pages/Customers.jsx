import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/customers");
        setCustomers(res.data);
      } catch {
        console.error("Failed to fetch customers");
      }
    };
    load();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Customers</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Total Orders</th>
            </tr>
          </thead>

          <tbody>
            {customers.map(c => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.totalOrders || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
