import { useState, useEffect } from "react";
import styles from "./CustomerForm.module.css";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

function CustomerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    const response = await fetch("https://localhost:7118/api/Customer");
    if (response.ok) {
      const data = await response.json();
      setCustomers(data);
    }
  }

  async function handleSubmit() {
    // Validation
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("All fields are required.");
      return;
    }

    setError("");

    const response = await fetch("https://localhost:7118/api/Customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone }),
    });

    if (response.ok) {
      setName("");
      setEmail("");
      setPhone("");
      fetchCustomers();
    }
  }

  async function handleDelete(id: number) {
    const response = await fetch(`https://localhost:7118/api/Customer/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchCustomers();
    }
  }

  return (
    <div className={styles.customers}>
      <section className={styles["add-customer-container"]}>
        <h2>Add Customer</h2>
        <p>
          Enter the customers name, e-mail and phone number, and save with
          button add customer.
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
            type="email"
            placeholder="Email"
            className={styles.fieldInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            className={styles.fieldInput}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={handleSubmit}>Add Customer</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </section>

      <section className={styles["customers-container"]}>
        <h2>Customers</h2>
        {customers.length === 0 ? (
          <p>No customers yet.</p>
        ) : (
          <ul className={styles.customerList}>
            <li>Name — Email — Phone</li>
            {customers.map((customer) => (
              <li key={customer.id}>
                {customer.name} — {customer.email} — {customer.phone}
                <button onClick={() => handleDelete(customer.id)}>
                  Delete🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default CustomerForm;
