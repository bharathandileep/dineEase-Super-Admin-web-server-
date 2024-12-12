import React from "react";
import PageTitle from "../../../components/PageTitle";
import ListRestaurants from "./ListRestaurants";
import { Restaurant, restaurantInfo } from "./data";
import { detailsInfo } from "./Staffdata"; // Import the detailsInfo data
import PaginatedTable from "./StaffDetails";

const Restaurants = () => {
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Apps", path: "/apps/restaurants" },
          { label: "Restaurants", path: "/apps/restaurants", active: true },
        ]}
        title={"Restaurants"}
      />
      <ListRestaurants/>
      </>
  );
};

export default Restaurants;
