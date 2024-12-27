import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import React, { useState } from 'react'

function NoticeTable() {
     const headers = ["Notice Name","Notice File","Start Date","Details"];
            const rows = [
                { title: "Notice 1",file: "notice image", date: "2024/02/12",details:"details" },
                { title: "Notice 2",file: "notice image", date: "2024/03/01",details:"details" },
                { title: "Notice 3",file: "notice image", date: "2024/04/10",details:"details" },
                { title: "Notice 1",file: "notice image", date: "2024/02/12",details:"details" },
                { title: "Notice 2",file: "notice image", date: "2024/03/01",details:"details" },
                { title: "Notice 3",file: "notice image", date: "2024/04/10",details:"details" },
                { title: "Notice 1",file: "notice image", date: "2024/02/12",details:"details" },
                { title: "Notice 2",file: "notice image", date: "2024/03/01",details:"details" },
                { title: "Notice 3",file: "notice image", date: "2024/04/10",details:"details" },
            ];
        
            const [currentPage, setCurrentPage] = useState(1);
            const [rowsPerPage] = useState(6); // Change for more/less rows per page
            const [filterText, setFilterText] = useState("");
        
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
</div>
  )
}

export default NoticeTable