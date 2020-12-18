import React, { useEffect, useState } from "react";
import "./Pages.scss";

const Pages = ({ currentPage, totalPages, paginate }) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    // Show max 5 pages in navigation
    if (totalPages >= 5) {
      if (currentPage - 2 > 1 && currentPage + 2 < totalPages) {
        setPageNumbers(
          Array(5)
            .fill(currentPage - 2)
            .map((number, index) => number + index)
        );
      } else if (currentPage - 2 <= 1 && currentPage + 1 < totalPages) {
        setPageNumbers(
          Array(5)
            .fill(1)
            .map((number, index) => number + index)
        );
      } else if (currentPage - 2 > 1 && currentPage + 2 >= totalPages) {
        setPageNumbers(
          Array(5)
            .fill(totalPages - 4)
            .map((number, index) => number + index)
        );
      }
    } else {
      // If less then 5 pages to show -> show all of them
      setPageNumbers(
        Array(totalPages)
          .fill(1)
          .map((number, index) => number + index)
      );
    }
  }, [currentPage, totalPages]);

  return (
    <ul className="pages">
      {pageNumbers.map((number) => (
        <li
          onClick={() => paginate(number)}
          key={number}
          className={
            number === currentPage
              ? "pages__number pages__number--current"
              : "pages__number"
          }
        >
          <p
            className={
              number === currentPage
                ? "pages__item pages__item--current"
                : "pages__item"
            }
          >
            {number}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Pages;
