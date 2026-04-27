import React from "react";
import { Link } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";

const LandingPage = () => {
  return (
    <div className="font-body text-on-surface selection:bg-accent-purple/30 bg-black min-h-screen">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#131313]/70 backdrop-blur-xl border-b border-white/5 shadow-[0px_20px_40px_rgba(0,0,0,0.4)]">
        <div className="flex justify-between items-center px-6 md:px-12 py-4 w-full max-w-screen-2xl mx-auto">
          <Link to="/">
            <BrandLogo className="text-2xl cursor-pointer" />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <a
              className="font-headline tracking-tight text-sm font-medium text-white border-b-2 border-white pb-1"
              href="#"
            >
              Editor
            </a>
            <a
              className="font-headline tracking-tight text-sm font-medium text-[#C7C6C6] hover:text-white transition-colors"
              href="https://garden-tan-seven.vercel.app/"
            >
              Library
            </a>
            <a
              className="font-headline tracking-tight text-sm font-medium text-[#C7C6C6] hover:text-white transition-colors"
              href="#"
            >
              Community
            </a>
            <a
              className="font-headline tracking-tight text-sm font-medium text-[#C7C6C6] hover:text-white transition-colors"
              href="#"
            >
              Documentation
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <button className="hidden lg:block text-[#C7C6C6] text-sm font-medium hover:text-white transition-colors">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-white text-[#1A1C1C] px-6 py-2 rounded-full text-sm font-bold hover:bg-primary-container transition-all active:scale-95">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden bg-mesh">
        <div className="container mx-auto px-6 text-center z-10">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-none">
            THE ARCHITECT <br /> OF YOUR CODE
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
            <button className="bg-accent-purple hover:bg-accent-purple/90 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all transform active:scale-95">
              Solve Challenges
            </button>
            <button className="bg-surface-container-highest text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-surface-bright transition-all active:scale-95">
              View Leaderboard
            </button>
          </div>

          {/* Floating Code Snippet Card */}
          <div className="max-w-4xl mx-auto transform perspective-1000 rotate-x-2">
            <div className="glass-card rounded-xl p-8 text-left border border-white/10 shadow-2xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                <span className="ml-4 font-mono text-xs text-secondary opacity-50 uppercase tracking-widest">
                  kernel_optimization.rs
                </span>
              </div>
              <pre className="font-mono text-sm md:text-base leading-relaxed">
                <span className="text-accent-purple">pub fn</span>{" "}
                <span className="text-white">optimize_stream</span>
                &lt;T&gt;(input:{" "}
                <span className="text-accent-purple">Stream</span>&lt;T&gt;)
                -&gt; <span className="text-accent-purple">Result</span>
                &lt;()&gt; {"{"}
                {"\n"}
                {"    "}
                <span className="text-secondary opacity-60">
                  // Parallel processing pipeline with zero-copy
                </span>
                {"\n"}
                {"    "}
                <span className="text-white">input</span>.
                <span className="text-white">par_iter()</span>
                {"\n"}
                {"        "}.<span className="text-white">filter</span>(|node|
                node.<span className="text-accent-purple">is_valid</span>())
                {"\n"}
                {"        "}.<span className="text-white">map</span>(|node|
                node.<span className="text-white">process_atomic</span>()){"\n"}
                {"        "}.<span className="text-white">collect()</span>;
                {"\n"}
                {"\n"}
                {"    "}
                <span className="text-accent-purple">Ok</span>(()){"\n"}
                {"}"}
              </pre>
            </div>
          </div>
        </div>

        {/* Abstract Decoration */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-purple/5 rounded-full blur-[120px]"></div>
      </section>

      {/* Stats Bar */}
      <section className="w-full bg-surface-container-lowest py-8 border-y border-white/5">
        <div className="container mx-auto px-12 flex flex-col md:flex-row justify-around items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-secondary">
          <div className="flex items-center gap-4">
            <span className="text-white font-bold">128K+</span> Architects
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white font-bold">4.2M</span> Submissions
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white font-bold">104</span> Legendary
            Contributors
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 px-6 bg-black relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="glass-card rounded-xl p-12 purple-glow transition-all duration-500 group flex flex-col h-full">
              <div className="mb-8">
                <span className="material-symbols-outlined text-accent-purple text-4xl">
                  edit_note
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-headline">
                The Silent Editor
              </h3>
              <p className="text-on-surface/70 leading-relaxed mb-8">
                A distraction-free interface engineered for deep work. No
                popups, no noise. Just you and your logic.
              </p>
              <div className="mt-auto">
                <a
                  className="text-xs font-mono text-accent-purple flex items-center gap-2 group-hover:gap-4 transition-all"
                  href="#"
                >
                  EXPLORE WORKSPACE{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="glass-card rounded-xl p-12 purple-glow transition-all duration-500 group flex flex-col h-full">
              <div className="mb-8">
                <span className="material-symbols-outlined text-accent-purple text-4xl">
                  terminal
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-headline">
                Dockerized Sandbox
              </h3>
              <p className="text-on-surface/70 leading-relaxed mb-8">
                Run your code in secure, ephemeral environments with ultra-low
                latency. Supports high-performance languages.
              </p>
              <div className="mt-auto">
                <a
                  className="text-xs font-mono text-accent-purple flex items-center gap-2 group-hover:gap-4 transition-all"
                  href="#"
                >
                  SYSTEM SPECS{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-card rounded-xl p-12 purple-glow transition-all duration-500 group flex flex-col h-full">
              <div className="mb-8">
                <span className="material-symbols-outlined text-accent-purple text-4xl">
                  auto_awesome
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-headline">
                Editorial Insight
              </h3>
              <p className="text-on-surface/70 leading-relaxed mb-8">
                Access curated breakdowns written by industry veterans. Learn
                the 'why' behind the world's most elegant solutions.
              </p>
              <div className="mt-auto">
                <a
                  className="text-xs font-mono text-accent-purple flex items-center gap-2 group-hover:gap-4 transition-all"
                  href="#"
                >
                  READ EDITORIALS{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code the Future Section */}
      <section className="relative py-48 overflow-hidden bg-black flex items-center justify-center">
        {/* Background Orb */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-accent-purple/20 rounded-full blur-[160px] animate-pulse"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
            CODE THE <span className="text-accent-purple">FUTURE</span>.
          </h2>
          <p className="text-lg md:text-xl text-secondary mb-12 max-w-2xl mx-auto">
            Join the elite tier of developers solving problems that define the
            next generation of software architecture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <button className="bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform active:scale-95 shadow-xl">
                Apply for Access
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0E0E0E] w-full py-24 px-6 md:px-12 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 w-full max-w-screen-2xl mx-auto">
          <div className="flex flex-col gap-2">
            <BrandLogo className="text-lg text-white" />
            <p className="font-mono text-xs uppercase tracking-widest text-[#C7C6C6]">
              © 2024 ObsCode Editorial. Built for the silent curator.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a
              className="font-mono text-xs uppercase tracking-widest text-[#C7C6C6] hover:text-white underline-offset-4 hover:underline transition-opacity"
              href="#"
            >
              Privacy
            </a>
            <a
              className="font-mono text-xs uppercase tracking-widest text-[#C7C6C6] hover:text-white underline-offset-4 hover:underline transition-opacity"
              href="#"
            >
              Terms
            </a>
            <a
              className="font-mono text-xs uppercase tracking-widest text-[#C7C6C6] hover:text-white underline-offset-4 hover:underline transition-opacity"
              href="#"
            >
              Changelog
            </a>
            <a
              className="font-mono text-xs uppercase tracking-widest text-[#C7C6C6] hover:text-white underline-offset-4 hover:underline transition-opacity"
              href="#"
            >
              Status
            </a>
            <a
              className="font-mono text-xs uppercase tracking-widest text-[#C7C6C6] hover:text-white underline-offset-4 hover:underline transition-opacity"
              href="#"
            >
              Github
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
