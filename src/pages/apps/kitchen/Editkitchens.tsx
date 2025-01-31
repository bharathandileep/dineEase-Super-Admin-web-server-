import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, MapPin, FileText, Building2, Mail, Phone } from 'lucide-react';
import { getKitchenById, updateKitchen } from '../../../services/api';

interface Address {
  street_address: string;
  city: string;
  state: string;
  district: string;
  pincode: string;
  country: string;
  landmark: string;
  address_type: string;
}

interface PanDetails {
  pan_card_number: string;
  pan_card_user_name: string;
  pan_card_image: string;
  expiry_date: string;
}

interface GstDetails {
  gst_number: string;
  gst_certificate_image: string;
  expiry_date: string;
}

interface FssaiDetails {
  ffsai_certificate_number: string;
  ffsai_card_owner_name: string;
  ffsai_certificate_image: string;
  expiry_date: string;
}

interface KitchenData {
  kitchen_name: string;
  kitchen_owner_name: string;
  owner_email: string;
  owner_phone_number: string;
  kitchen_phone_number: string;
  opens_at: string;
  closes_at: string;
  working_days: string[];
  addressIds: Address[];
  panDetails: PanDetails[];
  gstDetails: GstDetails[];
  fssaiDetails: FssaiDetails[];
}

function EditKitchen() {
  const { id } = useParams();
  const [formData, setFormData] = useState<KitchenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKitchenById = async () => {
      try {
        const response = await getKitchenById(id);
        setFormData(response);
        setLoading(false);
      } catch (error) {
        setError('Failed to load kitchen data');
        setLoading(false);
      }
    };
    fetchKitchenById();
  }, [id]);

  const handleInputChange = (section: string, field: string, value: string) => {
    if (!formData) return;

    if (section === 'basic') {
      setFormData({ ...formData, [field]: value });
    } else if (section === 'address' && formData.addressIds[0]) {
      const newAddressIds = [...formData.addressIds];
      newAddressIds[0] = { ...newAddressIds[0], [field]: value };
      setFormData({ ...formData, addressIds: newAddressIds });
    } else if (section === 'pan' && formData.panDetails[0]) {
      const newPanDetails = [...formData.panDetails];
      newPanDetails[0] = { ...newPanDetails[0], [field]: value };
      setFormData({ ...formData, panDetails: newPanDetails });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateKitchen(id, formData);
        navigate('/apps/kitchen/list')
    } catch (error) {
      console.error('Error updating kitchen:', error);
    }
  };

  if (loading) return <div className="d-flex align-items-center justify-content-center min-vh-100">Loading...</div>;
  if (error) return <div className="d-flex align-items-center justify-content-center min-vh-100 text-danger">{error}</div>;
  if (!formData) return null;

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h1 className="h4 mb-0">Edit Kitchen Details</h1>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit} className="row g-4">
                  <div className="col-12">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <Building2 size={20} />
                      <h2 className="h5 mb-0">Basic Information</h2>
                    </div>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Kitchen Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.kitchen_name}
                          onChange={(e) => handleInputChange('basic', 'kitchen_name', e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Owner Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.kitchen_owner_name}
                          onChange={(e) => handleInputChange('basic', 'kitchen_owner_name', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <Phone size={20} />
                      <h2 className="h5 mb-0">Contact Information</h2>
                    </div>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={formData.owner_email}
                          onChange={(e) => handleInputChange('basic', 'owner_email', e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={formData.kitchen_phone_number}
                          onChange={(e) => handleInputChange('basic', 'kitchen_phone_number', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <Clock size={20} />
                      <h2 className="h5 mb-0">Operating Hours</h2>
                    </div>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Opens At</label>
                        <input
                          type="time"
                          className="form-control"
                          value={formData.opens_at}
                          onChange={(e) => handleInputChange('basic', 'opens_at', e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Closes At</label>
                        <input
                          type="time"
                          className="form-control"
                          value={formData.closes_at}
                          onChange={(e) => handleInputChange('basic', 'closes_at', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <MapPin size={20} />
                      <h2 className="h5 mb-0">Address</h2>
                    </div>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Street Address</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.addressIds[0]?.street_address}
                          onChange={(e) => handleInputChange('address', 'street_address', e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.addressIds[0]?.city}
                          onChange={(e) => handleInputChange('address', 'city', e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">State</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.addressIds[0]?.state}
                          onChange={(e) => handleInputChange('address', 'state', e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Pincode</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.addressIds[0]?.pincode}
                          onChange={(e) => handleInputChange('address', 'pincode', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 text-end mt-4">
                    <button type="submit" className="btn btn-primary px-4">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditKitchen;