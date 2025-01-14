import { ArrowRightOutlined, DeleteOutlined, EditOutlined, MenuOutlined, PlusSquareOutlined, UserOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import SubTopBar from '../../TopBar/SubTopBar'
import Table from '../../Table/Table';
import Buttons_1 from '../../Buttons/Buttons_1';
import AddEmployeePopup from './AddEmployeePopup';



function InactiveEmployee() {
  const headers = ["Pin", "Employee Name", "Email", "Contact", "User Type"];
  const rows = [
    { pin: "E001", name: "John Doe", email: "johndoe@example.com", contact: "+1234567890", userType: "Admin" },
    { pin: "E002", name: "Jane Smith", email: "janesmith@example.com", contact: "+9876543210", userType: "Manager" },
    { pin: "E003", name: "Alice Johnson", email: "alicejohnson@example.com", contact: "+1122334455", userType: "Staff" },
  ];

  const handleActions = (row) => (
    <>
     <button
      className="bg-custom-blue text-white px-3 py-1 rounded"
      onClick={() => openEditPopup(row)}>
      <EditOutlined />
      </button>
      <button
      className="bg-red-500 text-white px-3 py-1 rounded">
      <DeleteOutlined />
      </button>
    </>
  );
  const [activePopup, setActivePopup] = useState(null);

  const handleAddEmployeeClick = () => {
    setActivePopup('addEmployee');
  };

  const closePopup = () => {
    setActivePopup(null);
  };
  return (
    <>
    <div className='absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200'>
      <SubTopBar icon={<UserOutlined />} name="Employee" secondname="Inactive Employees" arrow={<ArrowRightOutlined className='size-3'/>}/>
    </div>
    <div className='ml-5 absolute left-[15%] top-28 w-[85%]'>
      <div className="flex gap-5">
        <Buttons_1
          name="Add Employee"
          bgColor="bg-custom-blue"
          icon={<PlusSquareOutlined />}
          onClick={handleAddEmployeeClick}
        />
      </div>
      {activePopup === 'addEmployee' && <AddEmployeePopup onClose={closePopup} />}
     
    
    <div className="left-[15%] top-40  m-0 w-[95%] h-full bg-cyan-200">
    <div className='flex text-center gap-1 my-4'>
    <UserOutlined className='size-6'/>
    <p className="text-base font-average ">Inactive Employees List</p>
    </div>
    <hr className="bg-black border-0 h-[3px] my-2" />
    <Table headers={headers} rows={rows} actions={handleActions} />
    </div>
    </div>
    </>
  )
}

export default InactiveEmployee;