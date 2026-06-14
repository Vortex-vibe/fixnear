import { useEffect, useState } from "react";

function AdminLeaveRequests() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("Loading leave requests...");

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/leave-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setRequests(data);
        setMessage(data.length === 0 ? "No leave requests found." : "");
      } else {
        setMessage(data.message || "Failed to load leave requests.");
      }
    } catch (error) {
      setMessage("Failed to fetch leave requests.");
    }
  }

  async function updateRequest(id, action) {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_URL}/api/leave-requests/${action}/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    alert(data.message);
    fetchRequests();
  }

  return (
    <section className="dashboard-page">
      <h1>Worker Leave Requests</h1>

      {message && <p className="workers-subtitle">{message}</p>}

      <div className="booking-list">
        {requests.map((request) => (
          <div className="booking-item" key={request._id}>
            <h3>{request.workerName || "Unknown Worker"}</h3>
            <p>Worker ID: {request.workerId?._id || request.workerId}</p>
            <p>Reason: {request.reason}</p>
            <p>Status: {request.status}</p>

            {request.status === "Pending" && (
              <div className="status-buttons">
                <button
                  className="service-btn"
                  onClick={() => updateRequest(request._id, "approve")}
                >
                  Approve
                </button>

                <button
                  className="service-btn"
                  onClick={() => updateRequest(request._id, "reject")}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default AdminLeaveRequests;