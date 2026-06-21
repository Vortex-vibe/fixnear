import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function WorkerDetails() {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    fetchWorker();
  }, [id]);

  async function fetchWorker() {
    try {
      const response = await fetch(`${API_URL}/api/workers/${id}`);
      const data = await response.json();

      if (response.ok) {
        setWorker(data);
      }
    } catch (error) {
      console.log("Failed to fetch worker details");
    }
  }

  if (!worker) {
    return <h1 className="page-title">Loading worker details...</h1>;
  }

  return (
    <section className="details-page">
      <div className="details-card">
        <img
          src={
            worker.image ||
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952"
          }
          alt={worker.name}
        />

        <div className="details-info">
          <h1>{worker.name}</h1>
          <h3>{worker.service}</h3>

          <p>⭐ Rating: {worker.rating || 4.5}</p>
          <p>📍 Location: {worker.location}</p>
          <p>🛠 Experience: {worker.experience}</p>
          <p>📞 Phone: {worker.phone}</p>

          <h2>Starting Price: {worker.price}</h2>

          <p>{worker.about}</p>

          <Link to={`/booking/${worker._id}`} className="service-btn">
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WorkerDetails;