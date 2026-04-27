import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../Layouts/AdminLayout";
import api from "../services/api"; // ← axios instance with baseURL & auth interceptor

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

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProblems.length]);

  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProblems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProblems, currentPage]);

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
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(
    currentPage * itemsPerPage,
    filteredProblems.length,
  );

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
              onChange={(e) => setSearchTerm(e.target.value)}
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
      <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-6 text-[10px] font-mono font-medium text-secondary uppercase tracking-[0.2em]">
                  Problem
                </th>
                <th className="px-8 py-6 text-[10px] font-mono font-medium text-secondary uppercase tracking-[0.2em]">
                  Status
                </th>
                <th className="px-8 py-6 text-[10px] font-mono font-medium text-secondary uppercase tracking-[0.2em]">
                  Acceptance
                </th>
                <th className="px-8 py-6 text-[10px] font-mono font-medium text-secondary uppercase tracking-[0.2em]">
                  Difficulty
                </th>
                <th className="px-8 py-6 text-[10px] font-mono font-medium text-secondary uppercase tracking-[0.2em] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-8 py-12 text-center text-secondary"
                  >
                    <div className="flex justify-center items-center gap-3">
                      <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      <span>Loading problems...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-error">
                    <div className="flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-3xl">
                        error
                      </span>
                      <span>Failed to load problems: {error}</span>
                      <button
                        onClick={() => window.location.reload()}
                        className="mt-2 px-4 py-2 bg-primary/20 rounded-lg text-primary text-sm"
                      >
                        Retry
                      </button>
                    </div>
                  </td>
                </tr>
              ) : paginatedProblems.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-8 py-12 text-center text-secondary"
                  >
                    {searchTerm
                      ? "No problems match your search criteria."
                      : "No problems found."}
                  </td>
                </tr>
              ) : (
                paginatedProblems.map((problem) => (
                  <tr
                    key={problem.id}
                    className="hover:bg-surface-container-low/30 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-white font-bold text-base tracking-tight group-hover:text-primary transition-colors">
                          {problem.title}
                        </span>
                        <span className="text-secondary font-mono text-xs mt-1">
                          {problem.slug}
                        </span>
                        {problem.tags && problem.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {problem.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-white/5 text-secondary/70"
                              >
                                {tag}
                              </span>
                            ))}
                            {problem.tags.length > 2 && (
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-white/5 text-secondary/70">
                                +{problem.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            problem.live
                              ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                              : "bg-secondary"
                          }`}
                        />
                        <span
                          className={`text-xs font-medium ${
                            problem.live ? "text-on-surface" : "text-secondary"
                          }`}
                        >
                          {problem.live ? "Live" : "Draft"}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-white font-mono text-sm">
                        {formatAcceptanceRate(problem.acceptanceRate)}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          problem.difficulty === "Hard"
                            ? "bg-red-950/30 text-red-400 border-red-500/20"
                            : problem.difficulty === "Medium"
                              ? "bg-orange-950/30 text-orange-400 border-orange-500/20"
                              : "bg-emerald-950/30 text-emerald-400 border-emerald-500/20"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => handleEdit(problem.slug)}
                          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary hover:bg-primary/20 hover:text-primary transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() => handleDelete(problem.id)}
                          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary hover:bg-error/20 hover:text-error transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-8 py-6 border-t border-white/5 flex items-center justify-between">
          <span className="text-secondary font-mono text-[10px] tracking-widest uppercase">
            Showing {filteredProblems.length === 0 ? 0 : startIndex}-{endIndex}{" "}
            of {filteredProblems.length} results
          </span>
          <div className="flex gap-2">
            <button
              className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-primary hover:text-black transition-all disabled:opacity-30 disabled:hover:bg-surface-container-low disabled:hover:text-white"
              onClick={goToPreviousPage}
              disabled={currentPage === 1 || filteredProblems.length === 0}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-primary hover:text-black transition-all disabled:opacity-30 disabled:hover:bg-surface-container-low disabled:hover:text-white"
              onClick={goToNextPage}
              disabled={
                currentPage === totalPages || filteredProblems.length === 0
              }
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

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
