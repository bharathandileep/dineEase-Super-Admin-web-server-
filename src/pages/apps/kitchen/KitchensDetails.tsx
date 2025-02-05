import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deletekitchenDetails,
  getkitchenDetails,
} from "../../../server/admin/kitchens";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Badge,
} from "react-bootstrap";
import {
  CheckCircle2,
  XCircle,
  Utensils,
  Edit2,
  Trash2,
  MapPin,
  FileCheck,
  CreditCard,
  Building2,
  Globe,
  Building,
  Navigation,
} from "lucide-react";
import { toast } from "react-toastify";

export interface IKitchenDetails {
  _id: string;
  kitchen_name: string;
  kitchen_status: string;
  kitchen_owner_name: string;
  owner_email: string;
  owner_phone_number: string;
  restaurant_type: string;
  kitchen_type: string;
  kitchen_image: string;
  onEdit?: () => void;
  onDelete?: () => void;
  addresses: Array<{
    _id: string;
    street_address: string;
    city: string;
    state: string;
    district: string;
    pincode: string;
    country: string;
  }>;
  fssaiDetails: Array<{
    _id: string;
    ffsai_certificate_number: string;
    expiry_date: string;
    is_verified: boolean;
    ffsai_certificate_image: string;
  }>;
  panDetails: Array<{
    pan_card_image: string | undefined;
    _id: string;
    pan_card_number: string;
    pan_card_user_name: string;
    is_verified: boolean;
  }>;
  gstDetails: Array<{
    gst_certificate_image: string | undefined;
    _id: string;
    gst_number: string;
    expiry_date: string;
    is_verified: boolean;
  }>;
}

