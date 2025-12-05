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
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const update = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setError("");
    try {
      const url = isRegister ? "/tenants/register" : "/tenants/login";
      const send = isRegister ? form : { email: form.email, password: form.password };
      const res = await api.post(url, send);

      setToken(res.data.token);
      setTenantName(res.data.name);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-600 to-blue-500">

    <div className="card w-[420px] animate__animated animate__fadeIn">
      <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
        {isRegister ? "Create Tenant Account" : "Tenant Login"}
      </h2>

      <form className="space-y-4" onSubmit={submit}>
        {isRegister && (
          <>
            <input className="input" placeholder="Tenant Name" name="name" value={form.name} onChange={update} required />
            <input className="input" placeholder="Shopify Store Domain" name="shopDomain" value={form.shopDomain} onChange={update} required />
            <input className="input" placeholder="Shopify Admin Access Token" name="accessToken" value={form.accessToken} onChange={update} required />
          </>
        )}

        <input className="input" placeholder="Email" type="email" name="email" value={form.email} onChange={update} required />
        <input className="input" placeholder="Password" type="password" name="password" value={form.password} onChange={update} required />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="btn-primary w-full">{isRegister ? "Register & Continue" : "Login"}</button>
      </form>

      <p className="text-center mt-4 text-sm text-slate-600">
        {isRegister ? "Already have an account?" : "New Tenant?"}
        <button onClick={() => setIsRegister(!isRegister)} className="text-indigo-600 font-bold ml-1">
          {isRegister ? "Login" : "Register"}
        </button>
      </p>
    </div>

  </div>
  );
}

