import React from 'react'
import SubTopBar from '../../TopBar/SubTopBar'
import { ArrowRightOutlined, CalculatorOutlined } from '@ant-design/icons'

function AttendanceReport() {
  return (
    <div className='absolute left-60 top-16 p-0 m-0 w-full h-full'>
       <SubTopBar icon={<CalculatorOutlined />} name="Attendance" secondname="Attendance Report" arrow={<ArrowRightOutlined className='size-3'/>}/>
    </div>
  )
}

export default AttendanceReport