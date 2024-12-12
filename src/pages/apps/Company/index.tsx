import React from "react";
import PageTitle from "../../../components/PageTitle";
import CompanyDetails from "./CompanyDetails";

const Companies: React.FC = () => {
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Apps", path: "/apps/companies" },
          { label: "Companies", path: "/apps/companies", active: true },
        ]}
        title={"Companies"}
      />
      <CompanyDetails />
    </>
  );
};

export default Companies;