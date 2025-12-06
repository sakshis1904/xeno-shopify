import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setToken, setTenantName } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    shopDomain: "",
    accessToken: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const update = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setError("");
    try {
      const url = isRegister ? "/tenants/register" : "/tenants/login";
      const send = isRegister ? form : { email: form.email, password: form.password };
      const res = await api.post(url, send);

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("tenantName", res.data.name);
      setTenantName(res.data.name);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#008080] relative overflow-hidden">

      <div className="absolute w-[700px] h-[700px] rounded-full bg-[#00d4d4] blur-[200px] opacity-30 -top-40 -left-20 animate-pulse"></div>
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#006666] blur-[180px] opacity-25 bottom-0 right-0 animate-ping"></div>

      <div className="w-[420px] p-8 rounded-3xl bg-white/70 backdrop-blur-2xl shadow-xl border border-white/40 
                      animate-[fadeIn_0.7s_ease] hover:scale-[1.02] transition-all">

        <h2 className="text-3xl font-extrabold text-center text-[#004f4f] mb-6 drop-shadow-sm tracking-wide">
          {isRegister ? "Create Tenant Account" : "Tenant Login"}
        </h2>

        <form onSubmit={submit} className="space-y-5">

          {isRegister && (
            <>
              <InputField label="Tenant Name" name="name" value={form.name} onChange={update} />
              <InputField label="Shopify Store Domain" name="shopDomain" value={form.shopDomain} onChange={update} />
              <InputField label="Shopify Admin Access Token" name="accessToken" value={form.accessToken} onChange={update} />
            </>
          )}

          <InputField label="Email" name="email" type="email" value={form.email} onChange={update} />
          <InputField label="Password" name="password" type="password" value={form.password} onChange={update} />

          {error && <p className="text-red-500 text-center animate-pulse">{error}</p>}

          <button 
            className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-lg shadow-lg
                       active:scale-95 transition-all duration-200">
            {isRegister ? "Register & Continue" : "Login"}
          </button>
        </form>

        <p className="text-center mt-5 text-sm font-medium text-[#003f3f]">
          {isRegister ? "Already have an account?" : "New Tenant?"}
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-[#004f4f] font-bold ml-1 underline hover:text-black transition"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>

      
      <style>{`
        @keyframes fadeIn { from{opacity:0; transform:translateY(15px);} to{opacity:1; transform:translateY(0);} }
      `}</style>
    </div>
  );
}

/* Floating Input Component */
function InputField({ label, ...props }) {
  return (
    <div className="relative">
      <input {...props} required
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm
                   focus:border-[#008080] focus:ring-2 focus:ring-[#00b3b3] outline-none peer transition-all"
      />
      <label className="absolute text-sm text-gray-500 px-2 top-1 left-4 transition-all 
                       peer-focus:text-[#007777] peer-focus:-top-3 peer-focus:text-xs 
                       peer-valid:-top-3 peer-valid:text-xs bg-white/70 rounded">
        {label}
      </label>
    </div>
  );
}
