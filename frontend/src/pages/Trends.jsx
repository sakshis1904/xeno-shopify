import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Trends() {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    api.get("/trends")
    .then(res => setChart(res.data))
    .catch(() => console.error("Trends load failed"));
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Sales Trends</h1>

      {!chart ? <p>Loading trends...</p> :
      
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold text-lg mb-4">Monthly Revenue</h2>
        <div className="h-52 flex items-center justify-center text-gray-500">
          📊 Chart coming soon
        </div>
      </div>
      }
    </Layout>
  );
}
