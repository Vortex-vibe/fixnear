import { Link } from "react-router-dom";

function WorkerCard({ worker }) {
  const workerId = worker._id || worker.id;

  return (
    <div className="worker-card">
      <img
        src={
          worker.image ||
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952"
        }
        alt={worker.name}
      />

      <div className="worker-info">
        <h3>{worker.name}</h3>
        <p>{worker.service}</p>
        <p>⭐ No ratings yet | 📍 {worker.location}</p>
        <p>Experience: {worker.experience}</p>
        <h4>Starting from {worker.price}</h4>

        <Link to={`/worker/${workerId}`} className="service-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default WorkerCard;