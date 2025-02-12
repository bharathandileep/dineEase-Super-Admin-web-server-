import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { getAllEmployees, deleteEmployee, toggleEmployeeStatus } from "../../../server/admin/employeemanagment";
import { Pencil, Trash, ToggleLeft, ToggleRight } from "lucide-react"; 

interface Employee {
  _id: string;
  username: string;
  email: string;
  phone_number: string;
  designation: { designation_name: string };
  employee_status: string;
}

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getAllEmployees();
        if (response.status) {
          setEmployees(response.data);
        } else {
          toast.error("Failed to load employees.");
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("An error occurred while fetching employees.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/employees/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await deleteEmployee(id);
        if (response.status) {
          toast.success("Employee deleted successfully!");
          setEmployees(employees.filter((emp) => emp._id !== id));
        } else {
          toast.error("Failed to delete employee.");
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        toast.error("An error occurred while deleting the employee.");
      }
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await toggleEmployeeStatus(id);
      if (response.status) {
        toast.success("Employee status updated successfully!");
        setEmployees(employees.map(emp => emp._id === id ? { ...emp, employee_status: emp.employee_status === "Active" ? "Inactive" : "Active" } : emp));
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating employee status:", error);
      toast.error("An error occurred while updating status.");
    }
  };

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb m-2">
          <li className="breadcrumb-item">
            <Link to="/employees/list">Employees</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Employee List
          </li>
        </ol>
      </nav>

      <div className="mb-3" style={{ backgroundColor: "#5bd2bc", padding: "10px" }}>
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="page-title m-0" style={{ color: "#fff" }}>Employees</h3>
          <Link to="/employees/add" className="btn btn-danger waves-effect waves-light">
            <i className="mdi mdi-plus-circle me-1"></i> Add New Employee
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <Col md={6} xl={3} className="mb-3" key={employee._id}>
                <Card className="product-box h-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="product-action">
                      <Button variant="success" size="sm" className="me-1" onClick={() => handleEdit(employee._id)}>
                        <Pencil size={16} />
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(employee._id)}>
                        <Trash size={16} />
                      </Button>
                      <Button
                        variant={employee.employee_status === "Active" ? "warning" : "secondary"}
                        size="sm"
                        onClick={() => handleToggleStatus(employee._id)}
                      >
                        {employee.employee_status === "Active" ? <ToggleLeft size={16} /> : <ToggleRight size={16} />}
                      </Button>
                    </div>
                    <div className="product-info mt-auto">
                      <h5 className="font-16 mt-0 sp-line-1">
                        <Link to="#" className="text-dark">{employee.username}</Link>
                      </h5>
                      <h6 className="m-0">
                        <span className="text-muted">Email: {employee.email}</span>
                      </h6>
                      <h6 className="m-0">
                        <span className="text-muted">Phone: {employee.phone_number}</span>
                      </h6>
                      <h6 className="m-0">
                        <span className="text-muted">Designation: {employee.designation?.designation_name || "Unknown"}</span>
                      </h6>
                      <h6 className="m-0">
                        <span className={`badge ${employee.employee_status === "Active" ? "bg-success" : "bg-danger"}`}>
                          {employee.employee_status}
                        </span>
                      </h6>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No employees found.</p>
          )}
        </Row>
      )}
    </React.Fragment>
  );
};

export default EmployeeList;
