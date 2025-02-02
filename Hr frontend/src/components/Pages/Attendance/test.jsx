import React, { useState } from 'react';
import SubTopBar from '../../TopBar/SubTopBar';
import { ArrowRightOutlined, CalculatorOutlined, UserOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function AttendanceReport() {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    employeeId: '',
  });
  const [attendanceData] = useState([
    { employeeId: '1', date: '2024-01-01', checkIn: '09:00', checkOut: '17:00' },
    { employeeId: '2', date: '2024-01-02', checkIn: '09:05', checkOut: '17:10' },
    { employeeId: '1', date: '2024-01-03', checkIn: '09:00', checkOut: '17:05' },
    { employeeId: '2', date: '2024-01-04', checkIn: '09:00', checkOut: '17:00' },
    // Add more data as needed
  ]);
  const [filteredData, setFilteredData] = useState([]);

  // Function to calculate duty time from check-in and check-out times
  const calculateDutyTime = (checkIn, checkOut) => {
    const checkInDate = new Date(`2024-01-01T${checkIn}`);
    const checkOutDate = new Date(`2024-01-01T${checkOut}`);
    const diff = checkOutDate - checkInDate;

    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours} hours ${minutes} minutes`;
  };

  // Handle input changes and update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Filter data based on employeeId, startDate, and endDate
  const handleSubmit = (e) => {
    e.preventDefault();

    const { employeeId, startDate, endDate } = formData;

    // Validate the date range
    if (new Date(startDate) >= new Date(endDate)) {
      alert('Start date must be before end date.');
      return;
    }

    // Filter data based on the input fields
    const filtered = attendanceData.filter((record) => {
      const recordDate = new Date(record.date);
      const isEmployeeMatch = employeeId ? record.employeeId === employeeId : true;
      const isDateInRange =
        new Date(startDate) <= recordDate && recordDate <= new Date(endDate);

      return isEmployeeMatch && isDateInRange;
    });

    setFilteredData(filtered);
  };

  // Function to generate and download the PDF report
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Attendance Report', 105, 20, { align: 'center' });

    const { startDate, endDate, employeeId } = formData;
    doc.setFontSize(12);
    doc.text(`Employee ID: ${employeeId}`, 10, 40);
    doc.text(`Start Date: ${startDate}`, 10, 50);
    doc.text(`End Date: ${endDate}`, 10, 60);

    const tableColumn = ['Date', 'Check In', 'Check Out', 'Duty Time'];
    const tableRows = filteredData.map((record) => {
      const dutyTime = calculateDutyTime(record.checkIn, record.checkOut);
      return [record.date, record.checkIn, record.checkOut, dutyTime];
    });

    doc.autoTable({
      startY: 70,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save(`Attendance_Report_${employeeId}.pdf`);
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
                <label className="font-average text-lg">Employee ID :</label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  className="bg-transparent border-b-2 border-custom-blue focus:outline-none focus:border-blue-500 ml-4 font-average text-lg"
                />
              </div>
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
            </div>
            <button
              type="submit"
              className="w-40 h-9 bg-custom-blue text-xl font-average text-white"
            >
              Fetch Data
            </button>
          </form>
        </div>

        {/* Display Attendance Data in Table */}
        {filteredData.length > 0 && (
          <div className="mt-5 bg-white p-4">
            <p className="text-left text-lg font-subtop font-bold mb-4">Attendance Records</p>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 p-2">Date</th>
                  <th className="border-b-2 p-2">Check In</th>
                  <th className="border-b-2 p-2">Check Out</th>
                  <th className="border-b-2 p-2">Duty Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((record, index) => {
                  const dutyTime = calculateDutyTime(record.checkIn, record.checkOut);
                  return (
                    <tr key={index}>
                      <td className="border-b p-2">{record.date}</td>
                      <td className="border-b p-2">{record.checkIn}</td>
                      <td className="border-b p-2">{record.checkOut}</td>
                      <td className="border-b p-2">{dutyTime}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <button
              onClick={handleDownloadPDF}
              className="mt-5 w-40 h-9 bg-custom-blue text-xl font-average text-white"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default AttendanceReport;