function KitchensDetails() {
  const { id } = useParams();
  const [kitchenData, setKitchenData] = useState<IKitchenDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const onEdit = () => {
    navigate(`/apps/kitchen/edit/${id}`);
  };
  const onDelete = async () => {
    setLoading(true); // Start loading state

    try {
      const response = await deletekitchenDetails(id);
      if (response.status) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting kitchen details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchKitchenDetails = async () => {
      try {
        const response = await getkitchenDetails(id);
        setKitchenData(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching kitchen details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchKitchenDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!kitchenData) {
    return <div>No data found</div>;
  }

  return (
    <Container className="py-4">
      <Card className="mb-4 bg-primary text-white">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={3} className="text-center mb-3 mb-md-0">
              <div className="position-relative d-inline-block">
                <Image
                  src={kitchenData?.kitchen_image}
                  roundedCircle
                  className="border border-3 border-white"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <Badge
                  bg={
                    kitchenData?.kitchen_status === "active"
                      ? "success"
                      : "danger"
                  }
                  className="position-absolute top-0 end-0"
                >
                  {kitchenData?.kitchen_status}
                </Badge>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex align-items-center mb-3">
                <Utensils className="me-2" />
                <h1 className="mb-0">{kitchenData?.kitchen_name}</h1>
              </div>
              <Row>
                <Col md={6}>
                  <p className="mb-1">
                    <strong>Owner:</strong> {kitchenData?.kitchen_owner_name}
                  </p>
                  <p className="mb-1">
                    <strong>Email:</strong> {kitchenData?.owner_email}
                  </p>
                </Col>
                <Col md={6}>
                  <p className="mb-1">
                    <strong>Phone:</strong> {kitchenData?.owner_phone_number}
                  </p>
                  <div>
                    <Badge bg="info" className="me-2">
                      {kitchenData?.restaurant_type}
                    </Badge>
                    <Badge bg="info">{kitchenData?.kitchen_type}</Badge>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={3} className="text-end">
              <Button variant="light" className="me-2" onClick={onEdit}>
                <Edit2 className="me-1" /> Edit
              </Button>
              <Button variant="danger" onClick={onDelete}>
                <Trash2 className="me-1" /> Delete
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row>
        {/* Address Section */}
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header className="d-flex align-items-center">
              <MapPin className="me-2" />
              <Card.Title className="mb-0">Location Details</Card.Title>
            </Card.Header>
            <Card.Body>
              {kitchenData?.addresses.map((address) => (
                <div key={address._id}>
                  <Card className="mb-3">
                    <Card.Body>
                      <div className="d-flex align-items-center mb-2">
                        <Building className="me-2" />
                        <h5 className="mb-0">{address.street_address}</h5>
                      </div>
                      <p className="mb-1">
                        {address.city}, {address.district}
                      </p>
                      <p className="mb-1">
                        {address.state}, {address.pincode}
                      </p>
                      <p className="mb-2">{address.country}</p>
                      <Button
                        variant="outline-primary"
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${address.street_address} ${address.city} ${address.state} ${address.country}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="me-1" /> View on Google Maps
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* FSSAI Details */}
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header className="d-flex align-items-center">
              <FileCheck className="me-2" />
              <Card.Title className="mb-0">FSSAI License</Card.Title>
            </Card.Header>
            <Card.Body>
              {kitchenData?.fssaiDetails.map((fssai) => (
                <Card key={fssai._id} className="mb-3">
                  <Card.Body>
                    <Row className="mb-2">
                      <Col>Certificate Number</Col>
                      <Col className="text-end">
                        {fssai.ffsai_certificate_number}
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>Expiry Date</Col>
                      <Col className="text-end">
                        {new Date(fssai.expiry_date).toLocaleDateString()}
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>Status</Col>
                      <Col className="text-end">
                        {fssai.is_verified ? (
                          <Badge bg="success">
                            <CheckCircle2 className="me-1" /> Verified
                          </Badge>
                        ) : (
                          <Badge bg="danger">
                            <XCircle className="me-1" /> Not Verified
                          </Badge>
                        )}
                      </Col>
                    </Row>
                    {fssai.ffsai_certificate_number && (
                      <Image
                        src={fssai.ffsai_certificate_image}
                        fluid
                        rounded
                        className="mt-2"
                        alt="FSSAI Certificate"
                      />
                    )}
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* PAN Details */}
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header className="d-flex align-items-center">
              <CreditCard className="me-2" />
              <Card.Title className="mb-0">PAN Details</Card.Title>
            </Card.Header>
            <Card.Body>
              {kitchenData.panDetails.map((pan) => (
                <Card key={pan._id} className="mb-3">
                  <Card.Body>
                    <Row className="mb-2">
                      <Col>PAN Number</Col>
                      <Col className="text-end">{pan.pan_card_number}</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>Card Holder</Col>
                      <Col className="text-end">{pan.pan_card_user_name}</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>Status</Col>
                      <Col className="text-end">
                        {pan.is_verified ? (
                          <Badge bg="success">
                            <CheckCircle2 className="me-1" /> Verified
                          </Badge>
                        ) : (
                          <Badge bg="danger">
                            <XCircle className="me-1" /> Not Verified
                          </Badge>
                        )}
                      </Col>
                    </Row>
                    {pan.pan_card_image && (
                      <Image
                        src={pan.pan_card_image}
                        fluid
                        rounded
                        className="mt-2"
                        alt="PAN Card"
                      />
                    )}
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* GST Details */}
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header className="d-flex align-items-center">
              <Building2 className="me-2" />
              <Card.Title className="mb-0">GST Registration</Card.Title>
            </Card.Header>
            <Card.Body>
              {kitchenData.gstDetails.map((gst) => (
                <Card key={gst._id} className="mb-3">
                  <Card.Body>
                    <Row className="mb-2">
                      <Col>GST Number</Col>
                      <Col className="text-end">{gst.gst_number}</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>Expiry Date</Col>
                      <Col className="text-end">
                        {new Date(gst.expiry_date).toLocaleDateString()}
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>Status</Col>
                      <Col className="text-end">
                        {gst.is_verified ? (
                          <Badge bg="success">
                            <CheckCircle2 className="me-1" /> Verified
                          </Badge>
                        ) : (
                          <Badge bg="danger">
                            <XCircle className="me-1" /> Not Verified
                          </Badge>
                        )}
                      </Col>
                    </Row>
                    {gst.gst_certificate_image && (
                      <Image
                        src={gst.gst_certificate_image}
                        fluid
                        rounded
                        className="mt-2"
                        alt="GST Certificate"
                      />
                    )}
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default KitchensDetails;
