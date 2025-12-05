import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children, title }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-60 p-6 w-full">
        <Navbar title={title} />
        {children}
      </main>
    </div>
  );
}
