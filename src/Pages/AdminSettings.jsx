import React from "react";

const AdminSettings = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
      <div className="bg-surface-container-low rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-white">Allow public submissions</span>
          <input type="checkbox" className="toggle" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white">Enable email notifications</span>
          <input type="checkbox" className="toggle" />
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
