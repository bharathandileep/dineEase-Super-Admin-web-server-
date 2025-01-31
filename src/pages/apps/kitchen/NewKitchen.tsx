import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Upload,
  Check,
  X,
  Clock,
} from "lucide-react";
import { createKitchen } from "../../../services/api";
import { useNavigate } from "react-router-dom";

type FormStep = 1 | 2 | 3;

interface KitchenTiming {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

interface FormData {
  // Basic Details
  user_id: string;
  kitchenName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerName: string;
  streetAddress: string;
  city: string;
  state: string;
  district: string;
  pincode: string;
  country: string;
  landmark: string;
  addressType: string;
  opens_at: string;
  closes_at: string;

  // Documents
  panNumber: string;
  panName: string;
  panImage: File | null;
  panExpiry: string;

  gstNumber: string;
  gstImage: File | null;
  gstExpiry: string;

  fssaiNumber: string;
  fssaiName: string;
  fssaiImage: File | null;
  fssaiExpiry: string;

  // Kitchen Details
  kitchenImages: File[];
  profileImage: File | null;
  menuImage: File | null;
  kitchenType: string;
  timings: KitchenTiming[];
  kitchen_phone_number: string;
}

const initialTimings: KitchenTiming[] = [
  { day: "Monday", isOpen: true, openTime: "09:00", closeTime: "22:00" },
  { day: "Tuesday", isOpen: true, openTime: "09:00", closeTime: "22:00" },
  { day: "Wednesday", isOpen: true, openTime: "09:00", closeTime: "22:00" },
  { day: "Thursday", isOpen: true, openTime: "09:00", closeTime: "22:00" },
  { day: "Friday", isOpen: true, openTime: "09:00", closeTime: "22:00" },
  { day: "Saturday", isOpen: true, openTime: "09:00", closeTime: "22:00" },
  { day: "Sunday", isOpen: true, openTime: "09:00", closeTime: "22:00" },
];

const initialFormData: FormData = {
  user_id: "6790957046488596c2df6553",
  kitchenName: "",
  ownerEmail: "",
  ownerPhone: "",
  ownerName: "",
  streetAddress: "",
  city: "",
  state: "",
  district: "",
  pincode: "",
  country: "",
  landmark: "",
  addressType: "",
  panNumber: "",
  panName: "",
  panImage: null,
  panExpiry: "",
  gstNumber: "",
  gstImage: null,
  gstExpiry: "",
  fssaiNumber: "",
  fssaiName: "",
  fssaiImage: null,
  fssaiExpiry: "",
  kitchenImages: [],
  profileImage: null,
  menuImage: null,
  kitchenType: "",
  timings: initialTimings,
  kitchen_phone_number: "",
  opens_at: "",
  closes_at: "",
};

const kitchenTypes = [
  "Restaurant",
  "Cloud Kitchen",
  "Food Truck",
  "Home Kitchen",
  "Bakery",
  "Catering Service",
  "Quick Service Restaurant",
];
const KitchenRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [previews, setPreviews] = useState<{
    [key: string]: string | string[];
  }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimingChange = (
    index: number,
    field: keyof KitchenTiming,
    value: string | boolean
  ) => {
    const newTimings = [...formData.timings];
    newTimings[index] = { ...newTimings[index], [field]: value };
    setFormData((prev) => ({ ...prev, timings: newTimings }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormData
  ) => {
    const files = e.target.files;
    if (!files) return;

    if (field === "kitchenImages") {
      const newFiles = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        kitchenImages: [...prev.kitchenImages, ...newFiles],
      }));

      // Generate previews for multiple images
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews((prev) => ({
            ...prev,
            kitchenImages: [
              ...((prev.kitchenImages as string[]) || []),
              reader.result as string,
            ],
          }));
        };

