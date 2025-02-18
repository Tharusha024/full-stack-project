import React, { useState, useEffect } from 'react';
import {
  ApartmentOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseSquareOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import axios from 'axios';
import SubTopBar from '../../TopBar/SubTopBar';
import ToastSuccess from '../../ToastMessage/ToastSuccess';
import ToastFaild from '../../ToastMessage/ToastFaild';

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
    axios.get('http://localhost:8083/api/department')
      .then(response => {
        setDepartments(response.data);
      })
      .catch(error => {
        console.error('Error fetching department:', error);
      });
  }, []);

  const handleSave = () => {
    if (!departmentName.trim()) {
      ToastFaild({ message: "Fill in Deparment Name" });
      return;
    }

    const data = { name: departmentName.trim() };

    axios.post('http://localhost:8083/api/department', data)
      .then(response => {
        setDepartments(prevDepartments => [...prevDepartments, response.data]);
        setDepartmentName('');
        ToastSuccess({message: "succesfully add new department"})
      })
      .catch(error => {
        console.error('Error saving department:', error);
        ToastFaild({message:"Failed to save department. Please try again."})
      });
  };

  const onEdit = (index) => {
    const department = departments[index];
    setEditDepartmentName(department.name);
    setEditIndex(index);
    setIsEditModalOpen(true);
  };

  const handleUpdate = () => {
    if (!editDepartmentName.trim()) {
      ToastFaild({ message: "Please fill out all fields." });
      return;
    }

    const updatedData = { name: editDepartmentName.trim() };

    axios.put(`http://localhost:8083/api/department/${departments[editIndex].id}`, updatedData)
      .then(response => {
        const updatedDepartments = [...departments];
        updatedDepartments[editIndex] = response.data;
        setDepartments(updatedDepartments);
        setIsEditModalOpen(false);
      })
      .catch(error => {
        console.error('Error updating department:', error);
        ToastFaild({ message: "Failed to update department. Please try again." });
      });
  };

  const onDelete = (id) => {
    axios.delete(`http://localhost:8083/api/department/${id}`)
      .then(() => {
        setDepartments(departments.filter(department => department.id !== id));
        ToastSuccess({ message: `Successfully deleted department` });
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

  const totalPages = Math.ceil(filteredDepartments.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredDepartments.slice(indexOfFirstRow, indexOfLastRow);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

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
              name=""
              bgcolor="bg-custom-green"
              onClick={handleSave}
            />
            <OrganizationSaveButton
              icon={<CloseSquareOutlined />}
              name=""
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
                <th className="border  px-4 py-2 bg-custom-blue">Department Name</th>
                <th className="border  px-4 py-2 bg-custom-blue">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((department) => (
                <tr key={department.id} className="odd:bg-custom-blue-2 even:bg-custom-blue-3">
                  <td className="border  px-4 py-2">{department.name}</td>
                  <td className="border  px-4 py-2 flex items-center justify-center">
                    <div className="flex space-x-2">
                      <button
                        className="bg-custom-blue text-white px-3 py-1 rounded"
                        title="Edit"
                        onClick={() => onEdit(departments.findIndex(d => d.id === department.id))}
                      >
                        <EditOutlined />
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
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
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="bg-custom-blue px-3 py-1 rounded disabled:opacity-50"
            >
              <ArrowLeftOutlined />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-custom-blue px-3 py-1 rounded disabled:opacity-50"
            >
              <ArrowRightOutlined />
            </button>
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
    <button onClick={onClick} className={`w-16 h-8 text-2xl font-average rounded-lg ${bgcolor}`}>
      {icon} {name}
    </button>
  );
}

export default Department;
