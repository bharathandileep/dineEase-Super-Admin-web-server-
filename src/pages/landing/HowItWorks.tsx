import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Search, Settings, CheckCircle, Clock, Utensils } from 'lucide-react';

const steps = [
  {
    icon: <Search size={32} />,
    title: 'Explore',
    description: 'Browse menus and select meals'
  },
  {
    icon: <Settings size={32} />,
    title: 'Customize',
    description: 'Add preferences and dietary restrictions'
  },
  {
    icon: <CheckCircle size={32} />,
    title: 'Order',
    description: 'Confirm and schedule your pre-order'
  },
  {
    icon: <Clock size={32} />,
    title: 'Track',
    description: 'Monitor your order status in real-time'
  },
  {
    icon: <Utensils size={32} />,
    title: 'Enjoy',
    description: 'Receive your meal at your convenience'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-5">How It Works</h2>
        <Row className="justify-content-center">
          {steps.map((step, index) => (
            <Col key={index} xs={12} md={4} lg={2} className="text-center mb-4">
              <div className="d-flex flex-column align-items-center">
                <div className="text-primary mb-3">
                  {step.icon}
                </div>
                <h3 className="h5 mb-2">{step.title}</h3>
                <p className="text-muted small">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="d-none d-lg-block position-absolute" style={{ right: '-1.5rem', top: '2rem' }}>
                    →
                  </div>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default HowItWorks;