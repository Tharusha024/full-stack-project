import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeftOutlined, ArrowRightOutlined, DeleteOutlined, EditOutlined, PlusSquareOutlined, UserOutlined } from '@ant-design/icons';
import SubTopBar from '../../TopBar/SubTopBar';
import Buttons_1 from '../../Buttons/Buttons_1';
import AddDisciplinaryPopup from './AddDisciplinary';

const Disciplinary = () => {
  const [disciplinaryRecords, setDisciplinaryRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const [isEditing, setIsEditing] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/employeeDisciplinary')
      .then((response) => {
        setDisciplinaryRecords(response.data);
        setFilteredRecords(response.data);
      })
      .catch((error) => {
        console.error('Error fetching disciplinary records:', error);
      });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRecords(
      disciplinaryRecords.filter(
        (record) =>
          record.name.toLowerCase().includes(query) ||
          record.description.toLowerCase().includes(query)
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      axios
        .delete(`http://localhost:8082/api/employeeDisciplinary/delete/${id}`)
        .then(() => {
          const updatedRecords = disciplinaryRecords.filter((record) => record.id !== id);
          setDisciplinaryRecords(updatedRecords);
          setFilteredRecords(updatedRecords);
        })
        .catch((error) => {
          console.error('Error deleting record:', error);
        });
    }
  };

  const addDisciplinaryRecord = async (record) => {
    try {
      await axios.post('http://localhost:8082/api/employeeDisciplinary', record);
      setDisciplinaryRecords([...disciplinaryRecords, record]);
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  const handleEdit = (id) => {
    const record = disciplinaryRecords.find((record) => record.id === id);
    setEditRecord(record);
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editRecord) {
      axios
        .put(`http://localhost:8082/api/employeeDisciplinary/update/${editRecord.id}`, editRecord)
        .then((response) => {
          setDisciplinaryRecords(
            disciplinaryRecords.map((record) =>
              record.id === response.data.id ? response.data : record
            )
          );
          setIsEditing(false);
          setEditRecord(null);
        })
        .catch((error) => console.error('Error updating record:', error));
    }
  };

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
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

  const currentRecords = filteredRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );
  const handleAddRecordClick = () => setActivePopup('addRecord');
  const closePopup = () => setActivePopup(null);

  return (
    <>
      <div className="absolute left-[15%] top-16 w-[85%] h-full bg-cyan-200">
        <SubTopBar icon={<UserOutlined />} name="Employee" secondname="Disciplinary" arrow={<ArrowRightOutlined className="size-3" />} />
      </div>
      <div className="ml-5 absolute left-[15%] top-28 w-[85%]">
        <div className="flex gap-5">
          <Buttons_1 name="Add Disciplinary" bgColor="bg-custom-blue" icon={<PlusSquareOutlined />} onClick={handleAddRecordClick} />
        </div>
        {activePopup === 'addRecord' && <AddDisciplinaryPopup onClose={closePopup} onAdd={addDisciplinaryRecord} />}

        {/* Edit Form Modal */}
        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg max-w-lg w-full shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Disciplinary Record</h2>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={editRecord?.name || ''}
                onChange={(e) => setEditRecord((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              />
              <label className="block text-sm font-medium mb-2">Pin</label>
              <input
                type="text"
                value={editRecord?.pin || ''}
                onChange={(e) => setEditRecord((prev) => ({ ...prev, pin: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              />
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={editRecord?.title || ''}
                onChange={(e) => setEditRecord((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              />
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={editRecord?.description || ''}
                onChange={(e) => setEditRecord((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              />
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={editRecord?.status || ''}
                onChange={(e) => setEditRecord((prev) => ({ ...prev, status: e.target.value }))}
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

        <div className="left-[15%] top-40 m-0 w-[95%] h-full bg-cyan-200">
          <div className="flex text-center gap-1 my-4">
            <UserOutlined className="size-6" />
            <p className="text-base font-average">Disciplinary List</p>
          </div>
          <hr className="bg-black border-0 h-[3px] my-2" />
          <div className="mt-4 flex justify-end">
            <input type="text" placeholder="Search by Name or Description" value={searchQuery} onChange={handleSearch} className="px-4 py-2 border border-gray-300 rounded w-[40%]" />
          </div>

          <table className="w-full mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-black px-4 py-2 bg-custom-blue w-1/6">Name</th>
                <th className="border border-black px-4 py-2 bg-custom-blue w-1/12">Pin</th>
                <th className="border border-black px-4 py-2 bg-custom-blue w-1/6">Title</th>
                <th className="border border-black px-4 py-2 bg-custom-blue w-1/3">Description</th>
                <th className="border border-black px-4 py-2 bg-custom-blue w-1/7">Status</th>
                <th className="border border-black px-4 py-2 bg-custom-blue w-1/10">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record) => (
                <tr key={record.id} className="odd:bg-custom-blue-2 even:bg-custom-blue-3 hover:bg-gray-100">
                  <td className="border border-black px-4 py-2 w-1/6">{record.name}</td>
                  <td className="border border-black px-4 py-2 w-1/12">{record.pin}</td>
                  <td className="border border-black px-4 py-2 w-1/6">{record.title}</td>
                  <td className="border border-black px-4 py-2 w-1/3">{record.description}</td>
                  <td className="border border-black px-4 py-2 w-1/7">{record.status}</td>
                  <td className="border-b border-r border-black px-4 py-2 flex items-center justify-center space-x-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(record.id)}><EditOutlined /></button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(record.id)}><DeleteOutlined /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-blue-500 px-3 py-1 rounded"> <ArrowLeftOutlined /> </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-blue-500 px-3 py-1 rounded"> <ArrowRightOutlined /> </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Disciplinary;
