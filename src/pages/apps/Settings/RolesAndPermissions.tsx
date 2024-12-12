import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MaskedInput from "react-text-mask";

// components
import { FormInput } from "../../../components";
import PermissionsTable from "./TableRoles"; 

const Payment = () => {
  const methods = useForm();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  const [showPermissions, setShowPermissions] = useState(false);
  const [ showPermissions1, setShowPermissions1] = useState(false);
  const [ showPermissions2, setShowPermissions2] = useState(false);
  const [ showPermissions3, setShowPermissions3] = useState(false);
  const [ showPermissions4, setShowPermissions4] = useState(false);

  const permissions = [
    { module: "Module 1", add: true, view: true, update: false, delete: false },
    { module: "Module 2", add: true, view: true, update: true, delete: true },
    // Add more permission data as needed
  ];

  const handleTogglePermissions = () => {
    setShowPermissions(!showPermissions);
  };

  const handleTogglePermissions1 = () => {
    setShowPermissions1(!showPermissions1)
  }
  const handleTogglePermissions2 = () => {
    setShowPermissions2(!showPermissions2)
  }
  const handleTogglePermissions3 = () => {
    setShowPermissions3(!showPermissions3)
  }
  const handleTogglePermissions4 = () => {
    setShowPermissions4(!showPermissions4)
  }

  return (
    <React.Fragment>
      <div>
        <h4 className="header-title">Roles and Permissions</h4>
        <p className="sub-header">Fill the form below.</p>

        <div className="border p-3 mb-3 rounded">
          <div className="float-end">
            {/* <i className="fab fa-cc-paypal font-24 text-primary"></i> */}
          </div>
          <div className="form-check">
            {/* <input
              type="radio"
              id="BillingOptRadioAdmin"
              name="billingOptions"
              className="form-check-input"
              onChange={handleTogglePermissions}
            /> */}
            <label
              className="form-check-label font-16 fw-bold"
              htmlFor="BillingOptRadioAdmin"
              onClick={handleTogglePermissions}
            >
              Administration
            </label>
          </div>
        </div>

        {showPermissions && <PermissionsTable permissions={permissions} />}

        <div className="border p-3 mb-3 rounded">
          <div className="float-end">
            {/* <i className="far fa-credit-card font-24 text-primary"></i> */}
          </div>
          <div className="form-check">
           
            <label
              className="form-check-label font-16 fw-bold"
              htmlFor="BillingOptRadio1"
              onClick={handleTogglePermissions1}
            >
              Employee
            </label>
          </div>
        </div>
        {showPermissions1 && <PermissionsTable permissions={permissions} />}

        <div className="border p-3 mb-3 rounded">
          <div className="float-end">
            {/* <i className="far fa-credit-card font-24 text-primary"></i> */}
          </div>
          <div className="form-check">
           
            <label
              className="form-check-label font-16 fw-bold"
              htmlFor="BillingOptRadio1"
              onClick={handleTogglePermissions2}
            >
              Client
            </label>
          </div>
        </div>
        {showPermissions2 && <PermissionsTable permissions={permissions} />}
        <div className="border p-3 mb-3 rounded">
          <div className="float-end">
            {/* <i className="far fa-credit-card font-24 text-primary"></i> */}
          </div>
          <div className="form-check">
           
            <label
              className="form-check-label font-16 fw-bold"
              htmlFor="BillingOptRadio1"
              onClick={handleTogglePermissions3}
            >
              H R
            </label>
          </div>
        </div>
        {showPermissions3 && <PermissionsTable permissions={permissions} />}
        <div className="border p-3 mb-3 rounded">
          <div className="float-end">
            {/* <i className="far fa-credit-card font-24 text-primary"></i> */}
          </div>
          <div className="form-check">
           
            <label
              className="form-check-label font-16 fw-bold"
              htmlFor="BillingOptRadio1"
              onClick={handleTogglePermissions4}
            >
              Accountant
            </label>
          </div>
        </div>
        {showPermissions4 && <PermissionsTable permissions={permissions} />}
      </div>
    </React.Fragment>
  );
};

export default Payment;
