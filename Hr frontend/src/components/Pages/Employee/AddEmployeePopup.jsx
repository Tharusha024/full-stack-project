import React, { useEffect, useState } from "react";
import axios from "axios";

function AddEmployeePopup({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    pin: "",
    email: "",
    contact: "",
    department: "",
    designation: "",
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
      console.log("Employee added successfully:", response.data);
      alert("Employee added successfully!");
      onClose(); // Close the popup after successful submission
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee. Please try again.");
    }
  };

  const [departmentOptions, setDepartmentOptions] = useState([]); // State to hold department options
  const [designationOptions, setDesignationOptions] = useState([]); // State to hold designation options
  const [loading, setLoading] = useState(true); // State to track loading state
  const [error, setError] = useState(null); // State to track error if any

  // Fetch department and designation data when the component mounts
  useEffect(() => {
    // Fetch department data
    fetch('http://localhost:8083/api/department') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        setDepartmentOptions(data); // Set the department options
      })
      .catch(err => {
        setError('Error fetching department data');
        setLoading(false);
      });

    // Fetch designation data
    fetch('http://localhost:8083/api/designation') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        setDesignationOptions(data); // Set the designation options
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(err => {
        setError('Error fetching designation data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-cyan-200 p-6 rounded shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">User ID</label>
            <input
              type="text"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Department</label>
            <select
              name="department" // Change name to "department" to match formData
              value={formData.department} // Bind department value
              onChange={handleChange} // Handle change for department
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Department</option> {/* Default option */}
              {departmentOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Designation</label>
            <select
              name="designation" // Change name to "designation" to match formData
              value={formData.designation} // Bind designation value
              onChange={handleChange} // Handle change for designation
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Designation</option> {/* Default option */}
              {designationOptions.map((option, index) => (
                <option key={index} value={option.designationName}>
                  {option.designationName}
                </option>
              ))}
            </select>
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
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployeePopup;
