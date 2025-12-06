import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import { FiTrendingUp, FiUsers, FiShoppingBag, FiPackage } from "react-icons/fi";

export default function Dashboard() {
  const { token, tenantName, logout } = useAuth();

  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const h = { headers: { Authorization: `Bearer ${token}` } };

        const s = await api.get("/insights/summary", h);
        setSummary(s.data);
      } catch (err) {
        console.log(" Dashboard fetch failed:", err.response?.status);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchData();
  }, [token]);


  async function syncNow() {
    try {
      setSyncing(true);
      await api.post("/ingest/run", {}, { headers: { Authorization: `Bearer ${token}` } });
      window.location.reload();
    } finally {
      setSyncing(false);
    }
  }

  return (
    <Layout>
      <div className="p-6">


        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-gradient-to-r from-[#007a7a] to-[#00b3b3] shadow-lg">
            <FiTrendingUp size={28} color="white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-wide text-[#006d6d]">
            Dashboard Overview
          </h1>
          <span className="text-gray-500 font-semibold text-lg">
            ({tenantName})
          </span>
        </div>


        <div className="flex gap-4 mb-6">
          <button
            onClick={syncNow}
            disabled={syncing}
            className="px-6 py-3 rounded-lg bg-[#008080] hover:bg-[#006d6d] text-white font-semibold shadow-md transition active:scale-95"
          >
            {syncing ? "Syncing..." : "Sync Shopify Data"}
          </button>

          <button onClick={logout} className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition">
            Logout
          </button>
        </div>

        
        {loading ? (
          <div className="grid grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="bg-gray-200 animate-pulse h-28 rounded-xl"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

            <Card icon={<FiUsers size={30}/>} title="Total Customers" value={summary.totalCustomers} color="from-teal-500 to-teal-700" />

            <Card icon={<FiShoppingBag size={30}/>} title="Total Orders" value={summary.totalOrders} color="from-emerald-500 to-emerald-700" />

            <Card icon={<FiPackage size={30}/>} title="Total Products" value={summary.totalProducts} color="from-cyan-500 to-cyan-700" />

          </div>
        )}
      </div>
    </Layout>
  );
}


const Card = ({ icon, title, value, color }) => (
  <div className={`p-6 rounded-xl bg-gradient-to-br ${color} shadow-xl text-white 
                  hover:scale-[1.03] hover:shadow-2xl transition transform`}>
    <div className="mb-2">{icon}</div>
    <p className="text-sm opacity-90">{title}</p>
    <h2 className="text-3xl font-bold">{value || 0}</h2>
  </div>
);
