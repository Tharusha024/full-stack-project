import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeftOutlined, ArrowRightOutlined, DeleteOutlined, EditOutlined, PlusSquareOutlined, UserOutlined } from '@ant-design/icons';
import SubTopBar from '../../TopBar/SubTopBar';
import Buttons_1 from '../../Buttons/Buttons_1';
import AddEmployeePopup from './AddEmployeePopup';

const InactiveEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  const [isEditing, setIsEditing] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [activePopup, setActivePopup] = useState(null);

  // Fetch inactive employees on component mount
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/employee/userType/inactive')
      .then((response) => {
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  }, []);

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
      await axios.post('http://localhost:8080/api/employee', employee);
      setEmployees([...employees, employee]);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleEdit = (id) => {
    const employee = employees.find((employee) => employee.id === id);
    setEditEmployee(employee);
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editEmployee) {
      axios
        .put(`http://localhost:8080/api/employee/update/${editEmployee.id}`, editEmployee)
        .then((response) => {
          setEmployees(
            employees.map((employee) =>
              employee.id === response.data.id ? response.data : employee
            )
          );
          setIsEditing(false);
          setEditEmployee(null);
        })
        .catch((error) => console.error('Error updating employee:', error));
    }
  };

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

  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage
  );

  const handleAddEmployeeClick = () => setActivePopup('addEmployee');
  const closePopup = () => setActivePopup(null);

  return (
    <>
      <div className="absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200">
        <SubTopBar icon={<UserOutlined />} name="Employee" secondname="Inactive Employees" arrow={<ArrowRightOutlined />} />
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
        {activePopup === 'addEmployee' && <AddEmployeePopup onClose={closePopup} onAdd={addEmployee} />}

        <div className="left-[15%] top-40 m-0 w-[95%] h-full bg-cyan-200">
          <div className="flex text-center gap-1 my-4">
            <UserOutlined />
            <p className="text-base font-average">Inactive Employees List</p>
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
                <th className="border border-black px-4 py-2 bg-custom-blue w-1/3">Name</th>
                <th className="border border-black px-4 py-2 bg-custom-blue w-1/6">Pin</th>
                <th className="border border-black px-4 py-2 bg-custom-blue w-1/3">Email</th>
                <th className="border border-black px-4 py-2 bg-custom-blue w-1/6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee) => (
                <tr key={employee.id} className="odd:bg-custom-blue-2 even:bg-custom-blue-3 hover:bg-gray-100">
                  <td className="py-2 border-black px-4 border w-1/3">{employee.name}</td>
                  <td className="py-2 border-black  px-4 border w-1/6">{employee.pin}</td>
                  <td className="py-2 border-black px-4 border w-1/3">{employee.email}</td>
                  <td className="border-b border-r border-black px-4 py-2 flex items-center justify-center space-x-2">
                    <div className="flex space-x-2">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(employee.id)}>
                        <EditOutlined />
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(employee.id)}>
                        <DeleteOutlined />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-blue-500 px-3 py-1 rounded disabled:opacity-50">
              <ArrowLeftOutlined />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-blue-500 px-3 py-1 rounded disabled:opacity-50">
              <ArrowRightOutlined />
            </button>
          </div>

          {isEditing && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg max-w-lg w-full shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={editEmployee?.name || ''}
                  onChange={(e) => setEditEmployee((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
                />
                <label className="block text-sm font-medium mb-2">Pin</label>
                <input
                  type="text"
                  value={editEmployee?.pin || ''}
                  onChange={(e) => setEditEmployee((prev) => ({ ...prev, pin: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
                />
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={editEmployee?.email || ''}
                  onChange={(e) => setEditEmployee((prev) => ({ ...prev, email: e.target.value }))}
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
              <option value="inactive">Inactive</option>
              <option value="active">Active</option>
              </select>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                    Cancel
                  </button>
                  <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
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

export default InactiveEmployee;
