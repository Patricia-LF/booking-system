import { useState, useEffect } from "react";
import styles from "./ServiceForm.module.css";

interface Service {
  id: number;
  name: string;
  durationMinutes: number;
  price: number;
}

function ServiceForm() {
  const [name, setName] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [price, setPrice] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/Service`);
    if (response.ok) {
      const data = await response.json();
      setServices(data);
    }
  }

  async function handleSubmit() {
    // Validation
    if (!name.trim() || !durationMinutes.trim() || !price.trim()) {
      setError("All fields are required.");
      return;
    }

    if (parseInt(durationMinutes) < 1) {
      setError("Duration must be at least 1 minute.");
      return;
    }

    if (parseFloat(price) < 0) {
      setError("Price cannot be negative.");
      return;
    }

    setError("");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/Service`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          durationMinutes: parseInt(durationMinutes),
          price: parseFloat(price),
        }),
      },
    );

    if (response.ok) {
      setName("");
      setDurationMinutes("");
      setPrice("");
      fetchServices();
    }
  }

  async function handleDelete(id: number) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/Service/${id}`,
      {
        method: "DELETE",
      },
    );

    if (response.ok) {
      fetchServices();
    }
  }

  return (
    <div className={styles.services}>
      <section className={styles["add-service-container"]}>
        <h2>Add Service</h2>
        <p>
          Enter the name of the service (type of service), duration time (in
          minutes), and price. Save with button +Add service.
        </p>
        <div className={styles.addInput}>
          <input
            type="text"
            placeholder="Name"
            className={styles.fieldInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Duration (Min)"
            min="1"
            className={styles.fieldInput}
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            min="0"
            className={styles.fieldInput}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button onClick={handleSubmit}>+ Add Service</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </section>

      <section className={styles["services-container"]}>
        <h2>Services</h2>
        {services.length === 0 ? (
          <p>No services yet.</p>
        ) : (
          <div className={styles.serviceList}>
            {services.map((service) => (
              <div className={styles.serviceCard} key={service.id}>
                <div className={styles.serviceInfo}>
                  <div className={styles.serviceName}>{service.name}</div>
                  <div className={styles.serviceRow}>
                    <img
                      src="/assets/icons/time.png"
                      alt="time"
                      className="card-icons"
                    ></img>{" "}
                    {service.durationMinutes} min
                  </div>
                  <div className={styles.serviceRow}>
                    <img
                      src="/assets/icons/price.png"
                      alt="price"
                      className="card-icons"
                    ></img>{" "}
                    {service.price} kr
                  </div>
                </div>
                <button onClick={() => handleDelete(service.id)}>
                  {" "}
                  <img
                    src="/assets/icons/delete.png"
                    alt="Delete"
                    className="delete-icon"
                  ></img>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ServiceForm;
