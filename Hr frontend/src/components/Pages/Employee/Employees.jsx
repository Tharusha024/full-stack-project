import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeftOutlined, ArrowRightOutlined, DeleteOutlined, EditOutlined, PlusSquareOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import SubTopBar from '../../TopBar/SubTopBar';
import Buttons_1 from '../../Buttons/Buttons_1';
import AddEmployeePopup from './AddEmployeePopup';

const Employees = () => {
  const [employees, setEmployees] = useState([]); // Employee list
  const [filteredEmployees, setFilteredEmployees] = useState([]); // For search results
  const [searchQuery, setSearchQuery] = useState(''); // Search input
  const [currentPage, setCurrentPage] = useState(1); // Pagination: Current page
  const [employeesPerPage] = useState(5); // Number of employees per page
  const [isEditing, setIsEditing] = useState(false); // Edit state
  const [editEmployee, setEditEmployee] = useState(null);
  const [userTypeFilter, setUserTypeFilter] = useState("active");
  const [activePopup, setActivePopup] = useState(null); // Employee to be edited

  // Fetch employees on component mount or when userTypeFilter changes
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/employee/userType/${userTypeFilter}`)
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
        .delete(`http://localhost:8080/api/employee/delete/${id}`)
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

  const addEmployee = async (employee) => {
    try {
      const response = await axios.post('http://localhost:8080/api/employee', employee);
      setEmployees([...employees, response.data]);
      setFilteredEmployees([...employees, response.data]); // Ensure the new employee appears in the list
    } catch (error) {
      console.error("Error adding employee:", error);
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
        .put(`http://localhost:8080/api/employee/update/${editEmployee.id}`, editEmployee)
        .then((response) => {
          // Update the employee list with the updated data
          setEmployees(
            employees.map((employee) =>
              employee.id === response.data.id ? response.data : employee
            )
          );
          setFilteredEmployees(
            filteredEmployees.map((employee) =>
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

  const handleAddEmployeeClick = () => setActivePopup('addEmployee');
  const closePopup = () => setActivePopup(null);

  // Handle changing user type
  const handleChangeUserType = (id, newUserType) => {
    if (window.confirm(`Are you sure you want to change the user type to ${newUserType}?`)) {
      axios
        .patch(`http://localhost:8080/api/employee/changeType/${id}?userType=${newUserType}`)
        .then(() => {
          const updatedEmployees = employees.map((employee) =>
            employee.id === id ? { ...employee, userType: newUserType } : employee
          );
          setEmployees(updatedEmployees);
          setFilteredEmployees(updatedEmployees); // Update filtered list as well
        })
        .catch((error) => {
          console.error('Error changing user type:', error);
        });
    }
  };

  return (
    <>
      <div className="absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200">
        <SubTopBar icon={<UserOutlined />} name="Employee" secondname="Employees" arrow={<ArrowRightOutlined className="size-3" />} />
      </div>
      <div className="ml-5 absolute left-[15%] top-28 w-[85%]">
        <div className="left-[15%] top-28 flex gap-5">
          <Buttons_1
            name="Add Employee"
            bgColor="bg-custom-blue"
            icon={<PlusSquareOutlined />}
            onClick={handleAddEmployeeClick}
          />
        </div>
        {activePopup === 'addEmployee' && (
          <AddEmployeePopup onClose={closePopup} onAdd={addEmployee} />
        )}

        <div className="left-[15%] top-40 m-0 w-[95%] h-full bg-cyan-200">
          <div className="flex text-center gap-1 my-4">
            <UserOutlined className="size-6" />
            <p className="text-base font-average">Employees List</p>
          </div>
          <hr className="bg-black border-0 h-[3px] my-2" />
          <div className="my-4 flex items-right justify-end">
            <input
              type="text"
              placeholder="Search by Name or Email"
              value={searchQuery}
              onChange={handleSearch}
              className="px-4 py-2 border border-gray-300 rounded w-[40%]"
            />
          </div>

          <table className="w-full mt-4 border-collapse border border-gray-300 table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-black  px-4 py-2 bg-custom-blue w-1/4">Name</th>
                <th className="border border-black  px-4 py-2 bg-custom-blue w-1/12">Pin</th>
                <th className="border border-black  px-4 py-2 bg-custom-blue w-1/4">Email</th>
                <th className="border border-black  px-4 py-2 bg-custom-blue w-1/6">Department</th>
                <th className="border border-black  px-4 py-2 bg-custom-blue w-1/3">Designation</th>
                <th className="border border-black  px-4 py-2 bg-custom-blue w-1/6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="odd:bg-custom-blue-2 even:bg-custom-blue-3 hover:bg-gray-100"
                >
                  <td className="py-2 px-4 border border-black w-1/4">{employee.name}</td>
                  <td className="py-2 px-4 border border-black w-1/12">{employee.pin}</td>
                  <td className="py-2 px-4 border border-black w-1/4">{employee.email}</td>
                  <td className="py-2 px-4 border border-black w-1/6">{employee.department}</td>
                  <td className="py-2 px-4 border border-black w-1/3">{employee.designation}</td>
                  <td className="py-2 px-4 border border-black w-1/3">
                    <div className="flex space-x-2">
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
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        onClick={() => handleChangeUserType(employee.id, employee.userType === 'active' ? 'inactive' : 'active')}
                      >
                       <UploadOutlined />
                      </button>
                    </div>
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
              className="bg-blue-500 px-3 py-1 rounded disabled:opacity-50"
            >
              <ArrowLeftOutlined />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-blue-500 px-3 py-1 rounded disabled:opacity-50"
            >
              <ArrowRightOutlined />
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
                <label className="block text-sm font-medium mb-2">Department</label>
                <input
                  type="text"
                  value={editEmployee?.department || ''}
                  onChange={(e) =>
                    setEditEmployee((prev) => ({ ...prev, department: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
                />
                <label className="block text-sm font-medium mb-2">Designation</label>
                <input
                  type="text"
                  value={editEmployee?.designation || ''}
                  onChange={(e) =>
                    setEditEmployee((prev) => ({ ...prev, designation: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
                />
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
                    onClick={handleSubmit} // Call handleSubmit to save changes
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Employees;
