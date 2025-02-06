import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteOrgDetails,
  getOrgDetails,
} from "../../../server/admin/organization";
import {
  Building2,
  Users,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  FileCheck,
  Building,
  Navigation,
  Globe,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  Briefcase,
} from "lucide-react";
import { toast } from "react-toastify";

export interface IOrganizationDetails {
  _id: string;
  user_id: string;
  address_id: string[];
  organizationName: string;
  organizationLogo: string;
  managerName: string;
  register_number: string;
  contact_number: string;
  email: string;
  no_of_employees: number;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  addresses: Array<{
    _id: string;
    street_address: string;
    city: string;
    state: string;
    district: string;
    pincode: string;
    country: string;
    landmark: string | null;
    address_type: string;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  panDetails: Array<{
    _id: string;
    prepared_by_id: string;
    entity_type: string;
    pan_card_number: string;
    pan_card_user_name: string;
    pan_card_image: string;
    is_verified: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  gstDetails: Array<{
    _id: string;
    prepared_by_id: string;
    entity_type: string;
    gst_number: string;
    gst_certificate_image: string;
    expiry_date: string;
    is_verified: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  onEdit?: () => void;
  onDelete?: () => void;
}

function OrganizationDetails() {
  const { id } = useParams();
  const [organization, setOrgData] = useState<IOrganizationDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrgDetails = async () => {
      try {
        const response = await getOrgDetails(id);
        setOrgData(response.data[0]);
      } catch (error) {
        console.error("Error fetching organization details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrgDetails();
  }, [id]);

  const onEdit = () => navigate(`/apps/organizations/edit/${id}`);
  const onDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteOrgDetails(id);

      if (response.status === 200) {
        toast.success("Kitchen details deleted successfully!");
        // Optionally, handle post-deletion logic (e.g., navigate away, refresh list, etc.)
      } else {
        toast.error("Failed to delete kitchen details. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting kitchen details:", error);
      toast.error("An error occurred while deleting kitchen details.");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  if (loading || !organization) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container-fluid py-4">
      {/* Header Section */}
      <div className="card mb-4 bg-primary text-white">
        <div className="card-body p-4">
          <div className="row align-items-start">
            <div className="col-md-3 position-relative mb-3 mb-md-0">
              <img
                src={organization?.organizationLogo}
                alt={organization?.organizationName}
                className="img-fluid rounded border border-4 border-white shadow"
                style={{ maxWidth: "160px" }}
              />
              <span
                className={`position-absolute top-0 end-0 badge ${
                  !organization?.is_deleted ? "bg-success" : "bg-danger"
                }`}
              >
                {organization?.is_deleted ? "Inactive" : "Active"}
              </span>
            </div>

            <div className="col-md-7">
              <div className="d-flex align-items-center gap-2 mb-3">
                <Briefcase className="flex-shrink-0" />
                <h1 className="h2 mb-0">{organization?.organizationName}</h1>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-2">
                    <Users size={16} />
                    <span className="text-white-50">Manager:</span>
                    <span>{organization?.managerName}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <Mail size={16} />
                    <span className="text-white-50">Email:</span>
                    <span>{organization?.email}</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-2">
                    <Phone size={16} />
                    <span className="text-white-50">Contact:</span>
                    <span>{organization?.contact_number}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <Users size={16} />
                    <span className="text-white-50">Employees:</span>
                    <span>{organization?.no_of_employees}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="d-flex gap-2">
                <button
                  onClick={onEdit}
                  className="btn btn-light d-flex align-items-center gap-2"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={onDelete}
                  className="btn btn-danger d-flex align-items-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Address Section */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header bg-light d-flex align-items-center gap-2">
              <MapPin className="text-secondary" />
              <h5 className="card-title mb-0">Location Details</h5>
            </div>
            <div className="card-body">
              {organization?.addresses.map((address) => (
                <div key={address._id} className="mb-4">
                  <div className="bg-light p-3 rounded mb-3">
                    <div className="d-flex align-items-start gap-3">
                      <Building className="text-secondary flex-shrink-0" />
                      <div>
                        <div className="d-flex align-items-center gap-2">
                          <p className="h6 mb-1">{address.street_address}</p>
                          <span className="badge bg-primary">
                            {address.address_type}
                          </span>
                        </div>
                        <p className="text-secondary mb-1">
                          {address.city}, {address.district}
                        </p>
                        {address.landmark && (
                          <small className="text-muted">
                            Landmark: {address.landmark}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-light p-3 rounded mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <Navigation className="text-secondary" />
                      <div>
                        <p className="mb-1">
                          {address.state}, {address.pincode}
                        </p>
                        <p className="mb-0">{address.country}</p>
                      </div>
                    </div>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${address.street_address} ${address.city} ${address.state} ${address.country}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2"
                  >
                    <Globe size={16} />
                    View on Google Maps
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PAN Details */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header bg-light d-flex align-items-center gap-2">
              <CreditCard className="text-secondary" />
              <h5 className="card-title mb-0">PAN Details</h5>
            </div>
            <div className="card-body">
              {organization?.panDetails.map((pan) => (
                <div key={pan._id} className="mb-4">
                  <div className="bg-light p-3 rounded mb-3 d-flex justify-content-between">
                    <span className="text-secondary">PAN Number</span>
                    <span className="fw-bold">{pan.pan_card_number}</span>
                  </div>
                  <div className="bg-light p-3 rounded mb-3 d-flex justify-content-between">
                    <span className="text-secondary">Card Holder</span>
                    <span className="fw-bold">{pan.pan_card_user_name}</span>
                  </div>
                  <div className="bg-light p-3 rounded mb-3 d-flex justify-content-between">
                    <span className="text-secondary">Status</span>
                    {pan.is_verified ? (
                      <div className="d-flex align-items-center gap-2 text-success">
                        <CheckCircle2 size={20} />
                        <span className="fw-medium">Verified</span>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center gap-2 text-danger">
                        <XCircle size={20} />
                        <span className="fw-medium">Not Verified</span>
                      </div>
                    )}
                  </div>
                  <img
                    src={pan.pan_card_image}
                    alt="PAN Card"
                    className="img-fluid rounded shadow-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GST Details */}
      <div className="card mt-4">
        <div className="card-header bg-light d-flex align-items-center gap-2">
          <Building2 className="text-secondary" />
          <h5 className="card-title mb-0">GST Registration</h5>
        </div>
        <div className="card-body">
          {organization?.gstDetails.map((gst) => (
            <div key={gst._id} className="row">
              <div className="col-md-6">
                <div className="bg-light p-3 rounded mb-3 d-flex justify-content-between">
                  <span className="text-secondary">GST Number</span>
                  <span className="fw-bold">{gst.gst_number}</span>
                </div>
                <div className="bg-light p-3 rounded mb-3 d-flex justify-content-between">
                  <span className="text-secondary">Expiry Date</span>
                  <span className="fw-bold">
                    {new Date(gst.expiry_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="bg-light p-3 rounded mb-3 d-flex justify-content-between">
                  <span className="text-secondary">Status</span>
                  {gst.is_verified ? (
                    <div className="d-flex align-items-center gap-2 text-success">
                      <CheckCircle2 size={20} />
                      <span className="fw-medium">Verified</span>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center gap-2 text-danger">
                      <XCircle size={20} />
                      <span className="fw-medium">Not Verified</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <img
                  src={gst.gst_certificate_image}
                  alt="GST Certificate"
                  className="img-fluid rounded shadow-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrganizationDetails;
