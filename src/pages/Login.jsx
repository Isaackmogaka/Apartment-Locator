import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { Mail, Lock } from "lucide-react"; // Import icons from lucide-react
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "../styles/login.css"; // Import your custom styles

const Login = ({ onLogin, onLogout }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the /login endpoint
      const response = await axios.post("http://127.0.0.1:5000/login", formData);

      // Handle successful login
      if (response.status === 200) {
        setSuccess(true);
        setError("");
        console.log("Login successful:", response.data);

        // Call the onLogin function to update the login state in the parent component
        onLogin();

        // Redirect to the home page after a short delay
        setTimeout(() => {
          navigate("/"); // Redirect to the home page
        }, 1000); // 1-second delay before redirection
      }
    } catch (err) {
      // Handle errors
      if (err.response) {
        // The request was made and the server responded with a status code
        setError(err.response.data.message || "An error occurred during login.");
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response from the server. Please try again.");
      } else {
        // Something else happened
        setError("An unexpected error occurred. Please try again.");
      }
      setSuccess(false);
    }
  };

  return (
    <Container className="login-container">
      <h2 className="text-center my-4">Login</h2>
      {success && <Alert variant="success">Login successful! Redirecting...</Alert>}
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