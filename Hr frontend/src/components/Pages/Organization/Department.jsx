import React, { useState, useEffect } from 'react';
import {
  ApartmentOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseSquareOutlined
} from '@ant-design/icons';
import axios from 'axios';
import SubTopBar from '../../TopBar/SubTopBar';

function Department() {
  const [departmentName, setDepartmentName] = useState('');
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editDepartmentName, setEditDepartmentName] = useState('');
  const rowsPerPage = 5;

  useEffect(() => {
    // Fetch departments from the backend
    axios.get('http://localhost:8083/api/department')
      .then(response => {
        setDepartments(response.data);
      })
      .catch(error => {
        console.error('Error fetching department:', error);
      });
  }, []);

  const handleSave = () => {
    if (!departmentName) {
      alert('Please fill out all fields.');
      return;
    }

    const data = {
      name: departmentName.trim()  // Send name instead of departmentName
    };

    // Send POST request to add new department
    axios.post('http://localhost:8083/api/department', data)
      .then(response => {
        console.log('Department saved:', response.data);
        setDepartments(prevDepartments => [...prevDepartments, response.data]);
        setDepartmentName('');  // Clear the input field after saving
      })
      .catch(error => {
        console.error('Error saving department:', error);
        alert('Failed to save department. Please try again.');
      });
  };

  const onEdit = (index) => {
    const department = departments[index];
    setEditDepartmentName(department.name);
    setEditIndex(index);
    setIsEditModalOpen(true);
  };

  const handleUpdate = () => {
    if (!editDepartmentName) {
      alert('Please fill out all fields.');
      return;
    }

    const updatedData = {
      name: editDepartmentName.trim()  // Send name instead of departmentName
    };

    // Send PUT request to update department
    axios.put(`http://localhost:8083/api/department/${departments[editIndex].id}`, updatedData)
      .then(response => {
        const updatedDepartments = [...departments];
        updatedDepartments[editIndex] = response.data;
        setDepartments(updatedDepartments);
        setIsEditModalOpen(false);
      })
      .catch(error => {
        console.error('Error updating department:', error);
        alert('Failed to update department. Please try again.');
      });
  };

  const onDelete = (id) => {
    // Send DELETE request to remove department
    axios.delete(`http://localhost:8083/api/department/${id}`)
      .then(() => {
        setDepartments(departments.filter(department => department.id !== id));
      })
      .catch(error => {
        console.error('Error deleting department:', error);
      });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredDepartments.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200">
        <SubTopBar icon={<ApartmentOutlined />} name="Organization" secondname="Department" arrow={<ArrowRightOutlined className='size-3' />} />
      </div>
      <div className="px-5 absolute left-[15%] top-28 w-[85%] flex justify-between">
        <div className="w-[520px] bg-white px-3 py-3 h-[300px]">
          <p className="text-lg font-average font-bold">Add Department</p>
          <hr className="bg-blue-600 border-0 h-[2px] my-2" />
          <p className="text-base font-subtop">Department Name</p>
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            placeholder="Enter Department Name"
            className="w-[490px] h-[35px] text-lg bg-custom-blue-2 rounded-md my-4"
          />
          <div className="flex gap-2">
            <OrganizationSaveButton
              icon={<SaveOutlined />}
              name="Save"
              bgcolor="bg-custom-green"
              onClick={handleSave}
            />
            <OrganizationSaveButton
              icon={<CloseSquareOutlined />}
              name="Close"
              bgcolor="bg-custom-red"
              onClick={() => setDepartmentName('')}
            />
          </div>
        </div>
        <div className="w-[700px] bg-white px-3 py-3">
          <p className="text-lg font-average font-bold">Department List</p>
          <hr className="bg-blue-600 border-0 h-[2px] my-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by Department"
            className="w-full px-4 py-2 mb-4 border rounded-md"
          />
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Department Name</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((department) => (
                <tr key={department.id}>
                  <td className="border border-gray-300 px-4 py-2">{department.name}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-500"
                        title="Edit"
                        onClick={() => onEdit(departments.findIndex(d => d.id === department.id))}
                      >
                        <EditOutlined />
                      </button>
                      <button
                        className="text-red-500"
                        title="Delete"
                        onClick={() => onDelete(department.id)}
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(filteredDepartments.length / rowsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 mx-1 border rounded-md ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-lg font-bold mb-4">Edit Department</h2>
            <p className="text-base font-subtop">Department Name</p>
            <input
              type="text"
              value={editDepartmentName}
              onChange={(e) => setEditDepartmentName(e.target.value)}
              className="w-full h-[35px] text-lg bg-custom-blue-2 rounded-md my-2"
            />
            <div className="flex gap-2 mt-4">
              <OrganizationSaveButton
                icon={<SaveOutlined />}
                name="Update"
                bgcolor="bg-custom-green"
                onClick={handleUpdate}
              />
              <OrganizationSaveButton
                icon={<CloseSquareOutlined />}
                name="Close"
                bgcolor="bg-custom-red"
                onClick={() => setIsEditModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function OrganizationSaveButton({ name, icon, bgcolor, onClick }) {
  return (
    <div>
      <button onClick={onClick} className={`w-32 h-8 text-2xl font-average rounded-lg ${bgcolor}`}>
        {icon} {name}
      </button>
    </div>
  );
}

export default Department;
