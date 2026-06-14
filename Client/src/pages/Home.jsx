import ServiceCard from "../components/ServiceCard";
import Workers from "./Workers";
import { services } from "../data/demoData";

function Home() {
  return (
    <>
      <section className="hero pro-hero">
        <div className="hero-content">
          <p className="tag">Local services, verified workers</p>

          <h1>
            Find trusted home service workers near you.
          </h1>

          <p className="hero-text">
            FixNear helps customers discover skilled electricians, plumbers,
            painters, carpenters and interior workers with simple booking,
            transparent profiles and admin-managed safety.
          </p>

          <div className="hero-actions">
            <a href="#services" className="primary-btn">
              Explore Services
            </a>

            <a href="#workers" className="secondary-btn">
              Find Workers
            </a>
          </div>
        </div>

        <div className="hero-dashboard-card">
          <div className="mini-card">
            <span>01</span>
            <div>
              <h3>Choose Service</h3>
              <p>Select the work you need.</p>
            </div>
          </div>

          <div className="mini-card">
            <span>02</span>
            <div>
              <h3>Book Worker</h3>
              <p>Check profile and book easily.</p>
            </div>
          </div>

          <div className="mini-card">
            <span>03</span>
            <div>
              <h3>Track Status</h3>
              <p>Admin manages booking updates.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <h2>Popular Services</h2>
        <p className="section-subtitle">
          Choose a service category and find suitable workers.
        </p>

        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section id="workers">
        <Workers />
      </section>
    </>
  );
}

export default Home;