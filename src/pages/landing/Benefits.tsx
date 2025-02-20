import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Clock, Building2, ChefHat } from 'lucide-react';

const benefitsData = [
  {
    icon: <Clock size={40} />,
    title: 'For Individuals',
    benefits: [
      'Save time with pre-orders',
      'Personalize meals to dietary needs',
      'Track orders in real-time',
      'Access exclusive meal plans'
    ]
  },
  {
    icon: <Building2 size={40} />,
    title: 'For Organizations',
    benefits: [
      'Streamline employee meal management',
      'Manage budgets and bulk orders',
      'Automated billing and reporting',
      'Custom corporate meal plans'
    ]
  },
  {
    icon: <ChefHat size={40} />,
    title: 'For Kitchens',
    benefits: [
      'Simplified menu management',
      'Boost revenue with insights',
      'Streamlined order processing',
      'Real-time analytics dashboard'
    ]
  }
];

const Benefits = () => {
  return (
    <section className="py-5">
      <Container>
        <h2 className="text-center mb-5">Why Choose Us</h2>
        <Row>
          {benefitsData.map((benefit, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-primary mb-3 text-center">
                    {benefit.icon}
                  </div>
                  <h3 className="h4 text-center mb-4">{benefit.title}</h3>
                  <ul className="list-unstyled">
                    {benefit.benefits.map((item, idx) => (
                      <li key={idx} className="mb-2 d-flex align-items-center">
                        <div className="me-2 text-primary">•</div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Benefits;