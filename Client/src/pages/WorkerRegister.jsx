import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WorkerRegister() {
  const navigate = useNavigate();

  const [worker, setWorker] = useState({
    name: "",
    service: "",
    experience: "",
    price: "",
    location: "",
    phone: "",
    image: "",
    about: "",
  });

  const [preview, setPreview] = useState("");

  function handleChange(e) {
    setWorker({
      ...worker,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelfieUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid selfie image.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
      setWorker({
        ...worker,
        image: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (!worker.image) {
      alert("Please take or upload your selfie for safety verification.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/workers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(worker),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("workerId", data.worker._id);

        alert(
          `Worker registered successfully!\n\nYour Worker ID is:\n${data.worker._id}\n\nPlease save this ID.`
        );

        navigate("/worker-dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Failed to register worker");
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Register as Worker</h1>

        <p className="workers-subtitle">
          For safety, workers must upload or take a real selfie photo.
        </p>

        <form onSubmit={handleRegister}>
          <input
            name="name"
            placeholder="Worker / Business Name"
            minLength="3"
            required
            onChange={handleChange}
          />

          <select name="service" required onChange={handleChange}>
            <option value="">Select Service</option>
            <option value="Electrician">Electrician</option>
            <option value="Plumber">Plumber</option>
            <option value="Painter">Painter</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Interior">Interior</option>
            <option value="Cleaning">Cleaning</option>
          </select>

          <input
            name="experience"
            placeholder="Experience Example: 5 Years"
            required
            onChange={handleChange}
          />

          <input
            name="price"
            placeholder="Starting Price Example: ₹299"
            required
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Location"
            minLength="3"
            required
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            maxLength="10"
            pattern="[0-9]{10}"
            title="Phone number must be exactly 10 digits"
            required
            onChange={handleChange}
          />

          <label className="selfie-label">Worker Selfie Verification</label>

          <input
            type="file"
            accept="image/*"
            capture="user"
            required
            onChange={handleSelfieUpload}
          />

          {preview && (
            <div className="selfie-preview-box">
              <p>Selfie Preview</p>
              <img src={preview} alt="Worker selfie preview" />
            </div>
          )}

          <textarea
            name="about"
            placeholder="Write about your service..."
            minLength="10"
            required
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="service-btn">
            Submit Registration
          </button>
        </form>
      </div>
    </section>
  );
}

export default WorkerRegister;