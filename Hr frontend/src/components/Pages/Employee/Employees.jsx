import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubTopBar from '../../TopBar/SubTopBar';
import { ArrowRightOutlined, DeleteOutlined, EditOutlined, PlusSquareOutlined, UserOutlined } from '@ant-design/icons';
import Buttons_1 from '../../buttons/Buttons_1';
import AddEmployeePopup from './AddEmployeePopup';
import Table from '../../Table/Table';

function Employees() {
  const headers = ["Employee Name", "Pin", "Email", "User Type"];
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePopup, setActivePopup] = useState(null);
  const [userTypeFilter, setUserTypeFilter] = useState("admin"); // Filter by user type

  // Fetch employees by user type
  const fetchEmployees = async () => {
    try {
      const url = `http://localhost:8080/api/employee/userType/${userTypeFilter}`;
      const response = await axios.get(url);
      const modifiedData = response.data.map(item => {
        const { id, ...rest } = item;
        return rest;
      });
      console.log(modifiedData);
      setRows(modifiedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [userTypeFilter]); // Refetch when the user type filter changes

  // Add a new employee
  const addEmployee = async (employee) => {
    try {
      await axios.post(`http://localhost:8080/api/employee`, employee);
      fetchEmployees(); // Refresh the list
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  // Update an employee
  const updateEmployee = async (id, updatedEmployee) => {
    try {
      await axios.put(`http://localhost:8080/api/employee/update/${id}`, updatedEmployee);
      fetchEmployees(); // Refresh the list
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  // Delete an employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employee/delete/${id}`);
      fetchEmployees(); // Refresh the list
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Change user type
  const changeUserType = async (id, newType) => {
    try {
      await axios.patch(`http://localhost:8080/api/employee/changeType/${id}?userType=${newType}`);
      fetchEmployees(); // Refresh the list
    } catch (error) {
      console.error("Error changing user type:", error);
    }
  };

  const handleActions = (row) => (
    <>
      <EditOutlined
        className="text-blue-500 cursor-pointer"
        title="Edit"
        onClick={() => updateEmployee(row.id, { ...row, userType: "UpdatedType" })} // Example
      />
      <DeleteOutlined
        className="text-red-500 cursor-pointer"
        title="Delete"
        onClick={() => deleteEmployee(row.id)}
      />
    </>
  );

  const handleAddEmployeeClick = () => {
    setActivePopup('addEmployee');
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  return (
    <>
      <div className='absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200'>
        <SubTopBar icon={<UserOutlined />} name="Employee" secondname="Employees" arrow={<ArrowRightOutlined className='size-3' />} />
      </div>
      <div className='ml-5 absolute left-[15%] top-28 w-[85%]'>
        <div className="left-[15%] top-28 flex gap-5">
          <Buttons_1
            name="Add Employee"
            bgColor="bg-custom-blue"
            icon={<PlusSquareOutlined />}
            onClick={handleAddEmployeeClick}
          />
          <select
            className="border p-2"
            value={userTypeFilter}
            onChange={(e) => setUserTypeFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Staff">Staff</option>
          </select>
        </div>

        {activePopup === 'addEmployee' && (
          <AddEmployeePopup
            onClose={closePopup}
            onAdd={addEmployee} // Pass the add function to the popup
          />
        )}

        <div className="left-[15%] top-40 m-0 w-[95%] h-full bg-cyan-200">
          <div className='flex text-center gap-1 my-4'>
            <UserOutlined className='size-6' />
            <p className="text-base font-average ">Employees List</p>
          </div>
          <hr className="bg-black border-0 h-[3px] my-2" />

          {loading ? (
            <p>Loading...</p>
          ) : (
            <Table headers={headers} rows={rows} actions={handleActions} />
          )}
        </div>
      </div>
    </>
  );
}

export default Employees;
