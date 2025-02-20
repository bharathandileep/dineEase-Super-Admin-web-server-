import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '49',
    features: [
      'Up to 50 meals per month',
      'Basic analytics',
      'Email support',
      'Standard delivery'
    ]
  },
  {
    name: 'Professional',
    price: '99',
    features: [
      'Up to 200 meals per month',
      'Advanced analytics',
      'Priority support',
      'Express delivery'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Unlimited meals',
      'Custom analytics',
      '24/7 dedicated support',
      'Custom delivery options'
    ]
  }
];

const Pricing = () => {
  return (
    <section className="py-5">
      <Container>
        <h2 className="text-center mb-5">Pricing Plans</h2>
        <Row>
          {plans.map((plan, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className={`h-100 border-0 shadow-sm ${index === 1 ? 'pricing-highlight' : ''}`}>
                <Card.Body className="p-4">
                  <h3 className="text-center mb-4">{plan.name}</h3>
                  <div className="text-center mb-4">
                    <span className="h2">${plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-muted">/month</span>}
                  </div>
                  <ul className="list-unstyled mb-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="mb-2 d-flex align-items-center">
                        <Check size={18} className={`${index === 1 ? 'text-white' : 'text-primary'} me-2`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant={index === 1 ? "light" : "primary"} className="w-100">
                    {plan.price === 'Custom' ? 'Get a Quote' : 'Get Started'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Pricing;