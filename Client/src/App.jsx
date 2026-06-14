import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WorkerDetails from "./pages/WorkerDetails";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WorkerRegister from "./pages/WorkerRegister";
import WorkerDashboard from "./pages/WorkerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";
import AdminRoute from "./components/AdminRoute";
import AdminLeaveRequests from "./pages/AdminLeaveRequests";

function App() {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <div className={theme === "dark" ? "dark-theme" : "light-theme"}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/worker/:id" element={<WorkerDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/leave-requests"
          element={
            <AdminRoute>
              <AdminLeaveRequests />
            </AdminRoute>
          }
        />

        <Route
          path="/worker-dashboard"
          element={
            <ProtectedRoute>
              <WorkerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/worker-register"
          element={
            <ProtectedRoute>
              <WorkerRegister />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;