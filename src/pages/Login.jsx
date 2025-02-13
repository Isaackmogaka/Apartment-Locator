// Login.jsx
import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { Mail, Lock } from "lucide-react"; // Import icons from lucide-react
import "../styles/login.css"; // Import your custom styles

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login Data:", formData);
    // Simulate a successful login
    if (formData.email && formData.password) {
      setSuccess(true);
      setError("");
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <Container className="login-container">
      <h2 className="text-center my-4">Login</h2>
      {success && <Alert variant="success">Login successful!</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Card className="login-card">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
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


       <Button variant="primary" type="submit" className="w-100 mt-3">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;