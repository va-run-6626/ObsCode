// src/components/ProblemTable.jsx
import React from "react";

const ProblemTable = ({ problems, role, onEdit, onDelete, onSolve }) => {
  // Helper for difficulty badge styling
  const difficultyClass = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-emerald-950/30 text-emerald-400 border-emerald-500/20";
      case "medium":
        return "bg-orange-950/30 text-orange-400 border-orange-500/20";
      case "hard":
        return "bg-red-950/30 text-red-400 border-red-500/20";
      default:
        return "bg-gray-950/30 text-gray-400 border-gray-500/20";
    }
  };

  const formatAcceptanceRate = (rate) => {
    if (rate === undefined || rate === null) return "N/A";
    const percentValue = rate <= 1 ? rate * 100 : rate;
    return `${Math.round(percentValue)}%`;
  };

  if (problems.length === 0) {
    return (
      <div className="bg-surface-container-lowest rounded-3xl py-12 text-center text-secondary">
        No problems found.
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50">
              {role === "admin" ? (
                <>
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
                </>
              ) : (
                <>
                  <th className="px-8 py-6 text-[10px] font-mono font-medium text-secondary uppercase tracking-[0.2em]">
                    Problem
                  </th>
                  <th className="px-8 py-6 text-[10px] font-mono font-medium text-secondary uppercase tracking-[0.2em]">
                    Difficulty
                  </th>
                  <th className="px-8 py-6 text-[10px] font-mono font-medium text-secondary uppercase tracking-[0.2em]">
                    Acceptance
                  </th>
                  <th className="px-8 py-6 text-[10px] font-mono font-medium text-secondary uppercase tracking-[0.2em]">
                    Tags
                  </th>
                  <th className="px-8 py-6 text-[10px] font-mono font-medium text-secondary uppercase tracking-[0.2em] text-right">
                    Action
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {problems.map((problem) => (
              <tr
                key={problem.id}
                className="hover:bg-surface-container-low/30 transition-colors group"
              >
                {/* Title & Slug */}
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-base tracking-tight group-hover:text-primary transition-colors">
                      {problem.title}
                    </span>
                    <span className="text-secondary font-mono text-xs mt-1">
                      {problem.slug}
                    </span>
                  </div>
                </td>

                {/* Admin: Status column (Live/Draft) */}
                {role === "admin" && (
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
                )}

                {role === "user" && (
                  <td className="px-8 py-6">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${difficultyClass(
                        problem.difficulty,
                      )}`}
                    >
                      {problem.difficulty}
                    </span>
                  </td>
                )}

                {/* Acceptance Rate (for both roles) */}
                <td className="px-8 py-6">
                  <span className="text-white font-mono text-sm">
                    {formatAcceptanceRate(problem.acceptanceRate)}
                  </span>
                </td>

                {role === "admin" && (
                  <td className="px-8 py-6">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${difficultyClass(
                        problem.difficulty,
                      )}`}
                    >
                      {problem.difficulty || "N/A"}
                    </span>
                  </td>
                )}

                {/* Tags (only for users) */}
                {role === "user" && (
                  <td className="px-8 py-6">
                    <div className="flex flex-wrap gap-1">
                      {problem.tags && problem.tags.length > 0 ? (
                        problem.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-white/5 text-secondary/70"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-secondary">—</span>
                      )}
                      {problem.tags && problem.tags.length > 2 && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-white/5 text-secondary/70">
                          +{problem.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                )}

                {/* Actions column */}
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-3">
                    {role === "admin" ? (
                      <>
                        {/* Play (Solve) button for admin – leads to normal user editor */}
                        <button
                          onClick={() => onSolve?.(problem.slug)}
                          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary hover:bg-green-500/20 hover:text-green-400 transition-all"
                          title="Open in editor"
                        >
                          <span className="material-symbols-outlined text-lg">
                            play_arrow
                          </span>
                        </button>
                        <button
                          onClick={() => onEdit?.(problem.slug)}
                          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary hover:bg-primary/20 hover:text-primary transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() => onDelete?.(problem.id)}
                          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary hover:bg-error/20 hover:text-error transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">
                            delete
                          </span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => onSolve?.(problem.slug)}
                        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary hover:bg-green-500/20 hover:text-green-400 transition-all"
                        title="Solve problem"
                      >
                        <span className="material-symbols-outlined text-lg">
                          play_arrow
                        </span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemTable;
