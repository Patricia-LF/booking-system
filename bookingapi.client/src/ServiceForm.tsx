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
    const response = await fetch("https://localhost:7118/api/Service");
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

    setError("");

    const response = await fetch("https://localhost:7118/api/Service", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        durationMinutes: parseInt(durationMinutes),
        price: parseFloat(price),
      }),
    });

    if (response.ok) {
      setName("");
      setDurationMinutes("");
      setPrice("");
      fetchServices();
    }
  }

  async function handleDelete(id: number) {
    const response = await fetch(`https://localhost:7118/api/Service/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchServices();
    }
  }

  return (
    <div className={styles.services}>
      <section className={styles["add-service-container"]}>
        <h2>Add Service</h2>
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
            className={styles.fieldInput}
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className={styles.fieldInput}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button onClick={handleSubmit}>Add Service</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </section>

      <section className={styles["services-container"]}>
        <h2>Services</h2>
        {services.length === 0 ? (
          <p>No services yet.</p>
        ) : (
          <ul>
            {services.map((service) => (
              <li key={service.id}>
                {service.name} — {service.durationMinutes} — {service.price}
                <button onClick={() => handleDelete(service.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default ServiceForm;
