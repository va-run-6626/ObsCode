import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import BrandLogo from "../components/BrandLogo";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      const { message } = response.data;

      // Only show success message – do NOT store token or redirect
      setSuccessMsg(
        message ||
          "Registration successful! Please check your email to verify your account.",
      );
      // Optionally clear form or keep it – user cannot proceed until verified
      // We don't store any token because verification is required.
    } catch (err) {
      const message =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8081/oauth2/authorization/github";
  };

  return (
    <div className="min-h-screen flex flex-col font-body text-on-surface selection:bg-accent-purple/30 bg-[#0E0E0E] relative overflow-x-hidden">
      {/* Background (unchanged) */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,rgba(168,85,247,0)_70%)] blur-[80px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-[480px]">
          {/* Logo / Brand Branding */}
          <div className="text-center mb-10">
            <Link to="/">
              <BrandLogo className="text-2xl cursor-pointer" />
            </Link>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-secondary mt-2 opacity-60">
              Initiating Architectural Sequence
            </p>
          </div>

          {/* Glassmorphism Card */}
          <div className="glass-card rounded-xl p-8 md:p-10 shadow-2xl">
            {/* OAuth Section */}
            <div className="space-y-4">
              <button
                onClick={handleGithubLogin}
                className="w-full flex items-center justify-center gap-3 bg-surface-container-high hover:bg-surface-variant text-on-surface py-3.5 px-6 rounded-full transition-all duration-300 group"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    fillRule="evenodd"
                  ></path>
                </svg>
                <span className="text-sm font-medium">
                  Continue with GitHub
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center py-8">
              <div className="flex-grow border-t border-outline-variant/20"></div>
              <span className="flex-shrink mx-4 font-mono text-[10px] text-tertiary-fixed-dim tracking-widest">
                OR
              </span>
              <div className="flex-grow border-t border-outline-variant/20"></div>
            </div>

            {/* Form Section */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-secondary mb-2 ml-1">
                  Full_Name
                </label>
                <input
                  className="w-full bg-surface-container-low border-none rounded-lg py-4 px-5 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-accent-purple/50 transition-all outline-none"
                  placeholder="Identity String"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-secondary mb-2 ml-1">
                  Email_Address
                </label>
                <input
                  className="w-full bg-surface-container-low border-none rounded-lg py-4 px-5 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-accent-purple/50 transition-all outline-none"
                  placeholder="network@node.dev"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-secondary mb-2 ml-1">
                  Access_Cipher
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-low border-none rounded-lg py-4 px-5 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-accent-purple/50 transition-all outline-none"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface transition-colors"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>
              {error && (
                <div className="text-red-400 text-xs text-center">{error}</div>
              )}
              {successMsg && (
                <div className="text-green-400 text-xs text-center bg-green-900/20 p-2 rounded">
                  {successMsg}
                </div>
              )}
              <div className="pt-4">
                <button
                  className="w-full bg-accent-purple hover:bg-opacity-90 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Architect Profile"}
                </button>
              </div>
            </form>

            {/* Footer Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-secondary">
                Already have an account?
                <Link
                  className="text-accent-purple font-medium hover:underline decoration-accent-purple/30 underline-offset-4 ml-1"
                  to="/login"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Bottom Disclaimer */}
          <p className="mt-8 text-center font-mono text-[9px] text-tertiary-fixed-dim uppercase tracking-tighter max-w-[300px] mx-auto leading-relaxed">
            By deploying your profile, you agree to the{" "}
            <a className="hover:text-secondary transition-colors" href="#">
              Protocol Terms
            </a>{" "}
            and{" "}
            <a className="hover:text-secondary transition-colors" href="#">
              Data Privacy Manifestos
            </a>
            .
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-10 px-12 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono text-[10px] tracking-widest uppercase text-[#474747]">
            © 2024 THE OBSCODE EDITORIAL. ENCRYPTED CONNECTION.
          </div>
          <div className="flex gap-8">
            <a
              className="font-mono text-[10px] tracking-widest uppercase text-[#474747] hover:text-accent-purple transition-colors duration-300"
              href="#"
            >
              Privacy
            </a>
            <a
              className="font-mono text-[10px] tracking-widest uppercase text-[#474747] hover:text-accent-purple transition-colors duration-300"
              href="#"
            >
              Terms
            </a>
            <a
              className="font-mono text-[10px] tracking-widest uppercase text-[#474747] hover:text-accent-purple transition-colors duration-300"
              href="#"
            >
              Security
            </a>
            <a
              className="font-mono text-[10px] tracking-widest uppercase text-[#474747] hover:text-accent-purple transition-colors duration-300"
              href="#"
            >
              Manifesto
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignupPage;
