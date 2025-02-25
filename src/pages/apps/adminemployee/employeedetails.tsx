import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Spinner, Badge } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  getEmployeeById,
  deleteEmployee,
  toggleEmployeeStatus,
} from "../../../server/admin/employeeManagment";
import {
  Pencil,
  Trash,
  ToggleLeft,
  ToggleRight,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
} from "lucide-react";

interface Employee {
  _id: string;
  username: string;
  email: string;
  phone_number: string;
  designation: { designation_name: string };
  employee_status: string;
  profile_picture: string;
  aadhar_number?: string;
  pan_number: string;
  aadhar_image: string;
  pan_image: string;
  address: {
    street_address: string;
    city: string;
    district?: string;
    state: string;
    pincode: string;
    country: string;
  };
}

const EmployeeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        if (id) {
          const response = await getEmployeeById(id);
          if (response.status) {
            setEmployee(response.data);
          } else {
            toast.error("Failed to load employee details.");
          }
        }
      } catch (error) {
        console.error("Error fetching employee details:", error);
        toast.error("An error occurred while fetching employee details.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        if (id) {
          const response = await deleteEmployee(id);
          if (response.status) {
            toast.success("Employee deleted successfully!");
            navigate("/apps/employee/list"); // Redirect to the employee list after deletion
          } else {
            toast.error("Failed to delete employee.");
          }
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        toast.error("An error occurred while deleting the employee.");
      }
    }
  };

  const handleToggleStatus = async () => {
    try {
      if (id) {
        const response = await toggleEmployeeStatus(id);
        if (response.status) {
          toast.success("Employee status updated successfully!");
          setEmployee((prev) =>
            prev
              ? {
                  ...prev,
                  employee_status:
                    prev.employee_status === "Active" ? "Inactive" : "Active",
                }
              : null
          );
        } else {
          toast.error("Failed to update status.");
        }
      }
    } catch (error) {
      console.error("Error updating employee status:", error);
      toast.error("An error occurred while updating status.");
    }
  };

  if (loading) {
    return (
      <div className='text-center my-5'>
        <Spinner animation='border' />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className='text-center my-5'>
        <h4>Employee not found.</h4>
      </div>
    );
  }

  return (
    <React.Fragment>
      {/* Breadcrumb Navigation */}
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb m-2'>
          <li className='breadcrumb-item'>
            <Link to='/employees/list'>Employees</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Employee Details
          </li>
        </ol>
      </nav>

      {/* Page Header */}
      <div
        className='mb-3'
        style={{ backgroundColor: "#5bd2bc", padding: "10px" }}
      >
        <div className='d-flex align-items-center justify-content-between'>
          <h3 className='page-title m-0' style={{ color: "#fff" }}>
            Employee Details
          </h3>
          <div className='d-flex gap-2'>
            <Button
              variant='light'
              onClick={() => navigate(`/apps/employee/edit/${employee._id}`)}
            >
              <Pencil size={16} className='me-1' /> Edit
            </Button>
            <Button variant='danger' onClick={handleDelete}>
              <Trash size={16} className='me-1' /> Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Employee Details */}
      <Row>
        <Col md={4}>
          <Card className='mb-3 shadow-sm'>
            <Card.Body className='text-center'>
              {/* Profile Picture */}
              <img
                src={
                  employee.profile_picture || "https://via.placeholder.com/150"
                }
                alt={employee.username}
                className='rounded-circle mb-3'
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "contain",
                }}
              />

              {/* Employee Name */}
              <h4 className='mb-2'>{employee.username}</h4>
              <Badge
                bg={
                  employee.employee_status === "Active" ? "success" : "danger"
                }
                className='mb-3'
                onClick={handleToggleStatus}
                style={{ cursor: "pointer" }} // Add this to indicate the badge is clickable
              >
                {employee.employee_status}
              </Badge>

              {/* Toggle Status Button */}

              {/* Contact Information */}
              <div className='text-start'>
                <div className='d-flex align-items-center mb-2'>
                  <Mail size={16} className='me-2' />
                  <span>{employee.email}</span>
                </div>
                <div className='d-flex align-items-center mb-2'>
                  <Phone size={16} className='me-2' />
                  <span>{employee.phone_number}</span>
                </div>
                <div className='d-flex align-items-center mb-2'>
                  <Building size={16} className='me-2' />
                  <span>
                    {employee.designation?.designation_name || "Unknown"}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className='mb-3 shadow-sm'>
            <Card.Body>
              <h5 className='card-title mb-3'>Identity Documents</h5>
              <Row>
                <Col md={6}>
                  <p>
                    <strong>Aadhaar Number:</strong>{" "}
                    {employee.aadhar_number || "N/A"}
                  </p>
                  {employee.aadhar_image && (
                    <div className='mt-2'>
                      <strong>Aadhaar Image:</strong>
                      <img
                        src={employee.aadhar_image}
                        alt='Aadhaar Card'
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          marginTop: "10px",
                        }}
                      />
                    </div>
                  )}
                </Col>
                <Col md={6}>
                  <p>
                    <strong>PAN Number:</strong> {employee.pan_number || "N/A"}
                  </p>
                  {employee.pan_image && (
                    <div className='mt-2'>
                      <strong>PAN Image:</strong>
                      <img
                        src={employee.pan_image}
                        alt='PAN Card'
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          marginTop: "10px",
                        }}
                      />
                    </div>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className='shadow-sm'>
            <Card.Body>
              <h5 className='card-title mb-3'>Address Details</h5>
              <div className='d-flex flex-column gap-2'>
                <div className='d-flex align-items-center'>
                  <MapPin size={16} className='me-2' />
                  <span>{employee.address.street_address}</span>
                </div>
                <div className='d-flex align-items-center'>
                  <span>
                    {employee.address.city}, {employee.address.district}
                  </span>
                </div>
                <div className='d-flex align-items-center'>
                  <span>
                    {employee.address.state}, {employee.address.pincode}
                  </span>
                </div>
                <div className='d-flex align-items-center'>
                  <span>{employee.address.country}</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EmployeeDetails;
