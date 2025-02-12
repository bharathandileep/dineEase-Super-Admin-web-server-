import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import FileUploader from "../../../components/FileUploader";
import { FormInput } from "../../../components/";
import { createEmployee } from "../../../server/admin/employeemanagment";
import { getAllDesignations } from "../../../server/admin/designations"; // Import the API to fetch designations

const EmployeeManagement = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [designations, setDesignations] = useState<{ _id: string; designation_name: string }[]>([]); // State to store designations
  const [loading, setLoading] = useState(false); // Loading state for designations

  // Fetch designations on component mount
  useEffect(() => {
    const fetchDesignations = async () => {
      setLoading(true);
      try {
        const response = await getAllDesignations();
        if (response.status) {
          setDesignations(response.data); // Set fetched designations
        } else {
          toast.error("Failed to load designations.");
        }
      } catch (error) {
        console.error("Error fetching designations:", error);
        toast.error("An error occurred while fetching designations.");
      } finally {
        setLoading(false);
      }
    };
    fetchDesignations();
  }, []);

  // Validation Schema
  const schema = yup.object().shape({
    username: yup.string().required("Employee name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone_number: yup.string().required("Phone number is required"),
    designation: yup.string().required("Designation is required"),
    street_address: yup.string().required("Street address is required"),
    city: yup.string().required("City is required"),
    pincode: yup.string().required("Pincode is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
    aadhar_number: yup.string().required("Aadhaar number is required"),
    pan_number: yup.string().required("PAN number is required"),
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Handle Form Submission
  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const formData = new FormData();

      formData.append("entity_id", "67a1083b3c9f01a384e9683c");
      formData.append("entity_type", "admin");
      formData.append("designation", data.designation);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("phone_number", data.phone_number);
      formData.append("role", "Employee");
      formData.append("employee_status", "Active");
      formData.append("aadhar_number", data.aadhar_number);
      formData.append("pan_number", data.pan_number);

      // Address Fields
      formData.append("street_address", data.street_address);
      formData.append("city", data.city);
      formData.append("district", data.District);
      formData.append("pincode", data.pincode);
      formData.append("state", data.state);
      formData.append("country", data.country);

      // Profile Picture Upload
      if (profileImage) {
        formData.append("profile_picture", profileImage);
      }

      const response = await createEmployee(formData);

      if (response.status) {
        toast.success("Employee added successfully!");
        navigate("/apps/employee/list");
      } else {
        toast.error(response.message || "Failed to add employee.");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("Error adding employee. Please try again.");
    }
  };

  // Handle File Upload
  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      setProfileImage(files[0]);
    }
  };

  return (
    <div className="container py-2">
      <Card className="mb-2">
        <Card.Body>
          <h3 className="text-uppercase">Add Employee</h3>
        </Card.Body>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {/* Left Column - Employee Details */}
          <Col lg={6}>
            <Card>
              <Card.Body>
                <h5 className="text-uppercase mt-0 mb-3">General Information</h5>
                <FormInput name="username" label="Employee Name" placeholder="Enter full name" containerClass="mb-3" register={register} errors={errors} control={control} />
                <FormInput name="email" label="Email" placeholder="Enter email" containerClass="mb-3" register={register} errors={errors} control={control} type="email" />
                <FormInput name="phone_number" label="Phone Number" placeholder="Enter phone number" containerClass="mb-3" register={register} errors={errors} control={control} />
                <FormInput
                  name="designation"
                  label="Designation"
                  containerClass="mb-3"
                  register={register}
                  errors={errors}
                  control={control}
                  type="select"
                  defaultValue=""
                >
                  <option value="">Select Designation</option>
                  {designations.map((designation) => (
                    <option key={designation._id} value={designation._id}>
                      {designation.designation_name}
                    </option>
                  ))}
                </FormInput>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column - Profile Picture Upload */}
          <Col lg={6}>
            <Card>
              <Card.Body className="text-center">
                <h5 className="text-uppercase mt-0 mb-3">Profile Picture</h5>
                <FileUploader onFileUpload={(files) => handleFileUpload(Array.from(files))} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Address Information */}
        <Row>
          <Col lg={12}>
            <Card className="mt-3">
              <Card.Body>
                <h5 className="text-uppercase mt-0 mb-3">Address Information</h5>
                <Row>
                  <Col md={6}>
                    <FormInput name="street_address" label="Street Address" placeholder="Enter street address" containerClass="mb-3" register={register} errors={errors} control={control} />
                  </Col>
            
                  <Col md={4}>
                    <FormInput name="city" label="City" placeholder="Enter city" containerClass="mb-3" register={register} errors={errors} control={control} />
                  </Col>
                  <Col md={4}>
                    <FormInput name="pincode" label="Pincode" placeholder="Enter pincode" containerClass="mb-3" register={register} errors={errors} control={control} />
                  </Col>
                  <Col md={4}>
                    <FormInput name="District" label="District" placeholder="Enter District" containerClass="mb-3" register={register} errors={errors} control={control} />
                  </Col>
                  <Col md={4}>
                    <FormInput name="state" label="State" placeholder="Enter state" containerClass="mb-3" register={register} errors={errors} control={control} />
                  </Col>
                  <Col md={12}>
                    <FormInput name="country" label="Country" placeholder="Enter country" containerClass="mb-3" register={register} errors={errors} control={control} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Aadhaar & PAN Details */}
        <Row>
          <Col lg={12}>
            <Card className="mt-3">
              <Card.Body>
                <h5 className="text-uppercase mt-0 mb-3">Identification Details</h5>
                <Row>
                  <Col md={6}>
                    <FormInput name="aadhar_number" label="Aadhaar Number" placeholder="Enter Aadhaar number" containerClass="mb-3" register={register} errors={errors} control={control} />
                  </Col>
                  <Col md={6}>
                    <FormInput name="pan_number" label="PAN Number" placeholder="Enter PAN number" containerClass="mb-3" register={register} errors={errors} control={control} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Submit Button */}
        <Row>
          <Col className="text-center">
            <Button variant="light" className="me-2" onClick={() => navigate("/apps/employee/list")}>Cancel</Button>
            <Button type="submit" variant="success">Save</Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default EmployeeManagement;