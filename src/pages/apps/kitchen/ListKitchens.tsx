import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { getAllKitches } from "../../../server/admin/kitchens";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";

function ListKitchens() {
  const [companyInfo, setCompanyInfo] = useState<any[]>();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllkitchens = async () => {
      try {
        const response = await getAllKitches();
        setCompanyInfo(response.data.kitchens || []);
      } catch (error) {
        console.error("Error fetching kitchens:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllkitchens();
  }, []);

  const navigate = useNavigate();
  const handleShow = () => {};
  const onSearchData = (searchValue: string) => {
    setSearchTerm(searchValue.toLowerCase().trim());
  };

  const filteredMenuItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return companyInfo;
    }

    return companyInfo?.filter((item) => {
      return (
        item.kitchen_phone_number?.toLowerCase().includes(searchTerm) ||
        item.owner_email?.toLowerCase().includes(searchTerm) ||
        item.kitchen_name?.toLowerCase().includes(searchTerm) ||
        item.employeeCount?.toString().includes(searchTerm) ||
        item.addresses?.some((address: any) =>
          address.street_address?.toLowerCase().includes(searchTerm)
        )
      );
    });
  }, [searchTerm, companyInfo]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading kitchens...</p>
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
              className="mdi mdi-alert-circle-outline text-muted"
              style={{ fontSize: "48px" }}
            ></i>
            <h4 className="mt-3">No Kitchens Available</h4>
            <p className="text-muted">
              There are no kitchens in the system yet.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate("/apps/kitchen/new")}
            >
              Add New Kitchen
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
          { label: "Kitchens", path: "/apps/kitchen/list" },
          {
            label: "List",
            path: "/apps/kitchen/list",
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
          onClick={() => navigate("/apps/kitchen/new")}
        >
          <h3 className="page-title m-0" style={{ color: "#fff" }}>
            Kitchens
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
                No kitchens match your search criteria "{searchTerm}".
              </p>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <Row>
          {filteredMenuItems?.map((item, index) => (
            <Col key={index} md={6} xl={3} className="mb-3">
              <Link to={`/apps/kitchen/${item._id}`}>
                <Card className="product-box h-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="bg-light mb-3">
                      <img
                        src={item?.kitchen_image}
                        alt={item?.kitchen_name}
                        className="img-fluid"
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <div className="product-info mt-auto">
                      <div className="row align-items-center">
                        <div className="col">
                          <h5 className="font-16 mt-0 sp-line-1">
                            <Link
                              to={`/apps/kitchen/${item._id}`}
                              className="text-dark"
                            >
                              {item?.kitchen_name}
                            </Link>
                          </h5>
                          <div className="text-muted font-14">
                            <div className="d-flex align-items-center mb-1">
                              <i className="mdi mdi-map-marker me-1"></i>
                              <span>
                                {item?.addresses[0]?.street_address},{" "}
                                {item?.addresses[0]?.city}
                              </span>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                              <i className="mdi mdi-phone-classic me-1"></i>
                              <span>{item?.kitchen_phone_number}</span>
                            </div>
                            <div className="d-flex align-items-center">
                              <i className="mdi mdi-email me-1"></i>
                              <span>{item?.owner_email}</span>
                            </div>
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
      )}

      {filteredMenuItems && filteredMenuItems.length > 0 && (
        <div className="text-center my-4">
          <Link to="#" className="text-danger">
            <i className="mdi mdi-spin mdi-loading me-1"></i> Load more{" "}
          </Link>
        </div>
      )}
    </>
  );
}

export default ListKitchens;
