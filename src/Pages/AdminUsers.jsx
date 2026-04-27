import React, { useState, useEffect } from "react";
import api from "../services/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/users")
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-white">Loading users...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">User Management</h1>
      <div className="bg-surface-container-low rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high text-outline text-sm">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-white/5">
                <td className="p-4 text-white">{user.name}</td>
                <td className="p-4 text-outline">{user.email}</td>
                <td className="p-4 text-secondary">{user.role}</td>
                <td className="p-4">
                  <button className="text-red-400 hover:text-red-300 text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
