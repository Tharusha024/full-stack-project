import { LogoutOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert('You have been logged out.');
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 rounded-lg hover:bg-red-600 w-full h-[50px] flex justify-center items-center"
    >
      <LogoutOutlined /><p className='ml-3'>Log Out</p>
    </button>
  );
}

export default LogoutButton;
