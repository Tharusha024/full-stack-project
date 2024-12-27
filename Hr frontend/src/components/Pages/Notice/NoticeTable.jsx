import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import EditNoticePopup from './EditNoticePopup'; // Ensure this file exists

function NoticeTable() {
    const headers = ["Notice Name", "Notice File", "Start Date", "Details","Action"];
    const rows = [
        { title: "Notice 1", file: "notice image", date: "2024/02/12", details: "details" },
        { title: "Notice 2", file: "notice image", date: "2024/03/01", details: "details" },
        { title: "Notice 3", file: "notice image", date: "2024/04/10", details: "details" },
        { title: "Notice 4", file: "notice image", date: "2024/02/12", details: "details" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(6); // Change for more/less rows per page
    const [filterText, setFilterText] = useState("");
    const [isEditPopupOpen, setEditPopupOpen] = useState(false); // Initialize state
    const [editRow, setEditRow] = useState(null); // Initialize state

    // Filter rows based on filterText
    const filteredRows = rows.filter((row) =>
        row.title.toLowerCase().includes(filterText.toLowerCase())
    );

    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
        setCurrentPage(1); // Reset to the first page on filter change
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const openEditPopup = (row) => {
        setEditRow(row);
        setEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setEditPopupOpen(false);
        setEditRow(null);
    };

    const saveEdit = (updatedRow) => {
        console.log("Updated Row:", updatedRow);
        // Here you would update the rows array or send the data to the backend
        closeEditPopup();
    };

    return (
        <div className='m-[20px]'>
            <div className='flex justify-end'>
                <input
                    type="text"
                    placeholder="Search by project name"
                    value={filterText}
                    onChange={handleFilterChange}
                    className="mb-4 p-2 border border-gray-300 rounded w-1/3"
                />
            </div>
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        {headers.map((header, index) => (
                            <th key={index} className="border border-gray-300 px-4 py-2 text-center">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((row, index) => (
                        <tr
                            key={index}
                            className={`${
                                index % 2 === 0
                                    ? "bg-blue-100"
                                    : "bg-blue-200"
                            } hover:bg-gray-100`}
                        >
                            <td className="border border-gray-300 px-4 py-2">{row.title}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.file}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.date}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.details}</td>
                            <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                                <button
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                    onClick={() => openEditPopup(row)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="bg-blue-500 px-3 py-1 rounded disabled:opacity-50"
                >
                    <ArrowLeftOutlined />
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 px-3 py-1 rounded disabled:opacity-50"
                >
                    <ArrowRightOutlined />
                </button>
            </div>
            {isEditPopupOpen && editRow && (
                <EditNoticePopup
                    row={editRow}
                    onClose={closeEditPopup}
                    onSave={saveEdit}
                />
            )}
        </div>
    );
}

export default NoticeTable;
