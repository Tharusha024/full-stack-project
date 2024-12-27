import axios from "axios";
import { useState } from "react";

function AddNotice({ onClose }) {
  const [formData, setFormData] = useState({
      title: "",
      file: "",
      date: "",
      details: "",
  });

  const handleChange = (e) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value,
      });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post("http://localhost:8080/api/employee", formData);
          console.log("Project added successfully:", response.data);
          alert("Project added successfully!");
          onClose(); // Ensure this function is passed from the parent.
      } catch (error) {
          console.error("Error adding project:", error);
          alert("Failed to add project. Please try again.");
      }
  };

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-cyan-200 p-6 rounded shadow-lg w-[400px]">
              <h2 className="text-xl font-bold mb-4">Add New Notice</h2>
              <form onSubmit={handleSubmit}>
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
                      <label className="block text-gray-700">Image File</label>
                      <input
                          type="file"
                          name="file"
                          onChange={(e) => 
                              setFormData({ ...formData, file: e.target.files[0] })
                          }
                          className="w-full border p-2 rounded"
                          required
                      />
                  </div>
                  <div className="mb-3">
                      <label className="block text-gray-700">Start Date</label>
                      <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          className="w-full border p-2 rounded"
                          required
                      />
                  </div>
                  <div className="mb-3">
                      <label className="block text-gray-700">Project Details</label>
                      <textarea
                          name="details"
                          value={formData.details}
                          onChange={handleChange}
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
