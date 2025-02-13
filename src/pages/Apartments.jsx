import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { MapPin, Wallet, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../styles/apartments.css";

const apartments = [
  {
    id: 1,
    name: "Modern 2-Bedroom Apartment",
    location: "Thika Town",
    price: "Ksh 25,000/month",
    images: [
      "https://content.knightfrank.com/property/hub2180951/images/92d82d90-21b4-4995-a76c-79197a945496-0.jpg?cio=true&w=730",
      "https://mansiondeal.com/public/uploads/32342342342545345mk.webp",
      "https://res.cloudinary.com/hao-finder/image/upload/c_fill,w_400/properties/TVC_VILLAGE_Prime_5.4_Acre_Retreat_and_Event_Center_for_Sale_in_Juja_Farm_1_ji6p8p",
    ],
    description: "A spacious 2-bedroom apartment with a modern design, great views, and secure parking.",
    features: ["Spacious Rooms", "Secure Parking", "Near Shopping Centers"],
  },
  {
    id: 2,
    name: "Luxury 3-Bedroom Apartment",
    location: "Thika Greens",
    price: "Ksh 40,000/month",
    images: [
      "https://mansiondeal.com/public/uploads/1gvgxvxcbnvcxnvcbxvcxb.webp",
      "https://content.knightfrank.com/property/hub2411485/images/0c169dba-fab5-4589-abf5-5a1e3a143250-0.jpg?cio=true&w=730",
      "https://mansiondeal.com/public/uploads/326325326723dsjgdhjdfdfbjbfd.webp",
    ],
    description: "A luxurious 3-bedroom apartment in a serene environment with high-end finishes and a swimming pool.",
    features: ["Swimming Pool", "Gated Community", "Fully Furnished"],
  },
];

const Apartment = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);

  const handleShow = (apartment) => {
    setSelectedApartment(apartment);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedApartment(null);
  };

  return (
    <Container className="apartment-container">
      <div className="ty">
        <h2 className="text-centers">🏡 Available Apartments</h2>
      </div>
      <Row>
        {apartments.map((apartment) => (
          <Col key={apartment.id} md={6} lg={4} className="mb-4">
            <Card className="apartment-card">
              {/* Display the first image */}
              <Card.Img variant="top" src={apartment.images[0]} alt={apartment.name} className="apartment-img" />
              <Card.Body>
                <Card.Title className="apartment-title">{apartment.name}</Card.Title>
                <Card.Text className="apartment-text">
                  <MapPin size={16} className="icon" /> <strong>Location:</strong> {apartment.location} <br />
                  <Wallet size={16} className="icon" /> <strong>Price:</strong> {apartment.price}
                </Card.Text>
                <ul>
                  {apartment.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <CheckCircle size={16} className="icon" /> {feature}
                    </li>
                  ))}
                </ul>
                {/* View Details Button */}
                <Button variant="primary" onClick={() => handleShow(apartment)}>View Details</Button>
                {/* Book Visit Button */}
                <Link to={`/bookings/${apartment.id}`}>
                  <Button variant="success" className="ml-2">Book Visit</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Apartment Details */}
      {selectedApartment && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedApartment.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {selectedApartment.images.map((image, index) => (
                <img key={index} src={image} alt={`Apartment ${selectedApartment.id} image ${index + 1}`} style={{ width: '100%', marginBottom: '10px' }} />
              ))}
              <p><strong>Location:</strong> {selectedApartment.location}</p>
              <p><strong>Price:</strong> {selectedApartment.price}</p>
              <p><strong>Description:</strong> {selectedApartment.description}</p>
              <ul>
                {selectedApartment.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <CheckCircle size={16} className="icon" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="close-button" onClick={handleClose}>Close</Button>
            <Link to={`/bookings/${selectedApartment.id}`}>
              <Button variant="success">Book Visit</Button>
            </Link>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Apartment;