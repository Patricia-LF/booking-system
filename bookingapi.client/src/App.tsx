import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CustomerForm from "./CustomerForm";
import "./App.css";
import ServiceForm from "./ServiceForm";
import BookingForm from "./BookingForm";

function App() {
  return (
    <BrowserRouter>
      <img src="/src/assets/logo.png"></img>

      <nav className="nav-links-container">
        <Link to="/">Home</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/services">Services</Link>
        <Link to="/bookings">Bookings</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Welcome to Studio Exquisite</h1>
              <p>Manage customers, services and bookings.</p>
            </>
          }
        />
        <Route path="/customers" element={<CustomerForm />} />
        <Route path="/services" element={<ServiceForm />} />
        <Route path="/bookings" element={<BookingForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
