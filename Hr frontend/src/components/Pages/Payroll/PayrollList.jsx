import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubTopBar from '../../TopBar/SubTopBar';
import { ArrowRightOutlined, DollarOutlined } from '@ant-design/icons';

const PayrollList = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [month, setMonth] = useState('January');
  const [year, setYear] = useState(2025);
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [totalPendingSalary, setTotalPendingSalary] = useState(0);
  const [createPaymentDetails, setCreatePaymentDetails] = useState(null);
  const [showCreatePaymentButton, setShowCreatePaymentButton] = useState(true); // State for toggling button visibility

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8083/api/department');
        setDepartments(response.data);
      } catch (err) {
        console.error('Error fetching departments:', err);
      }
    };
    fetchDepartments();
  }, []);

  const fetchPayrolls = async () => {
    if (!department) {
      setError('Please select a department.');
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);
    setShowCreatePaymentButton(true); 

    try {
      const response = await axios.get(
        `http://localhost:8081/api/payrolls/month/${month}/year/${year}/employee-department/${department}`
      );
      setPayrolls(response.data);
      setShowPaymentSection(false); // Close the payment section after searching
    } catch (err) {
      setError('Failed to fetch payrolls. Please try again later.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentClick = () => {
    const pendingPayrolls = payrolls.filter((payroll) => payroll.status === 'Pending');

    if (pendingPayrolls.length === 0) {
      alert('No pending payments to process.');
      return;
    }

    const totalSalary = pendingPayrolls.reduce((sum, payroll) => sum + payroll.totalSalary, 0);
    setTotalPendingSalary(totalSalary);
    setShowPaymentSection(true);
  };

  const handleConfirmPayment = async () => {
    const pendingPayrolls = payrolls.filter((payroll) => payroll.status === 'Pending');
  
    try {
      await axios.put(
        `http://localhost:8081/api/payrolls/update-status/month/${month}/year/${year}/department/${department}`,
        {
          payrollIds: pendingPayrolls.map((payroll) => payroll.id),
          status: 'Paid', // Example data to change the status
        }
      );
  
      alert('All pending payments processed successfully.');
      setShowPaymentSection(false);
      fetchPayrolls(); // Fetch updated payrolls after status update
    } catch (err) {
      console.error('Error processing payments:', err);
      alert('Failed to process payments. Please try again later.');
    }
  };

  const handleCreatePayment = () => {
    setCreatePaymentDetails({
      month,
      year,
      department
    });

    // Calculate total salary for all pending payrolls
    const pendingPayrolls = payrolls.filter((payroll) => payroll.status === 'Pending');
    const totalSalary = pendingPayrolls.reduce((sum, payroll) => sum + payroll.totalSalary, 0);
    setTotalPendingSalary(totalSalary);

    // Hide the "Create Payment" button
    setShowCreatePaymentButton(false); 
  };

  const handleCreatePaymentApiCall = async () => {
    try {
      if (!createPaymentDetails || !createPaymentDetails.month || !createPaymentDetails.year || !createPaymentDetails.department) {
        alert('Missing details for creating payment.');
        return;
      }

      const payload = {
        month: createPaymentDetails.month,
        year: createPaymentDetails.year,
        department: createPaymentDetails.department,
      };

      await axios.post(
        `http://localhost:8081/api/payrolls/month/${createPaymentDetails.month}/year/${createPaymentDetails.year}/department/${createPaymentDetails.department}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      alert('Payroll created successfully.');
      setCreatePaymentDetails(null);
      setShowPaymentSection(false);
      fetchPayrolls();
    } catch (err) {
      console.error('Error creating payroll:', err);
      alert('Failed to create payroll. Please try again.');
    }
  };

  const handleCloseCreatePaymentSection = () => {
    setCreatePaymentDetails(null);
    
  };

  return (
    <>
      <div className='absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200'>
        <SubTopBar icon={<DollarOutlined />} name="Payroll"/>
      </div>
      <div className="text-center ml-5 absolute left-[15%] top-28 w-[85%] gap-1 pr-9">
        <div className="bg-cyan-100 p-4 text-left">
          <h1 className="text-left text-lg font-subtop font-bold mb-4">Payroll List</h1>

          {/* Input Filters */}
          <div className="flex justify-start items-center mb-4 gap-16">
            <div className='flex items-center gap-3'>
              <label className="font-average text-lg">Month</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="bg-transparent border-b-2 border-custom-blue focus:outline-none focus:border-blue-500 ml-4 font-average text-lg"
              >
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className='flex items-center gap-3'>
              <label className="font-average text-lg">Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-transparent border-b-2 border-custom-blue focus:outline-none focus:border-blue-500 ml-4 font-average text-lg"
                min="2000"
                max="2100"
              />
            </div>

            <div className='flex items-center gap-3'>
              <label className="font-average text-lg">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="bg-transparent border-b-2 border-custom-blue focus:outline-none focus:border-blue-500 ml-4 font-average text-lg"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>{dept.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                fetchPayrolls();
                setCreatePaymentDetails(null); 
              }}
              className="w-36 h-9 bg-custom-blue text-lg font-average text-white rounded-lg"
            >
              Search
            </button>
          </div>
        </div>

        {/* Displaying Data */}
        {loading ? (
          <div className="text-center mt-4">Loading payrolls...</div>
        ) : error ? (
          <div className="text-center mt-4 text-red-500">{error}</div>
        ) : payrolls.length > 0 ? (
          <div>
            <div className="overflow-x-auto">
              <table className="w-full mt-4 border-collapse border border-gray-300 table-fixed">
                <thead>
                  <tr className="text-black text-center">
                    <th className="border border-black px-4 py-2 bg-custom-blue">PIN</th>
                    <th className="border border-black px-4 py-2 bg-custom-blue">Employee Name</th>
                    <th className="border border-black px-4 py-2 bg-custom-blue">Basic Salary</th>
                    <th className="border border-black px-4 py-2 bg-custom-blue">OT Rate</th>
                    <th className="border border-black px-4 py-2 bg-custom-blue">Total Salary</th>
                    <th className="border border-black px-4 py-2 bg-custom-blue">Paid Date</th>
                    <th className="border border-black px-4 py-2 bg-custom-blue">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payrolls.map((payroll) => (
                    <tr key={payroll.id} className="odd:bg-custom-blue-2 even:bg-custom-blue-3 hover:bg-gray-100">
                      <td className="py-2 px-4 border border-black">{payroll.pin}</td>
                      <td className="py-2 px-4 border border-black">{payroll.employeeName}</td>
                      <td className="py-2 px-4 border border-black">Rs. {payroll.basicSalary.toLocaleString()}</td>
                      <td className="py-2 px-4 border border-black">Rs. {payroll.otRate.toLocaleString()}</td>
                      <td className="py-2 px-4 border border-black">Rs. {payroll.totalSalary.toLocaleString()}</td>
                      <td className="py-2 px-4 border border-black">{new Date(payroll.paidDate).toLocaleDateString()}</td>
                      <td className={`py-2 px-4 border border-black ${payroll.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                        {payroll.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={handlePaymentClick}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md"
              >
                Pay All Pending Salaries
              </button>
            </div>

            {showPaymentSection && (
              <div className="mt-5 bg-cyan-100 p-5 relative text-left">
                <h2 className="font-average text-lg">Confirm Payment</h2>
                <button 
                  onClick={() => setShowPaymentSection(false)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold"
                >
                  &times;
                </button>
                <p className="mb-4 mt-4">
                  The total amount for all pending salaries is <span className="font-bold text-green-600">Rs. {totalPendingSalary.toLocaleString()}</span>.
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={handleConfirmPayment}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md"
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : searched && (
          <div className="text-center mt-8">
            <p className="text-gray-500 mb-4">No payroll data available.</p>
            
            {showCreatePaymentButton && (
              <button
                onClick={handleCreatePayment}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md"
              >
                Create Payment
              </button>
            )}
          </div>
        )}

        {createPaymentDetails && (
          <div className="mt-5 bg-cyan-100 p-5 relative text-left">
            <h2 className="font-average text-lg">Create Payment Details</h2>
            <button 
              onClick={handleCloseCreatePaymentSection}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold"
            >
              &times; 
            </button>
            <p className="mb-4 mt-4">Create payment for {createPaymentDetails.month} {createPaymentDetails.year} in the {createPaymentDetails.department} department.</p>
            <div className="flex justify-between">
              <button
                onClick={handleCreatePaymentApiCall}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md"
              >
                Create Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PayrollList;