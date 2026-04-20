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
        <Route path="/" element={<HomePage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route
          path="/admin/problems/new"
          element={<ProblemUploadInterface />}
        />
        {/* You can add more routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
