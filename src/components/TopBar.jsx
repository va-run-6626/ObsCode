import React from "react";

const TopBar = () => {
  return (
    <header className="fixed top-0 left-20 right-0 h-20 bg-[#131313] shadow-[0_1px_0_0_rgba(255,255,255,0.05)] z-40 flex justify-between items-center px-8">
      <div className="flex items-center gap-8">
        <span className="text-lg font-bold tracking-tighter text-white uppercase font-headline">
          ObsCode
        </span>
      </div>
      <div className="flex items-center gap-4">
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
