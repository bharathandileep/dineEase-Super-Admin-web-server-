import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Clock, Utensils, Bell, Leaf, Users, Settings } from 'lucide-react';

const features = [
  {
    icon: <Clock size={40} />,
    title: 'Pre-order Meals',
    description: 'Plan ahead and schedule your meals with ease'
  },
  {
    icon: <Utensils size={40} />,
    title: 'Customizable Plans',
    description: 'Tailor your meal plans to your preferences'
  },
  {
    icon: <Bell size={40} />,
    title: 'Real-Time Tracking',
    description: 'Know exactly when your food will arrive'
  },
  {
    icon: <Leaf size={40} />,
    title: 'Dietary Options',
    description: 'Vegan, gluten-free, and more dietary choices'
  },
  {
    icon: <Users size={40} />,
    title: 'Bulk Orders',
    description: 'Perfect for organizations and events'
  },
  {
    icon: <Settings size={40} />,
    title: 'Multi-Role Management',
    description: 'Efficient system for all user types'
  }
];

const Features = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-5">Key Features</h2>
        <Row>
          {features.map((feature, index) => (
            <Col key={index} md={6} lg={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="text-primary mb-3">
                    {feature.icon}
                  </div>
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text>{feature.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;