import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Toast, ToastContainer, Modal, Spinner } from "react-bootstrap";
import AddCompanyModal from "./AddCompannyModal";
import UpdateCompanyModal from "./UpdateCompanyModal";
import { Company, fetchCompanyApi, postCompanyApi, deleteCompanyApi, updateCompanyApi } from "../../../server/allApi";
// import { Company, fetchCompanyApi, postCompanyApi, deleteCompanyApi, updateCompanyApi } from "../../../server/allApi";
 
const CompanyDetails: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);

  // const [addLoading, setAddLoading] = useState<boolean>(false);
  // const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  // const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
 
  const itemsPerPage = 6;
 
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const response = await fetchCompanyApi(currentPage, itemsPerPage);
        setCompanies(response.data);
        setTotalPages(response.pagination.totalPages);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching companies:', error);
        setError(error.message);
        setLoading(false);
      }
    };
 
    loadCompanies();
  }, [currentPage]);
 
  const onCloseAddModal = () => setShowAddModal(false);
  const onOpenAddModal = () => setShowAddModal(true);
 
  const handleAddCompany = async (newCompany: Company) => {
    console.log('New Company:', newCompany); // Add this line to verify the structure

    setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
    setToastMessage(`${newCompany.company_name??'Unknown Company'}  has been added successfully!`);
    setShowToast(true);
    onCloseAddModal();
  };
 
  const handleDeleteCompany = async () => {
    if (showConfirmDelete) {
      console.log('Deleting company with ID:', showConfirmDelete);
      setDeleteLoading(true);
      
      // Simulate a delay before deleting
      setTimeout(async () => {
        try {
          await deleteCompanyApi(showConfirmDelete);
          setCompanies(companies.filter(company => company._id !== showConfirmDelete));
          const companyToDelete = companies.find(company => company._id === showConfirmDelete);
          const companyName = `${companyToDelete?.company_name}`;
      
          setToastMessage(`${companyName} deleted successfully`);
          setShowToast(true);
        } catch (error: any) {
          console.error('Error deleting company:', error);
          setToastMessage("Error deleting company");
          setShowToast(true);
        } finally {
          setDeleteLoading(false);
          setShowConfirmDelete(null);
        }
      }, 2000); // Adjust the delay as needed (2000ms = 2 seconds)
    }
  };
  
  const handleSearch = async (value: string) => {
    try {
      if (value === "") {
        const response = await fetchCompanyApi(currentPage, itemsPerPage);
        setCompanies(response.data);
      } else {
        setCompanies(prevCompanies =>
          prevCompanies.filter(company =>
            company.company_name.toLowerCase().includes(value.toLowerCase())
          )
        );
      }
    } catch (error: any) {
      console.error('Error searching companies:', error);
      setError(error.message);
    }
  };
 
  // const handleUpdateCompany = async (updatedCompany: Company) => {
  //   setUpdateLoading(true);
  //   try {
  //     await updateCompanyApi(updatedCompany);
  //     const newCompanies = companies.map(company =>
  //       company._id === updatedCompany._id ? updatedCompany : company
  //     );
  //     setCompanies(newCompanies);
  //     setToastMessage("Company updated successfully");
  //     setShowToast(true);
  //     setShowUpdateModal(false);
  //   } catch (error: any) {
  //     console.error("Error updating company:", error);
  //     setToastMessage("Error updating company");
  //     setShowToast(true);
  //   } finally {
  //     setUpdateLoading(false);
  //   }
  // };
  const onCloseUpdateModal = () => setShowUpdateModal(false);
  const onOpenUpdateModal = (company: Company) => {
    setSelectedCompany(company);
    setShowUpdateModal(true);
  };
 
  const handleUpdateCompany = async (updatedCompany: Company) => {
    if (currentCompany?._id) {
      try {
        await updateCompanyApi(currentCompany._id, updatedCompany);
        const response = await fetchCompanyApi(currentPage, itemsPerPage);
        setCompanies(response.data);
        setTotalPages(response.pagination.totalPages);
        setToastMessage('Company updated successfully');
        setShowToast(true);  // Show toast immediately after success
      } catch (error) {
        console.error('Error updating Company:', error);
        setToastMessage('Error updating Company');
      } finally {
        setShowToast(true);
        onCloseUpdateModal();  // Close modal only after setting the toast
      }
    }
  };
  
  //   // setUpdateLoading(true);
  //   // setUpdateLoading(true);
  //   try {
  //     const newCompanies = companies.map(company =>
  //       company._id === updatedCompany._id ? updatedCompany : company
  //     );
  //     setCompanies(newCompanies);
  //     setToastMessage("Company updated successfully");
  //     setShowToast(true);
  //     setShowUpdateModal(false);
  //     // setShowUpdateModal(false);
  //   } catch (error: any) {
  //     console.error("Error updating company:", error);
  //     setToastMessage("Error updating company");
  //     setShowToast(true);
  //   } finally {
  //     setUpdateLoading(false);
  //   }
  // };
 
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
 
  if (loading) {
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div>Error: {error}</div>;
  }
 
  return (
    <>
      <Row className="mb-2">
        <Col sm={4}>
          <form>
            <div className="mb-3">
              <label htmlFor="search" className="form-label">Search</label>
              <input
                type="search"
                className="form-control"
                id="search"
                placeholder="Search..."
                onChange={e => handleSearch(e.target.value)}
              />
            </div>
          </form>
        </Col>
        <Col sm={8}>
          <div className="text-sm-end mt-sm-0 mt-2">
            <Button variant="danger" className="mb-2 me-1">
              <i className="mdi mdi-cog"></i>
            </Button>
            <Button variant="light" className="mb-2 me-1">
              Import
            </Button>
            <Button variant="light" className="mb-2">
              Export
            </Button>
            {/* <Button variant="primary" className="mb-2 me-1" onClick={onOpenAddModal}> */}
            <Button variant="primary" className="mb-2 me-1" onClick={onOpenAddModal}>
              <i className="mdi mdi-plus-circle me-1"></i> Add Company
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        {companies.map((company: Company) => (
          <Col lg={4} key={company._id}>
            <Card className="bg-pattern">
              <Card.Body>
                <div className="d-flex justify-content-end mb-2">
                  <Button
                    variant="success"
                    className="me-2"
                    onClick={() => {
                      setSelectedCompany(company);
                      setShowUpdateModal(true);
                    }}
                  >
                    <i className="mdi mdi-pencil"></i>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => setShowConfirmDelete(company._id)}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? <Spinner as="span" animation="border" size="sm" /> : "×"}
                  </Button>
                </div>
                <div className="text-center">
                  <img
                    src={company.logo}
                    alt=""
                    className="avatar-xl rounded-circle mb-3"
                  />
                  <h4 className="mb-1 font-20">{company.company_name}</h4>
                  <p className="text-muted font-14">{company.company_contact}</p>
                </div>
                <p className="font-14 text-center text-muted">{company.company_location}</p>
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
 
      <AddCompanyModal show={showAddModal} onHide={() => setShowAddModal(false)} onSubmit={handleAddCompany} />
      
      <UpdateCompanyModal
          show={showUpdateModal}
          onHide={() => setShowUpdateModal(false)}
          company={selectedCompany}
          onUpdateCompany={handleUpdateCompany}
        />


      {/* {selectedCompany && (
        <UpdateCompanyModal
          show={showUpdateModal}
          onHide={() => setShowUpdateModal(false)}
          company={selectedCompany}
          onUpdateCompany={handleUpdateCompany}
        />
      )} */}
 
      {/* Confirmation Box */}
      <Modal
        show={!!showConfirmDelete}
        onHide={() => setShowConfirmDelete(null)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this company?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmDelete(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteCompany} disabled={deleteLoading}>
            {deleteLoading ? <Spinner as="span" animation="border" size="sm" /> : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
 
      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={5000}
          autohide
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};
 
export default CompanyDetails;