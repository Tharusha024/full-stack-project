import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

function ProjectTable() {
    const headers = ["ID", "Project Name", "Start Date", "End Date"];
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(6);
    const [filterText, setFilterText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("http://localhost:8084/api/project");
                if (!response.ok) {
                    throw new Error("Failed to fetch projects");
                }
                const data = await response.json();
                console.log("Fetched Projects:", data); // Debugging output
                setProjects(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Filter rows based on input
    const filteredRows = projects.filter((row) =>
        row.projectTitle?.toLowerCase().includes(filterText.toLowerCase())
    );

    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));

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

    if (loading) return <p className="text-gray-600">Loading projects...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="m-5">
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-semibold text-xl text-black">Running Projects</h1>
                <input
                    type="text"
                    placeholder="Search by project name"
                    value={filterText}
                    onChange={handleFilterChange}
                    className="p-2 border border-gray-300 rounded w-1/3"
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
                    {currentRows.length > 0 ? (
                        currentRows.map((row, index) => (
                            <tr
                                key={row.projectId || index}
                                className={`${index % 2 === 0 ? "bg-blue-100" : "bg-blue-200"} hover:bg-gray-100`}
                            >
                                <td className="border border-gray-300 text-center py-2">{row.projectId || "N/A"}</td>
                                <td className="border border-gray-300 py-2">{row.projectTitle || "N/A"}</td>
                                <td className="border border-gray-300 text-center py-2">{row.startDate || "N/A"}</td>
                                <td className="border border-gray-300 text-center py-2">{row.endDate || "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center py-4 text-gray-600">
                                No projects found
                            </td>
                        </tr>
                    )}
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
