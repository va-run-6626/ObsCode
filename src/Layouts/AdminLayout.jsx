import React from "react";
import { Outlet } from "react-router-dom"; // import Outlet
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

const AdminLayout = () => {
  return (
    <div className="flex bg-[#131313] min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-20 flex flex-col min-w-0">
        <TopBar />
        <main className="pt-20 p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
