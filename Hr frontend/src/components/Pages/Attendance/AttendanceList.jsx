import { ArrowRightOutlined, CalculatorOutlined } from '@ant-design/icons'
import React from 'react'
import SubTopBar from '../../TopBar/SubTopBar'

function AttendanceList() {
  return (
    <div className='absolute left-60 top-16 p-0 m-0 w-full h-full'>
       <SubTopBar icon={<CalculatorOutlined />} name="Attendance" secondname="Add List" arrow={<ArrowRightOutlined className='size-3'/>}/>
    </div>
  )
}

export default AttendanceList