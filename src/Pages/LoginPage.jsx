import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext"; // import the hook

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // get login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      const userData = response.data; // { token, type, email, name, avatarUrl, role, message }

      // Store everything using the context login method
      login(userData);

      // Redirect based on role
      if (userData.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard"); // or "/problems"
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = () => {
    // Redirect to backend OAuth2 endpoint
    window.location.href = "http://localhost:8081/oauth2/authorization/github";
  };

  return (
    <div className="font-body text-on-surface antialiased flex items-center justify-center min-h-screen bg-[#0E0E0E] relative overflow-hidden">
      {/* Subtle Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(168,85,247,0.08)_0%,rgba(13,13,13,0)_70%)] pointer-events-none z-0"></div>

      <main className="relative z-10 w-full max-w-md px-6">
        {/* Login Card */}
        <div className="glass-card rounded-xl p-8 md:p-10 shadow-2xl flex flex-col gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-2">
            <Link to="/">
              <div className="font-mono font-bold text-2xl tracking-tighter text-primary cursor-pointer">
                OBSCODE<span className="text-accent-purple">.</span>
              </div>
            </Link>
            <p className="font-mono text-[10px] tracking-widest text-secondary uppercase opacity-60">
              Encrypted Auth Portal
            </p>
          </div>

          {/* OAuth Section */}
          <div className="flex flex-col gap-3 mb-2">
            <button
              onClick={handleGithubLogin}
              className="w-full flex items-center justify-center gap-3 bg-surface-container-high hover:bg-surface-container-highest text-primary font-medium py-3 rounded-full transition-all duration-300 active:scale-[0.98]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
              </svg>
              <span className="text-sm">Continue with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-outline-variant opacity-20"></div>
            <span className="flex-shrink mx-4 font-mono text-[10px] text-tertiary-fixed-dim tracking-[0.2em]">
              OR
            </span>
            <div className="flex-grow border-t border-outline-variant opacity-20"></div>
          </div>

          {/* Credentials Section */}
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <label
                className="font-mono text-[11px] uppercase tracking-wider text-secondary pl-1"
                htmlFor="email"
              >
                Email_Address
              </label>
              <input
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm text-primary placeholder:text-tertiary-fixed-dim focus:ring-2 focus:ring-accent-purple/40 focus:bg-surface-container transition-all outline-none"
                id="email"
                placeholder="user@obscode.dev"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-end pl-1 pr-1">
                <label
                  className="font-mono text-[11px] uppercase tracking-wider text-secondary"
                  htmlFor="password"
                >
                  Cipher_Key
                </label>
                <a
                  className="font-mono text-[10px] uppercase text-accent-purple hover:text-white transition-colors"
                  href="#"
                >
                  Forgot?
                </a>
              </div>
              <input
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm text-primary placeholder:text-tertiary-fixed-dim focus:ring-2 focus:ring-accent-purple/40 focus:bg-surface-container transition-all outline-none"
                id="password"
                placeholder="••••••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* Error message */}
            {error && (
              <div className="text-red-400 text-xs text-center mt-1">
                {error}
              </div>
            )}
            {/* Primary Action */}
            <button
              className="w-full mt-2 bg-accent-purple hover:brightness-110 text-on-primary font-bold py-4 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Initialize Session"}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center pt-2">
            <p className="text-xs text-secondary-fixed-dim">
              Don't have an account?
              <Link
                className="text-primary font-semibold hover:underline underline-offset-4 ml-1"
                to="/signup"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* System Meta */}
        <div className="mt-8 flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-mono text-[9px] text-tertiary-fixed-dim uppercase tracking-tighter">
              System Nodes Online
            </span>
          </div>
          <div className="font-mono text-[9px] text-tertiary-fixed-dim uppercase tracking-tighter">
            v2.4.0-Stable
          </div>
        </div>
      </main>

      {/* Decorative Elements (unchanged) */}
      <div className="fixed top-12 left-12 opacity-5 pointer-events-none select-none">
        <div className="font-mono text-xs leading-relaxed text-white">
          [SYS_INIT] 0x4829...
          <br />
          [AUTH_LOAD] SUCCESS...
          <br />
          [ENCR_MODE] AES-256...
        </div>
      </div>
      <div className="fixed bottom-12 right-12 opacity-5 pointer-events-none select-none">
        <div className="font-mono text-xs leading-relaxed text-white text-right">
          TIMESTAMP: 1715832000
          <br />
          LOC: EDGE_NODE_07
          <br />
          SEC_LVL: 4
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
