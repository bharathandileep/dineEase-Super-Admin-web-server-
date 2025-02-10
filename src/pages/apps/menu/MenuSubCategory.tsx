import React, { useEffect, useMemo, useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { Card, Row, Col, Button, Spinner, Form } from "react-bootstrap";
import {
  deleteSubcategory,
  getSubcategories,
  toggleSubcategoryStatus,
} from "../../../server/admin/menu";
import { toast } from "react-toastify";
import AddCategory from "./modal/AddCategory";

function MenuSubCategory() {
  const isSubCategory = true;
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await toggleSubcategoryStatus(id);
      console.log(response);
      if (response.status) {
        setMenuItems((prevItems) =>
          prevItems.map((item) =>
            item._id === id ? { ...item, status: !item.status } : item
          )
        );
      } else {
        toast.error(response);
      }
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error);
    }
  };

  const onSearchData = (searchValue: string) => {
    setSearchTerm(searchValue.toLowerCase());
  };

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((value) => {
      // Search filter
      const categoryMatch = value.subcategoryName
        .toLowerCase()
        .includes(searchTerm);
      const createdAtString =
        value.createdAt && !isNaN(new Date(value.createdAt).getTime())
          ? new Date(value.createdAt).toLocaleDateString()
          : "";
      const createdAtMatch = createdAtString.toLowerCase().includes(searchTerm);

      // Status filter
      const statusMatch =
        statusFilter === "all" ||
        (statusFilter === "active" && value.status) ||
        (statusFilter === "inactive" && !value.status);

      return (categoryMatch || createdAtMatch) && statusMatch;
    });
  }, [searchTerm, statusFilter, menuItems]);

  // Handle edit
  const handleEdit = (id: string) => {
    const item = menuItems.find((menu) => menu._id === id);
    setAction("edit");
    setSelectedItem(item);
    setShow(true);
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?"))
      return;
    try {
      const response = await deleteSubcategory(id);
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

  // Fetch subcategories
  useEffect(() => {
    const fetchAllCategories = async () => {
      setLoading(true);
      try {
        const response = await getSubcategories();
        if (response.status) {
          setMenuItems(response.data);
        } else {
          toast.error("Failed to load subcategories.");
        }
      } catch (error: any) {
        console.error("Error:", error.response?.data || error.message);
        toast.error("An error occurred while fetching subcategories.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllCategories();
  }, [isDeleted, show]);

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
            <h2 className="h5 mb-0 text-white">Menu Sub Items</h2>
          </div>
          <div className="table-responsive">
            {loading ? (
              <div className="text-center my-4">
                <Spinner animation="border" />
                <p>Loading subcategories...</p>
              </div>
            ) : menuItems.length === 0 ? (
              <div className="text-center my-4">
                <p>No Subcategories Found</p>
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
                    <th scope="col">Subcategory Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMenuItems.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.subcategoryName}</td>
                      <td>{item?.category?.category}</td>
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

      <AddCategory
        show={show}
        onHide={() => setShow(false)}
        isSubCategory={isSubCategory}
        action={action}
        selectedItem={selectedItem}
      />
    </>
  );
}

export default MenuSubCategory;
