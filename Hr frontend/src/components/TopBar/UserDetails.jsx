import axios from 'axios';
import React, { useState, useEffect } from 'react';
import LogoutButton from '../Pages/LoggingPage/LogOutButton';
import { CloseCircleFilled } from '@ant-design/icons';

function UserDetails({ isOpen, onClose }) {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetchUserDetails();
        }
    }, [isOpen]);

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get('/api/users/details');
            setUserDetails(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed right-0 top-16  flex justify-center items-start">
            <div className="bg-custom-blue-4 rounded-lg shadow-lg p-6 w-80 relative flex justify-center items-center">
                <button className="absolute top-1 right-3 text-gray-500 hover:text-custom-red" onClick={onClose}><CloseCircleFilled/></button>
                {userDetails ? (
                      <div className="w-full">
                      <h2 className="text-xl font-bold mb-4 text-center font-subtop">User Details</h2>
                      <img src="UserPic.png" alt="User" className="w-[200px] h-[200px] mx-auto mb-4" />
                      <div className='leading-9'>
                      <div className="flex mb-2 ">
                          <span className="font-semibold font-subtop text-lg">User Name:</span>
                          <span className="font-subtop text-lg">Tharusha</span>
                      </div>
                      <div className="mb-2">
                          <span className="font-semibold font-subtop text-lg">Full Name:</span>
                          <span className=" font-subtop text-lg">Tharusha Piumitha</span>
                      </div>
                      <div className="flex mb-2">
                          <span className="font-semibold font-subtop text-lg">Email:</span>
                          <span className=" font-subtop text-lg">Tpiumitha@gmail</span>
                      </div>
                      <div className="flex">
                          <span className="font-semibold font-subtop text-lg mb-6">Role:</span>
                          <span className="font-subtop text-lg">admin</span>
                      </div>
                      </div>
                      <LogoutButton/>
                  </div>
                ) : (
                    <p className="text-gray-600">Loading user details...</p>
                )}
            </div>
        </div>
    );
}

export default UserDetails;
