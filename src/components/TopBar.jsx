import React from 'react';

const TopBar = ({ isSidebarCollapsed }) => {
  return (
    <header
      className={`bg-[#131313] shadow-[0_1px_0_0_rgba(255,255,255,0.05)] docked full-width top-0 z-50 flex justify-between items-center px-8 h-20 fixed transition-all duration-300 ${
        isSidebarCollapsed ? 'left-20' : 'left-64'
      } right-0`}
    >
      <div className="flex items-center gap-8">
        <span className="text-lg font-bold tracking-tighter text-white uppercase font-headline">ObsCode</span>
        <div className="hidden md:flex items-center gap-6">
          <a
            className="text-white border-b-2 border-white pb-1 font-['Inter'] antialiased tracking-tight cursor-pointer active:opacity-70"
            href="#"
          >
            Dashboard
          </a>
          <a
            className="text-[#C7C6C6] hover:text-white transition-all duration-300 font-['Inter'] antialiased tracking-tight cursor-pointer active:opacity-70"
            href="#"
          >
            Problems
          </a>
          <a
            className="text-[#C7C6C6] hover:text-white transition-all duration-300 font-['Inter'] antialiased tracking-tight cursor-pointer active:opacity-70"
            href="#"
          >
            Submissions
          </a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-sm">
            search
          </span>
          <input
            className="bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary w-64 transition-all text-white"
            placeholder="Search..."
            type="text"
          />
        </div>
        <span className="material-symbols-outlined text-white cursor-pointer hover:opacity-80">
          notifications
        </span>
        <span className="material-symbols-outlined text-white cursor-pointer hover:opacity-80">
          settings
        </span>
        <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant/20">
          <img
            alt="Admin Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAxneI8S0w1PsF_geyRSm71euzNGjKjcFkVMN1O6m7Sn-5Kn2r2qwKLZ4VEeJ8Zx0KXtqK1sQqESqVY6R_QOSjVnYlMwBXXwrWU6Ba_75vdd7rbL6nygaA6kDvgwBYesJHoL2gPbhzQCQiWNaV1rDYE3nZwQKt8a0xYkxkn-UNSgCnhEr88qcfx93Vo4NakTXSv279iwrrldjCvrw2SKdgvGL4yXLmxMznNTDByw2XFVt9TannBsKHhpuTEXamtMKVmcmN1O2G1OnN"
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
