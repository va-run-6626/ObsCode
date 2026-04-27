import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProblemUploadInterface from "./Pages/ProblemUploadInterface";
import LandingPage from "./Pages/LandingPage";
import AdminDashboard from "./Pages/AdminDashboard";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import OAuthCallback from "./Pages/OAuthCallback";
import VerifyEmail from "./Pages/VerifyEmail";
import EditorPage from "./Pages/EditorPage";
import { AuthProvider } from "./context/AuthContext";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminUsers from "./Pages/AdminUsers";
import AdminSettings from "./Pages/AdminSettings";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/oauth-callback" element={<OAuthCallback />} /> */}
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* Protected routes for authenticated users */}
          <Route element={<ProtectedRoute />}>
            <Route path="/editor" element={<EditorPage />} />
            {/* Add other user routes here, e.g., /problems, /submissions */}
          </Route>

          {/* Admin routes (require ADMIN role) */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route
                path="problems/new"
                element={<ProblemUploadInterface mode="create" />}
              />
              <Route
                path="problems/edit/:slug"
                element={<ProblemUploadInterface mode="edit" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
