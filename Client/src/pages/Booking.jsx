import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    customerName: "",
    service: "",
    phone: "",
    address: "",
    problem: "",
  });

  function handleChange(e) {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  }

  async function handleBooking(e) {
    e.preventDefault();

    try {
      const response = await fetch("${API_URL}/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...booking,
          workerId: id,
        }),
      });

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Booking failed");
    }
  }

  return (
    <section className="booking-page">
      <div className="booking-card">
        <h1>Book Service</h1>

        <form onSubmit={handleBooking}>
          <input
            name="customerName"
            placeholder="Your Name"
            onChange={handleChange}
            required
          />

          <input
            name="service"
            placeholder="Service Type"
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />

          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            required
          />

          <textarea
            name="problem"
            placeholder="Describe your problem"
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="service-btn">
            Confirm Booking
          </button>
        </form>
      </div>
    </section>
  );
}

export default Booking;