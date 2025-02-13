import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

import Navigation from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Apartments from "./pages/Apartments.jsx";
import Booking from "./pages/Bookings.jsx";
import Contact from "./pages/Contact.jsx";
import ApartmentDetail from "./pages/AddApartment.jsx";
import AddApartment from "./pages/AddApartment.jsx"; // Import AddApartment component
import Register from "./pages/Register"; // Import Register component
import Login from "./pages/Login"; // Import Login component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true); // Update login state
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false); // Update login state
    // Optionally, clear any stored user data (e.g., tokens, user info)
  };

  return (
    <Router>
      <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apartments" element={<Apartments />} />
          <Route path="/apartments/:id" element={<ApartmentDetail />} />
          <Route path="/bookings" element={<Booking />} />
          <Route path="/bookings/:id" element={<Booking />} /> {/* This handles booking for specific apartments */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/add-apartment" element={<AddApartment />} /> {/* Correct route */}
          <Route path="/register" element={<Register />} /> {/* Route for Register */}
          <Route path="/login" element={<Login onLogin={handleLogin} onLogout={handleLogout} />} /> {/* Route for Login */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;