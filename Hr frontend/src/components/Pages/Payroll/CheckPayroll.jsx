import React from 'react'
import SubTopBar from '../../TopBar/SubTopBar'
import { ArrowRightOutlined, DollarOutlined } from '@ant-design/icons'

function CheckPayroll() {
  return (
    <div className='absolute left-60 top-16 p-0 m-0 w-full h-full'>
      <SubTopBar icon={<DollarOutlined />} name="Payroll" secondname="Check Payroll" arrow={<ArrowRightOutlined className='size-3'/>}/>
    </div>
  )
}

export default CheckPayroll