import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoggingPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '123') {
      console.log('Login successful!');
      if (rememberMe) {
        localStorage.setItem('user', username);
      }
      navigate('/Home'); 
    } else {
      console.error('Invalid credentials!');
      alert('Invalid username or password!');
    }
  };

  return (
    <>
    <div className="bg-[url('/loginbg.jpg')] bg-cover bg-center bg-no-repeat">
    <div></div>
     <div className="min-h-screen flex items-center justify-center">
        <div className="bg-custom-blue-4 p-6 rounded-lg shadow-md w-80">
          <div className='flex-row justify-center'>
          <img src="logo.png" alt="logo" className='w-[180px] h-[170px] ml-11'/>
          <h1 className="text-center text-2xl font-extrabold mb-6 font-average ">Admin Login</h1>
          </div>
          <form onSubmit={handleLogin} className='flex-row justify-center'>
            <div className="mb-4 flex">
              <UserOutlined className="mr-2 text-custom-blue" />
              <input
                type="text"
                placeholder="Username"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-custom-blue-2 font-subtop"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 flex text-custom-blue">
              <LockOutlined className="mr-2" />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-custom-blue-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center mb-4 ml-6">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe" className="text-sm">
                Remember Me
              </label>
              </div>
            <div>
              <button
                type="submit"
                className="w-[100%] flex justify-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-6 font-average"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}

export default LoggingPage;
