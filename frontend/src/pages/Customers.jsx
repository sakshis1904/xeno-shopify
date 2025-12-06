import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import { FiSearch, FiUsers } from "react-icons/fi";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const res = await api.get("/customers");
        setCustomers(res.data);
        setFiltered(res.data);
      } finally {
        setLoading(false);
      }
    }, 600);
  }, []);

  useEffect(() => {
    setFiltered(customers.filter(c =>
      (c.name + c.email).toLowerCase().includes(search.toLowerCase())
    ));
  }, [search]);

  useEffect(() => {
    setFiltered([...filtered].sort((a, b) =>
      sort === "orders" ? (b.totalOrders - a.totalOrders)
      : a.name.localeCompare(b.name)
    ));
  }, [sort]);

  const ripple = (e, id) => {
    const box = e.currentTarget;
    const circle = document.createElement("span");
    const size = Math.max(box.clientWidth, box.clientHeight);
    const x = e.clientX - box.offsetLeft - size / 2, y = e.clientY - box.offsetTop - size / 2;
    circle.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;position:absolute;background:rgba(0,128,128,.18);border-radius:50%;pointer-events:none;animation:ripple 0.6s linear;`;
    box.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
    setSelected(id);
  };

  return (
    <Layout title="Customers">

      <div className="flex items-center gap-3 mb-10 whitespace-nowrap">
        <div className="p-2 rounded-xl bg-gradient-to-r from-[#007a7a] to-[#00b3b3] shadow-md">
          <FiUsers size={24} color="white" />
        </div>

        <span className="text-3xl font-extrabold tracking-wide text-[#006d6d]">
          Customers
        </span>

        {!loading && (
          <span className="text-gray-600 text-lg font-semibold">
            ({filtered.length})
          </span>
        )}
      </div>


      <div className="mb-7 flex items-center justify-between">
        <div className="flex gap-3 bg-white/70 backdrop-blur-md shadow-sm px-4 py-2 rounded-xl border border-gray-200">
          <input
            placeholder="Search customer..."
            className="px-3 py-2 border rounded-lg shadow-sm focus:ring-[#008080] focus:ring-2 outline-none transition w-56 text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="px-3 py-2 rounded-lg border shadow-sm text-sm cursor-pointer hover:border-[#008080] focus:ring-2 focus:ring-[#008080] transition"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="name">Sort: Name</option>
            <option value="orders">Sort: Orders</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="animate-pulse space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="bg-white shadow-xl rounded-xl text-center py-12 text-gray-500 text-lg">
          No Customers Found
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="overflow-hidden shadow-2xl rounded-xl border border-[#008080]/20 animate-[fadeIn_0.6s_ease]">
          <table className="w-full text-sm relative">
            <thead className="bg-[#008080] text-white sticky top-0">
              <tr>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Orders</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((c, i) => (
                <tr
                  key={c.id}
                  onClick={e => ripple(e, c.id)}
                  className={`border-b relative cursor-pointer overflow-hidden hover:bg-[#008080]/8 hover:shadow-md hover:scale-[1.005] transition-all duration-200 ${selected === c.id ? "ring-2 ring-[#008080]" : ""} animate-[fadeUp_0.4s_ease_forwards] opacity-0`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <td className="p-4 flex items-center gap-3 font-medium">
                    <div className="h-9 w-9 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: "#008080" }}>
                      {c.name[0].toUpperCase()}
                    </div>
                    {c.name}
                  </td>
                  <td className="p-4">{c.email}</td>
                  <td className="p-4 font-semibold text-[#008080]">{c.totalOrders || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        @keyframes ripple {0%{transform:scale(.2);opacity:.8;}100%{transform:scale(2.5);opacity:0;}}
        @keyframes fadeUp {to{opacity:1;transform:translateY(0);}}
      `}</style>

    </Layout>
  );
}
