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

function Designation() {
  const [designationName, setDesignationName] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [designations, setDesignations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editDesignationName, setEditDesignationName] = useState('');
  const [editBasicSalary, setEditBasicSalary] = useState('');
  const rowsPerPage = 5;

  useEffect(() => {
    axios.get('http://localhost:8083/api/designation')
      .then(response => {
        setDesignations(response.data);
      })
      .catch(error => {
        console.error('Error fetching designations:', error);
      });
  }, []);

  const handleSave = () => {
    if (!designationName || !basicSalary) {
      alert('Please fill out all fields.');
      return;
    }

    const data = {
      designationName: designationName.trim(),
      basicSalary: parseFloat(basicSalary)
    };

    axios.post('http://localhost:8083/api/designation', data)
      .then(response => {
        setDesignations([...designations, response.data]);
        setDesignationName('');
        setBasicSalary('');
      })
      .catch(error => {
        console.error('Error saving designation:', error);
        alert('Failed to save designation. Please try again.');
      });
  };

  const onEdit = (index) => {
    const designation = designations[index];
    setEditDesignationName(designation.designationName);
    setEditBasicSalary(designation.basicSalary);
    setEditIndex(index);
    setIsEditModalOpen(true);
  };

  const handleUpdate = () => {
    if (!editDesignationName || !editBasicSalary) {
      alert('Please fill out all fields.');
      return;
    }

    const updatedData = {
      designationName: editDesignationName.trim(),
      basicSalary: parseFloat(editBasicSalary)
    };

    axios.put(`http://localhost:8083/api/designation/${designations[editIndex].id}`, updatedData)
      .then(response => {
        const updatedDesignations = [...designations];
        updatedDesignations[editIndex] = response.data;
        setDesignations(updatedDesignations);
        setIsEditModalOpen(false);
      })
      .catch(error => {
        console.error('Error updating designation:', error);
        alert('Failed to update designation. Please try again.');
      });
  };

  const onDelete = (index) => {
    axios.delete(`http://localhost:8083/api/designation/${designations[index].id}`)
      .then(() => {
        setDesignations(designations.filter((_, i) => i !== index));
      })
      .catch(error => {
        console.error('Error deleting designation:', error);
      });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredDesignations = designations.filter(designation =>
    designation.designationName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredDesignations.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredDesignations.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <>
      <div className="absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200">
        <SubTopBar icon={<ApartmentOutlined />} name="Organization" secondname="Designation" arrow={<ArrowRightOutlined className='size-3'/>}/>  
       </div>
        <div className="px-5 absolute left-[15%] top-28 w-[85%] flex justify-between">
          <div className="w-[520px] bg-white px-3 py-3 h-[300px]">
            <p className="text-lg font-average font-bold">Add Designation</p>
            <hr className="bg-blue-600 border-0 h-[2px] my-2" />
            <p className="text-base font-subtop">Designation Name</p>
            <input
              type="text"
              value={designationName}
              onChange={(e) => setDesignationName(e.target.value)}
              placeholder="Enter Designation Name"
              className="w-[490px] h-[35px] text-lg bg-custom-blue-2 rounded-md my-4"
            />
            <p className="text-base font-subtop">Basic Salary</p>
            <input
              type="number"
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              placeholder="Enter Basic Salary"
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
                onClick={() => {
                  setDesignationName('');
                  setBasicSalary('');
                }}
              />
            </div>
          </div>
          <div className="w-[700px] bg-white px-3 py-3">
            <p className="text-lg font-average font-bold">Designation List</p>
            <hr className="bg-blue-600 border-0 h-[2px] my-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by Designation"
              className="w-full px-4 py-2 mb-4 border rounded-md"
            />
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border  px-4 py-2 bg-custom-blue">Designation Name</th>
                  <th className="border  px-4 py-2 bg-custom-blue">Basic Salary</th>
                  <th className="border  px-4 py-2 bg-custom-blue">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((designation, index) => (
                  <tr key={index} className="odd:bg-custom-blue-2 even:bg-custom-blue-3">
                    <td className="border border-gray-300 px-4 py-2">{designation.designationName}</td>
                    <td className="border border-gray-300 px-4 py-2">{designation.basicSalary}</td>
                    <td className="border  px-4 py-2 flex items-center justify-center">
                      <div className="flex space-x-2">
                        <button
                          className="bg-custom-blue text-white px-3 py-1 rounded"
                          title="Edit"
                          onClick={() => onEdit(index)}
                        >
                          <EditOutlined />
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded"
                          title="Delete"
                          onClick={() => onDelete(index)}
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
            <h2 className="text-lg font-bold mb-4">Edit Designation</h2>
            <p className="text-base font-subtop">Designation Name</p>
            <input
              type="text"
              value={editDesignationName}
              onChange={(e) => setEditDesignationName(e.target.value)}
              className="w-full h-[35px] text-lg bg-custom-blue-2 rounded-md my-2"
            />
            <p className="text-base font-subtop">Basic Salary</p>
            <input
              type="number"
              value={editBasicSalary}
              onChange={(e) => setEditBasicSalary(e.target.value)}
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

export default Designation;
