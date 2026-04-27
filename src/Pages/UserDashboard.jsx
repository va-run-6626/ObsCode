import React from "react";
import { Link } from "react-router-dom";

const MONTH_LABELS = [
  { label: "Jan", weeks: 4 },
  { label: "Feb", weeks: 4 },
  { label: "Mar", weeks: 5 },
  { label: "Apr", weeks: 4 },
  { label: "May", weeks: 4 },
  { label: "Jun", weeks: 4 },
  { label: "Jul", weeks: 5 },
  { label: "Aug", weeks: 4 },
  { label: "Sep", weeks: 4 },
  { label: "Oct", weeks: 5 },
  { label: "Nov", weeks: 4 },
  { label: "Dec", weeks: 5 },
];

const WEEKDAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const UserDashboard = () => {
  const intensities = [
    "bg-neutral-900 border border-white/5",
    "bg-neutral-800",
    "bg-neutral-600",
    "bg-neutral-400",
    "bg-neutral-200",
    "bg-white",
  ];

  const activeDays = [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

  return (
    <div className="min-h-screen bg-background text-on-surface p-12">
      {/* Header Section */}
      <section className="mb-12 flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-white mb-2">Editor Overview</h1>
          <p className="text-secondary font-mono text-sm tracking-widest uppercase">
            Member since Oct 2023 • Top 2% globally
          </p>
        </div>
        {/* Streak Highlight */}
        <div className="flex items-center gap-4 bg-surface-container-low px-6 py-4 rounded-xl border border-outline-variant/10">
          <div className="text-right">
            <p className="text-white font-black text-2xl leading-none">12</p>
            <p className="text-secondary font-mono text-[10px] uppercase tracking-widest">Day Streak</p>
          </div>
          <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full">
            <span className="material-symbols-outlined text-black" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
          </div>
        </div>
      </section>

      {/* Featured Section: Problem of the Day & Streak Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Problem of the Day */}
        <div className="lg:col-span-8 bg-surface-container-low p-10 rounded-xl relative overflow-hidden group border border-outline-variant/10">
          <div className="absolute -right-12 -top-12 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[240px]">lightbulb</span>
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-white text-black text-[10px] font-mono font-bold rounded-full uppercase tracking-tighter">Hard</span>
              <span className="text-secondary font-mono text-xs uppercase tracking-widest">Problem of the Day</span>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter mb-4 max-w-lg">
              LRU Cache Architecture with Lock-Free Concurrent Access
            </h2>
            <p className="text-on-surface-variant mb-8 max-w-xl">
              Implement a thread-safe Least Recently Used cache with O(1) complexity for both get and put operations using a combination of atomic pointers and a hash map.
            </p>
            <div className="mt-auto flex items-center gap-6">
              <Link to="/editor/lru-cache" className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg tracking-tight hover:scale-105 transition-transform text-center">
                Solve Now
              </Link>
              <div className="flex items-center gap-2 text-secondary font-mono text-sm">
                <span className="material-symbols-outlined text-sm">group</span>
                1,429 solved today
              </div>
            </div>
          </div>
        </div>

        {/* Daily Streak Calendar */}
        <div className="lg:col-span-4 bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-white tracking-tight">Daily Streak</h3>
            <Link to="/streak-rules" className="text-secondary font-mono text-[10px] uppercase tracking-widest underline decoration-outline-variant/50 cursor-pointer">
              View Rules
            </Link>
          </div>
          <div className="flex-grow flex items-center justify-center">
            <div className="grid grid-cols-7 gap-3 w-full max-w-[280px]">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const isActive = activeDays.includes(day);
                const isToday = day === 24;
                return (
                  <div key={day} className="relative group/day cursor-pointer">
                    <div className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-mono transition-all duration-200
                      ${isActive ? 'bg-white text-black font-bold' : 'bg-surface-container-highest/30 text-secondary border border-outline-variant/20 hover:border-white/40'}
                      ${isToday ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''}`}>
                      {day}
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-black text-[10px] rounded opacity-0 group-hover/day:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                      {isActive ? `Solved: Problem #${1200 + day}` : 'Missed'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-outline-variant/10">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-secondary">Next: +50 XP</span>
              <span className="text-white">Ends in 08:24:12</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Solved Card */}
        <div className="bg-surface-container-low p-10 rounded-xl relative overflow-hidden group border border-outline-variant/10">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-[160px]">check_circle</span>
          </div>
          <p className="text-secondary font-mono text-xs mb-4 uppercase tracking-widest">Problems Solved</p>
          <div className="flex items-end gap-2">
            <span className="text-7xl font-black text-white leading-none">1,284</span>
            <span className="text-primary font-mono mb-2">/ 2,400</span>
          </div>
          <div className="mt-8 h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-white w-[53%]"></div>
          </div>
        </div>
        {/* Accuracy Card */}
        <div className="bg-surface-container-low p-10 rounded-xl relative overflow-hidden group border border-outline-variant/10">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-[160px]">target</span>
          </div>
          <p className="text-secondary font-mono text-xs mb-4 uppercase tracking-widest">Global Accuracy</p>
          <div className="flex items-end gap-2">
            <span className="text-7xl font-black text-white leading-none">94.8</span>
            <span className="text-primary font-mono mb-2">%</span>
          </div>
          <p className="mt-6 text-on-surface-variant text-sm">+2.4% from last month</p>
        </div>
        {/* Rank Card */}
        <div className="bg-surface-container-low p-10 rounded-xl relative overflow-hidden group border border-outline-variant/10">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-[160px]">trophy</span>
          </div>
          <p className="text-secondary font-mono text-xs mb-4 uppercase tracking-widest">Global Ranking</p>
          <div className="flex items-end gap-2">
            <span className="text-7xl font-black text-white leading-none">#412</span>
          </div>
          <p className="mt-6 text-on-surface-variant text-sm">Tier: Platinum Architect</p>
        </div>
      </section>

      {/* Activity Heatmap */}
      <section className="mb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Submission Activity</h2>
            <div className="flex gap-4 mt-3">
              <button className="text-white font-mono text-xs font-bold border-b-2 border-white pb-1">2024</button>
              <button className="text-secondary font-mono text-xs hover:text-white transition-colors">2023</button>
              <button className="text-secondary font-mono text-xs hover:text-white transition-colors">2022</button>
            </div>
            <p className="text-secondary text-sm mt-2">342 submissions in the last 12 months</p>
          </div>
          <div className="flex gap-2 items-center text-[10px] font-mono text-secondary uppercase tracking-widest">
            <span>Less</span>
            <div className="w-2.5 h-2.5 bg-neutral-900 border border-white/5 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-neutral-800 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-neutral-600 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-neutral-400 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            <span>More</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-8 rounded-3xl overflow-x-auto hide-scrollbar border border-outline-variant/10">
          <div className="min-w-[860px]">
            <div className="flex items-start gap-6">
              <div className="grid grid-rows-7 gap-1.5 pt-6 text-[10px] font-mono text-secondary leading-[10px]">
                {WEEKDAY_LABELS.map((label, index) => (
                  <span key={`${label}-${index}`} className="h-2.5">
                    {label}
                  </span>
                ))}
              </div>
              <div className="flex gap-6">
                {MONTH_LABELS.map((month, monthIndex) => (
                  <div key={month.label} className="space-y-3">
                    <div className="h-3 text-[10px] font-mono leading-none text-secondary">
                      {month.label}
                    </div>
                    <div className="grid grid-flow-col grid-rows-7 gap-1.5">
                      {Array.from({ length: month.weeks * 7 }).map(
                        (_, index) => {
                          const week = Math.floor(index / 7);
                          const day = index % 7;
                          const intensity =
                            intensities[
                              (monthIndex * 2 + week * 3 + day * 2) %
                                intensities.length
                            ];

                          return (
                            <div
                              key={index}
                              className={`h-2.5 w-2.5 rounded-full ${intensity}`}
                            />
                          );
                        },
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Submissions List */}
      <section>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold text-white tracking-tight">Recent Submissions</h2>
          <button className="text-secondary font-mono text-xs uppercase tracking-widest hover:text-white transition-colors underline decoration-outline-variant">
            View All History
          </button>
        </div>
        <div className="space-y-4">
          {/* Row 1 */}
          <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-xl group hover:bg-surface-container-high transition-colors border border-outline-variant/10">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full">
                <span className="material-symbols-outlined text-black" style={{ fontVariationSettings: "'FILL' 1" }}>
                  terminal
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">K-Means Cluster Optimization</h3>
                <p className="text-on-surface-variant font-mono text-xs">Runtime: 12ms • Memory: 42.1MB</p>
              </div>
            </div>
            <div className="flex items-center gap-12">
              <div className="text-right">
                <p className="text-white font-mono text-sm">Python 3.11</p>
                <p className="text-secondary text-[10px] uppercase tracking-tighter">Environment</p>
              </div>
              <div className="text-right">
                <p className="text-primary font-bold">Accepted</p>
                <p className="text-secondary text-[10px] uppercase tracking-tighter">2 mins ago</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-surface-bright rounded-full">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          {/* Row 2 */}
          <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-xl group hover:bg-surface-container-high transition-colors border border-outline-variant/10">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 flex items-center justify-center bg-outline-variant/20 rounded-full">
                <span className="material-symbols-outlined text-white">data_object</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Recursive Binary Search</h3>
                <p className="text-on-surface-variant font-mono text-xs">Runtime: 4ms • Memory: 18.2MB</p>
              </div>
            </div>
            <div className="flex items-center gap-12">
              <div className="text-right">
                <p className="text-white font-mono text-sm">C++ 20</p>
                <p className="text-secondary text-[10px] uppercase tracking-tighter">Environment</p>
              </div>
              <div className="text-right">
                <p className="text-primary font-bold">Accepted</p>
                <p className="text-secondary text-[10px] uppercase tracking-tighter">4 hours ago</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-surface-bright rounded-full">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          {/* Row 3 */}
          <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-xl group hover:bg-surface-container-high transition-colors border border-outline-variant/10">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 flex items-center justify-center bg-error-container rounded-full">
                <span className="material-symbols-outlined text-error">close</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Maximum Path Sum II</h3>
                <p className="text-on-surface-variant font-mono text-xs">Time Limit Exceeded • 1000ms+</p>
              </div>
            </div>
            <div className="flex items-center gap-12">
              <div className="text-right">
                <p className="text-white font-mono text-sm">Rust</p>
                <p className="text-secondary text-[10px] uppercase tracking-tighter">Environment</p>
              </div>
              <div className="text-right">
                <p className="text-error font-bold">Failed</p>
                <p className="text-secondary text-[10px] uppercase tracking-tighter">1 day ago</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-surface-bright rounded-full">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <button className="fixed bottom-12 right-12 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform group z-50">
        <span className="material-symbols-outlined text-black text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          add
        </span>
        <span className="absolute right-20 bg-white text-black px-4 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          New Project
        </span>
      </button>
    </div>
  );
};

export default UserDashboard;
