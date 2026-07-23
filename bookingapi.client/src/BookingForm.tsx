import { useState, useEffect } from "react";
import styles from "./BookingForm.module.css";

interface Customer {
  id: number;
  name: string;
}

interface Service {
  id: number;
  name: string;
  durationMinutes: number;
}

function BookingForm() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCustomers();
    fetchServices();
    fetchBookings();
  }, []);

  async function fetchCustomers() {
    const response = await fetch("https://localhost:7118/api/Customer");
    if (response.ok) {
      const data = await response.json();
      setCustomers(data);
    }
  }

  async function fetchServices() {
    const response = await fetch("https://localhost:7118/api/Service");
    if (response.ok) {
      const data = await response.json();
      setServices(data);
    }
  }

  async function fetchBookings() {
    const response = await fetch("https://localhost:7118/api/Booking");
    if (response.ok) {
      const data = await response.json();
      setBookings(data);
    }
  }

  async function handleSubmit() {
    if (!customerId || !serviceId || !startTime) {
      setError("All fields are required.");
      return;
    }

    // Calculate endTime based on selected service duration
    const selectedService = services.find((s) => s.id === parseInt(serviceId));
    const start = new Date(startTime);
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + selectedService!.durationMinutes);

    setError("");

    const response = await fetch("https://localhost:7118/api/Booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: parseInt(customerId),
        serviceId: parseInt(serviceId),
        startTime: startTime,
        endTime: end.toISOString().replace("Z", ""),
      }),
    });

    if (response.ok) {
      setCustomerId("");
      setServiceId("");
      setStartTime("");
      fetchBookings();
    }
  }

  async function handleDelete(id: number) {
    const response = await fetch(`https://localhost:7118/api/Booking/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchBookings();
    }
  }

  return (
    <div className={styles.bookings}>
      <section className={styles["add-booking-container"]}>
        <h2>Create Booking</h2>
        <p>
          Select customer, service, and date for the appointment. Save with
          button add booking.
        </p>

        <div className={styles.addInput}>
          <select
            value={customerId}
            className={styles.fieldSelect}
            onChange={(e) => setCustomerId(e.target.value)}
          >
            <option value="">Select customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={serviceId}
            className={styles.fieldSelect}
            onChange={(e) => setServiceId(e.target.value)}
          >
            <option value="">Select service</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            className={styles.fieldInput}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <button onClick={handleSubmit}>Create Booking</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </section>

      <section className={styles["bookings-container"]}>
        <h2>Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <ul className={styles.bookingList}>
            {bookings.map((b) => (
              <li key={b.id}>
                {b.customer.name} — {b.service.name} —{" "}
                {new Date(b.startTime).toLocaleString("sv-SE")}
                <button onClick={() => handleDelete(b.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default BookingForm;
