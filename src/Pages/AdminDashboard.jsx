import React from 'react';
import AdminLayout from '../components/AdminLayout';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <nav className="flex gap-2 text-[10px] font-mono text-secondary uppercase tracking-[0.2em] mb-4">
              <span>Admin</span>
              <span>/</span>
              <span className="text-primary">Management</span>
            </nav>
            <h1 className="text-5xl font-extrabold tracking-tighter text-white">Problem Management</h1>
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
              />
            </div>
            <button className="bg-surface-container-highest text-white p-4 rounded-2xl hover:bg-surface-bright transition-all">
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>
        </div>

        {/* Stats Bento Grid (Asymmetric) */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          <div className="col-span-12 md:col-span-4 bg-surface-container-low p-8 rounded-3xl relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-secondary font-mono text-[10px] tracking-widest uppercase">
                Total Problems
              </span>
              <div className="text-4xl font-black text-white mt-2">1,284</div>
              <div className="mt-4 flex items-center gap-2 text-xs text-green-400">
                <span className="material-symbols-outlined text-sm">trending_up</span>
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
            <div className="text-4xl font-black text-white mt-2">14</div>
            <div className="mt-4 flex items-center gap-2 text-xs text-secondary">
              <span>Pending review</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 bg-primary p-8 rounded-3xl flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-on-primary font-mono text-[10px] tracking-widest uppercase">
                Quick Action
              </span>
              <span className="material-symbols-outlined text-on-primary">bolt</span>
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
                    Test Cases
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
                {[
                  {
                    title: 'Binary Tree Maximum Path Sum',
                    slug: 'binary-tree-max-path',
                    status: 'Live',
                    testCases: 142,
                    difficulty: 'Hard',
                  },
                  {
                    title: 'Two Sum II - Input Array Is Sorted',
                    slug: 'two-sum-ii-sorted',
                    status: 'Draft',
                    testCases: 48,
                    difficulty: 'Easy',
                  },
                  {
                    title: 'LRU Cache Implementation',
                    slug: 'lru-cache-design',
                    status: 'Live',
                    testCases: 94,
                    difficulty: 'Medium',
                  },
                  {
                    title: 'Kth Largest Element in an Array',
                    slug: 'kth-largest-element',
                    status: 'Live',
                    testCases: 76,
                    difficulty: 'Medium',
                  },
                ].map((problem, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low/30 transition-colors group">
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
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            problem.status === 'Live'
                              ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'
                              : 'bg-secondary'
                          }`}
                        ></div>
                        <span
                          className={`text-xs font-medium ${
                            problem.status === 'Live' ? 'text-on-surface' : 'text-secondary'
                          }`}
                        >
                          {problem.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-white font-mono text-sm">{problem.testCases}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          problem.difficulty === 'Hard'
                            ? 'bg-red-950/30 text-red-400 border-red-500/20'
                            : problem.difficulty === 'Medium'
                            ? 'bg-orange-950/30 text-orange-400 border-orange-500/20'
                            : 'bg-emerald-950/30 text-emerald-400 border-emerald-500/20'
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3 group-hover:opacity-100 transition-opacity">
                        <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary hover:bg-primary/20 hover:text-primary transition-all">
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary hover:bg-error/20 hover:text-error transition-all">
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Table Footer / Pagination */}
          <div className="px-8 py-6 border-t border-white/5 flex items-center justify-between">
            <span className="text-secondary font-mono text-[10px] tracking-widest uppercase">
              Showing 1-10 of 1,284 results
            </span>
            <div className="flex gap-2">
              <button
                className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-primary hover:text-black transition-all disabled:opacity-30"
                disabled
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Metadata */}
        <div className="mt-24 mb-12 flex justify-between items-center opacity-40">
          <div className="flex items-center gap-6 text-white">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase">
              Built for Excellence
            </span>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase">V 4.1.0-Stable</span>
          </div>
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-white">
            © 2024 Obsidian Editorial
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
