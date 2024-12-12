import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Toast,
 
  Modal,
} from "react-bootstrap";
import PageTitle from "../../../components/PageTitle";
import AddFoodModal from "./AddFoodModal";
import UpdateFoodModal from "./UpdateFoodModal";
import {
  fetchFoodMenuApi,
  deleteFoodMenuApi,
  FoodMenu,
} from "../../../server/allApi";
import LoaderModal from '../../../server/LoaderModal';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
 
 
const Products: React.FC = () => {
  const [foodMenu, setFoodMenu] = useState<FoodMenu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [currentFood, setCurrentFood] = useState<FoodMenu | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [foodToDelete, setFoodToDelete] = useState<string | null>(null);
  const [showLoader, setShowLoader] = useState(false);
 
  const itemsPerPage = 8;
 
  useEffect(() => {
    const fetchFoodMenu = async () => {
      try {
        const response = await fetchFoodMenuApi(currentPage, itemsPerPage);
        setFoodMenu(response.foodproducts);
        setTotalPages(response.pagination.totalPages);
        setLoading(false);
        // setToastMessage("Food item Added successfully");  // This is incorrectly setting the message
        // setShowToast(true);  // This is causing the toast to show up immediately
      } catch (error) {
        console.error("Error fetching food menu:", error);
        setError((error as Error).message);
        setLoading(false);
        setToastMessage("Error deleting food item");  // Error message being set here
        setShowToast(true);  // This shows the toast
      }
    };
 
    fetchFoodMenu();
  }, [currentPage]);

  const handleDelete = async (id: string) => {
    setShowLoader(true);
    try {
      const foodToDelete = foodMenu.find((food) => food._id === id); // Find the food name before deletion
      await deleteFoodMenuApi(id);
      const response = await fetchFoodMenuApi(currentPage, itemsPerPage);
      setFoodMenu(response.foodproducts);
      setTotalPages(response.pagination.totalPages);
      
      setTimeout(() => {
        toast.success(`${foodToDelete?.food_name} deleted successfully!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setShowLoader(false);
      }, 1000);
      
    } catch (error) {
      setTimeout(() => {
        toast.error("Error deleting food item", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setShowLoader(false);
      }, 1000);
    } finally {
      setShowConfirmDelete(false);
    }
  };
 
  // const handleDelete = async (id: string) => {
  //   setShowLoader(true)
  //   try {
  //     await deleteFoodMenuApi(id);
  //     const response = await fetchFoodMenuApi(currentPage, itemsPerPage);
  //     setFoodMenu(response.foodproducts);
   
  //     setTotalPages(response.pagination.totalPages);
  //     setTimeout(() => {
  //       toast.success(`Food Item  deleted successfully!`);
  //       setToastMessage("Food item deleted successfully");
 
  //       setShowLoader(false);
  //     }, 1000);
  //     setShowToast(true);
  //   } catch (error) {
  //     console.error("Error deleting food item:", error);
  //     setTimeout(() => {
  //       // toast.success("Food Product deleted successfully!");
  //       setToastMessage("Error deleting food item");
 
  //       setShowLoader(false);
  //     }, 1000);
 
  //     setShowToast(true);
  //   } finally {
  //     setShowConfirmDelete(false);
  //   }
  // };
  const handleAddFood = (newFood: FoodMenu) => {
    setFoodMenu((prevFoodMenu) => [...prevFoodMenu, newFood]);
    toast.success(`${newFood.food_name} item added successfully`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  // const handleAddFood = (newFood: FoodMenu) => {
  //   console.log('New FoodItem:',newFood);

  //   setFoodMenu((prevFoodMenu) => [...prevFoodMenu, newFood]);
  //   setToastMessage(`${newFood.food_name} item added successfully`);
  //   setShowToast(true);
  // };
 
  // const handleUpdateFood = (updatedFood: FoodMenu) => {
  //   setFoodMenu((prevFoodMenu) =>
  //     prevFoodMenu.map((item) =>
  //       item._id === updatedFood._id ? updatedFood : item
  //     )
  //   );
  //   setToastMessage("Food item updated successfully");
  //   setShowToast(true);
  // };
  const handleUpdateFood = (updatedFood: FoodMenu) => {
    setFoodMenu((prevFoodMenu) =>
      prevFoodMenu.map((item) =>
        item._id === updatedFood._id ? updatedFood : item
      )
    );
    toast.info(`${updatedFood.food_name} updated successfully`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const openUpdateModal = (food: FoodMenu) => {
    setCurrentFood(food);
    setShowUpdateModal(true);
  };
 
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
 
  const handleDeleteClick = (foodId: string) => {
    setFoodToDelete(foodId);
    setShowConfirmDelete(true);
  };
 
  const confirmDelete = () => {
    if (foodToDelete) {
      handleDelete(foodToDelete);
    }
  };
 
  if (loading) {
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div>Error: {error}</div>;
  }
 
  return (
   
    <React.Fragment>
                   <LoaderModal show={showLoader} />
 
      <PageTitle
        breadCrumbItems={[
          { label: "Ecommerce", path: "/apps/products" },
          { label: "Products", path: "/apps/food", active: true },
        ]}
        title={"Products"}
      />
 
      <Row>
        <Col>
          <Card>
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
                        className="form-control my-1 my-lg-0"
                        id="inputPassword2"
                        placeholder="Search..."
                      />
                    </div>
                    <label htmlFor="status-select" className="me-2">
                      Sort By
                    </label>
                    <div className="me-sm-3">
                      <select
                        className="form-select my-1 my-lg-0"
                        id="status-select"
                      >
                        <option>All</option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </form>
                </Col>
                <Col className="col-auto">
                  <Button
                    variant="danger"
                    className="mb-2"
                    onClick={() => setShowAddModal(true)}
                  >
                    <i className="mdi mdi-basket me-2"></i> Add Food
                  </Button>
                </Col>
              </Row>
 
              <Row>
                {foodMenu.map((food) => (
                  <Col key={food._id} xl={3} lg={4} sm={6}>
                    <Card className="product-box">
                      <Card.Body>
                        <div className="product-img">
                          <img
                            src={food.image_url || "placeholder.png"} // Replace with actual image logic
                            alt={food.food_name}
                            className="img-fluid"
                          />
                        </div>
                        <h5 className="mt-3 mb-0">
                          {food.food_name}
                        </h5>
                        <p className="text-muted">${food.food_price}</p>
                        <Button
                          variant="primary"
                          className="me-2"
                          onClick={() => openUpdateModal(food)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteClick(food._id)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Row>
        <Col>
          <ul className="pagination justify-content-center mb-4">
            <li className="page-item">
              <Button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
              >
                <Button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Button>
              </li>
            ))}
            <li className="page-item">
              <Button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </li>
          </ul>
        </Col>
      </Row>
 
              <div className="mt-3">
                {/* Pagination Logic Here */}
                {/* Example: <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
 
      {/* Add Food Modal */}
      <AddFoodModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAddFood={handleAddFood}
      />
 
      {/* Update Food Modal */}
      {currentFood && (
        <UpdateFoodModal
          show={showUpdateModal}
          onHide={() => setShowUpdateModal(false)}
          foodItem={currentFood}
          onUpdateFood={handleUpdateFood}
        />
      )}
 
      {/* Confirm Delete Modal */}
      <Modal
        show={showConfirmDelete}
        onHide={() => setShowConfirmDelete(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this food item?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
          <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
{/* Toaster */}
      {/* <ToastContainer
        position="top-end"
        className="p-3"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999
        }}
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          style={{
            backgroundColor: '#28a745', // Green background for success
            color: '#fff' // White text color
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer> */}
    </React.Fragment>
  );
};
 
export default Products;
 