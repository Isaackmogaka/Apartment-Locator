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
    houseLocation: "", // Updated field
    visitDate: "",
    visitTime: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", formData);
    setSuccess(true);
  };

  return (
    <Container className="booking-container">
    <h2 className="text-center my-4">
        Book Apartment <span className="apartment-id">{id}</span>
     </h2>
      {success && <Alert variant="success">Booking request submitted successfully!</Alert>}
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
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>House Location</Form.Label> {/* Updated label */}
              <Form.Control
                type="text"
                name="houseLocation" // Updated name
                value={formData.houseLocation} // Updated value
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

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Submit Booking
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Booking;