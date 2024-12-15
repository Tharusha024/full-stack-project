import React, { useState } from 'react'
import SubTopBar from '../../TopBar/SubTopBar'
import { ApartmentOutlined, ArrowRightOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import AddOrganization from './AddOrganization'
import TableTwo from '../../Table/TableTwo'

function Department() {
   const [departments, setDepartments] = useState([
      {departmentName: "Human Resources" },
      {departmentName: "Human Resources" } ,
      {departmentName: "Human Resources" } ,
      {departmentName: "Human Resources" } ,
      {departmentName: "Human Resources" },
      {departmentName: "Human Resources" } 
    ]);
  
    const headers = ["Department Name"];

    const onEdit = (row) => {
      console.log("Editing", row);
      
  };

  const onDelete = (row) => {
      console.log("Deleting", row);
   
  };
    const handleActions = (row) => (
      <div className="flex space-x-2">
        <button
          className="text-blue-500"
          title="Edit"
          onClick={() => onEdit(row)}
        >
          <EditOutlined />
        </button>
        <button
          className="text-red-500"
          title="Delete"
          onClick={() => onDelete(row)}
        >
          <DeleteOutlined />
        </button>
      </div>
    );
 
  return (
    <>
    <div className='absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200'>
      <SubTopBar icon={<ApartmentOutlined />} name="Organization" secondname="Department" arrow={<ArrowRightOutlined className='size-3'/>}/>
    </div>
    <div className='px-5 absolute left-[15%] top-28 w-[85%] flex justify-between'>
      <div  className='h-[270px]'>
        <AddOrganization name='Dempartment'/>
      </div>
    
    <div className="w-[700px] bg-white px-3 py-3">
      <p className="text-lg font-average font-bold">Add Department</p>
      <hr className="bg-blue-600 border-0 h-[2px] my-2" />
      <TableTwo headers={headers} rows={departments} actions={handleActions} />
    </div>
    </div>
    </>
  )
}

export default Department