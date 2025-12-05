import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/customers", label: "Customers" },
    { to: "/orders", label: "Orders" },
    { to: "/products", label: "Products" },
    { to: "/trends", label: "Trends" }
  ];

  return (
    <aside className="w-60 bg-white h-screen shadow-lg pt-6 fixed left-0 top-0">
      <h1 className="text-indigo-600 font-bold text-2xl text-center mb-8">Shopify</h1>

      <nav className="flex flex-col gap-1">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `px-6 py-3 text-sm font-medium ${
                isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-50"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
