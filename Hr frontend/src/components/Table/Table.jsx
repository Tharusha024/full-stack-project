import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import React, { useState } from "react";

function Table({ headers, rows, actions }) {
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Filter rows based on the input text
  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(filterText.toLowerCase())|| 
  row.pin.toLowerCase().includes(filterText.toLowerCase())
  );

  // Pagination logic applied to filtered rows
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  // Reset current page when filter text changes
  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      {/* Filter Input */}
      <div className="mb-4 flex ">
        <input
          type="text"
          placeholder="Filter by name/pin..."
          value={filterText}
          onChange={handleFilterChange}
          className="p-2 border rounded w-40"
        />
      </div>

      {/* Table */}
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-custom-blue">
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4 py-2 text-left"
              >
                {header}
              </th>
            ))}
            {actions && (
              <th className="border border-gray-300 px-4 py-2 text-left">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0
                    ? "bg-custom-blue-2"
                    : "bg-custom-blue-3"
                } hover:bg-gray-100`}
              >
                {Object.values(row).map((value, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {value}
                  </td>
                ))}
                {actions && (
                  <td className="border border-gray-300 px-4 py-2 text-center flex space-x-2">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="border border-gray-300 px-4 py-2 text-center"
                colSpan={headers.length + (actions ? 1 : 0)}
              >
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-custom-blue px-3 py-1 rounded disabled:opacity-50"
        >
          <ArrowLeftOutlined />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-custom-blue px-3 py-1 rounded disabled:opacity-50"
        >
          <ArrowRightOutlined />
        </button>
      </div>
    </div>
  );
}

export default Table;
