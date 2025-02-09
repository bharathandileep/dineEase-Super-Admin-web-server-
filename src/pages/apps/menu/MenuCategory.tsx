import React, { useEffect, useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import AddLeads from "../CRM/Leads/AddLeads";
import { Card, Row, Col, Button } from "react-bootstrap";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  toggleCategoryStatus,
} from "../../../server/admin/menu";
import { toast } from "react-toastify";
import AddCategory from "./modal/AddCategory";

interface MenuItem {
  id: number;
  name: string;
  createdAt: Date;
  status: boolean;
}

function MenuCategory() {
  const isSubCategory = false;
  const [action, setAction] = useState("");
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [isDeleted, setIsDeletd] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleToggleStatus = async (id: any) => {
    try {
      const response = await toggleCategoryStatus(id);
      if (response.status) {
      } else {
      }
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
    }
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  const onCloseModal = () => setShow(false);
  const onOpenModal = () => {
    setAction("add");
    setSelectedItem("");
    setShow(true);
  };

  const handleEdit = (id: any) => {
    const item = menuItems.find((menu) => menu._id === id);
    setAction("edit");
    setSelectedItem(item);
    setShow(true);
  };
  const handleDelete = async (id: any) => {
    try {
      alert("Are You Sure need deletd");
      const response = await deleteCategory(id);
      setIsDeletd(true);
      if (response.status) {
        toast.success(response.message);
      } else {
        toast.error(response.message || "delete failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("delete failed. Please try again.");
    }
  };
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await getAllCategories();
        setMenuItems(response.data);
        if (response.status) {
        } else {
        }
      } catch (error: any) {
        console.error("Error:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCategories();
  }, [isDeleted, show]);
  return (
    <>
      <div className="container py-5">
        <Card className="mb-2">
          <Card.Body>
            <Row className="justify-content-between">
              <Col className="col-auto">
                <form className="d-flex flex-wrap align-items-center">
                  <label htmlFor="inputPassword2" className="visually-hidden">
                    Search
                  </label>
                  <div className="me-3">
                    <input
                      type="search"
                      className="form-control my-1 my-md-0"
                      id="inputPassword2"
                      placeholder="Search..."
                      // onChange={(e: any) => onSearchData(e.target.value)}
                    />
                  </div>
                </form>
              </Col>
              <Col md={4}>
                <div className="text-md-end mt-3 mt-md-0">
                  <Button
                    variant="danger"
                    className="waves-effect waves-light"
                    onClick={onOpenModal}
                  >
                    <i className="mdi mdi-plus-circle me-1"></i> Add New
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h2 className="h5 mb-0">Menu Items</h2>
          </div>
          <div className="table-responsive">
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
                {menuItems?.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.category}</td>{" "}
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
          </div>
        </div>
      </div>
      <AddCategory
        show={show}
        onHide={onCloseModal}
        isSubCategory={isSubCategory}
        action={action}
        selectedItem={selectedItem}
      />
    </>
  );
}

export default MenuCategory;
