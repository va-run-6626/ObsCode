import React from "react";
import { useAuth } from "../context/AuthContext";

const TopBar = () => {
  const { user } = useAuth();
  const defaultAvatar =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23333333'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23aaaaaa' font-size='14' font-family='monospace'%3E%3C/text%3E%3C/svg%3E";
  const avatarUrl = user?.avatarUrl || defaultAvatar;

  return (
    <header className="fixed top-0 left-20 right-0 h-20 bg-[#131313] shadow-[0_1px_0_0_rgba(255,255,255,0.05)] z-40 flex justify-between items-center px-8">
      <div className="flex items-center gap-8">
        <span className="text-lg font-bold tracking-tighter text-white uppercase font-headline">
          ObsCode
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-white cursor-pointer hover:opacity-80">
          notifications
        </span>
        <span className="material-symbols-outlined text-white cursor-pointer hover:opacity-80">
          settings
        </span>
        <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant/20">
          <img
            alt={user?.name || "User Profile"}
            className="w-full h-full object-cover"
            src={avatarUrl}
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
