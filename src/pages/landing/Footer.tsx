import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="bg-primary text-white py-5"
      style={{ backgroundColor: "black" }}
    >
      <Container>
        <Row className="mb-5">
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">
                  FAQs
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">
                  Terms & Conditions
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </Col>
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="mb-4">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <Mail size={18} className="me-2" />
                <a
                  href="mailto:support@foodpre.com"
                  className="text-white-50 text-decoration-none"
                >
                  support@foodpre.com
                </a>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <Phone size={18} className="me-2" />
                <a
                  href="tel:+1234567890"
                  className="text-white-50 text-decoration-none"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <MessageCircle size={18} className="me-2" />
                <span className="text-white-50">Live Chat Support</span>
              </li>
            </ul>
          </Col>
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="mb-4">Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-white-50">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-white-50">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-white-50">
                <Instagram size={24} />
              </a>
            </div>
          </Col>
          <Col md={3}>
            <h5 className="mb-4">Newsletter</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  className="bg-dark text-white"
                />
              </Form.Group>
              <Button variant="outline-light" type="submit">
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>
        <hr className="my-4" />
        <div className="text-center text-white-50">
          <small>&copy; 2024 Dineeas. All rights reserved.</small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
