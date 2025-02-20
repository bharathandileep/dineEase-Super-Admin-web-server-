
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import QRCode from 'react-qr-code';

const AppDownload = () => {
  return (
    <section className="py-5 app-download-section bg-primary text-white">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <h2 className="display-4 mb-4">Order on the Go!</h2>
            <p className="lead mb-4">Download our app for a seamless experience. Pre-order your meals anytime, anywhere.</p>
            <div className="d-flex gap-3 mb-4">
              <Button variant="light" size="lg" className="p-0 border-0 bg-transparent">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="img-fluid" style={{ width: '150px', height: 'auto' }} />
              </Button>
              <Button variant="light" size="lg" className="p-0 border-0 bg-transparent">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Download_on_the_App_Store_RGB_blk.svg/1280px-Download_on_the_App_Store_RGB_blk.svg.png" alt="App Store" className="img-fluid" style={{ width: '150px', height: 'auto' }} />
              </Button>
            </div>
          </Col>
          <Col lg={6} className="text-center">
            <div className="bg-white p-4 rounded d-inline-block">
              <QRCode value="https://example.com/app" size={200} />
            </div>
            <p className="mt-3">Scan to download the app</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AppDownload;


