// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProblemUploadInterface from "./Pages/ProblemUploadInterface";
import LandingPage from "./Pages/LandingPage";
import AdminDashboard from "./Pages/AdminDashboard";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import OAuthCallback from "./Pages/OAuthCallback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route
          path="/admin/problems/edit/:slug"
          element={<ProblemUploadInterface mode="edit" />}
        />
        <Route
          path="/admin/problems/new"
          element={<ProblemUploadInterface mode="create" />}
        />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
