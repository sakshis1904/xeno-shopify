import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import { FiBox } from "react-icons/fi";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(() => console.error("Product fetch error"));
  }, []);

  return (
    <Layout title="Products">
      
      <div className="flex items-center gap-3 mb-10 whitespace-nowrap">

        <div className="p-2 rounded-xl bg-gradient-to-r from-[#007a7a] to-[#00b3b3] shadow-md">
          <FiBox size={24} color="white" />
        </div>

        <span className="text-3xl font-extrabold tracking-wide text-[#006d6d]">
          Products
        </span>

        {products.length > 0 && (
          <span className="text-gray-600 text-lg font-semibold">
            ({products.length})
          </span>
        )}

      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {products.map((p, i) => (
          <div
            key={p.id}
            className="rounded-xl shadow-lg p-5 border border-teal-400/20 bg-white
                       hover:shadow-[0_0_18px_#00b3b350] hover:-translate-y-[6px]
                       hover:scale-[1.04] transition-all duration-400 cursor-pointer
                       animate-[fadeUp_0.55s_ease_forwards] opacity-0"
            style={{ animationDelay: `${i * 65}ms` }}
          >

            <div className="overflow-hidden rounded-lg mb-4">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-52 object-cover 
                           hover:scale-110 transition duration-700 ease-out
                           shadow-[inset_0_-10px_20px_rgba(0,128,128,.25)]"
              />
            </div>

     
            <h2 className="font-semibold text-lg text-gray-900 mb-[2px]">
              {p.title}
            </h2>

     
            <span className="px-3 py-1 text-xs rounded-md font-medium bg-gradient-to-r
                             from-[#007a7a] via-[#009999] to-[#00bebe] text-white">
              {p.category}
            </span>

            <p className="text-[#006d6d] font-extrabold text-2xl mt-3">
              ₹{p.price ?? "—"}
            </p>

          </div>
        ))}
      </div>

 
      <style>{`
        @keyframes fadeUp { 
          from {opacity:0; transform: translateY(10px);} 
          to {opacity:1; transform: translateY(0);} 
        }
      `}</style>

    </Layout>
  );
}
