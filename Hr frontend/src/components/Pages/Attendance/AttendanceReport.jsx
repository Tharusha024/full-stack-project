import React, { useState } from 'react';
import SubTopBar from '../../TopBar/SubTopBar';
import { ArrowRightOutlined, CalculatorOutlined, UserOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function AttendanceReport() {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    employeeName: '',
  });

 
  const attendanceData = [
    { date: '2024-01-01', signIn: '09:00', signOut: '17:00' },
    { date: '2024-01-02', signIn: '09:05', signOut: '17:10' },
    { date: '2024-01-03', signIn: '09:00', signOut: '17:05' },

  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      alert('Start date must be before end date.');
      return;
    }

    const doc = new jsPDF();


    doc.setFontSize(20);
    doc.text('Attendance Report', 105, 20, { align: 'center' });

   
    doc.setFontSize(12);
    doc.text(`Employee Name: ${formData.employeeName}`, 10, 40);
    doc.text(`Start Date: ${formData.startDate}`, 10, 50);
    doc.text(`End Date: ${formData.endDate}`, 10, 60);

 
    const tableColumn = ['Date', 'Sign In', 'Sign Out'];
    const tableRows = [];

   
    attendanceData.forEach((record) => {
      const rowData = [record.date, record.signIn, record.signOut];
      tableRows.push(rowData);
    });

    doc.autoTable({
      startY: 70,
      head: [tableColumn],
      body: tableRows,
    });

 
    doc.save(`${formData.employeeName}_Attendance_Report.pdf`);
  };

  return (
    <>
      <div className="absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200">
        <SubTopBar
          icon={<CalculatorOutlined />}
          name="Attendance"
          secondname="Attendance Report"
          arrow={<ArrowRightOutlined className="size-3" />}
        />
      </div>
      <div className="text-center ml-5 absolute left-[15%] top-28 w-[85%] gap-1 pr-9">
        <div className="flex">
          <UserOutlined className="size-6" />
          <p className="text-base font-average">Attendance Report</p>
        </div>
        <hr className="bg-black border-0 h-[3px] my-2" />
        <div className="mt-5 bg-white p-4 text-left">
          <p className="text-left text-lg font-subtop font-bold mb-4">Create Attendance Report</p>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mb-5">
              <div>
                <label className="font-average text-lg">Start Date :</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="bg-transparent border-b-2 border-custom-blue focus:outline-none focus:border-blue-500 ml-4 font-average text-lg"
                />
              </div>
              <div>
                <label className="font-average text-lg">End Date :</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="bg-transparent border-b-2 border-custom-blue focus:outline-none focus:border-blue-500 ml-4 font-average text-lg"
                />
              </div>
              <div>
                <label className="font-average text-lg">Employee Name :</label>
                <input
                  type="text"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleChange}
                  placeholder="Enter Employee Name"
                  className="placeholder-black bg-transparent border-b-2 border-custom-blue focus:outline-none focus:border-blue-500 ml-4 font-average text-lg"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-40 h-9 bg-custom-blue text-xl font-average text-white"
            >
              Create Report
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AttendanceReport;
