import React, { useEffect, useState } from 'react'
import SubTopBar from '../../TopBar/SubTopBar'
import { ArrowRightOutlined, DollarOutlined } from '@ant-design/icons'
import axios from 'axios';

function PayrollList() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [department, setDepartment] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get('https://example.com/api/departments') // Replace with your API endpoint
      .then(response => {
        setDepartments(response.data);
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get('https://example.com/api/search', {
      params: {
        month,
        year,
        department
      }
    })
    .then(response => {
      setResults(response.data);
    })
    .catch(error => {
      console.error('Error fetching search results:', error);
    });
  };

  return (
    <>
    <div className='absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200'>
       <SubTopBar icon={<DollarOutlined />} name="Payroll" secondname="Payroll List" arrow={<ArrowRightOutlined className='size-3'/>}/>
    </div>
    <div className='ml-5 absolute left-[15%] top-28 w-[85%]'>
    <div className="p-4 bg-white shadow-md rounded w-[95%]">
      <form onSubmit={handleSubmit} className='flex justify-between'>
  <div className="mb-4">
    <label htmlFor="month" className="block text-gray-700">Month</label>
    <select
      id="month"
      value={month}
      onChange={(e) => setMonth(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded"
    >
      <option value="">Select Month</option>
      <option value="01">January</option>
      <option value="02">February</option>
      <option value="03">March</option>
      <option value="04">April</option>
      <option value="05">May</option>
      <option value="06">June</option>
      <option value="07">July</option>
      <option value="08">August</option>
      <option value="09">September</option>
      <option value="10">October</option>
      <option value="11">November</option>
      <option value="12">December</option>
    </select>
  </div>

  <div className="mb-4">
    <label htmlFor="year" className="block text-gray-700">Year</label>
    <input
      type="number"
      id="year"
      value={year}
      onChange={(e) => setYear(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded"
      placeholder="YYYY"
      min="1900"
      max="2099"
    />
  </div>



        <div className="mb-4">
          <label htmlFor="department" className="block text-gray-700">Department</label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.name}>{dept.name}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 w-9"
        >
          Search
        </button>
      </form>
      </div>
    </div>
    </>
  )
}

export default PayrollList