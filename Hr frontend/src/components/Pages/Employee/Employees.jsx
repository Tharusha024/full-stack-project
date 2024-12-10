import React from 'react';
import SubTopBar from '../../TopBar/SubTopBar';
import { ArrowRightOutlined, DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';

function Employees() {
  // Static array of employee data
  const users = [
    {
      id: 1,
      pin: "E001",
      name: "John Doe",
      email: "johndoe@example.com",
      contact: "+1234567890",
      userType: "Admin",
    },
    {
      id: 2,
      pin: "E002",
      name: "Jane Smith",
      email: "janesmith@example.com",
      contact: "+9876543210",
      userType: "Manager",
    },
    {
      id: 3,
      pin: "E003",
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      contact: "+1122334455",
      userType: "Staff",
    },
    {
      id: 4,
      pin: "E004",
      name: "Bob Brown",
      email: "bobbrown@example.com",
      contact: "+2233445566",
      userType: "Staff",
    },
  ];

  return (
    <>
      <div className="absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200">
        <SubTopBar
          icon={<UserOutlined />}
          name="Employee"
          secondname="Employees"
          arrow={<ArrowRightOutlined className="size-3" />}
        />
      </div>
      <div className="absolute left-[15%] top-40 px-3 m-0 w-[85%] h-full bg-cyan-200">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Pin</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Employee Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Contact</th>
              <th className="border border-gray-300 px-4 py-2 text-left">User Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 even:bg-red-500">
                  <th className="border border-gray-300 px-4 py-2">{user.pin}</th>
                  <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.contact}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.userType}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center flex space-x-4">
                    <EditOutlined className="text-blue-500 cursor-pointer" title="Edit" />
                    <DeleteOutlined className="text-red-500 cursor-pointer" title="Delete" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="border border-gray-300 px-4 py-2 text-center"
                  colSpan="6"
                >
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Employees;
