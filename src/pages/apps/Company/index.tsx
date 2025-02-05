import React from "react";
import PageTitle from "../../../components/PageTitle";
import CompanyDetails from "./CompanyDetails";
import { companyInfo } from "./data";


const Companies: React.FC = () => {
  return (
    <>
      <CompanyDetails companyInfo={companyInfo} />
    </>
  );
};

export default Companies;