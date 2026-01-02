import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import api from "../libs/axios";
import UserContext from "../libs/context";
import { HiMenu, HiX } from "react-icons/hi";
import CatchError from "../libs/catchError";

const Layout = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await api.get("/auth/refresh-token");
      } catch (err: any) {
        CatchError(err);
      }
    }, 8 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const logout = async () => {
    try {
      await api.get("/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (err: any) {
      CatchError(err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-10 md:hidden"
        />
      )}

      <aside
        className={`fixed md:relative z-20 w-64 bg-linear-to-b from-slate-900 to-slate-800 text-white flex flex-col px-6 py-8 shadow-xl h-full transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-2xl font-bold tracking-wide">
            My<span className="text-blue-400">Auth</span>
          </h1>

          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <HiX size={24} />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
            <img
              src={user?.image || "/pic.jfif"}
              alt="profile"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs text-slate-400">Welcome</p>
            <p className="font-semibold text-sm">{user?.username || "User"}</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-blue-500 text-white shadow"
                  : "text-slate-300 hover:bg-white/10"
              }`
            }
          >
            🏠 Home
          </NavLink>

          <NavLink
            to="/security"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-blue-500 text-white shadow"
                  : "text-slate-300 hover:bg-white/10"
              }`
            }
          >
            🔐 Security
          </NavLink>
        </nav>

        <div className="mt-auto text-xs text-slate-500">© 2025 MyAuth</div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white flex items-center justify-between px-4 md:px-6 border-b shadow-sm">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-gray-700 hover:text-gray-900"
              onClick={() => setSidebarOpen(true)}
            >
              <HiMenu size={24} />
            </button>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
              <p className="text-xs text-gray-500">
                Secure authentication system
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-100">
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 min-h-[calc(100vh-4rem)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
