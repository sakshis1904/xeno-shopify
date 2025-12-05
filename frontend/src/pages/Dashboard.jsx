import { useEffect, useState } from "react";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import { LineChart, Line, XAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const { token, tenantName, logout } = useAuth();
  const [summary, setSummary] = useState(null);
  const [orders, setOrders] = useState([]);
  const [top, setTop] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => load(), []);

  const load = async () => {
    setLoading(true);
    const h = { headers: { Authorization: `Bearer ${token}` } };
    const s = await api.get("/insights/summary", h);
    const o = await api.get("/insights/orders-by-date", h);
    const t = await api.get("/insights/top-customers", h);
    setSummary(s.data);
    setOrders(o.data);
    setTop(t.data);
    setLoading(false);
  };

  async function syncNow() {
    setSyncing(true);
    await api.post("/ingest/run", {}, { headers: { Authorization: `Bearer ${token}` } });
    load();
    setSyncing(false);
  }

  return (
    <Layout title="Dashboard">
      <div className="min-h-screen bg-slate-100 p-6">

      {/* Navbar */}
      <header className="flex justify-between items-center bg-white shadow-sm px-6 py-4 mb-6 rounded-xl">
        <h2 className="text-xl font-bold text-indigo-600">Shopify Dashboard – {tenantName}</h2>
        <button className="btn-primary" onClick={logout}>Logout</button>
      </header>

      <div className="flex justify-between mb-6">
        <button onClick={syncNow} disabled={syncing}
          className="px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow transition">
          {syncing ? "Syncing…" : "Sync Now from Shopify"}
        </button>
      </div>

      {loading ? <p>Loading…</p> : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-5 mb-10">
            <MetricCard label="Total Customers" value={summary.totalCustomers} color="blue"/>
            <MetricCard label="Total Orders" value={summary.totalOrders} color="purple"/>
            <MetricCard label="Revenue" value={`₹${summary.totalRevenue}`} color="green"/>
          </div>

          {/* Charts Section */}
          <section className="bg-white p-6 rounded-xl shadow mb-10">
            <h3 className="font-semibold text-lg mb-4">Order & Revenue Trends</h3>
            <div className="w-full h-72">
              <ResponsiveContainer>
                <LineChart data={orders}>
                  <CartesianGrid stroke="#eee"/>
                  <XAxis dataKey="date"/>
                  <Tooltip/>
                  <Line dataKey="ordersCount" stroke="#6366f1" strokeWidth={2}/>
                  <Line dataKey="revenue" stroke="#22c55e" strokeWidth={2}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Top Customers */}
          <section className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-4">Top 5 Customers</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b font-semibold text-slate-600">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Spent (₹)</th>
                </tr>
              </thead>
              <tbody>
                {top.map(c => (
                  <tr key={c.id} className="border-b hover:bg-slate-50">
                    <td className="p-2">{c.firstName} {c.lastName}</td>
                    <td className="p-2">{c.email}</td>
                    <td className="p-2 font-medium text-green-600">{c.totalSpent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </div>
    </Layout>
    
  );
}

function MetricCard({ label, value, color }) {
  const colors = {
    blue: "from-blue-500 to-indigo-500",
    purple: "from-purple-500 to-pink-500",
    green: "from-green-500 to-emerald-500"
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} text-white p-6 rounded-xl shadow`}>
      <h4 className="text-sm opacity-90">{label}</h4>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}
