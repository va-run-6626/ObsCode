import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // ← axios instance with baseURL & auth interceptor
import ProblemTable from "../components/ProblemsTable";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get("/problems");
        setProblems(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching problems:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const filteredProblems = useMemo(() => {
    if (!searchTerm.trim()) return problems;
    const lowerSearch = searchTerm.toLowerCase();
    return problems.filter(
      (problem) =>
        problem.title.toLowerCase().includes(lowerSearch) ||
        problem.slug.toLowerCase().includes(lowerSearch),
    );
  }, [problems, searchTerm]);

  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const safeCurrentPage = Math.min(currentPage, totalPages || 1);
  const paginatedProblems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    return filteredProblems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProblems, safeCurrentPage]);

  const totalProblems = problems.length;
  const draftCount = problems.filter((p) => !p.live).length;

  const formatAcceptanceRate = (rate) => {
    if (rate === undefined || rate === null) return "N/A";
    const percentValue = rate <= 1 ? rate * 100 : rate;
    return `${Math.round(percentValue)}%`;
  };

  const handleEdit = (problemSlug) => {
    navigate(`/admin/problems/edit/${problemSlug}`);
  };

  const handlePlay = (problemSlug) => {
    navigate(`/editor/${problemSlug}`);
  };

  const handleDelete = async (problemId) => {
    if (!window.confirm("Are you sure you want to delete this problem?"))
      return;
    try {
      await api.delete(`/problems/${problemId}`);
      setProblems((prev) => prev.filter((p) => p.id !== problemId));
      alert("Problem deleted successfully");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error deleting problem");
    }
  };

  const goToPreviousPage = () => {
    if (safeCurrentPage > 1) setCurrentPage(safeCurrentPage - 1);
  };

  const goToNextPage = () => {
    if (safeCurrentPage < totalPages) setCurrentPage(safeCurrentPage + 1);
  };

  const startIndex = (safeCurrentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(
    safeCurrentPage * itemsPerPage,
    filteredProblems.length,
  );

  if (loading) {
    return <div className="text-center py-20 text-white">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-400">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary/20 rounded-lg text-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10">
      {/* Header with Add Problem button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <nav className="flex gap-2 text-[10px] font-mono text-secondary uppercase tracking-[0.2em] mb-4">
            <span>Admin</span>
            <span>/</span>
            <span className="text-primary">Management</span>
          </nav>
          <h1 className="text-5xl font-extrabold tracking-tighter text-white">
            Problem Management
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary/60">
              search
            </span>
            <input
              className="bg-surface-container-low border-none rounded-2xl pl-12 pr-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 w-80 transition-all placeholder:text-secondary/40 text-white"
              placeholder="Filter by slug or title..."
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button
            onClick={() => navigate("/admin/problems/new")}
            className="bg-primary text-black px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all"
          >
            <span className="material-symbols-outlined">add</span>
            New Problem
          </button>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-12 gap-6 mb-12">
        <div className="col-span-12 md:col-span-4 bg-surface-container-low p-8 rounded-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <span className="text-secondary font-mono text-[10px] tracking-widest uppercase">
              Total Problems
            </span>
            <div className="text-4xl font-black text-white mt-2">
              {totalProblems}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-green-400">
              <span className="material-symbols-outlined text-sm">
                trending_up
              </span>
              <span>+12% this month</span>
            </div>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
            database
          </span>
        </div>
        <div className="col-span-12 md:col-span-3 bg-surface-container-low p-8 rounded-3xl group">
          <span className="text-secondary font-mono text-[10px] tracking-widest uppercase">
            Drafts
          </span>
          <div className="text-4xl font-black text-white mt-2">
            {draftCount}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-secondary">
            <span>Pending review</span>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 bg-primary p-8 rounded-3xl flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-on-primary font-mono text-[10px] tracking-widest uppercase">
              Quick Action
            </span>
            <span className="material-symbols-outlined text-on-primary">
              bolt
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-on-primary tracking-tight">
              Launch the monthly coding challenge
            </h3>
            <p className="text-on-primary/70 text-sm mt-1">
              Curate 5 hard problems for the "Obsidian Cup".
            </p>
          </div>
        </div>
      </div>

      {/* Problem Table */}
      <ProblemTable
        problems={paginatedProblems}
        role="admin"
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSolve={handlePlay}
      />
      {/* Footer */}
      <div className="mt-24 mb-12 flex justify-between items-center opacity-40">
        <div className="flex items-center gap-6 text-white">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase">
            Built for Excellence
          </span>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase">
            V 4.1.0-Stable
          </span>
        </div>
        <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-white">
          © 2024 Obsidian Editorial
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
