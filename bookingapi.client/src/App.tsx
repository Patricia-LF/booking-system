import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerForm from "./CustomerForm";
import ServiceForm from "./ServiceForm";
import BookingForm from "./BookingForm";
import Navbar from "./Navbar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="welcome-container">
                <h1>Welcome to Studio Exquisite</h1>
                <p>Manage customers, services and bookings.</p>
              </div>
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
