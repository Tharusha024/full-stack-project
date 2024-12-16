import { ArrowRightOutlined, CalculatorOutlined, DeleteOutlined, EditOutlined, PlusSquareOutlined, UserOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import SubTopBar from '../../TopBar/SubTopBar'
import Buttons_1 from '../../buttons/Buttons_1';

import Table from '../../Table/Table';
import AddAttendance from './AddAttendance';

function AttendanceList() {
  const headers = ["Pin", "Employee Name", "Date", "Sing In", "Sign Out","Working Hours"];
  const rows = [
    { pin: "E001", name: "John Doe", date: "12/12/2024", signin: "08.00", signout: "16.00",workinghours: "10.00" },
    { pin: "E001", name: "John Doe", date: "12/12/2024", signin: "08.00", signout: "16.00",workinghours: "10.00" },
    { pin: "E001", name: "Tharusha", date: "12/12/2024", signin: "08.00", signout: "16.00",workinghours: "10.00" },
    { pin: "E001", name: "John Doe", date: "12/12/2024", signin: "08.00", signout: "16.00",workinghours: "10.00" },
    { pin: "E001", name: "John Doe", date: "12/12/2024", signin: "08.00", signout: "16.00",workinghours: "10.00" },
    { pin: "E001", name: "John Doe", date: "12/12/2024", signin: "08.00", signout: "16.00",workinghours: "10.00" },
    { pin: "E001", name: "John Doe", date: "12/12/2024", signin: "08.00", signout: "16.00",workinghours: "10.00" },
    { pin: "E001", name: "John Doe", date: "12/12/2024", signin: "08.00", signout: "16.00",workinghours: "10.00" },

  ];

  const handleActions = (row) => (
    <>
      <EditOutlined
        className="text-blue-500 cursor-pointer"
        title="Edit"
        onClick={() => console.log("Edit", row)}
      />
      <DeleteOutlined
        className="text-red-500 cursor-pointer"
        title="Delete"
        onClick={() => console.log("Delete", row)}
      />
    </>
  );
  const [activePopup, setActivePopup] = useState(null);

  const handleAddAttendanceClick = () => {
    setActivePopup('addAttendance');
  };

  const closePopup = () => {
    setActivePopup(null);
  };
  return (
    <>
    <div className='absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200'>
       <SubTopBar icon={<CalculatorOutlined />} name="Attendance" secondname="Add List" arrow={<ArrowRightOutlined className='size-3'/>}/>
    </div>
    <div className='ml-5 absolute left-[15%] top-28 w-[85%]'>
    <div className="flex gap-5">
      <Buttons_1
        name="Add Attendance"
        bgColor="bg-custom-blue"
        icon={<PlusSquareOutlined />}
        onClick={handleAddAttendanceClick}
      />
    </div>
    {activePopup === 'addAttendance' && <AddAttendance onClose={closePopup}/>}
   
  
  <div className="left-[15%] top-40  m-0 w-[95%] h-full bg-cyan-200">
  <div className='flex text-center gap-1 my-4'>
  <UserOutlined className='size-6'/>
  <p className="text-base font-average ">Attendace List</p>
  </div>
  <hr className="bg-black border-0 h-[3px] my-2" />
  <Table headers={headers} rows={rows} actions={handleActions} />
  </div>
  </div>
  </>
  )
}

export default AttendanceList