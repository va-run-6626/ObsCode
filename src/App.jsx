// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProblemUploadInterface from "./Pages/ProblemUploadInterface";
import LandingPage from "./Pages/LandingPage";
import AdminDashboard from "./Pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route
          path="/admin/problems/edit/:slug"
          element={<ProblemUploadInterface mode="edit" />}
        />
        <Route
          path="/admin/problems/new"
          element={<ProblemUploadInterface mode="create" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
