import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons'; // Import the house icon
import "../styles/navbar.css";

const Navigation = () => {
  return (
    <Navbar bg="info" variant="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          <FontAwesomeIcon icon={faHouse} size="2x" className="me-2" /> {/* Add the house icon */}
          Apartment Locator
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="me-3">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/apartments" className="me-3">
              Apartments
            </Nav.Link>
            <Button
              as={Link}
              to="/add-apartment"
              variant="outline-light"
              className="me-3"
            >
              List Apartment
            </Button>
            <Button
              as={Link}
              to="/register"
              variant="outline-light"
              className="me-3"
            >
              Register
            </Button>
            <Button
              as={Link}
              to="/login"
              variant="outline-light"
              className="me-3"
            >
              Sign In
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;