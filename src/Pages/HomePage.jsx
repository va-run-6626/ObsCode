import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the Coding Platform
        </h1>
        <p className="text-zinc-400">
          Go to{" "}
          <Link to="/admin/problems/new" className="text-blue-400 underline">
            Admin Panel
          </Link>{" "}
          to add problems or check the{" "}
          <Link to="/editor" className="text-blue-400 underline">
            Editor
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default HomePage;
