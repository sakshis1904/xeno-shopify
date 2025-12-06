import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import { FiShoppingCart } from "react-icons/fi";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders")
      .then(res => setOrders(res.data))
      .catch(() => console.error("Order fetch failed"));
  }, []);

  return (
    <Layout title="Orders">

      
      <div className="flex items-center gap-3 mb-10 whitespace-nowrap">
        <div className="p-2 rounded-xl bg-gradient-to-r from-[#007a7a] to-[#00b3b3] shadow-md">
          <FiShoppingCart size={24} color="white" />
        </div>

        <span className="text-3xl font-extrabold tracking-wide bg-gradient-to-r
                        from-[#005f5f] via-[#00a3a3] to-[#00d5d5] bg-clip-text 
                        text-transparent drop-shadow-sm">
          Orders
        </span>

        {orders.length > 0 && (
          <span className="text-gray-600 text-lg font-medium">
            ({orders.length})
          </span>
        )}
      </div>

      
      <div className="overflow-hidden rounded-xl shadow-xl border border-[#008080]/20 bg-white/90 backdrop-blur-md animate-[fadeIn_0.6s_ease]">
        
        <table className="w-full text-sm">
          <thead className="bg-[#008080] text-white">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o, i) => (
              <tr
                key={o.id}
                className="border-b hover:bg-[#008080]/10 hover:scale-[1.01]
                           transition-all duration-300 animate-[fadeUp_0.5s_ease_forwards]
                           opacity-0"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <td className="p-4 font-semibold text-[#006d6d]">{o.id}</td>
                <td className="p-4">{o.customerName}</td>
                <td className="p-4 font-bold text-[#009090]">₹{o.totalAmount}</td>
                <td className="p-4">{new Date(o.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <style>{`
        @keyframes fadeUp { 
          from {opacity:0; transform: translateY(6px);} 
          to {opacity:1; transform: translateY(0);} 
        }
      `}</style>

    </Layout>
  );
}
