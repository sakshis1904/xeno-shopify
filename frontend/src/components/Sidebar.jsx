import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiShoppingBag, FiBox, FiTrendingUp } from "react-icons/fi";

export default function Sidebar() {
  const links = [
    { to: "/", label: "Dashboard", icon: <FiHome size={18} /> },
    { to: "/customers", label: "Customers", icon: <FiUsers size={18} /> },
    { to: "/orders", label: "Orders", icon: <FiShoppingBag size={18} /> },
    { to: "/products", label: "Products", icon: <FiBox size={18} /> },
    { to: "/trends", label: "Trends", icon: <FiTrendingUp size={18} /> }
  ];

  return (
    <aside
      className="w-64 h-screen fixed left-0 top-0 bg-white/75 backdrop-blur-xl 
                 border-r border-[#00a3a3]/25 shadow-[6px_0_25px_rgba(0,128,128,0.18)]
                 overflow-hidden animate-[slideIn_0.45s_ease-out]"
    >
      
      <div className="text-center py-9 select-none relative">
        <h1
          className="text-3xl font-extrabold tracking-widest 
                     bg-gradient-to-r from-[#007676] via-[#00b3b3] to-[#00dfdf]
                     bg-clip-text text-transparent drop-shadow-md
                     animate-[titleGlow_2.5s_ease-in-out_infinite]"
        >
          Shopify
        </h1>
        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#00a3a3] to-[#00d5d5]
                        mx-auto mt-3 animate-[underlineWave_2s_ease-in-out_infinite]"></div>
      </div>

      
      <nav className="flex flex-col gap-2 px-4">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold
               transition-all duration-300 cursor-pointer
               ${
                 isActive
                   ? "bg-gradient-to-r from-[#008080] to-[#00b3b3] text-white shadow-lg scale-[1.05]"
                   : "text-gray-700 hover:bg-[#008080]/10 hover:text-[#006d6d] hover:translate-x-1"
               }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes titleGlow {
          0%, 100% { text-shadow: 0 0 6px rgba(0,224,224,0.6); }
          50%      { text-shadow: 0 0 18px rgba(0,224,224,1); }
        }
        @keyframes underlineWave {
          0%   { transform: scaleX(0.4); opacity: 0.4; }
          50%  { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(0.4); opacity: 0.4; }
        }
      `}</style>
    </aside>
  );
}
