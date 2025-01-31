import React, { useEffect, useState } from "react";

import {
  Building2,
  Users,
  MapPin,
  Phone,
  Mail,
  FileCheck,
  Receipt,
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import the hook for navigation
import { deleteOrganization, getOrganisation } from "../../../services/api";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ListOrganizations() {
  const [organizationData, setOrganizationData] = useState<any[]>([]);
  const navigate = useNavigate(); // Initialize navigate for navigation

  useEffect(() => {
    const fetchOrganisation = async () => {
      try {
        const response = await getOrganisation();
        setOrganizationData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrganisation();
  }, []);

  const handleDelete = async (orgId: string) => {
    try {
      await deleteOrganization(orgId); // Pass the orgId to the delete function
      // Remove the deleted organization from the state
      setOrganizationData((prevData) =>
        prevData.filter((org) => org._id !== orgId)
      );
    } catch (error) {
      console.error("Failed to delete organization:", error);
    }
  };

  const handleUpdate = (orgId: string) => {
    navigate(`/apps/organizations/edit/${orgId}`); // Use navigate to redirect to the update page
  };

  return (
    <div className='container py-4'>
      <h1 className='mb-4'>Organizations</h1>
      <div className='row'>
        {organizationData?.map((org) => (
          <div key={org?._id} className='col-md-12 mb-4'>
            <div className='card'>
              <div className='card-header bg-light d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                  {org.logo && (
                    <img
                      src={org.logo}
                      alt='Logo'
                      className='img-fluid rounded shadow-sm'
                      style={{ maxWidth: "100px" }}
                    />
                  )}

                  <h5 className='mb-0'>{org.name}</h5>
                </div>
                <span className='badge bg-primary'>
                  Reg: {org.register_number}
                </span>
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-md-6'>
                    <p>
                      <Users className='me-2' /> {org.no_of_employees} Employees
                    </p>
                    <p>
                      <MapPin className='me-2' /> {org.location}
                    </p>
                    <p>
                      <Phone className='me-2' /> {org.contact_number}
                    </p>
                    <p>
                      <Mail className='me-2' /> {org.email}
                    </p>
                  </div>
                  <div className='col-md-6'>
                    <h6>Addresses</h6>
                    {org.addressIds?.map((address: any) => (
                      <div
                        key={address._id}
                        className='border rounded p-2 mb-2'
                      >
                        <span className='badge bg-info'>
                          {address.address_type}
                        </span>
                        <p>
                          {address.street_address}, {address.city},{" "}
                          {address.district}
                        </p>
                        <p>
                          {address.state}, {address.country} - {address.pincode}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* PAN Details */}
                {org.panDetails?.map((pan: any) => (
                  <div key={pan._id} className='border p-3 rounded mt-3'>
                    <div className='d-flex align-items-center'>
                      <FileCheck className='me-2' />
                      <h6 className='mb-0'>PAN Details</h6>
                      {pan.is_verified ? (
                        <CheckCircle className='text-success ms-2' />
                      ) : (
                        <XCircle className='text-danger ms-2' />
                      )}
                    </div>
                    <p>Number: {pan.pan_card_number}</p>
                    <p>Name: {pan.pan_card_user_name}</p>
                    {pan.pan_card_image && (
                      <img
                        src={pan.pan_card_image}
                        alt='PAN Card'
                        className='img-fluid rounded shadow-sm'
                        style={{ maxWidth: "300px" }}
                      />
                    )}
                  </div>
                ))}
                {/* GST Details */}
                {org.gstDetails?.map((gst: any) => (
                  <div key={gst._id} className='border p-3 rounded mt-3'>
                    <div className='d-flex align-items-center'>
                      <Receipt className='me-2' />
                      <h6 className='mb-0'>GST Details</h6>
                      {gst.is_verified ? (
                        <CheckCircle className='text-success ms-2' />
                      ) : (
                        <XCircle className='text-danger ms-2' />
                      )}
                    </div>
                    <p>Number: {gst.gst_number}</p>
                    <p>Expires: {formatDate(gst.expiry_date)}</p>
                    {gst.gst_certificate_image && (
                      <img
                        src={gst.gst_certificate_image}
                        alt='GST Certificate'
                        className='img-fluid rounded shadow-sm'
                        style={{ maxWidth: "300px" }}
                      />
                    )}
                  </div>
                ))}
                <p>Logo</p>
              </div>
              <div className='card-footer d-flex justify-content-between'>
                <button
                  className='btn btn-primary'
                  onClick={() => handleUpdate(org._id)}
                >
                  <Edit className='me-1' /> Update
                </button>
                <button
                  className='btn btn-danger'
                  onClick={() => handleDelete(org._id)}
                >
                  <Trash2 className='me-1' /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOrganizations;
