import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const AdminLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex bg-[#131313] min-h-screen">
      <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <TopBar isSidebarCollapsed={isCollapsed} />
        <main className="pt-20 p-12">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
