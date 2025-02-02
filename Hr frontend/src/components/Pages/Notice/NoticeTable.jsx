import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import EditNoticePopup from "./EditNoticePopup"; // Ensure this file exists

function NoticeTable() {
    const headers = ["Notice Name", "Notice File", "Date", "Action"];
    const [notices, setNotices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(6);
    const [filterText, setFilterText] = useState("");
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const [editRow, setEditRow] = useState(null);

    // Fetch notices from API
    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get("http://localhost:8087/api/notices");
                setNotices(response.data);
            } catch (error) {
                console.error("Error fetching notices:", error);
            }
        };

        fetchNotices();
    }, []);

    // Filter notices based on search input
    const filteredRows = notices.filter((row) =>
        row.title.toLowerCase().includes(filterText.toLowerCase())
    );

    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

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
        closeEditPopup();
    };

    // Convert byte array to downloadable file
    const downloadFile = (fileData, fileName, contentType) => {
        const byteCharacters = atob(fileData); // Decode base64 string
        const byteNumbers = new Array(byteCharacters.length).fill(null).map((_, i) =>
            byteCharacters.charCodeAt(i)
        );
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: contentType });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="m-[20px]">
            <div className="flex justify-end">
                <input
                    type="text"
                    placeholder="Search by notice name"
                    value={filterText}
                    onChange={handleFilterChange}
                    className="mb-4 p-2 border border-gray-300 rounded w-1/3"
                />
            </div>
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        {headers.map((header, index) => (
                            <th key={index} className="border border-gray-300 px-4 py-2 text-center">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((row, index) => (
                        <tr
                            key={row.id}
                            className={`${
                                index % 2 === 0 ? "bg-blue-100" : "bg-blue-200"
                            } hover:bg-gray-100`}
                        >
                            <td className="border border-gray-300 px-4 py-2">{row.title}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    className="text-blue-600 underline"
                                    onClick={() => downloadFile(row.fileData, row.fileName, row.contentType)}
                                >
                                    {row.fileName}
                                </button>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{row.publishedDate}</td>
                            <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                                <button
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                    onClick={() => openEditPopup(row)}
                                >
                                    Edit
                                </button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded">
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
                <EditNoticePopup row={editRow} onClose={closeEditPopup} onSave={saveEdit} />
            )}
        </div>
    );
}

export default NoticeTable;
