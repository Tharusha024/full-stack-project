import React, { useState, useEffect } from "react";
import SubTopBar from '../../TopBar/SubTopBar';
import { ArrowLeftOutlined, ArrowRightOutlined, CalculatorOutlined, UserOutlined } from '@ant-design/icons';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const AttendanceReport = () => {
  const [pin, setPin] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [error, setError] = useState("");
  const [employees, setEmployees] = useState([]); // State to store employee list

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;  // Display 10 records per page

  const months = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", 
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  // Fetch employee list on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8083/api/employee");
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        setError(`Error fetching employees: ${response.status}`);
      }
    } catch (error) {
      setError("Fetch error: " + error.message);
    }
  };

  // Fetch employee details when PIN changes
  useEffect(() => {
    if (pin) {
      fetchEmployeeDetails();
    }
  }, [pin]);

  const fetchEmployeeDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8083/api/employee/pin/${pin}`);
      if (response.ok) {
        const data = await response.json();
        setEmployeeDetails(data);
      } else {
        setError(`Error fetching employee details: ${response.status}`);
      }
    } catch (error) {
      setError("Fetch error: " + error.message);
    }
  };

  const handleSearch = async () => {
    if (!pin || !year || !month) {
      setError("Please fill in all fields.");
      return;
    }

    setError(""); 
    setCurrentPage(1); // Reset to the first page on new search

    try {
      const response = await fetch(
        `http://localhost:8085/api/attendance/employee-pin/${pin}/month/${month.toLowerCase()}/year/${year}`
      );
      if (response.ok) {
        const data = await response.json();
        setAttendanceData(data);
      } else {
        setError(`Error fetching data: ${response.status}`);
      }
    } catch (error) {
      setError("Fetch error: " + error.message);
    }
  };

  const formatTime = (timeString) => {
    const [timePart] = timeString.split('.');
    const [hours, minutes] = timePart.split(':');
    return `${hours}:${minutes}`;
  };

  // Pagination Logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = attendanceData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(attendanceData.length / recordsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const companyName = "SmartForce";

    doc.setFontSize(18);
    doc.text(`Attendance Report - ${companyName}`, 14, 20);
    doc.setFontSize(12);

    if (employeeDetails) {
      doc.text(`Employee Name: ${employeeDetails.name}`, 14, 30);
      doc.text(`Email: ${employeeDetails.email}`, 14, 40);
      doc.text(`Department: ${employeeDetails.department}`, 14, 50);
      doc.text(`Designation: ${employeeDetails.designation}`, 14, 60);
    }

    doc.text(`Month: ${month} ${year}`, 14, 70);

    const tableColumns = ['Check-In Date', 'Check-In Time', 'Check-Out Date', 'Check-Out Time'];
    const tableRows = attendanceData.map(record => {
      const [checkInDate, checkInTime] = record.checkInTime.split('T');
      const [checkOutDate, checkOutTime] = record.checkOutTime.split('T');

      return [
        checkInDate,
        formatTime(checkInTime),
        checkOutDate,
        formatTime(checkOutTime),
      ];
    });

    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 80,
      margin: { top: 20 },
      pageBreak: 'auto',
      rowPageBreak: 'avoid',
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 30 },
        2: { cellWidth: 40 },
        3: { cellWidth: 30 },
      },
      didDrawPage: (data) => {
        const pageNumber = data.pageNumber;
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.text(`Page ${pageNumber} of ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
      },
    });

    doc.save(`attendance_report_${month}_${year}.pdf`);
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
        {/* Search Inputs */}
        <div className="mt-5 bg-cyan-100 p-4 text-left">
          <p className="text-left text-lg font-subtop font-bold mb-4">Create Attendance Report</p>
          <div className="flex gap-4 justify-between pr-[160px]">
            <div>
              <label className="font-average text-lg">Employee: </label>
              <select
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="bg-transparent border-b-2 border-custom-blue focus:outline-none focus:border-blue-500 ml-4 font-average text-lg"
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee.pin} value={employee.pin}>
                    {employee.name} - {employee.pin}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-average text-lg">Year: </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g., 2025"
                className="bg-transparent border-b-2 border-custom-blue focus:outline-none focus:border-blue-500 ml-4 font-average text-lg"
              />
            </div>
            <div>
              <label className="font-average text-lg">Month: </label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="bg-transparent border-b-2 border-custom-blue focus:outline-none focus:border-blue-500 ml-4 font-average text-lg"
              >
                <option value="">Select Month</option>
                {months.map((monthName, index) => (
                  <option key={index} value={monthName}>
                    {monthName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-start mt-5 gap-10">
          <button
            onClick={handleSearch}
            className="w-40 h-9 bg-custom-blue text-xl font-average text-white rounded-lg"
          >
            Search
          </button>
          <button
            onClick={generatePDF}
            className="w-40 h-9 bg-custom-blue text-xl font-average text-white rounded-lg"
          >
            Download PDF
          </button>
        </div>

        {/* Error Message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Employee Details */}
        {employeeDetails && (
          <div className="flex flex-col gap-2 mt-5 text-left bg-cyan-100 p-4">
            <h2 className="text-left text-lg font-subtop font-bold mb-4">Employee Details</h2>
            <div className="flex gap-1 justify-between pr-[160px]">
              <p><strong>Name:</strong> {employeeDetails.name}</p>
              <p><strong>Email:</strong> {employeeDetails.email}</p>
              <p><strong>Department:</strong> {employeeDetails.department}</p>
              <p><strong>Designation:</strong> {employeeDetails.designation}</p>
            </div>
          </div>
        )}

        {/* Attendance Data Table with Pagination */}
        {currentRecords.length > 0 && (
          <div className="mt-5 bg-cyan-100 p-4">
            <p className="text-left text-lg font-average font-bold mb-4">Attendance Records</p>
            <table className="w-full mt-4 border-collapse border border-gray-300 table-fixed">
              <thead>
                <tr>
                  <th className="border border-black px-4 py-2 bg-custom-blue">Check-In Date</th>
                  <th className="border border-black px-4 py-2 bg-custom-blue">Check-In Time</th>
                  <th className="border border-black px-4 py-2 bg-custom-blue">Check-Out Date</th>
                  <th className="border border-black px-4 py-2 bg-custom-blue">Check-Out Time</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((record, index) => {
                  const [checkInDate, checkInTime] = record.checkInTime.split('T');
                  const [checkOutDate, checkOutTime] = record.checkOutTime.split('T');

                  return (
                    <tr key={index}
                    className="odd:bg-custom-blue-2 even:bg-custom-blue-3 hover:bg-gray-100">
                      <td className="py-2 px-4 border border-black">{checkInDate}</td>
                      <td className="py-2 px-4 border border-black">{formatTime(checkInTime)}</td>
                      <td className="py-2 px-4 border border-black">{checkOutDate}</td>
                      <td className="py-2 px-4 border border-black">{formatTime(checkOutTime)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-custom-blue text-white rounded-lg disabled:bg-gray-400"
              >
                <ArrowLeftOutlined />
              </button>
              <span className="text-lg font-average">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-custom-blue text-white rounded-lg disabled:bg-gray-400"
              >
                <ArrowRightOutlined />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AttendanceReport;