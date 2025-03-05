import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, FileExclamationOutlined, UserOutlined } from '@ant-design/icons';
import SubTopBar from '../../TopBar/SubTopBar';

const LeaveApplication = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [leavesPerPage] = useState(5);
  const [isEditing, setIsEditing] = useState(false);
  const [editLeave, setEditLeave] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8086/api/leave')
      .then(response => {
        const pendingLeaves = response.data.filter(leave => leave.status === 'Pending');
        setLeaveApplications(pendingLeaves);
        setFilteredLeaves(pendingLeaves);
      })
      .catch(error => console.error('Error fetching leave applications:', error));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredLeaves(leaveApplications.filter(leave => 
      leave.employeeName.toLowerCase().includes(query) ||
      leave.leaveType.toLowerCase().includes(query)
    ));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this leave application?')) {
      axios.delete(`http://localhost:8086/api/leave/delete/${id}`)
        .then(() => {
          const updatedLeaves = leaveApplications.filter(leave => leave.id !== id);
          setLeaveApplications(updatedLeaves);
          setFilteredLeaves(updatedLeaves);
        })
        .catch(error => console.error('Error deleting leave application:', error));
    }
  };

  const handleEdit = (leave) => {
    setEditLeave(leave);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(editLeave.startDate) >= new Date(editLeave.endDate)) {
      alert("Start date must be before end date.");
      return;
    }
    try {
      await axios.put(`http://localhost:8086/api/leave/update/${editLeave.id}`, editLeave);
      const response = await axios.get("http://localhost:8086/api/leave");
      const pendingLeaves = response.data.filter(leave => leave.status === 'Pending');
      setLeaveApplications(pendingLeaves);
      setFilteredLeaves(pendingLeaves);
      alert("Leave application updated successfully!");
      setIsEditing(false);
      setEditLeave(null);
    } catch (error) {
      console.error("Error updating leave application:", error);
      alert("Failed to update leave application. Please try again.");
    }
  };

  const totalLeaves = filteredLeaves.length;
  const totalPages = Math.ceil(totalLeaves / leavesPerPage);
  const currentLeaves = filteredLeaves.slice((currentPage - 1) * leavesPerPage, currentPage * leavesPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200">
        <SubTopBar icon={<UserOutlined />} name="Leave Application" secondname="Leave Requests" arrow={<ArrowRightOutlined className="size-3" />} />
      </div>
      <div className="ml-5 absolute left-[15%] top-28 w-[85%]">
        <div className="left-[15%] top-40 m-0 w-[95%] h-full bg-cyan-200">
          <div className="flex text-center gap-1 my-4">
            <FileExclamationOutlined className="size-6" />
            <p className="text-base font-average">Leave Application List</p>
          </div>
          <hr className="bg-black border-0 h-[3px] my-2" />
          <div className="my-4 flex items-right justify-end">
            <input type="text" placeholder="Search by Employee or Leave Type" value={searchQuery} onChange={handleSearch} className="px-4 py-2 border border-gray-300 rounded w-[40%] my-4" />
          </div>
          <table className="w-full mt-4 border-collapse border border-gray-300 table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-black px-4 py-2 bg-custom-blue w-1/5">Employee Name</th>
                <th className="border border-black px-4 py-2 bg-custom-blue w-1/12">Pin</th>
                <th className="border border-black px-4 py-2 bg-custom-blue w-1/6">Leave Type</th>
                <th className="border border-black px-4 py-2 bg-custom-blue w-1/6">Apply Date</th>
                <th className="border border-black px-4 py-2 bg-custom-blue w-1/6">Start Date</th>
                <th className="border border-black px-4 py-2 bg-custom-blue w-1/6">End Date</th>
                <th className="border border-black px-4 py-2 bg-custom-blue w-1/12">Duration</th>
                <th className="border border-black px-4 py-2 bg-custom-blue w-1/12">Status</th>
                <th className="border border-black px-4 py-2 bg-custom-blue w-1/4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentLeaves.map(leave => (
                <tr key={leave.id} className="odd:bg-custom-blue-2 even:bg-custom-blue-3 hover:bg-gray-100">
                  <td className="py-2 px-4 border border-black w-1/5">{leave.employeeName}</td>
                  <td className="py-2 px-4 border border-black w-1/12">{leave.pin}</td>
                  <td className="py-2 px-4 border border-black w-1/6">{leave.leaveType}</td>
                  <td className="py-2 px-4 border border-black w-1/6">{leave.applyDate}</td>
                  <td className="py-2 px-4 border border-black w-1/6">{leave.startDate}</td>
                  <td className="py-2 px-4 border border-black w-1/6">{leave.endDate}</td>
                  <td className="py-2 px-4 border border-black w-1/12">{leave.duration}</td>
                  <td className="py-2 px-4 border border-black w-1/12">{leave.status}</td>
                  <td className="py-2 px-4 border border-black w-1/4">
                    <div className="flex space-x-2 justify-center">
                      <button 
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        title='Edit' 
                        onClick={() => handleEdit(leave)}><EditOutlined /></button>
                      <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600" 
                        title='Approved' 
                        onClick={() => handleStatusUpdate(leave.id, "Approved")}>
                        <CheckCircleOutlined />
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        title='Reject' 
                        onClick={() => handleStatusUpdate(leave.id, "Rejected")}>
                        <CloseCircleOutlined />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
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
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-cyan-200 p-8 rounded-lg max-w-lg w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Leave Application</h2>
            <label className="block text-sm font-medium mb-2">Employee Name</label>
            <input type="text" value={editLeave?.employeeName || ''} onChange={(e) => setEditLeave({ ...editLeave, employeeName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4" readOnly />
            <label className="block text-sm font-medium mb-2">Leave Type</label>
            <select
              value={editLeave?.leaveType || ''}
              onChange={(e) => setEditLeave({ ...editLeave, leaveType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            >
              <option value="">Select Leave Type</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Unpaid Leave">Unpaid Leave</option>
              <option value="Compensatory Leave">Compensatory Leave</option>
              <option value="Study Leave">Study Leave</option>
              <option value="Emergency Leave">Emergency Leave</option>
              <option value="Bereavement Leave">Bereavement Leave</option>
              <option value="Special Leave">Special Leave</option>
            </select>
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <input 
              type="date" value={editLeave?.startDate || ''} 
              onChange={(e) => setEditLeave({ ...editLeave, startDate: e.target.value })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"/>
            <label className="block text-sm font-medium mb-2">End Date</label>
            <input 
              type="date" value={editLeave?.endDate || ''} 
              onChange={(e) => setEditLeave({ ...editLeave, endDate: e.target.value })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"/>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeaveApplication;
