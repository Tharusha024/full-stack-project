import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeftOutlined, ArrowRightOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

const NoticeTable = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [editNotice, setEditNotice] = useState(null);
  const [isEditingNotice, setIsEditingNotice] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotices, setFilteredNotices] = useState([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get("http://localhost:8087/api/notices");
      setNotices(response.data);
      setFilteredNotices(response.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const handleEdit = (notice) => {
    setEditNotice(notice);
    setIsEditingNotice(true);
  };

  const handleSave = async () => {
    try {
      const { id, noticeId, title, fileName } = editNotice;
      const url = `http://localhost:8087/api/notices/${id}?noticeId=${encodeURIComponent(noticeId)}&title=${encodeURIComponent(title)}&fileName=${encodeURIComponent(fileName)}`;

      await axios.put(url);

      setIsEditingNotice(false);
      fetchNotices();
    } catch (error) {
      console.error("Error updating notice:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8087/api/notices/${id}`);
      fetchNotices();
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredNotices(
      notices.filter(
        (notice) =>
          notice.noticeId.toString().includes(query) ||
          notice.title.toLowerCase().includes(query)
      )
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotices = filteredNotices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="my-4 flex items-right justify-end">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by Notice ID or Title"
          className="px-4 py-2 border border-gray-300 rounded w-[40%]"
        />
      </div>

      <table className="w-full mt-4 border-collapse border border-gray-300 table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 border border-gray-300 bg-custom-blue w-[100px]">Notice ID</th>
            <th className="py-2 border border-gray-300 bg-custom-blue w-[400px]">Title</th>
            <th className="py-2 border border-gray-300 bg-custom-blue w-[500px]">File Name</th>
            <th className="py-2 border border-gray-300 bg-custom-blue w-[120px]">Published Date</th>
            <th className="py-2 border border-gray-300 bg-custom-blue">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentNotices.map((notice) => (
            <tr key={notice.id} className="odd:bg-custom-blue-2 even:bg-custom-blue-3 hover:bg-gray-100 h-[60px]">
              <td className="py-2 px-4 border border-gray-300">{notice.noticeId}</td>
              <td className="py-2 px-4 border border-gray-300">{notice.title}</td>
              <td className="py-2 px-4 border border-gray-300">
                <a href={notice.fileName} target="_blank" rel="noopener noreferrer">
                  {notice.fileName}
                </a>
              </td>
              <td className="py-2 px-4 border border-gray-300">{notice.publishedDate}</td>
              <td className="px-4 py-2 flex items-center justify-center border-gray-300">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEdit(notice)}
                    className="bg-custom-blue text-white px-2 rounded"
                    title="Edit"
                  >
                    <EditOutlined /> 
                  </button>
                  <button 
                    onClick={() => handleDelete(notice.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    title="Delete"
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 px-3 py-1 rounded disabled:opacity-50"
        >
          <ArrowLeftOutlined />
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 px-3 py-1 rounded disabled:opacity-50"
        >
          <ArrowRightOutlined />
        </button>
      </div>

      {/* Edit Notice Modal */}
      {isEditingNotice && editNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Notice</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Notice ID:</label>
              <input
                type="text"
                value={editNotice.noticeId}
                onChange={(e) => setEditNotice({ ...editNotice, noticeId: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Title:</label>
              <input
                type="text"
                value={editNotice.title}
                onChange={(e) => setEditNotice({ ...editNotice, title: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">File Name:</label>
              <input
                type="text"
                value={editNotice.fileName}
                onChange={(e) => setEditNotice({ ...editNotice, fileName: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <button onClick={() => setIsEditingNotice(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
              <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeTable;
