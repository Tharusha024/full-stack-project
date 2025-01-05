import { ArrowRightOutlined, DeleteOutlined, EditOutlined, PlusSquareOutlined, UserOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import SubTopBar from '../../TopBar/SubTopBar'
import Buttons_1 from '../../buttons/Buttons_1';
import AddEmployeePopup from './AddEmployeePopup';
import Table from '../../Table/Table';

function Disciplinary() {
  const headers = ["Pin", "Employee Name", "Title", "Description", "Status"];
  const rows = [
    { pin: "E001", name: "John Doe", Title: "Titel_01", Description: "Description_01", Status: "Active" },
    { pin: "E002", name: "Jane Smith", Title: "Titel_01", Description: "Description_02", Status: "Active" },
    { pin: "E003", name: "Alice Johnson", Title: "Titel_01", Description: "Description_03", Status: "Active" },
    { pin: "E003", name: "Alice Johnson", Title: "Titel_01", Description: "Description_03", Status: "Active" },
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
      <SubTopBar icon={<UserOutlined />} name="Employee" secondname="Disciplinary Employees" arrow={<ArrowRightOutlined className='size-3'/>}/>
    </div>
    <div className='ml-5 absolute left-[15%] top-28 w-[85%]'>
      <div className="left-[15%] top-28 flex gap-5">
        <Buttons_1
          name="Add Employee"
          bgColor="bg-custom-blue"
          icon={<PlusSquareOutlined />}
          onClick={handleAddEmployeeClick}
        />
      </div>
      {activePopup === 'addEmployee' && <AddEmployeePopup onClose={closePopup} />}


    <div className="left-[15%] top-40 m-0 w-[95%] h-full bg-cyan-200">
    <div className='flex text-center gap-1 my-4'>
    <UserOutlined className='size-6'/>
    <p className="text-base font-average ">Disciplinary List</p>
    </div>
    <hr className="bg-black border-0 h-[3px] my-2" />
    <Table headers={headers} rows={rows} actions={handleActions} />
    </div>
    </div>
    </>
  )
}

export default Disciplinary