import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card } from "react-bootstrap";

const ContactUs = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();

  };

  return (
    <div className="py-12 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Contact Us</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
            <p className="text-gray-600 mb-6">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="h-5 w-5" />
              <span>support@foodiehub.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="h-5 w-5" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-5 w-5" />
              <span>123 Food Street, Cuisine City, FC 12345</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <Card>
          <Card.Body className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name">Name</label>
                <input id="name" placeholder="Enter your name" />
              </div>

              <div className="space-y-2">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="Enter your email" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  placeholder="Your message"
                  className="min-h-[120px]"
                />
              </div>

              <button type="submit" className="w-full">
                Send Message
              </button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ContactUs;
