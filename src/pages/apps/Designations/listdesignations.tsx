import React, { useEffect, useMemo, useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { Card, Row, Col, Button, Spinner, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  getAllDesignations,
  createDesignation,
  updateDesignation,
  deleteDesignation,
  toggleDesignationStatus,
} from "../../../server/admin/designations";
import DesignationModal from "./modal/DesignationModal";

function Designations() {
  const [action, setAction] = useState("");
  const [show, setShow] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [designations, setDesignations] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  
  const [designationName, setDesignationName] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  useEffect(() => {
    const fetchAllDesignations = async () => {
      setLoading(true);
      try {
        const response = await getAllDesignations();
        if (response.status) {
          setDesignations(response.data);
        } else {
          toast.error("Failed to load designations.");
        }
      } catch (error: any) {
        console.error("Error:", error.response?.data || error.message);
        toast.error("An error occurred while fetching designations.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllDesignations();
  }, [isDeleted, show]);

  useEffect(() => {
    if (action === "edit" && selectedItem) {
      setDesignationName(selectedItem.designation_name);
      setCreatedBy(selectedItem.created_by);
    } else {
      setDesignationName("");
      setCreatedBy("");
    }
  }, [show, action, selectedItem]);

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await toggleDesignationStatus(id);
      
      if (response.status && response.data) {
        setDesignations((prevItems) =>
          prevItems.map((item) =>
            item._id === id ? { ...item, status: response.data.status } : item
          )
        );
        toast.success("Status updated successfully!");
      } else {
        toast.error("Failed to toggle status.");
      }
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Error toggling status.");
    }
  };
  
   

  const handleEdit = (id: string) => {
    const item = designations.find((designation) => designation._id === id);
    setAction("edit");
    setSelectedItem(item);
    setShow(true);
  };

  const handleDelete = async (id: any) => {
    if (!window.confirm("Are you sure you want to delete this designation?"))
      return;
    try {
      const response = await deleteDesignation(id);
      if (response.status) {
        toast.success(response.message);
        setIsDeleted((prev) => !prev);
      } else {
        toast.error(response.message || "Delete failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Delete failed. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (!designationName || !createdBy) {
      toast.error("All fields are required.");
      return;
    }

    const payload = { designation_name: designationName, created_by: createdBy };

    try {
      if (action === "edit") {
        await updateDesignation(selectedItem._id, payload);
        toast.success("Designation updated successfully!");
      } else {
        await createDesignation(payload);
        toast.success("Designation created successfully!");
      }
      setShow(false);
    } catch (error) {
      toast.error("Operation failed.");
    }
  };

  const filteredDesignations = useMemo(() => {
    return designations.filter((value) => {
      const designationMatch = value.designation_name
        .toLowerCase()
        .includes(searchTerm);
      const createdByMatch = value.created_by
        .toLowerCase()
        .includes(searchTerm);
      const statusMatch =
        statusFilter === "all" ||
        (statusFilter === "active" && value.status) ||
        (statusFilter === "inactive" && !value.status);

      return (designationMatch || createdByMatch) && statusMatch;
    });
  }, [searchTerm, statusFilter, designations]);

  return (
    <>
      <div className="container py-2">
        <Card className="mb-2">
          <Card.Body>
            <Row className="justify-content-between">
              <Col md={6} className="d-flex gap-2">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search..."
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
                <Form.Select
                  className="w-auto"
                  value={statusFilter}
                  onChange={(e: any) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Col>

              <Col md={4} className="text-md-end">
                <Button variant="danger" onClick={() => {
                  setAction("add");
                  setShow(true);
                }}>
                  <i className="mdi mdi-plus-circle me-1"></i> Add New
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h2 className="h5 mb-0 text-white">Designations</h2>
          </div>
          <div className="table-responsive">
            {loading ? (
              <div className="text-center my-4">
                <Spinner animation="border" />
                <p>Loading designations...</p>
              </div>
            ) : designations.length === 0 ? (
              <div className="text-center my-4">
                <p>No Designations Found</p>
              </div>
            ) : (
              <table className="table table-striped table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Index</th>
                    <th scope="col">Designation Name</th>
                    <th scope="col">Created By</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDesignations.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.designation_name}</td>
                      <td>{item.created_by}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          onClick={() => handleToggleStatus(item._id)}
                          className={`btn btn-sm ${
                            item.status ? "btn-success" : "btn-secondary"
                          }`}
                        >
                          {item.status ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleEdit(item._id)}
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <DesignationModal
        show={show}
        onHide={() => setShow(false)}
        action={action}
        selectedItem={selectedItem}
      />
    </>
  );
}

export default Designations;
