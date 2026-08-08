import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles["logo-container"]}>
        <img
          src="/assets/images/exquisite-logo.png"
          alt="Exquisite Studio"
          className={styles.logo}
        />
      </div>

      {/* Desktop nav */}
      <div className={styles.navLinks}>
        <Link to="/">Home</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/services">Services</Link>
        <Link to="/bookings">Bookings</Link>
      </div>

      {/* Hamburger button - only visible on mobile */}
      <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <img
            src="/assets/icons/close.png"
            alt="close"
            className={styles.closeIcon}
          ></img>
        ) : (
          <>
            <span></span>
            <span></span>
            <span></span>
          </>
        )}
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/customers" onClick={() => setIsOpen(false)}>
            Customers
          </Link>
          <Link to="/services" onClick={() => setIsOpen(false)}>
            Services
          </Link>
          <Link to="/bookings" onClick={() => setIsOpen(false)}>
            Bookings
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
