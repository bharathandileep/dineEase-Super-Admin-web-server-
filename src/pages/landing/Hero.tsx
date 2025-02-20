import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div
      className="hero-section d-flex align-items-center justify-content-center py-5"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "90vh",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} className="text-center text-white">
            {/* Centered Heading */}
            <h1 className="display-4 fw-bold text-white mb-4">
              Your Personalized Culinary Experience Awaits!
            </h1>
            {/* Centered Paragraph */}
            <p className="lead mb-5">
              Order meals in advance, streamline your kitchen menus, and savor
              personalized meal plans—all from a single platform!
            </p>
            {/* Centered Buttons */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
