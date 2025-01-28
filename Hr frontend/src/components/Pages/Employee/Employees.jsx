import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeftOutlined, ArrowRightOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Employees = () => {
  const [employees, setEmployees] = useState([]); // Employee list
  const [filteredEmployees, setFilteredEmployees] = useState([]); // For search results
  const [searchQuery, setSearchQuery] = useState(''); // Search input
  const [currentPage, setCurrentPage] = useState(1); // Pagination: Current page
  const [employeesPerPage] = useState(5); // Number of employees per page
  const [isEditing, setIsEditing] = useState(false); // Edit state
  const [editEmployee, setEditEmployee] = useState(null);
  const [userTypeFilter, setUserTypeFilter] = useState("active"); // Employee to be edited

  // Fetch employees on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/employee/userType/${userTypeFilter}`)
      .then((response) => {
        setEmployees(response.data);
        setFilteredEmployees(response.data); // Initialize filtered list
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  }, [userTypeFilter]);

  // Handle searching
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredEmployees(
      employees.filter(
        (employee) =>
          employee.name.toLowerCase().includes(query) ||
          employee.email.toLowerCase().includes(query)
      )
    );
  };

  // Handle deleting an employee
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios
        .delete(`http://localhost:8082/api/employee/delete/${id}`)
        .then(() => {
          const updatedEmployees = employees.filter((employee) => employee.id !== id);
          setEmployees(updatedEmployees);
          setFilteredEmployees(updatedEmployees);
        })
        .catch((error) => {
          console.error('Error deleting employee:', error);
        });
    }
  };

  // Handle editing an employee
  const handleEdit = (id) => {
    const employee = employees.find((employee) => employee.id === id);
    setEditEmployee(employee);
    setIsEditing(true); // Show the edit popup
  };

  // Handle form submission to update employee
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editEmployee) {
      axios
        .put(`http://localhost:8082/api/employee/update/${editEmployee.id}`, editEmployee)
        .then((response) => {
          // Update the employee list with the updated data
          setEmployees(
            employees.map((employee) =>
              employee.id === response.data.id ? response.data : employee
            )
          );
          setIsEditing(false); // Close the edit popup
          setEditEmployee(null); // Reset editEmployee state
        })
        .catch((error) => console.error('Error updating employee:', error));
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Get current employees based on pagination
  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage
  );

  return (
    <div className="p-5">
      {/* Search Bar */}
      <div className="my-4 flex items-right justify-end">
        <input
          type="text"
          placeholder="Search by Name or Email"
          value={searchQuery}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded w-[40%]"
        />
      </div>

      {/* Employee Table */}
      <table className="w-full mt-4 border-collapse border border-gray-300 table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 border border-gray-300">Name</th>
            <th className="py-2 border border-gray-300">Pin</th>
            <th className="py-2 border border-gray-300">Email</th>
            <th className="py-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr
              key={employee.id}
              className="odd:bg-custom-blue-2 even:bg-custom-blue-3 hover:bg-gray-100"
            >
              <td className="py-2 px-4 border border-gray-300">{employee.name}</td>
              <td className="py-2 px-4 border border-gray-300">{employee.pin}</td>
              <td className="py-2 px-4 border border-gray-300">{employee.email}</td>
              <td className="py-2 px-4 border border-gray-300 flex gap-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleEdit(employee.id)}
                >
                  <EditOutlined />
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(employee.id)}
                >
                  <DeleteOutlined />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          <ArrowLeftOutlined /> Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next <ArrowRightOutlined />
        </button>
      </div>

      {/* Edit Popup */}
      {isEditing && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-lg max-w-lg w-full shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>

      <label className="block text-sm font-medium mb-2">Name</label>
      <input
        type="text"
        value={editEmployee?.name || ''}
        onChange={(e) =>
          setEditEmployee((prev) => ({ ...prev, name: e.target.value }))
        }
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
      />

      <label className="block text-sm font-medium mb-2">Pin</label>
      <input
        type="text"
        value={editEmployee?.pin || ''}
        onChange={(e) =>
          setEditEmployee((prev) => ({ ...prev, pin: e.target.value }))
        }
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
      />

      <label className="block text-sm font-medium mb-2">Email</label>
      <input
        type="email"
        value={editEmployee?.email || ''}
        onChange={(e) =>
          setEditEmployee((prev) => ({ ...prev, email: e.target.value }))
        }
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
      />

      <label className="block text-sm font-medium mb-2">User Type</label>
      <select
        value={editEmployee?.userType || ''}
        onChange={(e) =>
          setEditEmployee((prev) => ({ ...prev, userType: e.target.value }))
        }
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
      >
        <option value="">Select User Type</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="disciplinary">Disciplinary</option>
      </select>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => {
            setIsEditing(false); // Close the edit popup
            setEditEmployee(null); // Reset editEmployee state
          }}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Employees;
