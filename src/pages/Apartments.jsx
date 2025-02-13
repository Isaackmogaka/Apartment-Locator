import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { MapPin, Wallet, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/apartments.css";

const Apartment = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/apartments')
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Server returned an error: ${text}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched data:", data);
        setApartments(data.apartments);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching apartments:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleShow = (apartment) => {
    setSelectedApartment(apartment);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedApartment(null);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading apartments...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <p className="text-danger">Failed to load apartments. Please try again later.</p>
        <p className="text-muted">Error: {error}</p>
      </Container>
    );
  }

  if (!loading && apartments.length === 0) {
    return (
      <Container className="text-center mt-5">
        <p className="text-warning">No apartments available at the moment.</p>
      </Container>
    );
  }

  return (
    <Container className="apartment-container">
      <div className="ty">
        <h2 className="text-centers">🏡 Available Apartments</h2>
      </div>
      <Row>
        {apartments.map((apartment) => (
          <Col key={apartment.id} md={6} lg={4} className="mb-4">
            <Card className="apartment-card">
              <Card.Img
                variant="top"
                src={apartment.images && apartment.images[0]}
                alt={apartment.name}
                className="apartment-img"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300";
                }}
              />
              <Card.Body>
                <Card.Title className="apartment-title">{apartment.name}</Card.Title>
                <Card.Text className="apartment-text">
                  <MapPin size={16} className="icon" /> <strong>Location:</strong> {apartment.location} <br />
                  <Wallet size={16} className="icon" /> <strong>Price:</strong> {apartment.price}
                </Card.Text>
                <ul>
                  {apartment.features && apartment.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <CheckCircle size={16} className="icon" /> {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="primary" 
                  onClick={() => handleShow(apartment)} 
                  aria-label="View Details"
                >
                  View Details
                </Button>
                <Link to={`/bookings/${apartment.id}`}>
                  <Button variant="success" className="ml-2" aria-label="Book Visit">
                    Book Visit
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedApartment && (
        <Modal show={showModal} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedApartment.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="g-3 mb-4">
              {selectedApartment.images && selectedApartment.images.map((image, index) => (
                <Col key={index} xs={12} md={6} lg={4}>
                  <div className="image-container">
                    <img
                      src={image}
                      alt={`${selectedApartment.name} - Image ${index + 1}`}
                      className="img-fluid rounded shadow-sm"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300";
                      }}
                    />
                  </div>
                </Col>
              ))}
            </Row>
            <div className="apartment-details">
              <p className="h5"><MapPin size={20} /> Location</p>
              <p className="mb-3">{selectedApartment.location}</p>
              
              <p className="h5"><Wallet size={20} /> Pricing</p>
              <p className="mb-3">${selectedApartment.price}/month</p>
              
              <p className="h5">🏠 Features</p>
              <ul className="list-unstyled">
                {selectedApartment.features && selectedApartment.features.map((feature, index) => (
                  <li key={index} className="d-flex align-items-center mb-2">
                    <CheckCircle size={16} className="me-2 text-success" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Close
            </Button>
            <Link to={`/bookings/${selectedApartment.id}`}>
              <Button variant="primary">Book Now</Button>
            </Link>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Apartment;