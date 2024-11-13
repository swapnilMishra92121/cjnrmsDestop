"use client";
import React, { useEffect, useState } from "react";
import { PaginationIProps } from "./TableIProps";
import Image from "next/image";
import images from "../../../assets";

export const Pagination: React.FC<PaginationIProps> = ({
  tableTotalRecord,
  setpageCount,
  setpageNumber,
  pageNumber,
  pageCount,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(
    pageNumber ? pageNumber : 1
  );
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    pageCount ? pageCount : 10
  );
  const totalItems = tableTotalRecord ? tableTotalRecord : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const getVisiblePages = () => {
    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(startPage + 4, totalPages);
    const visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
    return visiblePages;
  };

  const getStartIndex = () => (currentPage - 1) * itemsPerPage + 1;
  const getEndIndex = () => Math.min(currentPage * itemsPerPage, totalItems);

  useEffect(() => {
    if (setpageCount && setpageNumber) {
      setpageCount(itemsPerPage);
      setpageNumber(currentPage);
    }
  }, [itemsPerPage, currentPage]);

  useEffect(() => {
    if (pageNumber == 1 && pageCount == 10) {
      setCurrentPage(pageNumber ? pageNumber : 1);
      setItemsPerPage(pageCount ? pageCount : 10);
    }
  }, [pageNumber, pageCount]);

  return (
    <>
      <div className="table-controls">
        <div className="dropdown-container">
          <label>Items per page</label>
          <select
            id="entries"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            style={{ cursor: "pointer" }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>entries</span>
        </div>
        <div className="pagination-container">
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            {/* <i className="fa-solid fa-angles-left"></i> */}
           <Image src={images?.DoubleLeftArrow} alt="" height={20} width={20}/>

          </button>
          <button
            className="pagination-button"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            {/* <i className="fa-solid fa-chevron-left"></i> */}
            <Image src={images?.SingleLeftArrow} alt="" height={20} width={20}/>
          </button>
          {getVisiblePages().map((page) => (
            <span
              key={page}
              className={`page-info ${currentPage === page ? "active" : ""}`}
              onClick={() => handlePageClick(page)}
              style={{ cursor: "pointer" }}
            >
              {page}
            </span>
          ))}
          <button
            className="pagination-button"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            {/* <i className="fa-solid fa-chevron-right"></i> */}
            <Image src={images?.SingleRightArrow} alt="" height={20} width={20}/>
          </button>
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            {/* <i className="fa-solid fa-angles-right"></i> */}
           <Image src={images?.DoubleRightArrow} alt="" height={20} width={20}/>
          </button>
        </div>
        <div className="pagination">
          <span className="page-info">
            {getStartIndex()}-{getEndIndex()} of {totalItems}
          </span>
        </div>
      </div>
    </>
  );
};
