import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login successful");

        navigate("/");
        window.location.reload();
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Login failed. Check backend server.");
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>

        <p className="workers-subtitle">
          New to FixNear? Register first, then login next time.
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit" className="service-btn">
            Login
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          First time user?{" "}
          <Link to="/signup" style={{ color: "#93c5fd" }}>
            Create account
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;