import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link for routing
import { MapPin, Wallet, CheckCircle } from "lucide-react"; // Import icons from lucide-react
import "../styles/home.css"; // Import your CSS styles

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [filters, setFilters] = useState({
    price: "",
    location: "",
    size: "",
  });

  const apartments = [
    {
      id: 1,
      title: "Luxury 2-Bedroom Apartment",
      images: [
        "https://imganuncios.mitula.net/g3052_st_georges_terrace_perth_6000_wa_7560002738443756306.jpg",
        "https://example.com/image2.jpg",
        "https://example.com/image3.jpg",
      ],
      price: "$2,500/month",
      location: "Downtown",
      description: "Located in the heart of the city, this spacious apartment offers modern amenities and a scenic view.",
      features: [
        "Modern kitchen",
        "Gym access",
        "24/7 security",
      ],
    },
    {
      id: 2,
      title: "Cozy Studio Apartment",
      images: [
        "https://mansiondeal.com/public/uploads/1gvgxvxcbnvcxnvcbxvcxb.webp",
        "https://example.com/image2.jpg",
        "https://example.com/image3.jpg",
      ],
      price: "$1,200/month",
      location: "Uptown",
      description: "A perfect choice for solo living, featuring a fully equipped kitchen and close to public transport.",
      features: [
        "Fully furnished",
        "Close to public transport",
        "High-speed internet",
      ],
    },
    {
      id: 3,
      title: "Spacious 3-Bedroom Apartment",
      images: [
        "https://mansiondeal.com/public/uploads/123143345sfgchgfghfdg54564766t.webp",
        "https://example.com/image2.jpg",
        "https://example.com/image3.jpg",
      ],
      price: "$3,000/month",
      location: "Suburbs",
      description: "Ideal for families, this apartment comes with a gym, swimming pool, and 24/7 security.",
      features: [
        "Swimming pool",
        "Family-friendly",
        "Pet-friendly",
      ],
    },
  ];

  const handleShow = (apartment) => {
    setSelectedApartment(apartment);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedApartment(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    const { price, location, size } = filters;

    const filteredApartments = apartments.filter((apartment) => {
      const matchesLocation = apartment.location.toLowerCase().includes(location.toLowerCase());
      const matchesPrice = price ? parseInt(apartment.price.replace(/[^0-9]/g, '')) <= parseInt(price) : true; // Remove currency and compare
      const matchesSize = size ? apartment.features.includes(size) : true; // Assuming size is a feature

      return matchesLocation && matchesPrice && matchesSize;
    });

    return filteredApartments;
  };

  const filteredApartments = handleSearch();

  return (
    <Container className="apartments">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-overlay">
          <h1>Welcome to the Vacant Apartment Locator</h1>
          <p>Find your next apartment easily with real-time listings, location details, and instant bookings.</p>
          <div className="search-bar">
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={filters.location}
              onChange={handleFilterChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Max Price"
              value={filters.price}
              onChange={handleFilterChange}
            />
            <select
              name="size"
              value={filters.size}
              onChange={handleFilterChange}
            >
              <option value="">Apartment Size</option>
              <option value="1 Bedroom">1 Bedroom</option>
              <option value="2 Bedrooms">2 Bedrooms</option>
              <option value="3 Bedrooms">3 Bedrooms</option>
            </select>
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </header>

      <h2>Featured Apartments</h2>
      <Row>
        {filteredApartments.length > 0 ? (
          filteredApartments.map((apartment) => (
            <Col md={4} className="mb-4" key={apartment.id}>
              <Card className="apartment-card">
                <Card.Img variant="top" src={apartment.images[0]} alt={apartment.title} />
                <Card.Body>
                  <Card.Title>{apartment.title}</Card.Title>
                  <Card.Text>
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
                  <Button variant="primary" onClick={() => handleShow(apartment)}>View Details</Button>
                  <Link to={`/bookings/${apartment.id}`}>
                    <Button variant="success" className="ml-2">Book Visit</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <h3>No results found</h3>
          </Col>
        )}
      </Row>

      {/* Modal for Apartment Details */}
      {selectedApartment && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedApartment.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {selectedApartment.images.map((image, index) => (
                <img key={index} src={image} alt={`Apartment ${selectedApartment.id} image ${index + 1}`} style={{ width: '100%', marginBottom: '10px' }} />
              ))}
              <p><strong>Price:</strong> {selectedApartment.price}</p>
              <p><strong>Location:</strong> {selectedApartment.location}</p>
              <p>{selectedApartment.description}</p>
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

export default Home;