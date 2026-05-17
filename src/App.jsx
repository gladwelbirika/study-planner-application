import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/dashboard"
  element={
    localStorage.getItem("token") ? (
      <Dashboard />
    ) : (
      <Login />
    )
  }
/>
<Route
  path="/admin"
  element={
    localStorage.getItem("token") &&
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