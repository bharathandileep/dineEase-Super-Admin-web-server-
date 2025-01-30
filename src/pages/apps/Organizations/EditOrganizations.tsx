import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Save } from "lucide-react"; // Example icon
import { getOrganizationById, updateOrganization } from "../../../services/api";

function EditOrganization() {
  const [formData, setFormData] = useState<any>({
    name: "",
    location: "",
    contact_number: "",
    email: "",
    no_of_employees: 0,
    addressIds: [], // Initialize as an empty array
  });
  const { orgId } = useParams(); // Get the organization ID from the URL
  const navigate = useNavigate(); // To redirect to the list page after successful update

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        if (orgId) {
          const orgData = await getOrganizationById(orgId); 
          console.log(orgData); // Fetch the organization by ID and include populated address data
          setFormData({
            name: orgData.name,
            location: orgData.location,
            contact_number: orgData.contact_number,
            email: orgData.email,
            no_of_employees: orgData.no_of_employees,
            addressIds: orgData.addressIds?.map((address: any) => ({
              id: address._id,
              street_address: address.street_address || "",
              city: address.city || "",
              state: address.state || "",
              pincode: address.pincode || "",
              country: address.country || "",
              district: address.district || "",
            })) || [],
          });
        }
      } catch (error) {
        console.error("Error fetching organization:", error);
      }
    };

    if (orgId) {
      fetchOrganization();
    }
  }, [orgId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, addressIndex?: number) => {
    const { name, value } = e.target;
    if (addressIndex !== undefined) {
      const updatedAddresses = [...formData.addressIds];
      updatedAddresses[addressIndex] = {
        ...updatedAddresses[addressIndex],
        [name]: value, 
      };
      setFormData((prevState: any) => ({
        ...prevState,
        addressIds: updatedAddresses,
      }));
    } else {
      setFormData((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (orgId) {
        console.log("Updated Organization:", formData);
        const updatedOrg = await updateOrganization(orgId, formData);
        // Optionally, navigate to the view page after successful update
        // navigate(`/view-org`);
      }
    } catch (error) {
      console.error("Error updating organization:", error);
    }
  };

  if (!orgId) {
    return <div>Organization ID is missing.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Organization</h1>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">Edit Organization</h2>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="font-medium text-gray-900">Organization Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="font-medium text-gray-900">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="contact_number" className="font-medium text-gray-900">Contact Number</label>
                <input
                  type="text"
                  id="contact_number"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="font-medium text-gray-900">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="no_of_employees" className="font-medium text-gray-900">Number of Employees</label>
              <input
                type="number"
                id="no_of_employees"
                name="no_of_employees"
                value={formData.no_of_employees}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Address Section */}
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-3">Edit Addresses</h3>
              {formData.addressIds ? (
                formData.addressIds.map((address: any, index: number) => (
                  <div key={address._id} className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-gray-800">Address {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor={`street_address_${index}`} className="font-medium text-gray-900">Street Address</label>
                        <input
                          type="text"
                          id={`street_address_${index}`}
                          name="street_address"
                          value={address.street_address}
                          onChange={(e) => handleChange(e, index)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor={`city_${index}`} className="font-medium text-gray-900">City</label>
                        <input
                          type="text"
                          id={`city_${index}`}
                          name="city"
                          value={address.city}
                          onChange={(e) => handleChange(e, index)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor={`district${index}`} className="font-medium text-gray-900">district</label>
                        <input
                          type="text"
                          id={`district${index}`}
                          name="city"
                          value={address.district}
                          onChange={(e) => handleChange(e, index)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor={`state_${index}`} className="font-medium text-gray-900">State</label>
                        <input
                          type="text"
                          id={`state_${index}`}
                          name="state"
                          value={address.state}
                          onChange={(e) => handleChange(e, index)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor={`pincode_${index}`} className="font-medium text-gray-900">Pincode</label>
                        <input
                          type="text"
                          id={`pincode_${index}`}
                          name="pincode"
                          value={address.pincode}
                          onChange={(e) => handleChange(e, index)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor={`country_${index}`} className="font-medium text-gray-900">Country</label>
                      <input
                        type="text"
                        id={`country_${index}`}
                        name="country"
                        value={address.country}
                        onChange={(e) => handleChange(e, index)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>No addresses available.</p>  // Optional fallback message if no addresses
              )}
            </div>

            <div className="mt-6 flex items-center space-x-4">
              <button
                type="submit"
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditOrganization;
 