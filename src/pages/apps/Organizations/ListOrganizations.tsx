import axios from "axios";
import { log } from "console";
import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import CompanyDetails from "../Company/CompanyDetails";
import { companyInfo } from "../Company/data";
import { getAllOrg } from "../../../server/admin/organization";

function ListOrganizations() {
  const [orgDetails, setOrgDetails] = useState([]);
  useEffect(() => {
    const fetchAllkitchens = async () => {
      try {
        const response = await getAllOrg();
        console.log(response.data.kitchens);
        setOrgDetails(response.data.kitchens);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllkitchens();
  }, []);
  return (
    <>
      <CompanyDetails companyInfo={orgDetails} />
    </>
  );
}

export default ListOrganizations;
