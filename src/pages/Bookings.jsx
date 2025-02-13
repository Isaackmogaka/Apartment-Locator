import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import "../styles/booking.css";

const Booking = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    houseLocation: "",
    visitDate: "",
    visitTime: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      // Convert to snake_case for backend compatibility
      const payload = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        house_location: formData.houseLocation,
        visit_date: formData.visitDate,
        visit_time: formData.visitTime,
        apartment_id: id  // Include the apartment ID from URL params
      };

      const response = await fetch('http://127.0.0.1:5000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit booking');
      }

      setSuccess(true);
      // Reset form after successful submission
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        houseLocation: "",
        visitDate: "",
        visitTime: "",
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);

    } catch (error) {
      console.error('Booking error:', error);
      setError(error.message || 'An error occurred while submitting the booking');
    }
  };

  return (
    <Container className="booking-container">
      <h2 className="text-center my-4">
        Book Apartment <span className="apartment-id">{id}</span>
      </h2>
      
      {success && <Alert variant="success">Booking request submitted successfully!</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="booking-card">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>House Location</Form.Label>
              <Form.Control
                type="text"
                name="houseLocation"
                value={formData.houseLocation}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <h5 className="mt-4 mb-3">Schedule a Visit</h5>
            <Form.Group className="mb-3">
              <Form.Label>Visit Date</Form.Label>
              <Form.Control
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Visit Time</Form.Label>
              <Form.Control
                type="time"
                name="visitTime"
                value={formData.visitTime}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 mt-3"
              disabled={success}  // Disable button when successful
            >
              {success ? 'Submitted!' : 'Submit Booking'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Booking;