import React from "react";
import { Row, Col, Card } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";
import Table from "../../../components/Table";
// import PageTitle from "../../components/PageTitle";
// import Table from "../../components/Table";

//dummy data
import { records as data, expandableRecords } from "../../tables/data";
// import { records as data, expandableRecords } from "./data";

const columns = [
  {
    Header: "ID",
    accessor: "id",
    sort: true,
  },
  {
    Header: "Company",
    accessor: "company",
    sort: true,
  },
  {
    Header: "Phone Number",
    accessor: "phone",
    sort: false,
  },
  {
    Header: "User",
    accessor: "name",
    sort: true,
  },
  {
    Header: "Orders",
    accessor: "order",
    sort: true,
  },
  {
    Header: "Restaurants",
    accessor: "restaurant",
    sort: false,
  },
];

const sizePerPageList = [
  {
    text: "5",
    value: 5,
  },
  {
    text: "10",
    value: 10,
  },
  {
    text: "25",
    value: 25,
  },
  {
    text: "All",
    value: data.length,
  },
];

const Advanced = () => {
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Tables", path: "/features/tables/advanced" },
          {
            label: "Advanced Tables",
            path: "/features/tables/advanced",
            active: true,
          },
        ]}
        title={"Advanced Tables"}
      />

     

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title">Total Restaurants</h4>
              <p className="text-muted font-14 mb-4">Total Restaurants Collaborating with each Company</p>

              <Table
                columns={columns}
                data={data}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSearchable={true}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>


    </>
  );
};

export default Advanced;