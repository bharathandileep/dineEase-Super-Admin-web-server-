import React, { useRef, useEffect, forwardRef, useState } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useGlobalFilter,
  useAsyncDebounce,
  useExpanded,
  PluginHook,
} from "react-table";
import classNames from "classnames";

// components
import Pagination from "./Pagination";

interface GlobalFilterProps {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
  searchBoxClass: any;
}

// Define a default UI for filtering
const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  searchBoxClass,
}: GlobalFilterProps) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState<any>(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className={classNames(searchBoxClass)}>
      <span className="d-flex align-items-center">
        Search :{" "}
        <input
          type="search"
          value={value || ""}
          onChange={(e: any) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          className="form-control w-auto ms-1"
        />
      </span>
    </div>
  );
};

interface IndeterminateCheckboxProps {
  indeterminate: any;
  children?: React.ReactNode;
}

const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  IndeterminateCheckboxProps
>(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef: any = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          ref={resolvedRef}
          {...rest}
        />
        <label htmlFor="form-check-input" className="form-check-label"></label>
      </div>
    </>
  );
});

interface TableProps {
  isSearchable?: boolean;
  isSortable?: boolean;
  pagination?: boolean;
  isSelectable?: boolean;
  isExpandable?: boolean;
  onPageChange?: (page: number) => void;
  onSizePerPageChange?: (size: number) => void;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  sizePerPageList?: {
    text: string;
    value: number;
  }[];
  columns: {
    Header: string;
    accessor: string;
    sort?: boolean;
    Cell?: any;
    className?: string;
  }[];
  data: any[];
  pageSize?: number;
  searchBoxClass?: string;
  tableClass?: string;
  theadClass?: string;
}

const Table = (props: TableProps) => {
  const {
    isSearchable = false,
    isSortable = false,
    pagination = false,
    isSelectable = false,
    isExpandable = false,
    sizePerPageList = [],
    columns,
    data,
    pageSize = 10,
    onPageChange,
    onSizePerPageChange,
    currentPage = 1,
    totalPages,
    totalItems,
    searchBoxClass,
    tableClass,
    theadClass,
  } = props;

  let otherProps: any = {};

  if (isSearchable) {
    otherProps["useGlobalFilter"] = useGlobalFilter;
  }
  if (isSortable) {
    otherProps["useSortBy"] = useSortBy;
  }
  if (isExpandable) {
    otherProps["useExpanded"] = useExpanded;
  }
  if (pagination) {
    otherProps["usePagination"] = usePagination;
  }
  if (isSelectable) {
    otherProps["useRowSelect"] = useRowSelect;
  }

  const dataTable = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: currentPage - 1, pageSize },
      manualPagination: pagination,
      pageCount: totalPages,
    },
    ...(Object.values(otherProps) as PluginHook<any>[]),
    (hooks) => {
      if (isSelectable) {
        hooks.visibleColumns.push((columns) => [
          {
            id: "selection",
            Header: ({ getToggleAllPageRowsSelectedProps }: any) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }: any) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }

      if (isExpandable) {
        hooks.visibleColumns.push((columns) => [
          {
            id: "expander",
            Header: ({
              getToggleAllRowsExpandedProps,
              isAllRowsExpanded,
            }: any) => (
              <span {...getToggleAllRowsExpandedProps()}>
                {isAllRowsExpanded ? "-" : "+"}
              </span>
            ),
            Cell: ({ row }: any) =>
              row.canExpand ? (
                <span {...row.getToggleRowExpandedProps({ style: { paddingLeft: `${row.depth * 2}rem` } })}>
                  {row.isExpanded ? "-" : "+"}
                </span>
              ) : null,
          },
          ...columns,
        ]);
      }
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize: currentPageSize },
  } = dataTable;

  useEffect(() => {
    if (pagination && onPageChange) onPageChange(pageIndex + 1);
  }, [pageIndex, onPageChange, pagination]);

  useEffect(() => {
    if (pagination && onSizePerPageChange) onSizePerPageChange(currentPageSize);
  }, [currentPageSize, onSizePerPageChange, pagination]);

  return (
    <>
      {isSearchable && (
        <GlobalFilter
          preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
          globalFilter={dataTable.state.globalFilter}
          setGlobalFilter={dataTable.setGlobalFilter}
          searchBoxClass={searchBoxClass}
        />
      )}

      <div className="table-responsive">
        <table
          {...getTableProps()}
          className={classNames("table table-centered react-table", tableClass)}
        >
          <thead className={theadClass}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(
                      column.canSort ? column.getSortByToggleProps() : undefined
                    )}
                    className={classNames({
                      sorting_desc: column.isSortedDesc,
                      sorting_asc: column.isSorted && !column.isSortedDesc,
                      sortable: column.canSort,
                    })}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {pagination && (
        <Pagination 
          tableProps={dataTable} 
          sizePerPageList={sizePerPageList}
          onPageChange={onPageChange}
          onSizePerPageChange={onSizePerPageChange}
        />
      )}
    </>
  );
};

export default Table;