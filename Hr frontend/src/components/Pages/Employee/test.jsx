import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowRightOutlined, DeleteOutlined, EditOutlined, PlusSquareOutlined, UserOutlined } from '@ant-design/icons';
import SubTopBar from '../../TopBar/SubTopBar';
import AddEmployeePopup from './AddEmployeePopup';
import Buttons_1 from '../../Buttons/Buttons_1';

const Employees = () => {
  const headers = ["Employee Name", "Pin", "Email"];
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePopup, setActivePopup] = useState(null);
  const [userTypeFilter, setUserTypeFilter] = useState("active");
  const [editEmployeeData, setEditEmployeeData] = useState(null);

 
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(http://localhost:8082/api/employee/userType/${userTypeFilter});
      const modifiedData = response.data.map(({ id, ...rest }) => rest);
      setRows(modifiedData);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [userTypeFilter]);


  const addEmployee = async (employee) => {
    try {
      await axios.post('http://localhost:8082/api/employee', employee);
      fetchEmployees(); 
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };


  const updateEmployee = async (id, updatedEmployee) => {
    try {
      await axios.put(http://localhost:8082/api/employee/update/${id}, updatedEmployee);
      fetchEmployees(); // Refresh the list after update
      setActivePopup(null); // Close the popup after update
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  // Delete an employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(http://localhost:8082/api/employee/delete/${id});
      fetchEmployees(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Handle actions like edit and delete
  const handleActions = (row) => (
    <>
      <button className="bg-custom-blue text-white px-3 py-1 rounded" onClick={() => openEditPopup(row)}>
        <EditOutlined />
      </button>
      <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => deleteEmployee(row.id)}>
        <DeleteOutlined />
      </button>
    </>
  );

  
  const handleAddEmployeeClick = () => setActivePopup('addEmployee');


  const closePopup = () => setActivePopup(null);

  // Open the Edit Employee popup
  const openEditPopup = (employee) => {
    setEditEmployeeData(employee);
    setActivePopup('editEmployee');
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

        {activePopup === 'editEmployee' && (
          <EditEmployeePopup 
            employeeData={editEmployeeData} 
            onClose={closePopup} 
            onUpdate={updateEmployee} 
          />
        )}

        <div className="left-[15%] top-40 m-0 w-[95%] h-full bg-cyan-200">
          <div className="flex text-center gap-1 my-4">
            <UserOutlined className="size-6" />
            <p className="text-base font-average">Employees List</p>
          </div>
          <hr className="bg-black border-0 h-[3px] my-2" />

          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="border  px-4 py-2 bg-custom-blue">
                  {headers.map((header, index) => (
                    <th key={index} className="px-4 py-2 border-b">{header}</th>
                  ))}
                  <th className="px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} className="odd:bg-custom-blue-2 even:bg-custom-blue-3">
                    <td className="px-4 py-2 border">{row.name}</td>
                    <td className="px-4 py-2 border">{row.pin}</td>
                    <td className="px-4 py-2 border">{row.email}</td>
                    <td className="border  px-4 py-2 flex items-center justify-center gap-3">{handleActions(row)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

// EditEmployeePopup Component
const EditEmployeePopup = ({ employeeData, onClose, onUpdate }) => {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('active'); // Default to 'active'

  useEffect(() => {
    if (employeeData) {
      setName(employeeData.name);
      setPin(employeeData.pin);
      setEmail(employeeData.email);
      setUserType(employeeData.userType || 'active');
    }
  }, [employeeData]);

  const handleUpdate = () => {
    if (name && pin && email) {
      const updatedEmployee = { name, pin, email, userType };
      onUpdate(employeeData.id, updatedEmployee); // Pass updated data to parent
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg max-w-lg w-full shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
        
        <label className="block text-sm font-medium mb-2">Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
        
        <label className="block text-sm font-medium mb-2">Pin</label>
        <input 
          type="text" 
          value={pin} 
          onChange={(e) => setPin(e.target.value)} 
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block text-sm font-medium mb-2">Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block text-sm font-medium mb-2">User Type</label>
        <select 
          value={userType} 
          onChange={(e) => setUserType(e.target.value)} 
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Employees;
