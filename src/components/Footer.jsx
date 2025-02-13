import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebook, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaArrowUp } from "react-icons/fa";
import "../styles/footer.css"; // Import the CSS file

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <Container>
        <Row className="text-center md:text-left">
          {/* Company Information */}
          <Col md={4} className="mb-6 md:mb-0">
            <h3 className="footer-title">Apartment Locator</h3>
            <p className="footer-description">
              Your trusted partner in finding the perfect home. We connect you with the best apartments in your area.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-6 md:mb-0">
            <h4 className="footer-subtitle">Quick Links</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/apartments" className="footer-link">Apartments</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
          </Col>

          {/* Newsletter Subscription */}
          <Col md={4}>
            <h4 className="footer-subtitle">Subscribe to Our Newsletter</h4>
            <Form className="footer-newsletter">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                className="footer-newsletter-input"
                aria-label="Email for newsletter subscription"
              />
              <Button variant="primary" className="footer-newsletter-button">
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Contact Information */}
        <Row className="mt-8">
          <Col md={4} className="mb-6 md:mb-0">
            <h4 className="footer-subtitle">Contact Us</h4>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <FaMapMarkerAlt className="footer-icon" aria-hidden="true" />
                <p>123 Main Street, Nairobi, Kenya</p>
              </div>
              <div className="footer-contact-item">
                <FaPhoneAlt className="footer-icon" aria-hidden="true" />
                <p>+254 712 345 678</p>
              </div>
              <div className="footer-contact-item">
                <FaEnvelope className="footer-icon" aria-hidden="true" />
                <p>info@apartmentlocator.com</p>
              </div>
            </div>
          </Col>

          {/* Social Media Links */}
          <Col md={4} className="mb-6 md:mb-0">
            <h4 className="footer-subtitle">Follow Us</h4>
            <div className="footer-social">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social-icon">
                <FaFacebook size={24} />
              </a>
              <a href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="footer-social-icon">
                <FaWhatsapp size={24} />
              </a>
              <a href="mailto:your-email@example.com" aria-label="Email" className="footer-social-icon">
                <FaEnvelope size={24} />
              </a>
            </div>
          </Col>

          {/* Legal Links */}
          <Col md={4}>
            <h4 className="footer-subtitle">Legal</h4>
            <div className="footer-legal">
              <Link to="/privacy-policy" className="footer-legal-link">Privacy Policy</Link>
              <Link to="/terms-of-service" className="footer-legal-link">Terms of Service</Link>
              <Link to="/cookie-policy" className="footer-legal-link">Cookie Policy</Link>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="mt-6">
          <Col className="text-center">
            <p className="footer-copy">
              &copy; {new Date().getFullYear()} Apartment Locator. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Back-to-Top Button */}
      <Button variant="primary" className="footer-back-to-top" onClick={scrollToTop} aria-label="Back to top">
        <FaArrowUp size={16} />
      </Button>
    </footer>
  );
};

export default Footer;