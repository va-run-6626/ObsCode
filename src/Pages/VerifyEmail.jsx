import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../services/api";
import BrandLogo from "../components/BrandLogo";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("INITIALIZING"); // INITIALIZING, SEQUENCE COMPLETE, SYSTEM ERROR
  const [message, setMessage] = useState("");
  const hasVerified = useRef(false);

  useEffect(() => {
    if (!token) return;
    if (hasVerified.current) return;
    hasVerified.current = true;

    api
      .get(`/auth/verify?token=${token}`)
      .then(() => {
        setStatus("SEQUENCE COMPLETE");
        setMessage(
          "Your identity has been verified in the architectural lattice.",
        );
      })
      .catch((err) => {
        setStatus("SYSTEM ERROR");
        setMessage(
          err.response?.data?.message || "Verification failed or token expired.",
        );
      });
  }, [token]);

  const displayStatus = token ? status : "SYSTEM ERROR";
  const displayMessage = token ? message : "No verification token provided.";

  const backgroundStyle = {
    backgroundColor: "#131313",
    backgroundImage: `
      radial-gradient(circle at center, rgba(147, 51, 234, 0.08) 0%, transparent 70%),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
    `,
    backgroundRepeat: "repeat",
    backgroundBlendMode: "overlay",
  };

  return (
    <div
      className="min-h-screen flex flex-col font-body text-on-surface selection:bg-primary selection:text-on-primary"
      style={backgroundStyle}
    >
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-[#131313]/70 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <Link to="/">
            <BrandLogo className="text-2xl cursor-pointer" />
          </Link>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-6 items-center text-[#C7C6C6] font-['Inter'] tracking-tight text-sm">
            <a
              className="hover:text-white transition-colors duration-300"
              href="#"
            >
              Help
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="material-symbols-outlined text-white hover:opacity-70 transition-opacity"
              style={{
                fontVariationSettings:
                  "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48",
              }}
            >
              terminal
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center px-6 pt-24 pb-12">
        <div className="relative w-full max-w-xl">
          {/* Decorative background elements */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-purple-900/10 blur-[100px] rounded-full"></div>

          {/* Glassmorphic Card */}
          <div className="relative bg-[#1b1b1b]/80 backdrop-blur-xl rounded-xl p-12 md:p-16 text-center border border-white/5 shadow-2xl">
            {/* Success State Icon */}
            <div className="mb-10 inline-flex items-center justify-center">
              <div className="relative">
                <div
                  className={`absolute inset-0 blur-2xl opacity-20 ${
                    displayStatus === "SEQUENCE COMPLETE"
                      ? "bg-purple-500 animate-pulse"
                      : displayStatus === "SYSTEM ERROR"
                        ? "bg-red-500"
                        : "bg-purple-500 animate-pulse"
                  }`}
                ></div>
                <span
                  className={`material-symbols-outlined text-8xl md:text-9xl relative ${
                    displayStatus === "SEQUENCE COMPLETE"
                      ? "text-purple-400"
                      : displayStatus === "SYSTEM ERROR"
                        ? "text-red-400"
                        : "text-purple-400"
                  }`}
                  style={{ fontVariationSettings: "'FILL' 0, 'wght' 100" }}
                >
                  {displayStatus === "SEQUENCE COMPLETE"
                    ? "task_alt"
                    : displayStatus === "SYSTEM ERROR"
                      ? "error"
                      : "sync"}
                </span>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-4 mb-12">
              <h1 className="text-3xl md:text-4xl font-black tracking-[0.2em] text-white font-headline uppercase">
                {displayStatus}
              </h1>
              <p className="text-secondary text-sm md:text-base leading-relaxed max-w-xs mx-auto font-body">
                {displayMessage ||
                  (displayStatus === "INITIALIZING" &&
                    "Scanning architectural lattice for identity match...")}
              </p>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              {displayStatus === "SEQUENCE COMPLETE" ? (
                <Link
                  className="group relative px-10 py-4 rounded-full font-bold tracking-widest text-xs uppercase bg-gradient-to-r from-purple-600 to-indigo-600 text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_40px_rgba(147,51,234,0.5)] flex items-center gap-3"
                  to="/login"
                >
                  INITIALIZE SESSION
                  <span
                    className="material-symbols-outlined text-lg"
                    data-icon="login"
                  >
                    login
                  </span>
                </Link>
              ) : displayStatus === "SYSTEM ERROR" ? (
                <Link
                  className="group relative px-10 py-4 rounded-full font-bold tracking-widest text-xs uppercase bg-white/5 text-white border border-white/10 transition-all duration-300 hover:bg-white/10 flex items-center gap-3"
                  to="/signup"
                >
                  RETURN TO ORIGIN
                  <span className="material-symbols-outlined text-lg">
                    arrow_back
                  </span>
                </Link>
              ) : (
                <div className="px-10 py-4 rounded-full font-bold tracking-widest text-xs uppercase bg-white/5 text-white/40 border border-white/5 flex items-center gap-3">
                  PROCESSING...
                  <span className="material-symbols-outlined text-lg animate-spin">
                    refresh
                  </span>
                </div>
              )}
            </div>

            {/* Technical Detail */}
            <div className="mt-12 pt-8 border-t border-white/5 flex justify-center gap-6">
              <div className="flex flex-col items-center">
                <span className="font-mono text-[10px] text-[#353535] uppercase tracking-widest">
                  Protocol
                </span>
                <span className="font-mono text-[12px] text-white mt-1">
                  SSL/AES-256
                </span>
              </div>
              <div className="w-px h-8 bg-white/5"></div>
              <div className="flex flex-col items-center">
                <span className="font-mono text-[10px] text-[#353535] uppercase tracking-widest">
                  Status
                </span>
                <span
                  className={`font-mono text-[12px] mt-1 ${
                    displayStatus === "SEQUENCE COMPLETE"
                      ? "text-purple-400"
                      : "text-white"
                  }`}
                >
                  {displayStatus === "SEQUENCE COMPLETE"
                    ? "ENCRYPTED"
                    : displayStatus === "SYSTEM ERROR"
                      ? "FAILED"
                      : "PENDING"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with Metadata */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0E0E0E]">
        <div className="flex gap-6 items-center">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#353535]">
            © 2024 ObsCode Editorial. Built in the shadows.
          </span>
        </div>
        <div className="flex gap-8 items-center">
          <nav className="flex gap-4">
            <a
              className="font-mono text-[10px] uppercase tracking-widest text-[#353535] hover:text-white transition-opacity"
              href="#"
            >
              Documentation
            </a>
            <a
              className="font-mono text-[10px] uppercase tracking-widest text-[#353535] hover:text-white transition-opacity"
              href="#"
            >
              Privacy
            </a>
            <a
              className="font-mono text-[10px] uppercase tracking-widest text-[#353535] hover:text-white transition-opacity"
              href="#"
            >
              Status
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white">
              SEC_LVL: 4
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VerifyEmail;
