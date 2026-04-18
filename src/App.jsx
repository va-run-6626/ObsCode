// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProblemUploadInterface from "./Pages/ProblemUploadInterface";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
