import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Check, CheckCircle } from "lucide-react";
import { FileUpload } from "../../../../components/FileUpload";
import {
  createNewOrg,
  getOrgDetails,
  updateOrgDetails,
} from "../../../../server/admin/organization";
import { toast } from "react-toastify";
import { appendToFormData } from "../../../../helpers/formdataAppend";
import { useNavigate, useParams } from "react-router-dom";
import { Col, ProgressBar, Row } from "react-bootstrap";
import "./FormWizard.scss";
import { Stepper } from "../../../../components/Stepper";

interface WizardFormProps {
  initialData?: any;
}
interface FormData {
  // Step 1
  organizationName: string;
  managerName: string;
  registerNumber: string;
  contactNumber: string;
  email: string;
  numberOfEmployees: string;
  organizationLogo?: any;
  addressType: "Home" | "Office" | "Other";
  streetAddress: string;
  district: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  // Step 2
  panNumber: string;
  panCardUserName: string;
  panCardImage?: any;
  gstNumber: string;
  gstCertificateImage?: any;
  expiryDate: string;
}
const initialFormData: FormData = {
  organizationLogo: "",
  organizationName: "",
  managerName: "",
  registerNumber: "",
  contactNumber: "",
  email: "",
  numberOfEmployees: "",
  addressType: "Office",
  streetAddress: "",
  district: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
  panNumber: "",
  panCardUserName: "",
  gstNumber: "",
  expiryDate: "",
  gstCertificateImage: "",
  panCardImage: "",
};

