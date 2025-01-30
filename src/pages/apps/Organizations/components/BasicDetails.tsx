import React from "react";

type BasicDetailsProps = {
  formData: any;
  updateFormData: (data: any) => void;
};

const BasicDetails: React.FC<BasicDetailsProps> = ({
  formData,
  updateFormData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="container">
      <h2 className="h2 mb-4 fw-semibold">Basic Details</h2>

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <label htmlFor="name" className="form-label small mb-1">
            Company Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control shadow-sm"
          />
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="register_number" className="form-label small mb-1">
            Registration Number
          </label>
          <input
            type="text"
            id="register_number"
            name="register_number"
            value={formData.register_number}
            onChange={handleChange}
            required
            className="form-control shadow-sm"
          />
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="contact_number" className="form-label small mb-1">
            Contact Number
          </label>
          <input
            type="tel"
            id="contact_number"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            required
            className="form-control shadow-sm"
          />
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="email" className="form-label small mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-control shadow-sm"
          />
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="no_of_employees" className="form-label small mb-1">
            Number of Employees
          </label>
          <input
            type="number"
            id="no_of_employees"
            name="no_of_employees"
            value={formData.no_of_employees}
            onChange={handleChange}
            required
            min="1"
            className="form-control shadow-sm"
          />
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="owner_name" className="form-label small mb-1">
            Owner Name
          </label>
          <input
            type="text"
            id="owner_name"
            name="owner_name"
            value={formData.owner_name}
            onChange={handleChange}
            required
            className="form-control shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;