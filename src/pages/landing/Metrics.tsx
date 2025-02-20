import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Package, Building2, ChefHat } from 'lucide-react';

const metrics = [
  {
    icon: <Package size={48} />,
    value: '10,000+',
    label: 'Meals Delivered'
  },
  {
    icon: <Building2 size={48} />,
    value: '500+',
    label: 'Satisfied Organizations'
  },
  {
    icon: <ChefHat size={48} />,
    value: '100+',
    label: 'Partner Kitchens'
  }
];

const Metrics = () => {
  return (
    <section className="py-5 bg-primary text-white">
      <Container>
        <Row className="justify-content-center">
          {metrics.map((metric, index) => (
            <Col key={index} md={4} className="text-center mb-4 mb-md-0">
              <div className="text-white mb-3">
                {metric.icon}
              </div>
              <h3 className="display-4 fw-bold mb-2">{metric.value}</h3>
              <p className="lead">{metric.label}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Metrics;