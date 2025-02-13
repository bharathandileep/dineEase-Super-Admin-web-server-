import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  Accordion,
  Tab,
  Tabs,
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

// Add this import for profile image
import defaultProfile from "../../../assets/images/products/product-10.jpg";

// Add these imports for card images
import dashboardUI from "../../../assets/images/macbook.png";
import cakeImage from "../../../assets/images/products/product-5.png";

// Add this import for menu item images (you should replace with actual images)
import defaultFoodImage from "../../../assets/images/products/product-5.png";

interface MenuItem {
  name: string;
  price: number;
  description: string;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

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
    ffsai_card_owner_name: string;
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
interface Product {
  name: string;
  brand: string;
  description: string;
  price: number;
  discount: number;
  rating: number;
  status: string;
  features: string[];
}
const VerificationButton = () => (
  <Button
    variant="danger"
    className="d-flex align-items-center gap-2 px-3 py-2"
  >
    <i className="mdi mdi-close-circle-outline"></i>
    Not Verified
  </Button>
);
function KitchensDetails() {
  const { id } = useParams();
  const [kitchenData, setKitchenData] = useState<IKitchenDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [product] = useState<Product>({
    name: "Smart Wireless Headphones",
    brand: "SoundTech",
    description:
      "Experience high-quality sound with active noise cancellation and long battery life.",
    price: 250,
    discount: 15,
    rating: 4.7,
    status: "In Stock",
    features: [
      "Bluetooth 5.0 Connectivity",
      "Active Noise Cancellation",
      "20 Hours Battery Life",
      "Comfortable Over-Ear Fit",
      "Fast Charging Support",
    ],
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Handle add to cart
  const handleAddToCart = (item: MenuItem) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.name === item.name
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Checkout bar component
  const CheckoutBar = () => {
    if (cartItems.length === 0) return null;

    return (
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          padding: "1rem",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <span className="fw-bold">
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
          </span>
          <span className="ms-3">Total: ₹{totalPrice}</span>
        </div>
        <Button variant="primary">Proceed to Checkout</Button>
      </div>
    );
  };

  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  const onEdit = () => {
    navigate(`/apps/kitchen/edit/${id}`);
  };
  const onDelete = async () => {
    setLoading(true);

    try {
      const response = await deletekitchenDetails(id);
      if (response.status) {
        toast.success(response.message);
        navigate("/apps/kitchen/list");
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
    <div className="container-fluid px-4 py-3">
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb m-0">
          <li className="breadcrumb-item">
            <Link to="/products">Products</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {kitchenData?.kitchen_name}
          </li>
        </ol>
      </nav>
      <div
        className="mb-4 position-relative overflow-hidden"
        style={{
          backgroundColor: "#5bd2bc",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(91, 210, 188, 0.2)",
        }}
      >
        <Row className="align-items-start">
          <Col xs={12} md={3} className="text-center text-md-start">
            <div className="position-relative d-inline-block">
              <img
                src={kitchenData?.kitchen_image}
                alt="Business Profile"
                className="rounded-circle"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  border: "4px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                }}
              />
              <div
                className="position-absolute bg-success rounded-circle"
                style={{
                  border: "2px solid white",
                  width: "24px",
                  height: "24px",
                  bottom: "-10px",
                  right: "90px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  className="mdi mdi-check text-white"
                  style={{ fontSize: "14px" }}
                ></i>
              </div>
            </div>
          </Col>
          <Col
            xs={12}
            md={6}
            className="text-center text-md-start mt-4 mt-md-0"
          >
            <div className="d-flex flex-column h-100">
              <h2
                className="text-white mb-3"
                style={{
                  fontSize: "2rem",
                  fontWeight: "600",
                  lineHeight: "1.2",
                }}
              >
                {kitchenData?.kitchen_name}
              </h2>
              <div
                className="mb-3"
                style={{ display: "flex", flexDirection: "column" }}
              >
                {[
                  { icon: "account", text: "Dine Eas" },
                  { icon: "email", text: kitchenData?.owner_email },
                  { icon: "phone", text: kitchenData?.owner_phone_number },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center gap-2 mb-2"
                    style={{ color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    <i
                      className={`mdi mdi-${item.icon}`}
                      style={{ fontSize: "18px" }}
                    ></i>
                    <span style={{ fontSize: "0.95rem" }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="d-flex gap-2">
                {["Active", "Organic", "Veg"].map((badge, index) => (
                  <Badge
                    key={index}
                    className="rounded-pill px-2 py-1"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                    }}
                  >
                    <i
                      className={`mdi mdi-${
                        badge === "Active"
                          ? "check-circle"
                          : badge === "Organic"
                          ? "leaf"
                          : "food-apple"
                      } text-success me-1`}
                    ></i>
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </Col>
          <Col
            xs={12}
            md={3}
            className="d-flex justify-content-md-end mt-4 mt-md-0"
          >
            <div className="d-flex gap-2">
              <Button
                variant="light"
                className="d-flex align-items-center gap-1 px-3 py-1"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  fontSize: "0.9rem",
                  height: "35px",
                }}
                onClick={onEdit}
              >
                <i className="mdi mdi-pencil"></i>
                Edit
              </Button>
              <Button
                variant="danger"
                className="d-flex align-items-center gap-1 px-3 py-1"
                style={{
                  backgroundColor: "rgba(220, 53, 69, 0.9)",
                  border: "none",
                  fontSize: "0.9rem",
                  height: "35px",
                }}
                onClick={onDelete}
              >
                <i className="mdi mdi-delete"></i>
                Delete
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Information Cards */}
      <Row className="mb-4 g-3">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h5 className="card-title">FSSAI License</h5>
                <VerificationButton />
              </div>
              <div className="mb-3">
                <p className="mb-2">
                  <strong>Certificate Number:</strong>{" "}
                  {kitchenData?.fssaiDetails[0]?.ffsai_certificate_number}
                </p>
                <p className="mb-2">
                  <strong>Licence owner:</strong>{" "}
                  {kitchenData?.fssaiDetails[0]?.ffsai_card_owner_name}
                </p>
                <p className="mb-2">
                  <strong>Expiry Date:</strong>{" "}
                  {kitchenData?.fssaiDetails[0]?.expiry_date}
                </p>
              </div>
              <img
                src={kitchenData?.fssaiDetails[0]?.ffsai_certificate_image}
                alt="FSSAI Dashboard"
                className="img-fluid rounded"
                style={{
                  maxHeight: "150px",
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h5 className="card-title">PAN Details</h5>
                <VerificationButton />
              </div>
              <div className="mb-3">
                <p className="mb-2">
                  <strong>PAN Number:</strong>{" "}
                  {kitchenData?.panDetails[0]?.pan_card_number}
                </p>
                <p className="mb-2">
                  <strong>Card Holder:</strong>{" "}
                  {kitchenData?.panDetails[0]?.pan_card_user_name}
                </p>
              </div>
              <img
                src={kitchenData?.panDetails[0].pan_card_image}
                alt="Cake"
                className="img-fluid rounded"
                style={{ maxHeight: "150px", objectFit: "cover" }}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h5 className="card-title">GST Registration</h5>
                <VerificationButton />
              </div>
              <div className="mb-3">
                <p className="mb-2">
                  <strong>GST Number:</strong>{" "}
                  {kitchenData?.gstDetails[0].gst_number}
                </p>
                <p className="mb-2">
                  <strong>Expiry Date:</strong>{" "}
                  {kitchenData?.gstDetails[0].expiry_date}
                </p>
              </div>
              <img
                src={kitchenData?.gstDetails[0].gst_certificate_image}
                alt="GST Dashboard"
                className="img-fluid rounded"
                style={{
                  maxHeight: "150px",
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <h5 className="card-title mb-3">Location Details</h5>
              <p className="card-text mb-4">
                {kitchenData?.addresses[0]?.street_address},{" "}
                {kitchenData?.addresses[0]?.city},{" "}
                {kitchenData?.addresses[0]?.district},{" "}
                {kitchenData?.addresses[0]?.state},{" "}
                {kitchenData?.addresses[0]?.pincode},
                {kitchenData?.addresses[0]?.country}
              </p>
              <div
                className="map-container"
                style={{ height: "200px", width: "100%" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.769314809927!2d76.32868731479452!3d10.031941892830645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c31865e74c1%3A0x4742c12c4f2a903f!2sCochin%20University%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1645446314016!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "8px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <h4 className="mb-4">Our Menu</h4>
          <Tabs defaultActiveKey="breakfast" className="mb-4">
            <Tab eventKey="breakfast" title="Breakfast">
              <Accordion>
                {[
                  {
                    category: "South Indian",
                    items: [
                      {
                        name: "Masala Dosa",
                        price: 80,
                        description: "Crispy crepe filled with spiced potatoes",
                        image: defaultFoodImage,
                      },
                      {
                        name: "Idli Sambar",
                        price: 60,
                        description: "Steamed rice cakes with lentil soup",
                        image: defaultFoodImage,
                      },
                      {
                        name: "Vada",
                        price: 40,
                        description: "Crispy lentil donuts",
                        image: defaultFoodImage,
                      },
                    ],
                  },
                  {
                    category: "Continental",
                    items: [
                      {
                        name: "English Breakfast",
                        price: 250,
                        description: "Eggs, bacon, beans, and toast",
                        image: defaultFoodImage,
                      },
                      {
                        name: "Pancakes",
                        price: 150,
                        description: "Fluffy pancakes with maple syrup",
                        image: defaultFoodImage,
                      },
                    ],
                  },
                ].map((category, idx) => (
                  <Accordion.Item key={idx} eventKey={idx.toString()}>
                    <Accordion.Header>{category.category}</Accordion.Header>
                    <Accordion.Body>
                      {category.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="d-flex align-items-center mb-3 p-2 border-bottom"
                          style={{ gap: "15px" }}
                        >
                          {/* Image */}
                          <div
                            className="flex-shrink-0"
                            style={{ width: "80px", height: "80px" }}
                          >
                            <img
                              src={item.image || defaultFoodImage}
                              alt={item.name}
                              className="rounded"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>

                          {/* Name and Description */}
                          <div className="flex-grow-1">
                            <h6 className="mb-1">{item.name}</h6>
                            <small className="text-muted">
                              {item.description}
                            </small>
                          </div>

                          {/* Price and Add Button */}
                          <div
                            className="text-end d-flex flex-column align-items-end"
                            style={{ minWidth: "100px" }}
                          >
                            <h6 className="mb-2">₹{item.price}</h6>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="px-3"
                              onClick={() => handleAddToCart(item)}
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Tab>

            {/* Lunch Tab */}
            <Tab eventKey="lunch" title="Lunch">
              <Accordion>
                {[
                  {
                    category: "Main Course",
                    items: [
                      {
                        name: "Butter Chicken",
                        price: 280,
                        description: "Creamy tomato based chicken curry",
                        image: defaultFoodImage,
                      },
                      {
                        name: "Dal Makhani",
                        price: 180,
                        description: "Creamy black lentils",
                        image: defaultFoodImage,
                      },
                      {
                        name: "Veg Biryani",
                        price: 220,
                        description: "Fragrant rice with vegetables",
                        image: defaultFoodImage,
                      },
                    ],
                  },
                  {
                    category: "Breads",
                    items: [
                      {
                        name: "Naan",
                        price: 40,
                        description: "Butter naan",
                        image: defaultFoodImage,
                      },
                      {
                        name: "Roti",
                        price: 20,
                        description: "Whole wheat bread",
                        image: defaultFoodImage,
                      },
                    ],
                  },
                ].map((category, idx) => (
                  <Accordion.Item key={idx} eventKey={idx.toString()}>
                    <Accordion.Header>{category.category}</Accordion.Header>
                    <Accordion.Body>
                      {category.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="d-flex align-items-center mb-3 p-2 border-bottom"
                          style={{ gap: "15px" }}
                        >
                          {/* Image */}
                          <div
                            className="flex-shrink-0"
                            style={{ width: "80px", height: "80px" }}
                          >
                            <img
                              src={item.image || defaultFoodImage}
                              alt={item.name}
                              className="rounded"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>

                          {/* Name and Description */}
                          <div className="flex-grow-1">
                            <h6 className="mb-1">{item.name}</h6>
                            <small className="text-muted">
                              {item.description}
                            </small>
                          </div>

                          {/* Price and Add Button */}
                          <div
                            className="text-end d-flex flex-column align-items-end"
                            style={{ minWidth: "100px" }}
                          >
                            <h6 className="mb-2">₹{item.price}</h6>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="px-3"
                              onClick={() => handleAddToCart(item)}
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Tab>

            {/* Dinner Tab */}
            <Tab eventKey="dinner" title="Dinner">
              <Accordion>
                {[
                  {
                    category: "Starters",
                    items: [
                      {
                        name: "Paneer Tikka",
                        price: 200,
                        description: "Grilled cottage cheese with spices",
                        image: defaultFoodImage,
                      },
                      {
                        name: "Chicken 65",
                        price: 220,
                        description: "Spicy fried chicken",
                        image: defaultFoodImage,
                      },
                    ],
                  },
                  {
                    category: "Main Course",
                    items: [
                      {
                        name: "Fish Curry",
                        price: 300,
                        description: "Kerala style fish curry",
                        image: defaultFoodImage,
                      },
                      {
                        name: "Palak Paneer",
                        price: 220,
                        description: "Cottage cheese in spinach gravy",
                        image: defaultFoodImage,
                      },
                    ],
                  },
                ].map((category, idx) => (
                  <Accordion.Item key={idx} eventKey={idx.toString()}>
                    <Accordion.Header>{category.category}</Accordion.Header>
                    <Accordion.Body>
                      {category.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="d-flex align-items-center mb-3 p-2 border-bottom"
                          style={{ gap: "15px" }}
                        >
                          {/* Image */}
                          <div
                            className="flex-shrink-0"
                            style={{ width: "80px", height: "80px" }}
                          >
                            <img
                              src={item.image || defaultFoodImage}
                              alt={item.name}
                              className="rounded"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>

                          {/* Name and Description */}
                          <div className="flex-grow-1">
                            <h6 className="mb-1">{item.name}</h6>
                            <small className="text-muted">
                              {item.description}
                            </small>
                          </div>

                          {/* Price and Add Button */}
                          <div
                            className="text-end d-flex flex-column align-items-end"
                            style={{ minWidth: "100px" }}
                          >
                            <h6 className="mb-2">₹{item.price}</h6>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="px-3"
                              onClick={() => handleAddToCart(item)}
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </div>
  );
}

export default KitchensDetails;
