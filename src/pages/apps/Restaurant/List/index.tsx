import React from "react";
import { Row, Col } from "react-bootstrap";
import PageTitle from "../../../../components/PageTitle";
import Statistics from "./Statistics";
import ManageTickets from "./ManageTickets";
import { ticketDetails } from "./data";

const List: React.FC = () => {
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Tickets", path: "/apps/tickets/list" },
          { label: "Ticket List", path: "/apps/tickets/list", active: true },
        ]}
        title={"Ticket List"}
      />
      <Row>
        <Col md={6} xl={3}>
          <Statistics
            icon="fe-tag"
            variant="primary"
            stats="3947"
            navigatePath="/apps/restaurants/company"
            desc="Total Restaurants"
          />
        </Col>
        <Col md={6} xl={3}>
          <Statistics
            icon="fe-clock"
            variant="warning"
            stats="624"
            navigatePath=""
            desc="Pending Orders"
          />
        </Col>
        <Col md={6} xl={3}>
          <Statistics
            icon="fe-check-circle"
            variant="success"
            stats="3195"
            navigatePath="/apps/restaurants/company"
            desc="Completed Orders"
          />
        </Col>
        <Col md={6} xl={3}>
          <Statistics
            icon="fe-trash-2"
            variant="danger"
            stats="128"
            navigatePath="/apps/restaurants/company"
            desc="Total Orders"
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <ManageTickets ticketDetails={ticketDetails} />
        </Col>
      </Row>
    </>
  );
};

export default List;
