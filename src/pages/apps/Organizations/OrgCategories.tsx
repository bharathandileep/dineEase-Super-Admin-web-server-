import React, { useEffect, useMemo, useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { Card, Row, Col, Button, Spinner, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import {
  getAllCategories,
  deleteCategory,
  toggleCategoryStatus,
} from "../../../server/admin/menu";
import AddCategory from "../menu/modal/AddCategory";
import {
  kitchensDeleteCategory,
  kitchensGetAllCategories,
  kitchensToggleCategoryStatus,
} from "../../../server/admin/kitchens";
import AddkitchenCategory from "./modal/AddkitchenCategory";
import {
  orgDeleteCategory,
  orgGetAllCategories,
  orgToggleCategoryStatus,
} from "../../../server/admin/organization";

function OrgCategories() {
  const isSubCategory = false;
  const [action, setAction] = useState("");
  const [show, setShow] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchAllCategories = async () => {
      setLoading(true);
      try {
        const response = await orgGetAllCategories();
        if (response.status) {
          setMenuItems(response.data);
        } else {
          toast.error("Failed to load menu categories.");
        }
      } catch (error: any) {
        console.error("Error:", error.response?.data || error.message);
        toast.error("An error occurred while fetching categories.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllCategories();
  }, [isDeleted, show]);

  const onSearchData = (searchValue: string) => {
    setSearchTerm(searchValue.toLowerCase());
  };
  const handleToggleStatus = async (id: string) => {
    try {
      const response = await orgToggleCategoryStatus(id);
      if (response.status) {
        setMenuItems((prevItems) =>
          prevItems.map((item) =>
            item._id === id ? { ...item, status: !item.status } : item
          )
        );
      } else {
        toast.error("Failed to toggle status.");
      }
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Error toggling status.");
    }
  };
  const handleEdit = (id: string) => {
    const item = menuItems.find((menu) => menu._id === id);
    setAction("edit");
    setSelectedItem(item);
    setShow(true);
  };

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((value) => {
      const categoryMatch = value.category.toLowerCase().includes(searchTerm);
      const createdAtString =
        value.createdAt && !isNaN(new Date(value.createdAt).getTime())
          ? new Date(value.createdAt).toLocaleDateString()
          : "";
      const createdAtMatch = createdAtString.toLowerCase().includes(searchTerm);
      const statusMatch =
        statusFilter === "all" ||
        (statusFilter === "active" && value.status) ||
        (statusFilter === "inactive" && !value.status);

      return (categoryMatch || createdAtMatch) && statusMatch;
    });
  }, [searchTerm, statusFilter, menuItems]);
  const handleDelete = async (id: any) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      const response = await orgDeleteCategory(id);
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
                  onChange={(e) => onSearchData(e.target.value)}
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
                <Button variant="danger" onClick={() => setShow(true)}>
                  <i className="mdi mdi-plus-circle me-1"></i> Add New
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h2 className="h5 mb-0">Menu Items</h2>
          </div>
          <div className="table-responsive">
            {loading ? (
              <div className="text-center my-4">
                <Spinner animation="border" />
                <p>Loading menu categories...</p>
              </div>
            ) : menuItems.length === 0 ? (
              <div className="text-center my-4">
                <p>No Menu Category Found</p>
              </div>
            ) : filteredMenuItems.length === 0 ? (
              <div className="text-center my-4">
                <p>No results found for "{searchTerm}"</p>
              </div>
            ) : (
              <table className="table table-striped table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Index</th>
                    <th scope="col">Menu Name</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMenuItems.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.category}</td>
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

      <AddkitchenCategory
        show={show}
        onHide={() => setShow(false)}
        action={action}
        selectedItem={selectedItem}
      />
    </>
  );
}

export default OrgCategories;
