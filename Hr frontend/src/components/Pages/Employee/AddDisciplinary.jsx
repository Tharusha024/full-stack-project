import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select"; // Import React Select

function AddDisciplinary({ onClose }) {
  const [employees, setEmployees] = useState([]); // Store API data
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Selected Employee
  const [formData, setFormData] = useState({
    name: "",
    pin: "",
    title: "",
    description: "",
  });

  // Fetch employees from API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/employee");
        setEmployees(response.data); // Store API response
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Handle dropdown selection
  const handleEmployeeChange = (selectedOption) => {
    setSelectedEmployee(selectedOption);
    setFormData({
      ...formData,
      name: selectedOption.name,
      pin: selectedOption.pin,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8082/api/employeeDisciplinary", formData);
      console.log("Disciplinary record added successfully:", response.data);
      alert("Disciplinary record added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding disciplinary record:", error);
      alert("Failed to add disciplinary record. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-cyan-200 p-6 rounded shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Add Disciplinary Record</h2>
        <form onSubmit={handleSubmit}>

          {/* Searchable Employee Dropdown */}
          <div className="mb-3">
            <label className="block text-gray-700">Select Employee</label>
            <Select
              options={employees.map((emp) => ({
                value: emp.pin,
                label: `${emp.name} (${emp.pin})`,
                name: emp.name,
                pin: emp.pin
              }))}
              value={selectedEmployee}
              onChange={handleEmployeeChange}
              placeholder="Search employee..."
              className="w-full"
            />
          </div>

          {/* Name Field (Read-Only) */}
          <div className="mb-3">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              className="w-full border p-2 rounded bg-gray-100"
              readOnly
            />
          </div>

          {/* PIN Field (Read-Only) */}
          <div className="mb-3">
            <label className="block text-gray-700">User ID (PIN)</label>
            <input
              type="text"
              name="pin"
              value={formData.pin}
              className="w-full border p-2 rounded bg-gray-100"
              readOnly
            />
          </div>

          {/* Title Field */}
          <div className="mb-3">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border p-2 rounded bg-white"
            />
          </div>

          {/* Description Field */}
          <div className="mb-3">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border p-2 rounded bg-white"
            />
          </div>

          {/* Buttons */}
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
              Add Disciplinary Record
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddDisciplinary;
