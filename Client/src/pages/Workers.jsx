import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WorkerCard from "../components/WorkerCard";
import API_URL from "../api";

function Workers() {
  const [searchParams] = useSearchParams();

  const selectedService = searchParams.get("service") || "All";

  const [workers, setWorkers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(selectedService);

  useEffect(() => {
    setFilter(selectedService);
  }, [selectedService]);

  useEffect(() => {
    fetchWorkers();
  }, []);

  async function fetchWorkers() {
    try {
      const response = await fetch(`${API_URL}/api/workers`);
      const data = await response.json();
      setWorkers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Failed to fetch workers:", error);
    }
  }

  function normalize(text) {
    return String(text || "").trim().toLowerCase();
  }

  const filteredWorkers = workers.filter((worker) => {
    const searchValue = normalize(search);
    const workerService = normalize(worker.service);
    const selectedFilter = normalize(filter);

    const matchesSearch =
      normalize(worker.name).includes(searchValue) ||
      normalize(worker.service).includes(searchValue) ||
      normalize(worker.location).includes(searchValue);

    const matchesFilter =
      selectedFilter === "all" || workerService === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    if (
      filter !== "All" &&
      workers.length > 0 &&
      filteredWorkers.length === 0
    ) {
      alert(`No workers available for ${filter} yet.`);
    }
  }, [filter]);

  return (
    <section className="workers-page" id="workers">
      <h1>
        {filter === "All" ? "Available Workers" : `${filter} Workers`}
      </h1>

      <p className="workers-subtitle">
        Search and filter trusted workers near you.
      </p>

      <div className="search-filter-box">
        <input
          type="text"
          placeholder="Search by name, service, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Services</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="Painter">Painter</option>
          <option value="Carpenter">Carpenter</option>
          <option value="Interior">Interior</option>
          <option value="Cleaning">Cleaning</option>
        </select>
      </div>

      <p className="worker-count">
        Showing {filteredWorkers.length} {filter === "All" ? "" : filter} workers
      </p>

      <div className="workers-grid">
        {filteredWorkers.length > 0 ? (
          filteredWorkers.map((worker) => (
            <WorkerCard key={worker._id} worker={worker} />
          ))
        ) : (
          <h2 className="no-result">
            No workers found for {filter}
          </h2>
        )}
      </div>
    </section>
  );
}

export default Workers;