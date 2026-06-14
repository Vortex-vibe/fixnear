import { useEffect, useState } from "react";

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const response = await fetch(`${API_URL}/api/bookings`);
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.log("Failed to fetch bookings");
    }
  }

  async function updateStatus(id, newStatus) {
    try {
      const response = await fetch(
        `${API_URL}/api/bookings/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      fetchBookings();
    } catch (error) {
      alert("Failed to update booking status");
    }
  }

  async function submitRating(workerId, bookingId) {
    const rating = prompt("Rate this worker from 1 to 5");

    if (!rating || rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5");
      return;
    }

    const review = prompt("Write your review");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          workerId,
          bookingId,
          rating: Number(rating),
          review,
        }),
      });

      const data = await response.json();

      alert(data.message);
    } catch (error) {
      alert("Failed to submit rating");
    }
  }

  return (
    <section className="dashboard-page">
      <h1>Booking Dashboard</h1>
      <p>Manage and track all service bookings.</p>

      <div className="dashboard-grid">
        <div className="dash-card">
          <h2>{bookings.length}</h2>
          <p>Total Bookings</p>
        </div>

        <div className="dash-card">
          <h2>
            {
              bookings.filter((booking) => booking.status === "Pending")
                .length
            }
          </h2>
          <p>Pending Bookings</p>
        </div>
      </div>

      <div className="booking-list">
        <h2>Recent Bookings</h2>

        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          bookings.map((booking) => (
            <div className="booking-item" key={booking._id}>
              <h3>{booking.customerName}</h3>
              <p>Service: {booking.service}</p>
              <p>Phone: {booking.phone}</p>
              <p>Address: {booking.address}</p>
              <p>Problem: {booking.problem}</p>
              <p>Worker: {booking.workerId?.name || "Worker unavailable"}</p>
              <p>Status: {booking.status}</p>

              <div className="status-buttons">
                <button
                  className="service-btn"
                  onClick={() => updateStatus(booking._id, "Accepted")}
                >
                  Accept
                </button>

                <button
                  className="service-btn"
                  onClick={() => updateStatus(booking._id, "Completed")}
                >
                  Complete
                </button>

                {booking.status === "Completed" && booking.workerId?._id && (
                  <button
                    className="service-btn"
                    onClick={() =>
                      submitRating(booking.workerId._id, booking._id)
                    }
                  >
                    Rate Worker
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Dashboard;