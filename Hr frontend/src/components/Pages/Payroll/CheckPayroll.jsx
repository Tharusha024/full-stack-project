import React from 'react'
import SubTopBar from '../../TopBar/SubTopBar'
import { ArrowRightOutlined, DollarOutlined } from '@ant-design/icons'

function CheckPayroll() {
  return (
    <div className='absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200'>
      <SubTopBar icon={<DollarOutlined />} name="Payroll" secondname="Check Payroll" arrow={<ArrowRightOutlined className='size-3'/>}/>
    </div>
  )
}

export default CheckPayroll