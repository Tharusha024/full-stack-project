import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

function ProjectTable() {
    const headers = ["Project Name", "Start Date", "End Date"];
    const rows = [
        { projectName: "Project 1", startDate: "2024/02/12", endDate: "2024/02/12" },
        { projectName: "Project 2", startDate: "2024/03/01", endDate: "2024/03/05" },
        { projectName: "Project 3", startDate: "2024/04/10", endDate: "2024/04/15" },
        { projectName: "Project 1", startDate: "2024/02/12", endDate: "2024/02/12" },
        { projectName: "Project 2", startDate: "2024/03/01", endDate: "2024/03/05" },
        { projectName: "Project 3", startDate: "2024/04/10", endDate: "2024/04/15" },
        { projectName: "Project 1", startDate: "2024/02/12", endDate: "2024/02/12" },
        { projectName: "Project 2", startDate: "2024/03/01", endDate: "2024/03/05" },
        { projectName: "Project 3", startDate: "2024/04/10", endDate: "2024/04/15" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(6); // Change for more/less rows per page
    const [filterText, setFilterText] = useState("");

    // Filter rows based on filterText
    const filteredRows = rows.filter((row) =>
        row.projectName.toLowerCase().includes(filterText.toLowerCase())
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

    return (
        <div className='m-[20px]'>
            <div className='flex justify-between'>
            <h1 className='font-average text-xl font-medium text-black'>Running Projects</h1>
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
                            <td className="border border-gray-300 px-4 py-2">{row.projectName}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.startDate}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.endDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
                >
                    <ArrowLeftOutlined />
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
                >
                    <ArrowRightOutlined />
                </button>
            </div>
        </div>
    );
}

export default ProjectTable;
