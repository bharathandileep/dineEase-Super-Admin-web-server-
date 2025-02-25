import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import { getAllKitches } from "../../../server/admin/kitchens";
import PageTitle from "../../../components/PageTitle";

function ListKitchens() {
  const [companyInfo, setCompanyInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  const navigate = useNavigate();

  // Use a ref to store the current loading state to access in scroll handler
  const isLoadingRef = useRef(false);

  const fetchData = async (
    currentPage: number,
    isNewSearch: boolean = false
  ) => {
    if (isLoadingRef.current) return;

    if (isNewSearch) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    isLoadingRef.current = true;

    try {
      const response = await getAllKitches({
        page: currentPage,
        limit: 4,
      });

      const { kitchens, totalPages, totalKitchens } = response.data;

      if (isNewSearch) {
        setCompanyInfo(kitchens);
      } else {
        // Prevent duplicates
        setCompanyInfo((prev) => {
          const existingIds = new Set(prev.map((item) => item._id));
          const newItems = kitchens.filter(
            (item: any) => !existingIds.has(item._id)
          );
          return [...prev, ...newItems];
        });
      }

      setTotalItems(totalKitchens);
      setHasMore(currentPage < totalPages);
      setPage(currentPage + 1);
    } catch (error) {
      console.error("Error fetching kitchens:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      isLoadingRef.current = false;
    }
  };

  // Initial load
  useEffect(() => {
    fetchData(1, true);
  }, []);

  // Update search
  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase().trim());
    setPage(1);
    setHasMore(true);
    fetchData(1, true);
  };

  // Type-safe throttle function
  function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle = false;

    return function (this: any, ...args: Parameters<T>) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Scroll handler with throttling
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (isLoadingRef.current || !hasMore) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        fetchData(page, false);
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, page]); 

  const filteredMenuItems = useMemo(() => {
    if (!searchTerm.trim()) return companyInfo;
    return companyInfo?.filter(
      (item) =>
        item.kitchen_phone_number?.toLowerCase().includes(searchTerm) ||
        item.owner_email?.toLowerCase().includes(searchTerm) ||
        item.kitchen_name?.toLowerCase().includes(searchTerm) ||
        item.employeeCount?.toString().includes(searchTerm) ||
        item.addresses?.some((address: any) =>
          address.street_address?.toLowerCase().includes(searchTerm)
        )
    );
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
          { label: "Kitchen", path: "/apps/kitchen/list" },
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
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="page-title m-0" style={{ color: "#fff" }}>
            Kitchens
          </h3>
          <Link
            to="/apps/kitchen/new"
            className="btn btn-danger waves-effect waves-light"
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
                    <label htmlFor="search" className="visually-hidden">
                      Search
                    </label>
                    <input
                      type="search"
                      className="form-control"
                      id="search"
                      placeholder="Search..."
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

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
            <Col key={item._id || index} md={6} xl={3} className="mb-3">
              <Link to={`/apps/kitchen/${item._id}`}>
                <Card className="product-box h-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="bg-light mb-1 ">
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
                          <h5 className="font-24 mt-0 sp-line-1 bold">
                            {item?.kitchen_name}
                          </h5>
                          <div className="text-muted font-14">
                            <div className="d-flex align-items-center mb-1 text-black">
                              <i className="mdi mdi-map-marker me-1"></i>
                              <span>
                                {item?.addresses[0]?.street_address},{" "}
                                {item?.addresses[0]?.city}
                              </span>
                            </div>
                            <div className="d-flex align-items-center mb-1 text-black">
                              <i className="mdi mdi-phone-classic me-1"></i>
                              <span>{item?.kitchen_phone_number}</span>
                            </div>
                            <div className="d-flex align-items-center text-black">
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

      {loadingMore && (
        <div className="text-center my-4">
          <i className="mdi mdi-spin mdi-loading me-1"></i> Loading more...
        </div>
      )}
    </>
  );
}

export default ListKitchens;
