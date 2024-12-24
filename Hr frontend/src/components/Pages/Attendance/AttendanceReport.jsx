import React from 'react'
import SubTopBar from '../../TopBar/SubTopBar'
import { ArrowRightOutlined, CalculatorOutlined, UserOutlined } from '@ant-design/icons'

function AttendanceReport() {
  return (
    <>
    <div className='absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200'>
       <SubTopBar icon={<CalculatorOutlined />} name="Attendance" secondname="Attendance Report" arrow={<ArrowRightOutlined className='size-3'/>}/>
    </div>
    <div className='text-center ml-5 absolute left-[15%] top-28 w-[85%] gap-1 pr-9'>
    <div className='flex'>
    <UserOutlined className='size-6'/>
    <p className="text-base font-average ">Attendace Report</p>
    </div>
    <hr className="bg-black border-0 h-[3px] my-2" />
    <div >
      <form action="" className='flex justify-between'>
      <div>
      <label >Start Date :</label>
      <input type="date" className="bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 ml-4"/>
      </div>
      <div>
      <label >End Date :</label>
      <input type="date" className="bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 ml-4"/>
      </div>
      <div>
      <label >Employee Name :</label>
      <input type="text" className="bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 ml-4"/>
      </div>
      </form>
    </div>
    </div>
  
    
    </>
  )
}

export default AttendanceReport