import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Individual User',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    quote: 'The pre-ordering system has made my meal planning so much easier. I love the personalization options!',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'HR Manager',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    quote: 'Managing corporate meals has never been easier. The bulk ordering feature saves us hours every week.',
    rating: 5
  },
  {
    name: 'Emma Rodriguez',
    role: 'Restaurant Owner',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    quote: 'Since joining the platform, our revenue has increased by 40%. The analytics tools are invaluable.',
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-5">
      <Container>
        <h2 className="text-center mb-5">What Our Users Say</h2>
        <Row>
          {testimonials.map((testimonial, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-primary mb-3">
                    <Quote size={24} />
                  </div>
                  <p className="mb-4">{testimonial.quote}</p>
                  <div className="d-flex align-items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="rounded-circle me-3"
                      style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                    />
                    <div>
                      <h5 className="mb-0">{testimonial.name}</h5>
                      <p className="text-muted small mb-0">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mt-3 text-warning">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;