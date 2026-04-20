import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the Coding Platform
        </h1>
        <p className="text-zinc-400">
          Go to{" "}
          <a href="/admin/problems/new" className="text-blue-400 underline">
            Admin Panel
          </a>{" "}
          to add problems.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
