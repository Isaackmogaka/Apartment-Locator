// Register.jsx
import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { User, Mail, Phone, MapPin, Lock } from "lucide-react"; // Import icons from lucide-react
import "../styles/register.css"; // Import your custom styles

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    // Handle registration logic here
    console.log("Registration Data:", formData);
    setSuccess(true);
    setError("");
  };

  return (
    <Container className="register-container">
      <h2 className="text-center my-4">Register</h2>
      {success && <Alert variant="success">Registration successful!</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Card className="register-card">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
<Form.Group className="mb-3">
  <Form.Label>Name</Form.Label>
  <div className="input-wrapper">
    <User className="input-icon" />
    <Form.Control
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
      placeholder="Enter your name"
    />
  </div>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Email</Form.Label>
  <div className="input-wrapper">
    <Mail className="input-icon" />
    <Form.Control
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
      placeholder="Enter your email"
    />
  </div>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Phone</Form.Label>
  <div className="input-wrapper">
    <Phone className="input-icon" />
    <Form.Control
      type="text"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      required
      placeholder="Enter your phone number"
    />
  </div>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Location</Form.Label>
  <div className="input-wrapper">
    <MapPin className="input-icon" />
    <Form.Control
      type="text"
      name="location"
      value={formData.location}
      onChange={handleChange}
      required
      placeholder="Enter your location"
    />
  </div>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Password</Form.Label>
  <div className="input-wrapper">
    <Lock className="input-icon" />
    <Form.Control
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
      placeholder="Enter your password"
    />
  </div>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Confirm Password</Form.Label>
  <div className="input-wrapper">
    <Lock className="input-icon" />
    <Form.Control
      type="password"
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
      required
      placeholder="Confirm your password"
    />
  </div>
</Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;