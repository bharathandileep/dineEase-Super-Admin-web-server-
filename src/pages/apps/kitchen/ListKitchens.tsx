import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CompanyDetails from "../CRM/Opportunities/CompanyDetails";
import { companyInfo } from "../CRM/Opportunities/data";
import { getAllKitches } from "../../../server/admin/kitchens";

function ListKitchens() {
  const [kitchenDetails, setKitchensDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllkitchens = async () => {
      try {
        const response = await getAllKitches();
        setKitchensDetails(response.data.kitchens || []);
      } catch (error) {
        console.error("Error fetching kitchens:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllkitchens();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading kitchens...</p>
      </div>
    );
  }

  if (!kitchenDetails.length) {
    return (
      <div className="text-center my-5">
        <h4>No kitchens found</h4>
        <p>There are currently no kitchens available.</p>
      </div>
    );
  }

  return (
    <>
      <Row>
        <CompanyDetails companyInfo={kitchenDetails} />
      </Row>
    </>
  );
}
export default ListKitchens;
