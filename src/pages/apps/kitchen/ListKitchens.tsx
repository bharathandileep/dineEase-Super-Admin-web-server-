import React, { useEffect, useState } from "react";
import {
  ChefHat,
  MapPin,
  Phone,
  Mail,
  FileCheck,
  Receipt,
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
  Clock,
  Building,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteKitchen, getKitchens } from "../../../services/api";
// import { deleteKitchen, getKitchen } from "../../../services/api";
// import { getKitchen, deleteKitchen } from "../services/api";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ListKitchens() {
  const [kitchenData, setKitchenData] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const response = await getKitchens();
        setKitchenData(response.data);
        console.log("Kitchen data:", response.data);
      } catch (error) {
        console.error("Error fetching kitchens:", error);
      }
    };

    fetchKitchens();
  }, []);

  const handleDelete = async (kitchenId: string) => {
    try {
      await deleteKitchen(kitchenId);
      setKitchenData((prevData) =>
        prevData.filter((kitchen) => kitchen._id !== kitchenId)
      );
    } catch (error) {
      console.error("Failed to delete kitchen:", error);
    }
  };

  const handleUpdate = (kitchenId: string) => {
    navigate(`/apps/Kitchen/edit/${kitchenId}`);
  };

  return (
    <div className="container my-8">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4 text-dark">Registered Kitchens</h1>
        <button
          onClick={() => navigate("/apps/Kitchen/new")}
          className="btn btn-primary"
        >
          Register New Kitchen
        </button>
      </div>

      {kitchenData?.map((kitchen) => (
        <div key={kitchen?._id} className="card mb-4 shadow-sm">
          <div className="card-header bg-light">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <ChefHat className="mr-2" />
                <h2 className="h5 font-weight-bold mb-0">
                  {kitchen.kitchen_name}
                </h2>
              </div>
              <div className="btn-group">
                <button
                  onClick={() => handleUpdate(kitchen._id)}
                  className="btn btn-outline-primary"
                >
                  <Edit className="mr-1" /> Update
                </button>
                <button
                  onClick={() => handleDelete(kitchen._id)}
                  className="btn btn-outline-danger"
                >
                  <Trash2 className="mr-1" /> Delete
                </button>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <Building className="mr-1" />
                  <span className="text-muted">
                    Owner: {kitchen.kitchen_owner_name}
                  </span>
                </div>
                <div className="mb-3">
                  <Phone className="mr-1" />
                  <span className="text-muted">
                   Kitchen Phone Number: {kitchen.kitchen_phone_number}
                  </span>
                </div>
                <div className="mb-3">
                  <Mail className="mr-1" />
                  <span className="text-muted">E-Mail Address:{kitchen.owner_email}</span>
                </div>
                <div className="mb-3">
                  <Phone className="mr-1" />
                  <span className="text-muted">
                  Owner Phone Number: {kitchen.owner_phone_number}
                  </span>
                </div>
                <div className="mb-3">
                  <Clock className="mr-1" />
                  <span className="text-muted">
                    Operating Hours: {kitchen.opens_at} - {kitchen.closes_at}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="h6 font-weight-bold">Kitchen Address</h3>
                  <div className="bg-light p-3 rounded">
                    {kitchen.addressIds && kitchen.addressIds.length > 0 ? (
                      kitchen.addressIds?.map((address:any, index:number) => (
                        <div key={address._id || index} className="mb-3">
                          <div className="mb-2">
                            <MapPin className="mr-1" />
                            <span className="text-muted font-weight-bold">
                              {address.address_type}
                            </span>
                          </div>
                          <div className="text-muted">
                            {address.street_address && (
                              <p>{address.street_address}</p>
                            )}
                            <p>
                              {address.city}, {address.district}
                            </p>
                            <p>
                              {address.state}, {address.country}
                            </p>
                            {/* <p>
                              {address.address_type}
                            </p> */}
                            <p>PIN: {address.pincode}</p>
                            {address.landmark && (
                              <p>Landmark: {address.landmark}</p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted">No address available</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-4 bg-light p-3 rounded">
                  <div className="d-flex align-items-center mb-2">
                    <FileCheck className="mr-1" />
                    <h3 className="h6 font-weight-bold mb-0">PAN Details</h3>
                  </div>
                  <div className="text-muted">
                    <p>Number: {kitchen.panDetails[0]?.pan_card_number}</p>
                    <p>Name: {kitchen.panDetails[0]?.pan_card_user_name}</p>
                    <p>Expires: {formatDate(kitchen.panDetails[0]?.expiry_date)}</p>
                    {kitchen.panDetails[0]?.pan_card_image && (
                      <div className="mt-2">
                        <img
                          src={kitchen.panDetails[0]?.pan_card_image}
                          alt="PAN Card"
                          className="img-fluid rounded shadow-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4 bg-light p-3 rounded">
                  <div className="d-flex align-items-center mb-2">
                    <Receipt className="mr-1" />
                    <h3 className="h6 font-weight-bold mb-0">GST Details</h3>
                  </div>
                  <div className="text-muted">
                    <p>Number: {kitchen.gstDetails[0]?.gst_number}</p>
                    <p>Expires: {formatDate(kitchen.gstDetails[0]?.expiry_date)}</p>
                    {kitchen.gstDetails[0]?.gst_certificate_image && (
                      <div className="mt-2">
                        <img
                          src={kitchen.gstDetails[0]?.gst_certificate_image}
                          alt="GST Certificate"
                          className="img-fluid rounded shadow-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-light p-3 rounded">
                  <div className="d-flex align-items-center mb-2">
                    <FileCheck className="mr-1" />
                    <h3 className="h6 font-weight-bold mb-0">FSSAI Details</h3>
                  </div>
                  <div className="text-muted">
                    <p>
                      Number: {kitchen.fssaiDetails[0]?.ffsai_certificate_number}
                    </p>
                    <p>Name: {kitchen.fssaiDetails[0]?.ffsai_card_owner_name}</p>
                    <p>
                      Expires: {formatDate(kitchen.fssaiDetails[0]?.expiry_date)}
                    </p>
                    {kitchen.fssaiDetails[0]?.ffsai_certificate_image && (
                      <div className="mt-2">
                        <img
                          src={kitchen.fssaiDetails[0]?.ffsai_certificate_image}
                          alt="FSSAI Certificate"
                          className="img-fluid rounded shadow-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListKitchens;
