import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";

function AddNotice({ onClose }) {
  const [formData, setFormData] = useState({
    noticeId: "",
    title: "",
    fileName: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.noticeId || !formData.title || !formData.fileName) {
      alert("Please fill all fields!");
      return;
    }

    const apiUrl = `http://localhost:8087/api/notices?noticeId=${formData.noticeId}&title=${encodeURIComponent(formData.title)}&fileName=${encodeURIComponent(formData.fileName)}`;

    try {
      const response = await axios.post(apiUrl, {}, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Notice updated successfully:", response.data);
      alert("Notice updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating notice:", error);
      alert("Failed to update notice. Please try again.");
    }
  };
  const gotolink = () => {
    window.open("https://postimages.org/", "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-cyan-200 p-6 rounded shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Add New Notice</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-700">Notice ID</label>
            <input
              type="text"
              name="noticeId"
              value={formData.noticeId}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Notice Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">File Link</label>
            <input
              type="text"
              name="fileName"
              value={formData.fileName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="flex justify-between gap-3 mt-4">
            <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded"
            title="Upload Image (Get Direct link)"
            onClick={gotolink}
            >
              <UploadOutlined />
            </button>
            <div className="flex gap-4">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Notice
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNotice;
