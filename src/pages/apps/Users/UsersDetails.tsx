import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Users } from "./data";
// import AddUsersModal from "./List/AddUsers";
import List from './List'
import { Company, fetchCompanyApi } from "../../../server/allApi";
interface UsersDetailsProps {
  usersInfo: Users[];
}

const UsersDetails: React.FC = () => {

 
  
  // const onSearchData = (value: string) => {
  //   if (value === "") setUsersInfo(props.usersInfo);
  //   else {
  //     const modifiedUsers = props.usersInfo.filter(
  //       (item) =>
  //         item.name.toLowerCase().includes(value) ||
  //         item.MobNumber.toLowerCase().includes(value)||
  //         item.email.toLowerCase().includes(value)||
  //         item.address.toLowerCase().includes(value)||
  //         item.orders.toLowerCase().includes(value)
  //     );
  //     setUsersInfo(modifiedUsers);
  //   }
  // };

  // const onCloseAddModal = () => setShowAddModal(false);
  // const onOpenAddModal = () => {
  //   console.log("Opening modal");
  //   setShowAddModal(true);
  // };
  // const onSubmit = (formData: Users) => {
  //   const newUsers: Users = {
  //     id: usersInfo.length + 1,
  //     name: formData.name,
  //     MobNumber: formData.MobNumber,
  //     address: formData.address,
  //     email: formData.email,
  //     orders: formData.orders
  //   };
  //   setUsersInfo([...usersInfo, newUsers]);
  //   onCloseAddModal();
  // };

  return (
   <>
   <List/>
   </>
  );
  
};

export default UsersDetails;
