import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "../styles/addApartment.css";

const AddApartment = () => {
  const [apartment, setApartment] = useState({
    name: "",
    location: "",
    price: "",
    images: [], // Array to hold image URLs
    description: "",
  });

  const [uploadMethod, setUploadMethod] = useState("upload"); // State to track upload method
  const [error, setError] = useState(""); // State to handle errors
  const [success, setSuccess] = useState(false); // State to handle success
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setApartment({ ...apartment, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setApartment({ ...apartment, images: imageUrls });
  };

  const handleUrlChange = (e, index) => {
    const newImages = [...apartment.images];
    newImages[index] = e.target.value;
    setApartment({ ...apartment, images: newImages });
  };

  const addImageUrlField = () => {
    setApartment((prev) => ({
      ...prev,
      images: [...prev.images, ""], // Add an empty string for a new URL field
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send to the backend
    const apartmentData = {
      name: apartment.name,
      location: apartment.location,
      price: apartment.price,
      images: apartment.images,
      description: apartment.description,
    };

    try {
      // Make a POST request to the /apartments endpoint
      const response = await axios.post("http://127.0.0.1:5000/apartments", apartmentData);

      // Handle successful submission
      if (response.status === 201) {
        setSuccess(true);
        setError("");
        console.log("Apartment added successfully:", response.data);

        // Redirect to the home page after a short delay
        setTimeout(() => {
          navigate("/");
        }, 2000); // 2-second delay before redirection
      }
    } catch (err) {
      // Handle errors
      if (err.response) {
        setError(err.response.data.message || "An error occurred while adding the apartment.");
      } else if (err.request) {
        setError("No response from the server. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setSuccess(false);
    }
  };

  return (
    <div className="add-apartment-page">
      <Container className="content-container">
        <Card className="info-card">
          <Card.Body>
            <h2 className="title">List Your Apartment</h2>
            <p className="info-text">
              Fill out the form below to add your apartment to our listings. Make sure to 
              include clear images, accurate pricing, and detailed descriptions 
              to attract potential tenants.
            </p>
          </Card.Body>
        </Card>

        <Card className="form-card">
          <Card.Body>
            <h3 className="form-title">Apartment Details</h3>
            {success && <Alert variant="success">Apartment added successfully! Redirecting...</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Apartment Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="E.g., Modern 2-Bedroom Apartment"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  onChange={handleChange}
                  placeholder="E.g., Thika Town, Nairobi CBD"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price (Ksh per month)</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  onChange={handleChange}
                  placeholder="E.g., 25,000"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Choose Upload Method</Form.Label>
                <Form.Check
                  type="radio"
                  label="Upload Images"
                  name="uploadMethod"
                  value="upload"
                  checked={uploadMethod === "upload"}
                  onChange={() => setUploadMethod("upload")}
                />
                <Form.Check
                  type="radio"
                  label="Enter Image URLs"
                  name="uploadMethod"
                  value="url"
                  checked={uploadMethod === "url"}
                  onChange={() => setUploadMethod("url")}
                />
              </Form.Group>

              {uploadMethod === "upload" && (
                <Form.Group className="mb-3">
                  <Form.Label>Upload Images (JPEG, JPG)</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".jpeg,.jpg"
                    multiple
                    onChange={handleFileChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    You can upload multiple images (max 3).
                  </Form.Text>
                </Form.Group>
              )}

              {uploadMethod === "url" && (
                <Form.Group className="mb-3">
                  <Form.Label>Image URLs</Form.Label>
                  {apartment.images.map((image, index) => (
                    <div key={index} className="mb-2">
                      <Form.Control
                        type="text"
                        value={image}
                        onChange={(e) => handleUrlChange(e, index)}
                        placeholder="Enter image URL"
                        required
                      />
                    </div>
                  ))}
                  <Button variant="link" onClick={addImageUrlField}>
                    Add Another Image URL
                  </Button>
                  <Form.Text className="text-muted">
                    You can enter up to 3 image URLs.
                  </Form.Text>
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  onChange={handleChange}
                  placeholder="Write a brief description of the apartment"
                  rows={3}
                  required
                />
              </Form.Group>

              <Button variant="success" type="submit" className="submit-btn">
                Submit Listing
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AddApartment;