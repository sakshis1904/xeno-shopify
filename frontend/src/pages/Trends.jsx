import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import { FiTrendingUp } from "react-icons/fi";

export default function Trends() {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    api.get("/trends")
      .then(res => setChart(res.data))
      .catch(() => console.error("Trends load failed"));
  }, []);

  return (
    <Layout title="Trends">

      <div className="flex items-center gap-3 mb-10 whitespace-nowrap">
        <div className="p-2 rounded-xl bg-gradient-to-r from-[#007a7a] to-[#00b3b3] shadow-md">
          <FiTrendingUp size={24} color="white" />
        </div>

        <span className="text-3xl font-extrabold tracking-wide bg-gradient-to-r 
                         from-[#005f5f] via-[#00a3a3] to-[#00d5d5]
                         bg-clip-text text-transparent drop-shadow-sm">
          Sales Trends
        </span>

        {chart && (
          <span className="text-gray-600 text-lg font-medium">
            (Monthly)
          </span>
        )}
      </div>

      {!chart && (
        <div className="animate-pulse space-y-3">
          <div className="h-56 bg-gray-200 rounded-xl"></div>
        </div>
      )}

      {chart && (
        <div className="bg-white/90 backdrop-blur-xl border border-[#00a3a3]/20
                        rounded-2xl shadow-xl p-7 animate-[fadeIn_0.6s_ease]"
        >
          <h2 className="font-semibold text-xl text-[#006d6d] mb-4">
            Monthly Revenue Overview
          </h2>

          <div className="h-56 flex items-center justify-center text-gray-500 text-lg">
            📊 Chart Coming Soon
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeUp {to{opacity:1;transform:translateY(0);} }
        @keyframes fadeIn {from{opacity:0;} to{opacity:1;} }
      `}</style>

    </Layout>
  );
}
