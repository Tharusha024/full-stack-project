import { ArrowRightOutlined, FileExclamationOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import SubTopBar from '../../TopBar/SubTopBar';

const LeaveReport = () => {
  const [attendanceData, setAttendanceData] = useState([
    { date: "2024/11/01", signIn: "08:00", signOut: "16:00", hours: "8.00" },
    { date: "2024/11/02", signIn: "08:00", signOut: "16:00", hours: "8.00" },
    { date: "2024/11/03", signIn: "08:00", signOut: "16:00", hours: "8.00" },
    { date: "2024/11/04", signIn: "08:00", signOut: "16:00", hours: "8.00" },
    { date: "2024/11/05", signIn: "08:00", signOut: "16:00", hours: "8.00" },
  ]);

  const [employee, setEmployee] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  return (
    <div className='absolute left-[15%] top-16 p-5 w-[85%] h-full bg-custom-blue-4 font-average'>
      {/* Top Navigation Bar */}
      <SubTopBar 
        icon={<FileExclamationOutlined className="text-custom-blue" />} 
        name="Leave" 
        secondname="Leave Report" 
        arrow={<ArrowRightOutlined className="size-3 text-custom-blue" />} 
      />

      {/* Search Section */}
      <div className="bg-custom-blue-2 p-5 rounded-lg shadow-lg mt-5">
        <h2 className="text-lg font-semibold text-gray-800 font-menu">Search Leave Report</h2>
        <div className="flex justify-between mt-4">
          
          {/* Employee Selection */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 font-subtop">Employee:</label>
            <select
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              className="border-b-2 border-custom-blue focus:outline-none text-custom-blue font-average"
            >
              <option value="">Select Employee</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
            </select>
          </div>

          {/* Year Input */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 font-subtop">Year:</label>
            <input
              type="number"
              placeholder="e.g., 2025"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border-b-2 border-custom-blue focus:outline-none text-gray-500 placeholder-gray-400 font-average"
            />
          </div>

          {/* Month Selection */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 font-subtop">Month:</label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="border-b-2 border-custom-blue focus:outline-none text-custom-blue font-average"
            >
              <option value="">Select Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Table Section */}
      <div className='mt-5 bg-white p-5 rounded-lg shadow-lg'>
        <h2 className='text-xl font-semibold text-gray-700 mb-3 font-menu'>Full Attendance</h2>

        <div className="overflow-x-auto">
          <table className='w-full border-collapse border border-gray-300 text-center rounded-lg'>
            <thead className='bg-custom-blue text-white uppercase font-average'>
              <tr>
                <th className='border border-gray-300 p-3'>Date</th>
                <th className='border border-gray-300 p-3'>Sign In</th>
                <th className='border border-gray-300 p-3'>Sign Out</th>
                <th className='border border-gray-300 p-3'>Working Hours</th>
                <th className='border border-gray-300 p-3'>Action</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((entry, index) => (
                <tr key={index} className='bg-custom-blue-2 hover:bg-custom-blue-3 transition duration-200 font-subtop'>
                  <td className='border border-gray-300 p-3'>{entry.date}</td>
                  <td className='border border-gray-300 p-3'>{entry.signIn}</td>
                  <td className='border border-gray-300 p-3'>{entry.signOut}</td>
                  <td className='border border-gray-300 p-3'>{entry.hours}</td>
                  <td className='border border-gray-300 p-3'>
                    <button className='text-custom-blue hover:text-custom-blue-2 transition font-smartforce'>
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-between mt-4">
          <button className="bg-custom-blue text-white px-4 py-2 rounded hover:bg-custom-blue-2 transition font-average">◀ Previous</button>
          <span className="text-gray-600 font-average">Page 1233233</span>
          <button className="bg-custom-blue text-white px-4 py-2 rounded hover:bg-custom-blue-2 transition font-average">Next ▶</button>
        </div>
      </div>
    </div>
  );
};

export default LeaveReport;