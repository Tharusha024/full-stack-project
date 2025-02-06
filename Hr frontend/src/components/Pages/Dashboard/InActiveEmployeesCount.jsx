import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InActiveEmployeesCount = () => {
  const [inActiveCount, setInActiveCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInActiveEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/employee/userType/inactive');
        // Assuming the response data is an array of active employees
        setInActiveCount(response.data.length);
      } catch (err) {
        setError('Failed to fetch inactive employees');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInActiveEmployees();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
  <p>{inActiveCount}</p>
  );
};

export default InActiveEmployeesCount;