export function WizardForm({ initialData }: WizardFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const steps = [
    { number: 1, title: "Personal Info" },
    { number: 2, title: "Documents" },
  ];
  const validateStep1 = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.organizationName) newErrors.organizationName = "Required";
    if (!formData.managerName) newErrors.managerName = "Required";
    if (!formData.registerNumber) newErrors.registerNumber = "Required";
    if (!formData.contactNumber) {
      newErrors.contactNumber = "Required";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Invalid phone number";
    }
    if (!formData.email) {
      newErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.numberOfEmployees) newErrors.numberOfEmployees = "Required";
    if (!formData.organizationLogo) newErrors.organizationLogo = "Required";
    if (!formData.streetAddress) newErrors.streetAddress = "Required";
    if (!formData.district) newErrors.district = "Required";
    if (!formData.city) newErrors.city = "Required";
    if (!formData.state) newErrors.state = "Required";
    if (!formData.pincode) newErrors.pincode = "Required";
    if (!formData.country) newErrors.country = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.panNumber) {
      newErrors.panNumber = "Required";
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
      newErrors.panNumber = "Invalid PAN number";
    }
    if (!formData.panCardUserName) newErrors.panCardUserName = "Required";
    if (!formData.panCardImage) newErrors.panCardImage = "Required";
    if (!formData.gstNumber) {
      newErrors.gstNumber = "Required";
    } else if (
      !/\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(
        formData.gstNumber
      )
    ) {
      newErrors.gstNumber = "Invalid GST number";
    }
    if (!formData.gstCertificateImage)
      newErrors.gstCertificateImage = "Required";
    if (!formData.expiryDate) newErrors.expiryDate = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      initialData ? handleEdit() : handleSubmit();
    }
  };


  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleEdit = async () => {
    setLoading(true); // Start loading
    try {
      const OrgFormData = appendToFormData(formData);
      const response = await updateOrgDetails(id, OrgFormData);

      if (response.status) {
        toast.success(response.message);
        navigate("/apps/organizations/list");
        console.log(response,"s")
      } else {
        toast.error(response.message || "Update failed. Please try again.");
        console.log(response,"e")
      }
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
      console.log(error,"f")
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    try {
      const orgFormData = appendToFormData(formData);
      const response = await createNewOrg(orgFormData);

      if (response.status) {
        toast.success(response.message);
        navigate("/apps/organizations/list");
      } else {
        toast.error(response.message || "Creation failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  useEffect(() => {
    if (!id) return;
    const fetchOrgDetails = async () => {
      try {
        const response = await getOrgDetails(id);
        const orgData = response.data[0]; // Assuming response.data[0] contains the organization details

        // Correcting the state update syntax
        setFormData((prevFormData) => ({
          ...prevFormData,
          organizationName: orgData.organizationName || "",
          organizationLogo: orgData.organizationLogo,
          managerName: orgData.managerName || "",
          registerNumber: orgData.register_number || "",
          contactNumber: orgData.contact_number || "",
          email: orgData.email || "",
          numberOfEmployees: orgData.no_of_employees.toString() || "",
          addressType: orgData.addresses[0]?.address_type || "Office",
          streetAddress: orgData.addresses[0]?.street_address || "",
          district: orgData.addresses[0]?.district || "",
          city: orgData.addresses[0]?.city || "",
          state: orgData.addresses[0]?.state || "",
          pincode: orgData.addresses[0]?.pincode || "",
          country: orgData.addresses[0]?.country || "",
          panNumber: orgData.panDetails[0]?.pan_card_number || "",
          panCardUserName: orgData.panDetails[0]?.pan_card_user_name || "",
          gstNumber: orgData.gstDetails[0]?.gst_number || "",
          expiryDate: orgData.gstDetails[0]?.expiry_date || "",
          gstCertificateImage:
            orgData.gstDetails[0]?.gst_certificate_image || "",
          panCardImage: orgData.panDetails[0]?.pan_card_image || "",
        }));
      } catch (error) {
        console.error("Error fetching organization details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrgDetails();
  }, [id]);

  return (
    <div className="container py-2">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="card d-flex flex-column align-items-center">
            <div className="col-lg-8 justify-content-center">
              <Stepper steps={steps} currentStep={currentStep} />
            </div>
            <div className="card-body p-4">
              <form onSubmit={(e) => e.preventDefault()}>
                {currentStep === 1 && (
                  <div>
                    <h2 className="card-title mb-4">Basic Details</h2>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">
                            Organization Name
                          </label>
                          <input
                            type="text"
                            name="organizationName"
                            value={formData.organizationName}
                            onChange={handleChange}
                            className={`form-control ${
                              errors.organizationName ? "is-invalid" : ""
                            }`}
                          />
                          {errors.organizationName && (
                            <div className="invalid-feedback">
                              {errors.organizationName}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Manager Name</label>
                          <input
                            type="text"
                            name="managerName"
                            value={formData.managerName}
                            onChange={handleChange}
                            className={`form-control ${
                              errors.managerName ? "is-invalid" : ""
                            }`}
                          />
                          {errors.managerName && (
                            <div className="invalid-feedback">
                              {errors.managerName}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Register Number</label>
                          <input
                            type="text"
                            name="registerNumber"
                            value={formData.registerNumber}
                            onChange={handleChange}
                            className={`form-control ${
                              errors.registerNumber ? "is-invalid" : ""
                            }`}
                          />
                          {errors.registerNumber && (
                            <div className="invalid-feedback">
                              {errors.registerNumber}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Contact Number</label>
                          <input
                            type="tel"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            className={`form-control ${
                              errors.contactNumber ? "is-invalid" : ""
                            }`}
                          />
                          {errors.contactNumber && (
                            <div className="invalid-feedback">
                              {errors.contactNumber}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-control ${
                              errors.email ? "is-invalid" : ""
                            }`}
                          />
                          {errors.email && (
                            <div className="invalid-feedback">
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">
                            Number of Employees
                          </label>
                          <input
                            type="number"
                            name="numberOfEmployees"
                            value={formData.numberOfEmployees}
                            onChange={handleChange}
                            className={`form-control ${
                              errors.numberOfEmployees ? "is-invalid" : ""
                            }`}
                          />
                          {errors.numberOfEmployees && (
                            <div className="invalid-feedback">
                              {errors.numberOfEmployees}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-group">
                          <label className="form-label">
                            Organization Logo
                          </label>
                          <FileUpload
                            onFileSelect={(file) =>
                              setFormData((prev) => ({
                                ...prev,
                                organizationLogo: file,
                              }))
                            }
                            value={formData.organizationLogo}
                            error={errors.organizationLogo}
                          />
                        </div>
                      </div>
                      <div className="col-12 mt-4">
                        <h3 className="h5 mb-3">Address Details</h3>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">Address Type</label>
                              <select
                                name="addressType"
                                value={formData.addressType}
                                onChange={handleChange}
                                className="form-select"
                              >
                                <option value="Home">Home</option>
                                <option value="Office">Office</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="form-group">
                              <label className="form-label">
                                Street Address
                              </label>
                              <input
                                type="text"
                                name="streetAddress"
                                value={formData.streetAddress}
                                onChange={handleChange}
                                className={`form-control ${
                                  errors.streetAddress ? "is-invalid" : ""
                                }`}
                              />
                              {errors.streetAddress && (
                                <div className="invalid-feedback">
                                  {errors.streetAddress}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">District</label>
                              <input
                                type="text"
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                className={`form-control ${
                                  errors.district ? "is-invalid" : ""
                                }`}
                              />
                              {errors.district && (
                                <div className="invalid-feedback">
                                  {errors.district}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">City</label>
                              <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className={`form-control ${
                                  errors.city ? "is-invalid" : ""
                                }`}
                              />
                              {errors.city && (
                                <div className="invalid-feedback">
                                  {errors.city}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">State</label>
                              <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className={`form-control ${
                                  errors.state ? "is-invalid" : ""
                                }`}
                              />
                              {errors.state && (
                                <div className="invalid-feedback">
                                  {errors.state}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">Pincode</label>
                              <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className={`form-control ${
                                  errors.pincode ? "is-invalid" : ""
                                }`}
                              />
                              {errors.pincode && (
                                <div className="invalid-feedback">
                                  {errors.pincode}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">Country</label>
                              <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className={`form-control ${
                                  errors.country ? "is-invalid" : ""
                                }`}
                              />
                              {errors.country && (
                                <div className="invalid-feedback">
                                  {errors.country}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h2 className="card-title mb-4">PAN & GST Details</h2>

                    {/* PAN Details */}
                    <div className="mb-4">
                      <h3 className="h5 mb-3">PAN Details</h3>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label">
                              PAN Card Number
                            </label>
                            <input
                              type="text"
                              name="panNumber"
                              value={formData.panNumber}
                              onChange={handleChange}
                              className={`form-control ${
                                errors.panNumber ? "is-invalid" : ""
                              }`}
                            />
                            {errors.panNumber && (
                              <div className="invalid-feedback">
                                {errors.panNumber}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label">
                              PAN Card User Name
                            </label>
                            <input
                              type="text"
                              name="panCardUserName"
                              value={formData.panCardUserName}
                              onChange={handleChange}
                              className={`form-control ${
                                errors.panCardUserName ? "is-invalid" : ""
                              }`}
                            />
                            {errors.panCardUserName && (
                              <div className="invalid-feedback">
                                {errors.panCardUserName}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-group">
                            <label className="form-label">PAN Card Image</label>
                            <FileUpload
                              onFileSelect={(file) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  panCardImage: file,
                                }))
                              }
                              value={formData.panCardImage}
                              error={errors.panCardImage}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* GST Details */}
                    <div>
                      <h3 className="h5 mb-3">GST Details</h3>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label">GST Number</label>
                            <input
                              type="text"
                              name="gstNumber"
                              value={formData.gstNumber}
                              onChange={handleChange}
                              className={`form-control ${
                                errors.gstNumber ? "is-invalid" : ""
                              }`}
                            />
                            {errors.gstNumber && (
                              <div className="invalid-feedback">
                                {errors.gstNumber}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label">Expiry Date</label>
                            <input
                              type="date"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleChange}
                              className={`form-control ${
                                errors.expiryDate ? "is-invalid" : ""
                              }`}
                            />
                            {errors.expiryDate && (
                              <div className="invalid-feedback">
                                {errors.expiryDate}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-group">
                            <label className="form-label">
                              GST Certificate Image
                            </label>
                            <FileUpload
                              onFileSelect={(file) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  gstCertificateImage: file,
                                }))
                              }
                              value={formData.gstCertificateImage}
                              error={errors.gstCertificateImage}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="d-flex justify-content-between mt-4">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn btn-outline-secondary d-flex align-items-center"
                    >
                      <ChevronLeft className="me-2" />
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn btn-primary d-flex align-items-center ms-auto"
                  >
                    {currentStep === 2 ? "Submit" : "Next"}
                    {currentStep === 1 && <ChevronRight className="ms-2" />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
