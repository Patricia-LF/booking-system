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
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/Customer`,
    );
    if (response.ok) {
      const data = await response.json();
      setCustomers(data);
    }
  }

  async function fetchServices() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/Service`);
    if (response.ok) {
      const data = await response.json();
      setServices(data);
    }
  }

  async function fetchBookings() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/Booking`);
    if (response.ok) {
      const data = await response.json();
      const sorted = data.sort(
        (a: any, b: any) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
      );
      setBookings(sorted);
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

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/Booking`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: parseInt(customerId),
          serviceId: parseInt(serviceId),
          startTime: startTime,
          endTime: end.toISOString().replace("Z", ""),
        }),
      },
    );

    if (response.ok) {
      setCustomerId("");
      setServiceId("");
      setStartTime("");
      fetchBookings();
    }
  }

  async function handleDelete(id: number) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/Booking/${id}`,
      {
        method: "DELETE",
      },
    );

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
                {s.name} {s.durationMinutes}
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
          <table className={styles.bookingList}>
            <thead className={styles.tableHead}>
              <tr className={styles.tableHeadRow}>
                <td>Customer</td>
                <td>Service</td>
                <td>Date</td>
                <td>Start time</td>
                <td></td>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {bookings.map((b) => (
                <tr className={styles.BookingRow} key={b.id}>
                  <td className={styles.customerName}>{b.customer.name}</td>
                  <td className={styles.serviceName}>{b.service.name}</td>
                  <td>{new Date(b.startTime).toLocaleDateString("sv-SE")}</td>
                  <td>
                    {new Date(b.startTime).toLocaleTimeString("sv-SE", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className={styles.deleteBtn}>
                    <button onClick={() => handleDelete(b.id)}>
                      <img
                        src="/assets/icons/delete.png"
                        alt="Delete"
                        className="delete-icon"
                      ></img>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default BookingForm;
