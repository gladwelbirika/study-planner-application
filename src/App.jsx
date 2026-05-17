import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import { isAuthenticated } from "./utils/auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? <Dashboard /> : <Login />
          }
        />

        {/* PROTECTED ADMIN */}
        <Route
          path="/admin"
          element={
            isAuthenticated() &&
            localStorage.getItem("role") === "admin" ? (
              <Admin />
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;