import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { PostStaffApi, Staffs } from "../../../../server/allApi";

interface AddMemberProps {
  show: boolean;
  onHide: () => void;
  onAddMember: (staffs: Staffs) => void;
}

const AddMember: React.FC<AddMemberProps> = ({ show, onHide, onAddMember }) => {
  const [formData, setFormData] = useState<Omit<Staffs, '_id'>>({
    // admin_staff_id: '',
    name: '',
    role: '',
    email: '',
    phone_no: '',
    status: 'Active',
    password: '',
    image_id: '',
    created_by: '66af9daba4daf40b3ac66091',
    created_at: new Date().toISOString(),
    updated_by: '66af9daba4daf40b3ac66091',
    updated_at: new Date().toISOString(),
  });

  const [loadingMember, setLoadingMember] = useState<boolean>(false);
  const [errorMember, setErrorMember] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingMember(true);
    setErrorMember(null);
    try {
      const newStaffs = await PostStaffApi(formData);
      onAddMember(newStaffs);
      onHide();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error adding Staffs:', error);
        setErrorMember(error.message);
      } else {
        console.error('Unexpected error:', error);
        setErrorMember('Unexpected error occurred.');
      }
    } finally {
      setLoadingMember(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className="bg-light" closeButton>
        <Modal.Title className="m-0">Add New Member</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {errorMember && <div className="alert alert-danger">{errorMember}</div>}
        <form onSubmit={handleSubmit}>
          {/* <Form.Group controlId="formStaffId">
            <Form.Label>Staff ID</Form.Label>
            <Form.Control
              type="text"
              name="admin_staff_id"
              value={formData.admin_staff_id}
              onChange={handleChange}
              required
            />
          </Form.Group> */}
          <Form.Group controlId="formStaffName">
            <Form.Label>Staff Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formImageId">
            <Form.Label>Image ID</Form.Label>
            <Form.Control
              type="text"
              name="image_id"
              value={formData.image_id}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {/* <Form.Group controlId="formCreatedBy">
            <Form.Label>Created By</Form.Label>
            <Form.Control
              type="text"
              name="created_by"
              value={formData.created_by}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCreatedAt">
            <Form.Label>Created At</Form.Label>
            <Form.Control
              type="datetime-local"
              name="created_at"
              value={formData.created_at.slice(0, 16)}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formUpdatedBy">
            <Form.Label>Updated By</Form.Label>
            <Form.Control
              type="text"
              name="updated_by"
              value={formData.updated_by}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formUpdatedAt">
            <Form.Label>Updated At</Form.Label>
            <Form.Control
              type="datetime-local"
              name="updated_at"
              value={formData.updated_at.slice(0, 16)}
              onChange={handleChange}
              required
            />
          </Form.Group> */}
          <div className="text-end">
            <Button variant="success" type="submit" className="waves-effect waves-light me-1" disabled={loadingMember}>
              {loadingMember ? 'Saving...' : 'Save'}
            </Button>
            <Button variant="danger" className="waves-effect waves-light" onClick={onHide}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddMember;
