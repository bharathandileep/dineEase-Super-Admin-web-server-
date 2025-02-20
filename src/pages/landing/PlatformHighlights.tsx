import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Smartphone, CreditCard, HeadphonesIcon } from 'lucide-react';

const highlights = [
  {
    icon: <Smartphone size={40} />,
    title: 'Mobile & Desktop Friendly',
    description: 'Access from any device, anytime, anywhere'
  },
  {
    icon: <CreditCard size={40} />,
    title: 'Seamless Payments',
    description: 'Multiple payment options, easy refunds, and automated invoicing'
  },
  {
    icon: <HeadphonesIcon size={40} />,
    title: '24/7 Customer Support',
    description: 'Get help anytime via phone, email, or live chat'
  }
];

const PlatformHighlights = () => {
  return (
    <section className="py-5 bg-light ">
      <Container>
        <h2 className="text-center mb-5">Platform Highlights</h2>
        <Row>
          {highlights.map((highlight, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="text-primary mb-3">
                    {highlight.icon}
                  </div>
                  <h3 className="h4 mb-3">{highlight.title}</h3>
                  <p className="text-muted mb-0">{highlight.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default PlatformHighlights;