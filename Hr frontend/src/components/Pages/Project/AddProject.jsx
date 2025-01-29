import axios from 'axios';
import React, { useState } from 'react';

function AddProject({ onClose }) {  
  const [formData, setFormData] = useState({
    projectTitle: "",
    status:"",
    startDate: "",
    endDate: "",
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
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      alert('Start date must be before end date.');
      return;
    }
    try {
      const response = await axios.post("http://localhost:8084/api/project", formData);
      console.log("Project added successfully:", response.data);
      alert("Project added successfully!");
      onClose(); 
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-cyan-200 p-6 rounded shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-700">Project Title</label>
            <input
              type="text"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder='Enter project title'
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Project Status</label>
           <select className="w-full border p-2 rounded" name="status" value={formData.status} onChange={handleChange} required>
            <option value="">select poject status</option>
            <option value="upcoming">upcoming</option>
            <option value="running">running</option>
            <option value="completed">Completed</option>
           </select>
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
            <label className="block text-gray-700">End Date</label> 
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
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
              placeholder='Enter project details'
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
              onClick={handleSubmit}
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProject;
