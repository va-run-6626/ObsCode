import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const OAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const email = params.get("email");
    const name = params.get("name");
    const avatar = params.get("avatar");

    if (token) {
      // Store basic info
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("name", decodeURIComponent(name));
      if (avatar) localStorage.setItem("avatar", avatar);

      // Decode JWT to get role
      try {
        const decoded = jwtDecode(token);
        const role = decoded.role; // "USER" or "ADMIN"
        localStorage.setItem("role", role);

        // Redirect based on role
        if (role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard"); // or "/problems"
        }
      } catch (err) {
        console.error("Failed to decode token", err);
        navigate("/dashboard"); // fallback
      }
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div className="text-center mt-20">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent-purple"></div>
      <p className="mt-4 text-white">Completing secure handshake...</p>
    </div>
  );
};

export default OAuthCallback;
