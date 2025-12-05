import { useAuth } from "../context/AuthContext";

export default function Navbar({ title }) {
  const { setToken } = useAuth();

  return (
    <nav className="w-full bg-white shadow p-4 flex justify-between rounded-xl mb-6">
      <h1 className="text-lg font-bold text-indigo-600">{title}</h1>
      <button
        onClick={() => setToken(null)}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
      >
        Logout
      </button>
    </nav>
  );
}
