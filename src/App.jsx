import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProblemUploadInterface from "./Pages/ProblemUploadInterface";
import LandingPage from "./Pages/LandingPage";
import AdminDashboard from "./Pages/AdminDashboard";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import VerifyEmail from "./Pages/VerifyEmail";
import EditorPage from "./Pages/EditorPage";
import { AuthProvider } from "./context/AuthContext";
import AdminLayout from "./Layouts/AdminLayout";
import UserLayout from "./Layouts/UserLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminUsers from "./Pages/AdminUsers";
import AdminSettings from "./Pages/AdminSettings";
import { useAuth } from "./context/AuthContext";

const RootRoute = () => {
  const { user, loading } = useAuth();
  const isAdmin = user?.role?.toUpperCase() === "ADMIN";

  if (loading) return <div className="text-white">Loading...</div>;
  if (!user) return <LandingPage />;

  return <Navigate to={isAdmin ? "/admin/dashboard" : "/editor"} replace />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<RootRoute />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/oauth-callback" element={<OAuthCallback />} /> */}
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* Protected routes for authenticated users */}
          <Route element={<ProtectedRoute />}>
            <Route element={<UserLayout />}>
              <Route
                path="/editor"
                element={<EditorPage key="editor-home" />}
              />
              <Route
                path="/editor/:slug"
                element={<EditorPage key="editor-problem" />}
              />
              {/* Add other user routes here, e.g., /problems, /submissions */}
            </Route>
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
                element={<ProblemUploadInterface key="create" mode="create" />}
              />
              <Route
                path="problems/edit/:slug"
                element={<ProblemUploadInterface key="edit" mode="edit" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
