import axios from "axios";
import { useState } from "react";

function AddNotice({ onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    file: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile); // Debugging
      setFormData((prevData) => ({
        ...prevData,
        file: selectedFile,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      alert("Please select a file!");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("file", formData.file);

    console.log("Sending FormData:");
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ": " + pair[1]); // Debugging
    }

    try {
      const response = await axios.post("http://localhost:8087/api/notices", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Notice added successfully:", response.data);
      alert("Notice added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding notice:", error);
      alert("Failed to add notice. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-cyan-200 p-6 rounded shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Add New Notice</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
            <label className="block text-gray-700">Upload File</label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
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
        </form>
      </div>
    </div>
  );
}

export default AddNotice;
