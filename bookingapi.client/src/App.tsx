import { useEffect, useState } from "react";
import "./App.css";

interface Service {
  id: number;
  name: string;
  durationMinutes: number;
  price: number;
}

function App() {
  const [services, setServices] = useState<Service[]>([]);

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

  return (
    <div>
      <h1>Booking System</h1>
      <h2>Services</h2>
      {services.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <ul>
          {services.map((service) => (
            <li key={service.id}>
              {service.name} — {service.durationMinutes} min — {service.price}{" "}
              kr
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
