// Designations.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Spinner, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  getAllDesignations,
  createDesignation,
  updateDesignation,
  deleteDesignation,
  toggleDesignationStatus,
} from "../../../server/admin/designations";
import DesignationModal from "./modal/designationModal";
import PageTitle from "../../../components/PageTitle";
import Table from "../../../components/Table";

function Designations() {
  const [action, setAction] = useState("");
  const [show, setShow] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [designations, setDesignations] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchAllDesignations = async () => {
      setLoading(true);
      try {
        const response = await getAllDesignations({ page: currentPage, limit: pageSize });
        if (response.status) {
          setDesignations(response.data.designations);
          setTotalPages(response.data.pagination.totalPages);
          setTotalItems(response.data.pagination.totalItems);
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
  }, [currentPage, pageSize, isDeleted, show]);

  const onSearchData = (searchValue: string) => {
    setSearchTerm(searchValue.toLowerCase());
    setCurrentPage(1);
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await toggleDesignationStatus(id);
      if (response.status) {
        setDesignations((prevItems) =>
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

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleSizePerPageChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const filteredDesignations = useMemo(() => {
    return designations?.filter((value) => {
      const designationMatch = value.designation_name
        .toLowerCase()
        .includes(searchTerm);
      const createdAtString =
        value.createdAt && !isNaN(new Date(value.createdAt).getTime())
          ? new Date(value.createdAt).toLocaleDateString()
          : "";
      const createdAtMatch = createdAtString.toLowerCase().includes(searchTerm);
      const statusMatch =
        statusFilter === "all" ||
        (statusFilter === "active" && value.status) ||
        (statusFilter === "inactive" && !value.status);
      return (designationMatch || createdAtMatch) && statusMatch;
    });
  }, [searchTerm, statusFilter, designations]);

  /* Column render functions */
  const DesignationColumn = ({ row }: { row: any }) => {
    return <span className="fw-bold">{row?.original?.designation_name}</span>;
  };
  const NumberColumn = ({ row }: { row: any }) => {
    return <span className="fw-bold">{row.index + 1}</span>;
  };
  const CreatedAtColumn = ({ row }: { row: any }) => {
    return <span>{new Date(row?.original?.createdAt).toLocaleString()}</span>;
  };

  const StatusColumn = ({ row }: { row: any }) => {
    return (
      <button
        className={`badge border-0 text-white ${
          row?.original?.status ? "bg-success" : "bg-secondary"
        }`}
        onClick={() => handleToggleStatus(row?.original?._id)}
      >
        {row.original.status ? "Active" : "Inactive"}
      </button>
    );
  };

  const ActionColumn = ({ row }: { row: any }) => {
    return (
      <>
        <button
          className="action-icon border-0 bg-transparent"
          onClick={() => handleEdit(row?.original?._id)}
        >
          <i className="mdi mdi-square-edit-outline"></i>
        </button>
        <button
          className="action-icon border-0 bg-transparent"
          onClick={() => handleDelete(row?.original?._id)}
        >
          <i className="mdi mdi-delete text-danger"></i>
        </button>
      </>
    );
  };

  const columns = [
    {
      Header: "No.",
      accessor: "number",
      Cell: NumberColumn,
    },
    {
      Header: "Designation",
      accessor: "designation_name",
      Cell: DesignationColumn,
    },
    {
      Header: "Created At",
      accessor: "createdAt",
      Cell: CreatedAtColumn,
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: StatusColumn,
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ActionColumn,
    },
  ];

  const sizePerPageList = [
    { text: "10", value: 10 },
    { text: "20", value: 20 },
    { text: "50", value: 50 },
  ];

  return (
    <>
      <div className="container py-2">
        <PageTitle
          breadCrumbItems={[
            { label: "Designations", path: "/apps/designations/list" },
            { label: "List", path: "/apps/designations/list", active: true },
          ]}
          title={"Designations"}
        />
        <div
          className="mb-3"
          style={{ backgroundColor: "#5bd2bc", padding: "10px" }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <h3 className="page-title m-0" style={{ color: "#fff" }}>
              Designations
            </h3>
            <Link
              to="#"
              className="btn btn-danger waves-effect waves-light"
              onClick={() => {
                setAction("add");
                setShow(true);
              }}
            >
              <i className="mdi mdi-plus-circle me-1"></i> Add New
            </Link>
          </div>
        </div>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Row className="justify-content-between">
                  <Col className="col-auto">
                    <form className="d-flex align-items-center">
                      <label htmlFor="inputPassword2" className="visually-hidden">
                        Search
                      </label>
                      <div>
                        <input
                          type="search"
                          className="form-control my-1 my-lg-0"
                          id="inputPassword2"
                          placeholder="Search..."
                          onChange={(e) => onSearchData(e.target.value)}
                        />
                      </div>
                    </form>
                  </Col>
                  <Col className="col-auto">
                    <div className="d-flex align-items-center">
                      <label htmlFor="status-select" className="me-2 mb-0">
                        Sort By
                      </label>
                      <div>
                        <Form.Select
                          className="w-auto"
                          value={statusFilter}
                          onChange={(e: any) => setStatusFilter(e.target.value)}
                        >
                          <option value="all">All</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </Form.Select>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="card shadow">
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
            ) : filteredDesignations.length === 0 ? (
              <div className="text-center my-4">
                <p>No results found for "{searchTerm}"</p>
              </div>
            ) : (
              <Table
                columns={columns}
                data={filteredDesignations}
                isSearchable={false} // Disable the built-in search box
                pageSize={pageSize}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSelectable={false}
                theadClass="table-light"
                // Remove searchBoxClass prop entirely
                onPageChange={handlePageChange}
                onSizePerPageChange={handleSizePerPageChange}
                totalPages={totalPages}
                currentPage={currentPage}
              />
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