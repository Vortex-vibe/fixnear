import { Link, useNavigate } from "react-router-dom";

function Navbar({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("workerId");
    navigate("/login");
    window.location.reload();
  }

  function goToServices() {
    navigate("/");
    setTimeout(() => {
      document
        .getElementById("services")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  }

  return (
    <nav className="navbar pro-navbar">
      <Link to="/" className="logo">
        FixNear
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <button onClick={goToServices} className="nav-text-btn">
          Services
        </button>

        {user?.role === "admin" && (
          <>
            <Link to="/dashboard">Admin Dashboard</Link>
            <Link to="/admin/leave-requests">Leave Requests</Link>
            <Link to="/worker-dashboard">Worker Panel</Link>
            <Link to="/worker-register">Add Worker</Link>
          </>
        )}

        {token && user?.role === "worker" && (
          <>
            <Link to="/worker-dashboard">Worker Panel</Link>
            <Link to="/worker-register">Join as Worker</Link>
          </>
        )}

        <Link to="/about">About</Link>
      </div>

      <div className="nav-icons">
        <button onClick={toggleTheme} className="icon-btn">
          {theme === "dark" ? "☀" : "🌙"}
        </button>

        {token && (
          <button onClick={handleLogout} className="icon-btn logout-btn">
            ⎋
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;