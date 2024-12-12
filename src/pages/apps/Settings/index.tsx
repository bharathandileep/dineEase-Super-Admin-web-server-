import React, { useState } from "react";
import { Row, Col, Card, Tab, Nav } from "react-bootstrap";
import classnames from "classnames";

// components
import PageTitle from "../../../components/PageTitle";

import Billing from "./CompanySettings";
import Shipping from "./RolesAndPermissions";
import Payment from "../Ecommerce/Checkout/Payment";
import Summary from "../Ecommerce/Checkout/Summary";

// import productImg5 from "../../../../assets/images/products/product-5.png";
// import productImg2 from "../../../../assets/images/products/product-1.png";
// import productImg3 from "../../../../assets/images/products/product-3.png";

interface CartItems {
  items: {
    id: number;
    image: string;
    name: string;
    size: string;
    color: string;
    price: number;
    qty: number;
    total: number;
  }[];
  sub_total: number;
  shipping: number;
  total: number;
}

// Checkout
const Checkout = () => {
//   const [cart, setCart] = useState<CartItems>({
//     items: [
//       {
//         id: 1,
//         image: "",
//         name: "Polo Navy blue T-shirt",
//         size: "Large",
//         color: "Light Green",
//         price: 39,
//         qty: 1,
//         total: 39,
//       },
//       {
//         id: 2,
//         image: "",
//         name: "Red Hoodie for men",
//         size: "Small",
//         color: "Brown",
//         price: 46,
//         qty: 2,
//         total: 92,
//       },
//       {
//         id: 3,
//         image: "",
//         name: "	Designer Awesome T-Shirt",
//         size: "Medium",
//         color: "Green",
//         price: 26,
//         qty: 1,
//         total: 26,
//       },
//     ],
//     sub_total: 157,
//     shipping: 0,
//     total: 157,
//   });

  /**
   * Update the shipping cost
   */
//   const updateShipping = (shippingCost: number) => {
//     var localCart = { ...cart };
//     localCart["shipping"] = shippingCost;
//     localCart["total"] = localCart["sub_total"] + shippingCost;
//     setCart(localCart);
//   };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "settings", path: "/apps/settings" },
          { label: "settings", path: "/apps/settings/companysettings", active: true },
        ]}
        title={"settings"}
      />
      <Tab.Container defaultActiveKey="1">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Row>
                  <Col lg={4}>
                    <Nav
                      variant="pills"
                      className="nav nav-pills flex-column navtab-bg nav-pills-tab text-center"
                    >
                      <Nav.Link
                        href="#"
                        eventKey="1"
                        className="nav-link cursor-pointer py-2"
                      >
                        <i
                          className={classnames(
                            "mdi mdi-account-circle",
                            "d-block",
                            "font-24"
                          )}
                        ></i>
                        <span className="d-none d-lg-block">Company Settings</span>
                      </Nav.Link>
                      <Nav.Link
                        href="#"
                        eventKey="2"
                        className="nav-link cursor-pointer mt-2 py-2"
                      >
                        <i
                          className={classnames(
                            "mdi mdi-account-circle",
                            "d-block",
                            "font-24"
                          )}
                        ></i>
                        <span className="d-none d-lg-block">Roles and Permissions</span>
                      </Nav.Link>
                      <Nav.Link
                        href="#"
                        eventKey="3"
                        className="nav-link cursor-pointer mt-2 py-2"
                      >
                        <i
                          className={classnames(
                            "mdi mdi-cash-multiple",
                            "d-block",
                            "font-24"
                          )}
                        ></i>
                        <span className="d-none d-lg-block">Payment Info</span>
                      </Nav.Link>
                    </Nav>
                    {/* <Summary  /> */}
                  </Col>
                  <Col lg={8}>
                    <Tab.Content className="p-3">
                      <Tab.Pane eventKey="1">
                        <Billing />
                      </Tab.Pane>
                      <Tab.Pane eventKey="2">
                        <Shipping/>
                      </Tab.Pane>
                      {/* <Tab.Pane eventKey="3">
                        <Payment />
                      </Tab.Pane> */}
                    </Tab.Content>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default Checkout;
