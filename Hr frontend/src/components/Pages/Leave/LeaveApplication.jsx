import React, { useState } from 'react';
import SubTopBar from '../../TopBar/SubTopBar';
import { ArrowRightOutlined, FileExclamationOutlined } from '@ant-design/icons';

const LeaveApplication = () => {
  const [leaveData, setLeaveData] = useState([
    {
      employeeName: "Vichaksha Viduranga",
      pin: "100",
      leaveType: "Casual Leave",
      applyDate: "03/01/25",
      startDate: "04/01/25",
      endDate: "05/02/25",
      duration: "32 days",
      details: "Personal Leave",
      reference: "HR-001",
      contact: "1234567890",
      department: "HR",
      status: "Not Approved"
    },
    {
      employeeName: "G.V.Viduranga",
      pin: "100",
      leaveType: "Casual Leave",
      applyDate: "03/11/24",
      startDate: "04/11/24",
      endDate: "05/11/24",
      duration: "1 days",
      details: "Medical Emergency",
      reference: "HR-002",
      contact: "9876543210",
      department: "Finance",
      status: "Not Approved"
    }
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: "",
    pin: "",
    leaveType: "",
    applyDate: "",
    startDate: "",
    endDate: "",
    duration: "",
    details: "",
    reference: "",
    contact: "",
    department: "",
    status: "Pending"
  });

  const handleAddLeaveApplication = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLeaveData([...leaveData, formData]);
    setShowPopup(false);
  };

  return (
    <div className="absolute left-[15%] top-16 p-5 w-[85%] h-full bg-custom-blue-2">
      <SubTopBar
        icon={<FileExclamationOutlined />}
        name="Leave"
        secondname="Leave Application"
        arrow={<ArrowRightOutlined className="size-3" />}
      />

      <div className="flex justify-between mt-5">
        <button 
          onClick={handleAddLeaveApplication} 
          className="bg-custom-blue text-white px-4 py-2 rounded hover:bg-blue-700 font-menu"
        >
          ➕ Add Leave Application
        </button>
      </div>

      <div className="mt-5 bg-white p-5 rounded-lg shadow-lg">
        <table className="w-full border-collapse border border-gray-300 text-center font-average">
          <thead className="bg-custom-blue text-white">
            <tr>
              <th className="border border-gray-300 p-2">Employee Name</th>
              <th className="border border-gray-300 p-2">PIN</th>
              <th className="border border-gray-300 p-2">Leave Type</th>
              <th className="border border-gray-300 p-2">Apply Date</th>
              <th className="border border-gray-300 p-2">Start Date</th>
              <th className="border border-gray-300 p-2">End Date</th>
              <th className="border border-gray-300 p-2">Duration</th>
              <th className="border border-gray-300 p-2">Details</th>
              <th className="border border-gray-300 p-2">Reference</th>
              <th className="border border-gray-300 p-2">Contact</th>
              <th className="border border-gray-300 p-2">Department</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.map((leave, index) => (
              <tr key={index} className="bg-custom-blue-3 hover:bg-gray-200">
                <td className="border border-gray-300 p-2">{leave.employeeName}</td>
                <td className="border border-gray-300 p-2">{leave.pin}</td>
                <td className="border border-gray-300 p-2">{leave.leaveType}</td>
                <td className="border border-gray-300 p-2">{leave.applyDate}</td>
                <td className="border border-gray-300 p-2">{leave.startDate}</td>
                <td className="border border-gray-300 p-2">{leave.endDate}</td>
                <td className="border border-gray-300 p-2">{leave.duration}</td>
                <td className="border border-gray-300 p-2">{leave.details}</td>
                <td className="border border-gray-300 p-2">{leave.reference}</td>
                <td className="border border-gray-300 p-2">{leave.contact}</td>
                <td className="border border-gray-300 p-2">{leave.department}</td>
                <td className="border border-gray-300 p-2">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3 font-subtop">
            <h2 className="text-lg font-semibold mb-4 text-custom-blue">Add Leave Application</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" placeholder="Employee Name" className="w-full p-2 border rounded" required onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })} />
              <input type="text" placeholder="PIN" className="w-full p-2 border rounded" required onChange={(e) => setFormData({ ...formData, pin: e.target.value })} />
              <select className="w-full p-2 border rounded" required onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}>
                <option value="">Select Leave Type</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Annual Leave">Annual Leave</option>
              </select>
              <select className="w-full p-2 border rounded" required onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              <input type="text" placeholder="Duration" className="w-full p-2 border rounded" required onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
              <button type="submit" className="bg-custom-green text-white px-4 py-2 rounded hover:bg-green-700 font-average">
                Submit
              </button>
              <button type="button" onClick={handleClosePopup} className="bg-custom-red text-white px-4 py-2 rounded hover:bg-red-700 ml-2 font-average">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveApplication;