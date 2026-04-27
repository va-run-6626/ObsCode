import React from "react";
import { useAuth } from "../context/AuthContext";
import BrandLogo from "./BrandLogo";

const TopBar = () => {
  const { user } = useAuth();
  const defaultAvatar =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23333333'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23aaaaaa' font-size='14' font-family='monospace'%3E%3C/text%3E%3C/svg%3E";
  const avatarUrl = user?.avatarUrl || defaultAvatar;

  return (
    <header className="fixed top-0 left-20 right-0 h-20 bg-[#131313]/70 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.05)] z-40 flex justify-between items-center px-12">
      <div className="flex items-center gap-8">
        <BrandLogo className="text-xl text-white" />
        <nav className="hidden md:flex gap-6">
          <a
            href="#"
            className="text-[#C7C6C6] hover:text-white transition-opacity font-medium"
          >
            Explorer
          </a>
          <a
            href="#"
            className="text-[#C7C6C6] hover:text-white transition-opacity font-medium"
          >
            Debugger
          </a>
          <a
            href="#"
            className="text-[#C7C6C6] hover:text-white transition-opacity font-medium"
          >
            Terminal
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative group hidden sm:block">
          <input
            type="text"
            placeholder="Search problems..."
            className="bg-surface-container-low text-on-surface text-sm px-4 py-2 pr-10 rounded-2xl border-none focus:ring-1 focus:ring-primary w-64 transition-all duration-300"
          />
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-sm">
            search
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-secondary hover:text-white cursor-pointer transition-colors">
            notifications
          </span>
          <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant/20">
            <img
              alt={user?.name || "User Profile"}
              className="w-full h-full object-cover"
              src={avatarUrl}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
