import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { getAllOrg } from "../../../server/admin/organization";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";

function ListOrganizations() {
  const [orgDetails, setOrgDetails] = useState([]);
  const [companyInfo, setCompanyInfo] = useState<any[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const onSearchData = (searchValue: string) => {
    setSearchTerm(searchValue.toLowerCase().trim());
  };

  const filteredMenuItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return companyInfo;
    }

    return companyInfo?.filter((item) => {
      return (
        item.contact_number?.toLowerCase().includes(searchTerm) ||
        item.email?.toLowerCase().includes(searchTerm) ||
        item.managerName?.toLowerCase().includes(searchTerm) ||
        item.employeeCount?.toString().includes(searchTerm) ||
        item.organizationName?.toLowerCase().includes(searchTerm) ||
        item.register_number?.toLowerCase().includes(searchTerm) ||
        item.addresses?.some((address: any) =>
          address.street_address?.toLowerCase().includes(searchTerm)
        )
      );
    });
  }, [searchTerm, companyInfo]);

  useEffect(() => {
    const fetchAllOrganizations = async () => {
      setLoading(true);
      try {
        const response = await getAllOrg();
        setCompanyInfo(response.data.kitchens || []);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllOrganizations();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading organizations...</p>
      </div>
    );
  }

  // Show message when no data is available
  if (!companyInfo || companyInfo.length === 0) {
    return (
      <div className="text-center my-5">
        <Card>
          <Card.Body>
            <i
              className="mdi mdi-domain-off text-muted"
              style={{ fontSize: "48px" }}
            ></i>
            <h4 className="mt-3">No Organizations Available</h4>
            <p className="text-muted">
              There are no organizations in the system yet.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate("/apps/organizations/new")}
            >
              Add New Organization
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Organizations", path: "/apps/organizations/list" },
          {
            label: "List",
            path: "/apps/organizations/list",
            active: true,
          },
        ]}
        title={"Customers"}
      />
      <div
        className="mb-3"
        style={{ backgroundColor: "#5bd2bc", padding: "10px" }}
      >
        <div
          className="d-flex align-items-center justify-content-between"
          onClick={() => navigate("/apps/organizations/new")}
        >
          <h3 className="page-title m-0" style={{ color: "#fff" }}>
            Organizations
          </h3>
          <Link to="#" className="btn btn-danger waves-effect waves-light">
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          onSearchData(e.target.value)
                        }
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
                      <select
                        className="form-select my-1 my-lg-0"
                        id="status-select"
                      >
                        <option defaultValue="all">All</option>
                        <option value="popular">Popular</option>
                        <option value="pricelow">Price Low</option>
                        <option value="pricehigh">Price High</option>
                        <option value="soldout">Sold Out</option>
                      </select>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Show "No results found" message when search returns no results */}
      {searchTerm && (!filteredMenuItems || filteredMenuItems.length === 0) ? (
        <div className="text-center my-5">
          <Card>
            <Card.Body>
              <i
                className="mdi mdi-file-search-outline text-muted"
                style={{ fontSize: "48px" }}
              ></i>
              <h4 className="mt-3">No Results Found</h4>
              <p className="text-muted">
                No organizations match your search criteria "{searchTerm}".
              </p>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <Row>
          <Row>
            {filteredMenuItems?.map((item, index) => (
              <Col key={index} md={6} xl={3} className="mb-3">
                <Link to={`/apps/organizations/${item._id}`}>
                  <Card className="product-box h-100">
                    <Card.Body className="d-flex flex-column">
                      <div className="bg-light mb-3">
                        <img
                          src={item?.organizationLogo}
                          alt={item?.organizationName}
                          className="img-fluid"
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="product-info mt-auto">
                        <div className="text-center mb-3">
                          <h5 className="font-16 mt-0">
                            <Link
                              to={`/apps/organizations/${item._id}`}
                              className="text-dark"
                            >
                              {item?.organizationName}
                            </Link>
                          </h5>
                          <p className="text-muted font-14 mb-2">
                            {item?.addresses[0]?.street_address},
                            {item?.addresses[0]?.city},{" "}
                            {item?.addresses[0]?.country}
                          </p>
                          <div className="d-flex align-items-center justify-content-center mb-1">
                            <i className="mdi mdi-phone-classic me-1"></i>
                            <span>{item?.contact_number}</span>
                          </div>
                          <div className="d-flex align-items-center justify-content-center">
                            <i className="mdi mdi-email me-1"></i>
                            <span>{item?.email}</span>
                          </div>
                        </div>

                        <div className="row text-center mt-3 border-top pt-3">
                          <div className="col-6">
                            <div className="d-flex flex-column">
                              <span className="text-muted font-14">
                                Register Number
                              </span>
                              <span className="font-16 fw-bold">
                                {item?.register_number}
                              </span>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="d-flex flex-column">
                              <span className="text-muted font-14">
                                Employees
                              </span>
                              <span className="font-16 fw-bold">
                                {item?.no_of_employees}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Row>
      )}
    </>
  );
}

export default ListOrganizations;
