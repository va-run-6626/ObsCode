import React from "react";
import { Link } from "react-router-dom";

const ProblemsPage = () => {
  const problems = [
    {
      id: "ID-2091",
      title: "Two-Pointer Array Reversal",
      difficulty: "Easy",
      difficultyColor: "text-[#4ade80]",
      difficultyBg: "bg-[#102a1e]",
      acceptance: "82.4%",
      solved: true,
    },
    {
      id: "ID-2042",
      title: "Balanced Binary Tree Validation",
      difficulty: "Medium",
      difficultyColor: "text-[#fbbf24]",
      difficultyBg: "bg-[#332211]",
      acceptance: "48.2%",
      solved: false,
    },
    {
      id: "ID-1988",
      title: "Minimum Window Substring",
      difficulty: "Hard",
      difficultyColor: "text-[#f87171]",
      difficultyBg: "bg-[#2a1212]",
      acceptance: "31.9%",
      solved: false,
    },
    {
      id: "ID-2104",
      title: "LRU Cache Implementation",
      difficulty: "Medium",
      difficultyColor: "text-[#fbbf24]",
      difficultyBg: "bg-[#332211]",
      acceptance: "41.5%",
      solved: false,
    },
    {
      id: "ID-1056",
      title: "String Compression II",
      difficulty: "Easy",
      difficultyColor: "text-[#4ade80]",
      difficultyBg: "bg-[#102a1e]",
      acceptance: "67.9%",
      solved: true,
    },
    {
      id: "ID-0899",
      title: "Word Ladder II Optimization",
      difficulty: "Hard",
      difficultyColor: "text-[#f87171]",
      difficultyBg: "bg-[#2a1212]",
      acceptance: "24.1%",
      solved: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-on-background p-12">
      {/* Hero / Header Section */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-white mb-2">Algorithm Challenges</h2>
            <p className="text-secondary max-w-xl">
              Curated collection of engineering puzzles. Solve to enhance your structural thinking and mastery of the Obsidian engine.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-surface-container-low px-4 py-2 rounded-2xl text-on-surface text-sm font-medium hover:bg-surface-container-high transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              Difficulty
            </button>
            <button className="bg-surface-container-low px-4 py-2 rounded-2xl text-on-surface text-sm font-medium hover:bg-surface-container-high transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">tune</span>
              Status
            </button>
          </div>
        </div>
      </section>

      {/* Problems Table Container */}
      <div className="bg-[#131313] rounded-[32px] overflow-hidden border border-outline-variant/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/10">
              <th className="px-8 py-6 text-[10px] font-mono text-outline uppercase tracking-widest">Status</th>
              <th className="px-6 py-6 text-[10px] font-mono text-outline uppercase tracking-widest">Title</th>
              <th className="px-6 py-6 text-[10px] font-mono text-outline uppercase tracking-widest">Difficulty</th>
              <th className="px-6 py-6 text-[10px] font-mono text-outline uppercase tracking-widest">Acceptance</th>
              <th className="px-8 py-6 text-[10px] font-mono text-outline uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-on-surface">
            {problems.map((problem, index) => (
              <tr key={index} className="border-b border-outline-variant/5 hover:bg-surface-container-low transition-colors group last:border-b-0">
                <td className="px-8 py-5">
                  {problem.solved ? (
                    <span className="material-symbols-outlined text-[#4ade80] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-outline-variant text-xl">radio_button_unchecked</span>
                  )}
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-white font-bold group-hover:text-primary transition-colors">{problem.title}</span>
                    <span className="text-[10px] font-mono text-outline">{problem.id}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${problem.difficultyBg} ${problem.difficultyColor}`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="px-6 py-5 font-mono text-sm text-secondary">{problem.acceptance}</td>
                <td className="px-8 py-5 text-right">
                  {problem.solved ? (
                    <button className="text-primary text-xs font-bold tracking-widest uppercase flex items-center gap-2 ml-auto">
                      View Solution
                      <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                    </button>
                  ) : (
                    <Link to={`/editor/${problem.id}`} className="inline-block bg-white text-on-primary px-6 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase hover:scale-105 transition-transform text-center">
                      Solve
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination / Footer */}
      <footer className="mt-20 flex flex-col md:flex-row items-center justify-between border-t border-outline-variant/10 pt-8">
        <div className="flex items-center gap-8 mb-6 md:mb-0">
          <div className="flex flex-col">
            <span className="text-[10px] text-outline font-mono uppercase tracking-widest">Total Problems</span>
            <span className="text-2xl font-bold text-white">1,204</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-outline font-mono uppercase tracking-widest">Completed</span>
            <span className="text-2xl font-bold text-[#4ade80]">42</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-outline hover:text-white hover:border-white transition-all">
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-white text-on-primary flex items-center justify-center font-bold text-sm">1</button>
          <button className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface hover:text-white transition-all text-sm">2</button>
          <button className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface hover:text-white transition-all text-sm">3</button>
          <button className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-outline hover:text-white hover:border-white transition-all">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </footer>

      {/* Contextual FAB */}
      <button className="fixed bottom-8 right-8 bg-white text-on-primary w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group z-50">
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
        <span className="absolute right-16 bg-white text-on-primary px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">QUICK SOLVE</span>
      </button>
    </div>
  );
};

export default ProblemsPage;
