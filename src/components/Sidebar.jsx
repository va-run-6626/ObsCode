import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ isCollapsed, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/admin/dashboard' },
    { name: 'Problems', icon: 'code_blocks', path: '/admin/problems' },
    { name: 'Users', icon: 'group', path: '/admin/users' },
    { name: 'Settings', icon: 'tune', path: '/admin/settings' },
  ];

  return (
    <aside
      className={`h-screen fixed left-0 top-0 bg-[#0E0E0E] flex flex-col pt-24 transition-all duration-300 z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className={`px-6 mb-8 ${isCollapsed ? 'hidden' : 'block'}`}>
        <h2 className="text-white font-black text-xl tracking-tight uppercase">Obsidian Admin</h2>
        <p className="text-secondary text-[10px] font-mono tracking-widest uppercase mt-1">
          Problem Management
        </p>
      </div>

      <div className={`flex justify-center mb-4 ${isCollapsed ? 'block' : 'hidden'}`}>
        <span className="text-white font-black text-xl tracking-tight uppercase">O.</span>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <a
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-4 py-3 px-4 rounded-full transition-all cursor-pointer active:scale-95 group ${
                isActive
                  ? 'text-white font-bold bg-[#353535]'
                  : 'text-[#C7C6C6] hover:bg-[#1B1B1B]'
              }`}
              title={isCollapsed ? item.name : ''}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {!isCollapsed && (
                <span className="font-medium text-sm tracking-wide">{item.name}</span>
              )}
            </a>
          );
        })}
      </nav>

      <div className={`p-4 mt-auto mb-24 transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <button
          onClick={() => navigate('/admin/problems/new')}
          className={`w-full bg-primary text-on-primary py-4 rounded-3xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 overflow-hidden whitespace-nowrap`}
          title={isCollapsed ? "New Problem" : ""}
        >
          <span className="material-symbols-outlined">add</span>
          {!isCollapsed && <span>New Problem</span>}
        </button>
      </div>

      {/* Toggle Button at the bottom of sidebar or somewhere visible */}
      <button
        onClick={onToggle}
        className="absolute bottom-10 right-0 translate-x-1/2 w-8 h-8 bg-[#353535] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:text-black transition-all z-50"
      >
        <span className="material-symbols-outlined text-sm">
          {isCollapsed ? 'chevron_right' : 'chevron_left'}
        </span>
      </button>
    </aside>
  );
};

export default Sidebar;