        reader.readAsDataURL(file);
      });
    } else {
      const file = files[0];

      // Generate preview for single image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [field]: reader.result as string }));
        setFormData((prev) => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    field: keyof FormData
  ) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files) return;

    if (field === "kitchenImages") {
      const newFiles = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        kitchenImages: [...prev.kitchenImages, ...newFiles],
      }));

      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews((prev) => ({
            ...prev,
            kitchenImages: [
              ...((prev.kitchenImages as string[]) || []),
              reader.result as string,
            ],
          }));
        };
        reader.readAsDataURL(file);
      });
    } else {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [field]: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (field: keyof FormData, index?: number) => {
    if (field === "kitchenImages" && typeof index === "number") {
      setFormData((prev) => ({
        ...prev,
        kitchenImages: prev.kitchenImages.filter((_, i) => i !== index),
      }));
      setPreviews((prev) => ({
        ...prev,
        kitchenImages: (prev.kitchenImages as string[]).filter(
          (_, i) => i !== index
        ),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: null }));
      setPreviews((prev) => {
        const newPreviews = { ...prev };
        delete newPreviews[field];
        return newPreviews;
      });
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as FormStep);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as FormStep);
    }
  };
  type InputData = {
    kitchenName: string;
    ownerEmail: string;
    ownerPhone: string;
    ownerName: string;
    streetAddress: string;
    city: string;
    state: string;
    district: string;
    pincode: string;
    country: string;
    landmark: string;
   addressType: string;
    panNumber: string;
    panName: string;
    panImage: string;
    panExpiry: string;
    gstNumber: string;
    gstImage: string;
    gstExpiry: string;
    fssaiNumber: string;
    fssaiName: string;
    fssaiImage: string;
    fssaiExpiry: string;
    kitchenImages: string[];
    profileImage: string | null;
    menuImage: string | null;
    kitchenType: string;
    timings: {
      day: string;
      isOpen: boolean;
      openTime: string;
      closeTime: string;
    }[];
  };

  function transformData(inputData: any): any {
    return {
      kitchenData: {
        user_id: inputData.user_id,
        kitchen_name: inputData.kitchenName,
        owner_email: inputData.ownerEmail,
        owner_phone_number: inputData.ownerPhone,
        kitchen_owner_name: inputData.ownerName,
        kitchen_phone_number: inputData.kitchen_phone_number,
        opens_at: inputData.opens_at,
        closes_at: inputData.closes_at,
      },
      addresses: {
        street_address: inputData.streetAddress,
        city: inputData.city,
        state: inputData.state,
        district: inputData.district,
        pincode: inputData.pincode,
        country: inputData.country,
        landmark: inputData.landmark,
        address_type: inputData.addressType,
      },
      panDetails: {
        pan_card_number: inputData.panNumber,
        pan_card_user_name: inputData.panName,
        pan_card_image: inputData.panImage,
        expiry_date: inputData.panExpiry,
      },
      gstDetails: {
        gst_number: inputData.gstNumber,
        gst_certificate_image: inputData.gstImage,
        expiry_date: inputData.gstExpiry,
      },
      fssaiDetails: {
        ffsai_certificate_number: inputData.fssaiNumber,
        ffsai_card_owner_name: inputData.fssaiName,
        ffsai_certificate_image: inputData.fssaiImage,
        expiry_date: inputData.fssaiExpiry,
      },
    };
  }
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("ddd");
    e.preventDefault();

    console.log("Form submitted:", transformData(formData));

    try {
      await createKitchen(transformData(formData)); // Create kitchen
      navigate("/apps/Kitchen/list");
      // Navigate to the kitchens list page
    } catch (error) {
      console.error("Error creating kitchen:", error);
    }
  };
  const FileUploadField = ({
    label,
    field,
    file,
    multiple = false,
  }: {
    label: string;
    field: keyof FormData;
    file: File | null | File[];

    multiple?: boolean;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, field)}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors cursor-pointer"
      >
        <input
          type="file"
          onChange={(e) => handleFileChange(e, field)}
          className="hidden"
          id={field}
          accept="image/*"
          multiple={multiple}
        />
        <label htmlFor={field} className="cursor-pointer">
          {multiple ? (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {((previews.kitchenImages as string[]) || []).map(
                (preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Kitchen ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFile("kitchenImages", index);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )
              )}
              {(!previews.kitchenImages ||
                (previews.kitchenImages as string[]).length === 0) && (
                <div className="col-span-2">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Drag and drop or click to upload multiple images
                  </p>
                </div>
              )}
            </div>
          ) : previews[field] ? (
            <div className="relative">
              <img
                src={previews[field] as string}
                alt="Preview"
                className="max-h-48 mx-auto rounded-lg"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  removeFile(field);
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop or click to upload
              </p>
            </>
          )}
        </label>
      </div>
    </div>
  );

  const inputClasses =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border";

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="progress" style={{ height: "8px" }}>
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: `${(currentStep / 3) * 100}%` }}
                aria-valuenow={(currentStep / 3) * 100}
                aria-valuemin={0} // Use number, not string
                aria-valuemax={100} // Use number, not string
              ></div>
            </div>
            <div className="d-flex justify-content-between">
              <div
                className={`d-flex align-items-center ${
                  currentStep >= 1 ? "text-indigo" : "text-muted"
                }`}
              >
                <span className="badge rounded-circle border">
                  {currentStep > 1 ? <Check /> : "1"}
                </span>
                <span className="ms-2">Basic Details</span>
              </div>
              <div
                className={`d-flex align-items-center ${
                  currentStep >= 2 ? "text-indigo" : "text-muted"
                }`}
              >
                <span className="badge rounded-circle border">
                  {currentStep > 2 ? <Check /> : "2"}
                </span>
                <span className="ms-2">Documents</span>
              </div>
              <div
                className={`d-flex align-items-center ${
                  currentStep >= 3 ? "text-indigo" : "text-muted"
                }`}
              >
                <span className="badge rounded-circle border">
                  {currentStep > 3 ? <Check /> : "3"}
                </span>
                <span className="ms-2">Kitchen Details</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
            {currentStep === 1 && (
              <div>
                <h2 className="fs-4 fw-bold text-gray-900">Basic Details</h2>

                {/* Kitchen Details */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Kitchen Name</label>
                    <input
                      type="text"
                      name="kitchenName"
                      value={formData.kitchenName}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Owner Email</label>
                    <input
                      type="email"
                      name="ownerEmail"
                      value={formData.ownerEmail}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Owner Phone</label>
                    <input
                      type="text"
                      name="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Owner Name</label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Kitchen Phone Number</label>
                    <input
                      type="text"
                      name="kitchen_phone_number"
                      value={formData.kitchen_phone_number}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Opens At</label>
                    <input
                      type="time"
                      name="opens_at"
                      value={formData.opens_at}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Closes At</label>
                    <input
                      type="time"
                      name="closes_at"
                      value={formData.closes_at}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Address Details */}
                <h3 className="fs-5 fw-medium text-gray-900">
                  Address Details
                </h3>
                <div className="row">
                  <div className="col-12">
                    <label className="form-label">Street Address</label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          /* Handle map view */
                        }}
                      >
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">District</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Landmark</label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Address Type</label>
                    <select
                      name="addressType"
                      value={formData.addressType}
                      onChange={handleInputChange}
                      required
                      className="form-select"
                    >
                      <option value="">Select type</option>
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="fs-4 fw-bold text-gray-900">Documents</h2>

                {/* PAN Details */}
                <h3 className="fs-5 fw-medium text-gray-900">PAN Details</h3>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">PAN Card Number</label>
                    <input
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">PAN Card User Name</label>
                    <input
                      type="text"
                      name="panName"
                      value={formData.panName}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Expiry Date</label>
                    <input
                      type="date"
                      name="panExpiry"
                      value={formData.panExpiry}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-12">
                    <FileUploadField
                      label="PAN Card Image"
                      field="panImage"
                      file={formData.panImage}
                    />
                  </div>
                </div>

                {/* GST Details */}
                <h3 className="fs-5 fw-medium text-gray-900">GST Details</h3>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">GST Number</label>
                    <input
                      type="text"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Expiry Date</label>
                    <input
                      type="date"
                      name="gstExpiry"
                      value={formData.gstExpiry}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-12">
                    <FileUploadField
                      label="GST Certificate Image"
                      field="gstImage"
                      file={formData.gstImage}
                    />
                  </div>
                </div>

                {/* FSSAI Details */}
                <h3 className="fs-5 fw-medium text-gray-900">FSSAI Details</h3>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      FSSAI Certificate Number
                    </label>
                    <input
                      type="text"
                      name="fssaiNumber"
                      value={formData.fssaiNumber}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">FSSAI Card Owner Name</label>
                    <input
                      type="text"
                      name="fssaiName"
                      value={formData.fssaiName}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Expiry Date</label>
                    <input
                      type="date"
                      name="fssaiExpiry"
                      value={formData.fssaiExpiry}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-12">
                    <FileUploadField
                      label="FSSAI Certificate Image"
                      field="fssaiImage"
                      file={formData.fssaiImage}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="d-flex justify-content-between pt-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="btn btn-outline-secondary btn-blue"
                >
                  Previous
                </button>
              )}

              <button
                type={currentStep === 2 ? "submit" : "button"}
                onClick={currentStep < 2 ? handleNext : undefined}
                className="btn btn-blue"
              >
                {currentStep === 2 ? "Submit" : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default KitchenRegistrationForm;
