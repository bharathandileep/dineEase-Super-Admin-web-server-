import React from "react";
import { Row, Col } from "react-bootstrap";
import StatisticsWidget3 from "../../../components/StatisticsWidget3";

const Statistics = () => {
  return (
    <Row>
      <Col md={6} xl={3}>
        <StatisticsWidget3
          title="Restaurants"
          stats="31570"
          trend={{
            label: "Total Restaurants",
            value: "$22506",
            icon: "fa-caret-up",
            variant: "success",
            trendStats: "10.25%",
            navigatePath: "/apps/restaurants",
          }}
          counterOptions={{
            prefix: "$",
          }}
        />
      </Col>
      <Col md={6} xl={3}>
        <StatisticsWidget3
          title="Organization Status"
          stats="683"
          trend={{
            label: "Total Organizations",
            value: "2398",
            icon: "fa-caret-down",
            variant: "danger",
            trendStats: "7.85%",
            navigatePath: "/apps/companies",
          }}
        />
      </Col>
      <Col md={6} xl={3}>
        <StatisticsWidget3
          title="Users"
          stats="3.2"
          trend={{
            label: "Total users",
            value: "121 M",
            icon: "fa-caret-up",
            variant: "success",
            trendStats: "3.64%",
            navigatePath: "/apps/users",
          }}
          counterOptions={{
            suffix: "M",
            decimals: 1,
          }}
        />
      </Col>
      <Col md={6} xl={3}>
        <StatisticsWidget3
          title="Total Revenue"
          stats="68541"
          trend={{
            label: "Total revenue",
            value: "$1.2 M",
            icon: "fa-caret-up",
            variant: "success",
            trendStats: "17.48%",
            navigatePath: "/revenue",
          }}
          counterOptions={{
            prefix: "$",
          }}
        />
      </Col>
    </Row>
  );
};

export default Statistics;
