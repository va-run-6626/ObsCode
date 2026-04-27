import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BrandLogo from "./BrandLogo";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isAdmin = user?.role?.toUpperCase() === "ADMIN";

  const navItems = isAdmin
    ? [
        { icon: "grid_view", label: "Dashboard", path: "/admin/dashboard" },
        { icon: "group", label: "Users", path: "/admin/users" },
        { icon: "tune", label: "Settings", path: "/admin/settings" },
      ]
    : [
        { icon: "grid_view", label: "Dashboard", path: "/dashboard" },
        { icon: "code", label: "Editor", path: "/editor" },
        { icon: "list_alt", label: "Problems", path: "/problems" },
        { icon: "history", label: "Submissions", path: "/submissions" },
        { icon: "settings", label: "Settings", path: "/settings" },
      ];

  // Fallback avatar: a neutral SVG data URI (no network request)
  const defaultAvatar =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23333333'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23aaaaaa' font-size='14' font-family='monospace'%3E%3C/text%3E%3C/svg%3E";
  const avatarUrl = user?.avatarUrl || defaultAvatar;

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <aside className="fixed left-0 top-0 h-full z-50 flex flex-col items-center py-8 bg-[#131313] rounded-r-[24px] w-20 hover:w-64 transition-all duration-300 shadow-[0px_20px_40px_rgba(0,0,0,0.4)] font-['Inter'] tracking-tight group overflow-hidden">
      <div className="mb-10 px-6 flex items-center w-full">
        <Link to="/" className="flex items-center">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
            <span
              className="material-symbols-outlined text-[#131313] text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              terminal
            </span>
          </div>
          <BrandLogo className="ml-4 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" />
        </Link>
      </div>

      <nav className="flex flex-col gap-4 w-full px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`${
                isActive
                  ? "bg-white text-[#131313]"
                  : "text-[#C7C6C6] hover:text-white hover:bg-[#353535]"
              } rounded-full p-3 flex items-center transition-all duration-200 group/item`}
            >
              <span
                className="material-symbols-outlined"
                style={isActive ? { fontVariationSettings: '"FILL" 1' } : {}}
              >
                {item.icon}
              </span>
              <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto w-full px-4 flex flex-col gap-4">
        <button
          type="button"
          onClick={handleLogout}
          className="text-[#C7C6C6] hover:text-white hover:bg-[#353535] rounded-full p-3 flex items-center transition-all duration-200"
          title="Logout"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">
            Logout
          </span>
        </button>

        <div className="px-2 flex items-center">
          <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 overflow-hidden">
            <img
              alt="User Profile"
              className="w-full h-full object-cover"
              src={avatarUrl}
            />
          </div>
          <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <p className="text-xs font-bold text-white leading-none">
              {user?.name || "User Profile"}
            </p>
            <p className="text-[10px] text-secondary">
              {isAdmin ? "Admin" : "Pro Editor"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
