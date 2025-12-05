import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(() => console.error("Product fetch error"));
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-white p-5 rounded-xl shadow hover:scale-105 transition">
            <img src={p.image} alt="" className="rounded-md w-full h-40 object-cover mb-3"/>
            <h2 className="font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-500">{p.category}</p>
            <p className="mt-2 font-bold text-indigo-600 text-lg">₹{p.price}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
