import { useEffect, useState } from "react";

function WorkerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [workerId, setWorkerId] = useState(localStorage.getItem("workerId") || "");
  const [reason, setReason] = useState("");

  async function fetchWorkerBookings() {
    if (!workerId) {
      alert("Enter Worker ID first");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/bookings/worker/${workerId}`
      );

      const data = await response.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      alert("Failed to fetch worker bookings");
    }
  }

  async function sendLeaveRequest() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    if (!workerId) {
      alert("Enter Worker ID first");
      return;
    }

    if (!reason.trim()) {
      alert("Please write a reason for leaving");
      return;
    }

    try {
      const response = await fetch("${API_URL}/api/leave-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          workerId,
          reason,
        }),
      });

      const data = await response.json();

      alert(data.message || "Request completed");

      if (response.ok) {
        setReason("");
      }
    } catch (error) {
      alert("Failed to send leave request. Check backend server.");
    }
  }

  useEffect(() => {
    if (workerId) {
      fetchWorkerBookings();
    }
  }, []);

  return (
    <section className="dashboard-page">
      <h1>Worker Dashboard</h1>

      <div className="booking-card">
        <input
          type="text"
          placeholder="Enter your Worker ID"
          value={workerId}
          onChange={(e) => setWorkerId(e.target.value)}
        />

        <button className="service-btn" onClick={fetchWorkerBookings}>
          Load My Bookings
        </button>

        <textarea
          placeholder="Reason for leaving FixNear"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>

        <button className="service-btn" onClick={sendLeaveRequest}>
          Request to Leave
        </button>
      </div>

      <div className="booking-list">
        {bookings.length === 0 ? (
          <p>No bookings found for this worker.</p>
        ) : (
          bookings.map((booking) => (
            <div className="booking-item" key={booking._id}>
              <h3>{booking.customerName}</h3>
              <p>Service: {booking.service}</p>
              <p>Phone: {booking.phone}</p>
              <p>Address: {booking.address}</p>
              <p>Problem: {booking.problem}</p>
              <p>Status: {booking.status}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default WorkerDashboard;