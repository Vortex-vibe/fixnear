import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSignup(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful. Please login now.");

        if (formData.role === "worker") {
          navigate("/login");
        } else {
          navigate("/login");
        }
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      alert("Signup failed. Check backend server.");
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>

        <p className="workers-subtitle">
          Choose your account type before registering.
        </p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            minLength="3"
            onChange={handleChange}
            required
          />

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
            minLength="6"
            onChange={handleChange}
            required
          />

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="customer">I want to book services</option>
            <option value="worker">I want to work as a service provider</option>
          </select>

          <button type="submit" className="service-btn">
            Register
          </button>
        </form>
      </div>
    </section>
  );
}

export default Signup;