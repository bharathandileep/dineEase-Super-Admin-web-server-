
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import FileUploader from "../../../components/FileUploader";
import { FormInput } from "../../../components";
import { createEmployee } from "../../../server/admin/employeemanagment";
import { getAllDesignations } from "../../../server/admin/designations";
import { 
  getAllCountries, 
  getStatesByCountry, 
  getCitiesByState, 
  getDistrictsByState 
} from "../../../server/admin/addressDetails";

const EmployeeManagement = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [aadharImage, setAadharImage] = useState<File | null>(null);
  const [panImage, setPanImage] = useState<File | null>(null);
  const [designations, setDesignations] = useState<{ _id: string; designation_name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Location states
  const [countries, setCountries] = useState<{ _id: string; name: string; country_name: string }[]>([]);
  const [states, setStates] = useState<{ _id: string; name: string; id: string }[]>([]);
  const [cities, setCities] = useState<{ _id: string; name: string; city_name: string }[]>([]);
  const [districts, setDistricts] = useState<{ _id: string; name: string; district_name: string }[]>([]);
  
  // Form data state for controlled inputs
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    district: "",
    street_address: "",
    pincode: ""
  });
  
  // Custom errors state for location fields
  const [errors, setErrors] = useState<{
    country?: string;
    state?: string;
    city?: string;
    district?: string;
    street_address?: string;
    pincode?: string;
  }>({});

  // Fetch designations on component mount
  useEffect(() => {
    const fetchDesignations = async () => {
      setLoading(true);
      try {
        const response = await getAllDesignations();
        if (response.status) {
          setDesignations(response.data);
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
  
  // Fetch countries on component mount
  useEffect(() => {
    fetchCountries();
  }, []);

  // React Hook Form setup
  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    setValue,
  } = useForm();

  // Fetch location data functions
  const fetchCountries = async () => {
    try {
      const data = await getAllCountries();
      if (data?.success) {
        setCountries(data.data);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      toast.error("Failed to load countries.");
    }
  };

  const fetchStates = async (countryName: string) => {
    try {
      const data = await getStatesByCountry(countryName);
      if (data?.success) {
        setStates(data.data);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
      toast.error("Failed to load states.");
    }
  };

  const fetchCities = async (stateName: string) => {
    try {
      const data = await getCitiesByState(stateName);
      if (data?.success) {
        setCities(data.data);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      toast.error("Failed to load cities.");
    }
  };

  const fetchDistricts = async (stateId: string) => {
    try {
      const data = await getDistrictsByState(stateId);
      if (data?.success) {
        setDistricts(data.data);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
      toast.error("Failed to load districts.");
    }
  };

  // Handle location field changes
  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Update the react-hook-form value
    setValue(name, value);

    if (name === "country") {
      await fetchStates(value);
      setFormData((prev) => ({ ...prev, state: "", city: "", district: "" }));
      setValue("state", "");
      setValue("city", "");
      setValue("district", "");
    } else if (name === "state") {
      await fetchCities(value);
      await fetchDistricts(value);
      setFormData((prev) => ({ ...prev, city: "", district: "" }));
      setValue("city", "");
      setValue("district", "");
    }

    if (errors[name as keyof typeof formData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle Form Submission
  const onSubmit = async (data: any) => {
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
      formData.append("district", data.district);
      formData.append("pincode", data.pincode);
      formData.append("state", data.state);
      formData.append("country", data.country);

      // Profile Picture Upload
      if (profileImage) {
        formData.append("profile_picture", profileImage);
      }

      // Aadhaar Card Upload
      if (aadharImage) {
        formData.append("aadhar_image", aadharImage);
      }

      // PAN Card Upload
      if (panImage) {
        formData.append("pan_image", panImage);
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
  const handleFileUpload = (files: File[], setImage: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (files.length > 0) {
      setImage(files[0]);
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
                <FormInput
                  name="username"
                  label="Employee Name"
                  placeholder="Enter full name"
                  containerClass="mb-3"
                  register={register}
                  errors={formErrors}
                  validation={{ required: "Employee name is required" }}
                />
                <FormInput
                  name="email"
                  label="Email"
                  placeholder="Enter email"
                  containerClass="mb-3"
                  register={register}
                  errors={formErrors}
                  validation={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                />
                <FormInput
                  name="phone_number"
                  label="Phone Number"
                  placeholder="Enter phone number"
                  containerClass="mb-3"
                  register={register}
                  errors={formErrors}
                  validation={{ required: "Phone number is required" }}
                />
                <FormInput
                  name="designation"
                  label="Designation"
                  containerClass="mb-3"
                  register={register}
                  errors={formErrors}
                  type="select"
                  defaultValue=""
                  validation={{ required: "Designation is required" }}
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
                <FileUploader onFileUpload={(files) => handleFileUpload(Array.from(files), setProfileImage)} />
                {profileImage && (
                  <Image
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile Preview"
                    className="mt-3"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                )}
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
                    <div className="form-group mb-3">
                      <label className="form-label">Country</label>
                      <select
                        {...register("country", { required: "Country is required" })}
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.country || formErrors.country ? "is-invalid" : ""
                        }`}
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option key={country._id} value={country.country_name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      {(errors.country || formErrors.country) && (
                        <div className="invalid-feedback">
                          {errors.country || (formErrors.country && formErrors.country.message)}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group mb-3">
                      <label className="form-label">State</label>
                      <select
                        {...register("state", { required: "State is required" })}
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.state || formErrors.state ? "is-invalid" : ""
                        }`}
                        disabled={!formData.country}
                      >
                        <option value="">Select State</option>
                        {states.map((state) => (
                          <option key={state._id} value={state.id}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                      {(errors.state || formErrors.state) && (
                        <div className="invalid-feedback">
                          {errors.state || (formErrors.state && formErrors.state.message)}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group mb-3">
                      <label className="form-label">City</label>
                      <select
                        {...register("city", { required: "City is required" })}
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.city || formErrors.city ? "is-invalid" : ""
                        }`}
                        disabled={!formData.state}
                      >
                        <option value="">Select City</option>
                        {cities.map((city) => (
                          <option key={city._id} value={city.city_name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                      {(errors.city || formErrors.city) && (
                        <div className="invalid-feedback">
                          {errors.city || (formErrors.city && formErrors.city.message)}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group mb-3">
                      <label className="form-label">District</label>
                      <select
                        {...register("district", { required: "District is required" })}
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.district || formErrors.district ? "is-invalid" : ""
                        }`}
                        disabled={!formData.state}
                      >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                          <option key={district._id} value={district.district_name}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                      {(errors.district || formErrors.district) && (
                        <div className="invalid-feedback">
                          {errors.district || (formErrors.district && formErrors.district.message)}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col md={6}>
                    <FormInput
                      name="street_address"
                      label="Street Address"
                      placeholder="Enter street address"
                      containerClass="mb-3"
                      register={register}
                      errors={formErrors}
                      validation={{ required: "Street address is required" }}
                    />
                  </Col>
                  <Col md={6}>
                    <FormInput
                      name="pincode"
                      label="Pincode"
                      placeholder="Enter pincode"
                      containerClass="mb-3"
                      register={register}
                      errors={formErrors}
                      validation={{ required: "Pincode is required" }}
                    />
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
                    <FormInput
                      name="aadhar_number"
                      label="Aadhaar Number"
                      placeholder="Enter Aadhaar number"
                      containerClass="mb-3"
                      register={register}
                      errors={formErrors}
                      validation={{ required: "Aadhaar number is required" }}
                    />
                    <div className="mb-3">
                      <label className="form-label">Aadhaar Card Image</label>
                      <FileUploader onFileUpload={(files) => handleFileUpload(Array.from(files), setAadharImage)} />
                      {aadharImage && (
                        <Image
                          src={URL.createObjectURL(aadharImage)}
                          alt="Aadhaar Preview"
                          className="mt-3"
                          style={{ maxWidth: "100%", maxHeight: "200px" }}
                        />
                      )}
                    </div>
                  </Col>
                  <Col md={6}>
                    <FormInput
                      name="pan_number"
                      label="PAN Number"
                      placeholder="Enter PAN number"
                      containerClass="mb-3"
                      register={register}
                      errors={formErrors}
                      validation={{ required: "PAN number is required" }}
                    />
                    <div className="mb-3">
                      <label className="form-label">PAN Card Image</label>
                      <FileUploader onFileUpload={(files) => handleFileUpload(Array.from(files), setPanImage)} />
                      {panImage && (
                        <Image
                          src={URL.createObjectURL(panImage)}
                          alt="PAN Preview"
                          className="mt-3"
                          style={{ maxWidth: "100%", maxHeight: "200px" }}
                        />
                      )}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Submit Button */}
        <Row>
          <Col className="text-center mt-3 mb-3">
            <Button variant="light" className="me-2" onClick={() => navigate("/apps/employee/list")}>
              Cancel
            </Button>
            <Button type="submit" variant="success">
              Save
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default EmployeeManagement;