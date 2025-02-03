import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActiveEmployeesCount = () => {
  const [activeCount, setActiveCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActiveEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/employee/userType/active');
        // Assuming the response data is an array of active employees
        setActiveCount(response.data.length);
      } catch (err) {
        setError('Failed to fetch active employees');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveEmployees();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
  <p>{activeCount}</p>
  );
};

export default ActiveEmployeesCount;
