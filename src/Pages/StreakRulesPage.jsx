import React from "react";
import { Link } from "react-router-dom";

const StreakRulesPage = () => {
  return (
    <div className="min-h-screen bg-background text-on-surface p-12">
      {/* Hero Section / Title */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Protocol V.2.0 / Rules</p>
          <h1 className="text-6xl font-black tracking-tighter text-white mb-6">DAILY STREAK<br />ARCHITECTURE.</h1>
          <p className="text-on-surface max-w-md opacity-80 leading-relaxed">
            The Obsidian Editorial ecosystem rewards persistence. Understand the mechanics of the streak to dominate the global leaderboard.
          </p>
        </div>
        <Link to="/dashboard" className="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold tracking-tight hover:bg-opacity-90 transition-all flex items-center gap-3">
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Dashboard
        </Link>
      </div>

      {/* Bento Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* The Daily Challenge Card */}
        <div className="md:col-span-8 bg-surface-container-low rounded-xl p-10 flex flex-col justify-between min-h-[400px] relative overflow-hidden group border border-outline-variant/15">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-on-primary">bolt</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">The Daily Challenge</h2>
            <p className="text-on-surface opacity-70 max-w-md mb-8">
              Every 24 hours, the system generates a unique editorial prompt. Challenges reset at <span className="font-mono text-white">00:00 UTC</span>. Completing the task within the window is the only way to increment your counter.
            </p>
            <div className="flex gap-4">
              <div className="bg-surface-container-highest px-4 py-2 rounded-lg font-mono text-[11px] text-white">LOCATION: MAIN LIBRARY</div>
              <div className="bg-surface-container-highest px-4 py-2 rounded-lg font-mono text-[11px] text-white">RESET: 08:24:12</div>
            </div>
          </div>
        </div>

        {/* Streak Preservation */}
        <div className="md:col-span-4 bg-surface-container-low rounded-xl p-10 flex flex-col justify-between border border-outline-variant/15">
          <div>
            <span className="material-symbols-outlined text-secondary text-4xl mb-6">ac_unit</span>
            <h2 className="text-2xl font-bold text-white mb-4">Streak Preservation</h2>
            <p className="text-on-surface opacity-70 leading-relaxed mb-6">
              Missing a single day results in a total reset to <span className="font-mono text-white">ZERO</span>. To prevent this, active contributors can deploy "Streak Freezes" earned through high-quality submissions.
            </p>
          </div>
          <div className="pt-6 border-t border-outline-variant/10">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="opacity-60">Max Freezes</span>
              <span className="font-mono">03</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
              <div className="bg-white h-full w-1/3"></div>
            </div>
          </div>
        </div>

        {/* Point Multipliers */}
        <div className="md:col-span-4 bg-surface-container-high rounded-xl p-10 relative group border border-outline-variant/15">
          <h2 className="text-2xl font-bold text-white mb-8">Multipliers</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] text-secondary">03 DAYS</p>
                <p className="font-bold text-white">Inertia Kick</p>
              </div>
              <div className="text-2xl font-black font-mono">1.2x</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-2xl border border-white/5">
              <div>
                <p className="font-mono text-[10px] text-primary">07 DAYS</p>
                <p className="font-bold text-white">Momentum</p>
              </div>
              <div className="text-2xl font-black font-mono text-white">1.5x</div>
            </div>
            <div className="flex items-center justify-between opacity-50">
              <div>
                <p className="font-mono text-[10px] text-secondary">14 DAYS</p>
                <p className="font-bold text-white">Velocity</p>
              </div>
              <div className="text-2xl font-black font-mono">2.0x</div>
            </div>
          </div>
        </div>

        {/* Leaderboard Impact */}
        <div className="md:col-span-8 bg-[#0E0E0E] rounded-xl p-1 relative overflow-hidden group">
          <div className="bg-surface-container-low rounded-xl h-full p-10 flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-6">Leaderboard Impact</h2>
              <p className="text-on-surface opacity-70 leading-relaxed mb-6">
                Global rankings are weighted by consistency. A user with a 100-day streak will outrank a user with more total points but zero consistency.
              </p>
              <ul className="space-y-4 text-on-surface/80">
                <li className="flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                  Reputation weight +25% per 10 days
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                  Unlocks "Elite" leaderboard access at 50 days
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[200px] flex items-center justify-center">
                <div className="w-40 h-40 rounded-full border-[10px] border-surface-container-highest flex items-center justify-center">
                   <div className="text-center">
                      <p className="font-mono text-3xl font-black text-white">#04</p>
                      <p className="text-[9px] uppercase tracking-widest text-secondary">Global Tier</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakRulesPage;
