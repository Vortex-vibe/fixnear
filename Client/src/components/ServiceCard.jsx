import { useNavigate } from "react-router-dom";

function ServiceCard({ service }) {
  const navigate = useNavigate();

  function handleViewWorkers() {
    navigate(`/?service=${encodeURIComponent(service.name)}`);

    setTimeout(() => {
      document
        .getElementById("workers")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }

  return (
    <div className="service-card">
      <div className="service-icon">{service.icon}</div>

      <h3>{service.name}</h3>

      <p>{service.desc}</p>

      <button className="service-btn" onClick={handleViewWorkers}>
        View {service.name} Workers
      </button>
    </div>
  );
}

export default ServiceCard;