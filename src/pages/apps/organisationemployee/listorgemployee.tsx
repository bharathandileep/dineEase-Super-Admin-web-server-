import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Spinner, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { createOrgEmployee } from "../../../server/admin/orgemployeemanagment";
import { getAllOrgEmployees, deleteOrgEmployee, toggleOrgEmployeeStatus } from "../../../server/admin/orgemployeemanagment";
import { Pencil, Trash, ToggleLeft, ToggleRight } from "lucide-react";

interface OrgEmployee {
  _id: string;
  username: string;
  email: string;
  phone_number: string;
  designation: { designation_name: string };
  employee_status: string;
  profile_picture: string;
}

const OrgEmployeeList = () => {
  const [orgemployees, setEmployees] = useState<OrgEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const isLoadingRef = useRef(false);

  const fetchEmployees = async (currentPage: number, isNewSearch: boolean = false, searchQuery: string = "") => {
    if (isLoadingRef.current) return;

    if (isNewSearch) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    isLoadingRef.current = true;

    try {
      const params = {
        page: currentPage,
        limit: 8,
        search: searchQuery, // Pass search term to the backend
      };

      const response = await getAllOrgEmployees(params);
      if (response.status) {
        const { orgEmployees, totalPages, totalEmployees } = response.data;

        if (isNewSearch) {
          setEmployees(orgEmployees); // Replace the list for a new search
        } else {
          setEmployees((prev) => {
            const existingIds = new Set(prev.map((item) => item._id));
            const newItems = orgEmployees.filter((item: any) => !existingIds.has(item._id));
            return [...prev, ...newItems]; // Append new items for pagination
          });
        }

        setTotalItems(totalEmployees);
        setHasMore(currentPage < totalPages);
        setPage(currentPage + 1);
      } else {
        toast.error("Failed to load employees.");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("An error occurred while fetching employees.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
      isLoadingRef.current = false;
    }
  };

  // Initial load
  useEffect(() => {
    fetchEmployees(1, true, searchTerm);
  }, []);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchEmployees(1, true, searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (isLoadingRef.current || !hasMore) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        fetchEmployees(page, false, searchTerm);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, page, searchTerm]);

  const handleEdit = (id: string) => {
    navigate(`/apps/organizations/employ/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await deleteOrgEmployee(id);
        if (response.status) {
          toast.success("Employee deleted successfully!");
          setEmployees(orgemployees.filter((emp) => emp._id !== id));
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
      const response = await toggleOrgEmployeeStatus(id);
      if (response.status) {
        toast.success("Employee status updated successfully!");
        setEmployees(
          orgemployees.map((emp) =>
            emp._id === id
              ? { ...emp, employee_status: emp.employee_status === "Active" ? "Inactive" : "Active" }
              : emp
          )
        );
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
            <Link to="/employees/list">Organisation Employees</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Organisation Employee List
          </li>
        </ol>
      </nav>
      <div className="mb-3" style={{ backgroundColor: "#5bd2bc", padding: "10px" }}>
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="page-title m-0" style={{ color: "#fff" }}>Employees</h3>
          <Link to="/apps/organizations/employ/add" className="btn btn-danger waves-effect waves-light">
            <i className="mdi mdi-plus-circle me-1"></i> Add New Employee
          </Link>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-3">
        <Form.Group controlId="searchEmployees">
          <Form.Control
            type="text"
            placeholder="Search by username, email, or phone number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
      </div>

      {loading ? (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          {orgemployees.length > 0 ? (
            orgemployees.map((orgemployees) => (
              <Col md={6} xl={3} className="mb-3" key={orgemployees._id}>
                <Card
                  className="product-box h-100 shadow-sm position-relative"
                  style={{ transition: "all 0.3s ease-in-out", cursor: "pointer" }}
                  onClick={() => navigate(`/apps/organizations/employ/details/${orgemployees._id}`)}
                >
                  <Card.Body className="d-flex flex-column align-items-center text-center">
                    <div className="position-relative">
                      <img
                        src={orgemployees.profile_picture || "https://via.placeholder.com/150"}
                        alt={orgemployees.username}
                        className="rounded-circle mb-2"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          transition: "transform 0.3s ease-in-out",
                        }}
                      />
                    </div>
                    <div className="product-info mt-auto w-100">
                      <h5 className="font-16 mt-0 sp-line-1">
                        <Link to="#" className="text-dark text-decoration-none">
                          {orgemployees.username}
                        </Link>
                      </h5>
                      <h6 className="m-0 text-muted">Email: {orgemployees.email}</h6>
                      <h6 className="m-0 text-muted">Phone: {orgemployees.phone_number}</h6>
                      <h6 className="m-0 text-muted">
                        Designation: {orgemployees.designation?.designation_name || "Unknown"}
                      </h6>
                      <h6 className="m-0">
                        <span
                          className={`badge ${
                            orgemployees.employee_status === "Active" ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {orgemployees.employee_status}
                        </span>
                      </h6>
                    </div>
                    <div className="product-action d-flex justify-content-center mt-2">
                      <Button
                        variant="success"
                        size="sm"
                        className="me-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(orgemployees._id);
                        }}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="me-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(orgemployees._id);
                        }}
                      >
                        <Trash size={16} />
                      </Button>
                      <Button
                        variant={orgemployees.employee_status === "Active" ? "warning" : "secondary"}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStatus(orgemployees._id);
                        }}
                      >
                        {orgemployees.employee_status === "Active" ? (
                          <ToggleLeft size={16} />
                        ) : (
                          <ToggleRight size={16} />
                        )}
                      </Button>
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

      {loadingMore && (
        <div className="text-center my-3">
          <Spinner animation="border" size="sm" />
        </div>
      )}
    </React.Fragment>
  );
};

export default OrgEmployeeList;