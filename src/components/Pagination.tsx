import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

interface PaginationProps {
  tableProps: any;
  sizePerPageList: {
    text: string;
    value: number;
  }[];
  onPageChange?: (page: number) => void;
  onSizePerPageChange?: (size: number) => void;
}

const Pagination = ({ 
  tableProps, 
  sizePerPageList, 
  onPageChange, 
  onSizePerPageChange 
}: PaginationProps) => {
  const { 
    pageIndex,
    gotoPage,
    setPageSize,
    pageCount,
  } = tableProps;

  const [visiblePages] = useState<number[]>([]);

  const filterPages = useCallback(
    (visiblePages: number[], totalPages: number) => {
      return visiblePages.filter((page) => page <= totalPages);
    },
    []
  );

  const getVisiblePages = useCallback(
    (page: number | null, total: number) => {
      if (total < 7) {
        return filterPages([1, 2, 3, 4, 5, 6], total);
      } else {
        if (page! % 5 >= 0 && page! > 4 && page! + 2 < total) {
          return [1, page! - 1, page!, page! + 1, total];
        } else if (page! % 5 >= 0 && page! > 4 && page! + 2 >= total) {
          return [1, total - 3, total - 2, total - 1, total];
        } else {
          return [1, 2, 3, 4, 5, total];
        }
      }
    },
    [filterPages]
  );

  const changePage = (page: number) => {
    const activePage = pageIndex + 1;
    if (page === activePage) return;
    gotoPage(page - 1);
    if (onPageChange) onPageChange(page);
  };

  useEffect(() => {
    const visible = getVisiblePages(null, pageCount);
    visiblePages.push(...visible);
  }, [pageCount, getVisiblePages, visiblePages]);

  const activePage = pageIndex + 1;

  return (
    <>
      <div className="d-lg-flex align-items-center text-center pb-1">
        {sizePerPageList.length > 0 && (
          <div className="d-inline-block me-3">
            <label className="me-1">Display :</label>
            <select
              value={tableProps.state.pageSize}
              onChange={(e: any) => {
                setPageSize(Number(e.target.value));
                if (onSizePerPageChange) onSizePerPageChange(Number(e.target.value));
              }}
              className="form-select d-inline-block w-auto"
            >
              {sizePerPageList.map((pageSize, index) => (
                <option key={index} value={pageSize.value}>
                  {pageSize.text}
                </option>
              ))}
            </select>
          </div>
        )}

        <span className="me-3">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{" "}
        </span>

        <span className="d-inline-block align-items-center text-sm-start text-center my-sm-0 my-2">
          <label className="form-label">Go to page : </label>
          <input
            type="number"
            value={pageIndex + 1}
            min="1"
            onChange={(e: any) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
              if (onPageChange) onPageChange(page + 1);
            }}
            className="form-control w-25 ms-1 d-inline-block"
          />
        </span>

        <ul className="pagination pagination-rounded d-inline-flex ms-auto align-item-center mb-0">
          <li
            key="prevpage"
            className={classNames("page-item", "paginate_button", "previous", {
              disabled: activePage === 1,
            })}
            onClick={() => changePage(activePage - 1)}
          >
            <Link to="#" className="page-link">
              <i className="mdi mdi-chevron-left"></i>
            </Link>
          </li>
          {visiblePages.map((page, index, array) => {
            return array[index - 1] + 1 < page ? (
              <React.Fragment key={page}>
                <li className="page-item disabled d-none d-xl-inline-block">
                  <Link to="#" className="page-link">
                    ...
                  </Link>
                </li>
                <li
                  className={classNames("page-item", "d-none", "d-xl-inline-block", {
                    active: activePage === page,
                  })}
                  onClick={() => changePage(page)}
                >
                  <Link to="#" className="page-link">
                    {page}
                  </Link>
                </li>
              </React.Fragment>
            ) : (
              <li
                key={page}
                className={classNames("page-item", "d-none", "d-xl-inline-block", {
                  active: activePage === page,
                })}
                onClick={() => changePage(page)}
              >
                <Link to="#" className="page-link">
                  {page}
                </Link>
              </li>
            );
          })}
          <li
            key="nextpage"
            className={classNames("page-item", "paginate_button", "next", {
              disabled: activePage === pageCount,
            })}
            onClick={() => changePage(activePage + 1)}
          >
            <Link to="#" className="page-link">
              <i className="mdi mdi-chevron-right"></i>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Pagination;