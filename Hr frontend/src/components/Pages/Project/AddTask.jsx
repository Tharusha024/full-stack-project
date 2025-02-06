import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function AddTask({ onClose }) {
  const [formData, setFormData] = useState({
    projectTitle: "",
    assignedEmployees: [], // This will store employee names instead of IDs
    taskTitle: "",
    startDate: "",
    endDate: "",
    details: "",
  });

  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch projects
    axios.get("http://localhost:8084/api/project")
      .then(response => setProjects(response.data))
      .catch(error => console.error("Error fetching projects:", error));

    // Fetch employees
    axios.get("http://localhost:8080/api/employee")
      .then(response => {
        // Map employees to the format required by react-select
        const employeeOptions = response.data.map(employee => ({
          value: employee.id, // employee ID (not used here, but still part of the data)
          label: employee.name, // employee name (used for display)
        }));
        setEmployees(employeeOptions);
      })
      .catch(error => console.error("Error fetching employees:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEmployeeChange = (selectedOptions) => {
    // Save employee names instead of IDs
    const employeeNames = selectedOptions.map(option => option.label);
    setFormData({
      ...formData,
      assignedEmployees: employeeNames, // Store employee names
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      alert('Start date must be before end date.');
      return;
    }
    try {
      const response = await axios.post("http://localhost:8088/api/task", formData);
      console.log("Task added successfully:", response.data);
      alert("Task added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-cyan-200 p-6 rounded shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-700">Project Title</label>
            <select
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select project title</option>
              {projects.map(project => (
                <option key={project.id} value={project.projectTitle}>
                  {project.projectTitle}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Assigned Employees</label>
            <Select
              isMulti
              options={employees}
              onChange={handleEmployeeChange}
              className="w-full"
              placeholder="Select employees"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Task Title</label>
            <input
              type="text"
              name="taskTitle"
              value={formData.taskTitle}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter task title"
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
            <label className="block text-gray-700">Task Details</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter task details"
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
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
