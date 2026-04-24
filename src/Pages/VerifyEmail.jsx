import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import api from "../services/api";

const VerifyEmail = () => {
  const location = useLocation();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      api
        .get(`/auth/verify?token=${token}`)
        .then(() => {
          setStatus("success");
          setMessage("Email verified! You can now log in.");
        })
        .catch((err) => {
          setStatus("error");
          setMessage(err.response?.data?.message || "Verification failed.");
        });
    } else {
      setStatus("error");
      setMessage("No verification token provided.");
    }
  }, [location]);

  if (status === "verifying")
    return (
      <div className="text-center mt-20 text-white">
        Verifying your email...
      </div>
    );

  return (
    <div className="text-center mt-20">
      <p className="text-white">{message}</p>
      {status === "success" && (
        <Link
          to="/login"
          className="text-accent-purple underline mt-4 inline-block"
        >
          Go to Login
        </Link>
      )}
    </div>
  );
};

export default VerifyEmail;
