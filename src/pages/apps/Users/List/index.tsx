import React from "react";
import { Row, Col } from "react-bootstrap";

// components
import PageTitle from "../../../../components/PageTitle";
import Statistics from "./Statistics";
import ManageTickets from "./ManageTickets";

// dummy data
import { ticketDetails } from "./data";

// Define BreadcrumbItems interface
interface BreadcrumbItem {
  label: string;
  path: string;
  active?: boolean;
}

const List = () => {
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Users", path: "/apps/users/list" },
          { label: "USERS List", path: "/apps/users/list", active: true },
        ]}
        title="Users List"
      />
      {/* <Row>
        <Col md={6} xl={3}>
          <Statistics
            icon="fe-tag"
            variant="primary"
            stats="3947"
            desc="Total Restaurants"
          />
        </Col>
        <Col md={6} xl={3}>
          <Statistics
            icon="fe-clock"
            variant="warning"
            stats="624"
            desc="Pending Orders"
          />
        </Col>
        <Col md={6} xl={3}>
          <Statistics
            icon="fe-check-circle"
            variant="success"
            stats="3195"
            desc="Completed Orders"
          />
        </Col>
        <Col md={6} xl={3}>
          <Statistics
            icon="fe-trash-2"
            variant="danger"
            stats="128"
            desc="Total Orders"
          />
        </Col>
      </Row> */}

      <Row>
        <Col>
          <ManageTickets />
        </Col>
      </Row>
    </>
  );
};

export default List;
