import React, { useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import { Details, detailsInfo } from "./Staffdata";

const ITEMS_PER_PAGE = 2;
interface PaginatedTableProps {
  detailsInfo: Details[]; // Assuming Details is the correct type for detailsInfo
}
const PaginatedTable: React.FC<PaginatedTableProps> = ({ detailsInfo }) => {
  
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
    
  const paginatedData = detailsInfo.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  

  const totalPages = Math.ceil(detailsInfo.length / ITEMS_PER_PAGE);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Staff Name</th>
            <th>Orders</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((detail) => (
            <tr key={detail.id}>
              <td>{detail.id}</td>
              <td>{detail.staffname}</td>
              <td>{detail.orders}</td>
              <td>{detail.products}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={
            currentPage === totalPages}
            />
            </Pagination>
            </div>
            );
            };
            
            export default PaginatedTable;