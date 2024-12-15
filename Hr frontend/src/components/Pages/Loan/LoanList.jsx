import { ArrowRightOutlined, FileDoneOutlined } from '@ant-design/icons'
import React from 'react'
import SubTopBar from '../../TopBar/SubTopBar'

function LoanList() {
  return (
    <div className='absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200'>
      <SubTopBar icon={<FileDoneOutlined />} name="Loan" secondname="Loan List" arrow={<ArrowRightOutlined className='size-3'/>}/>
    </div>
  )
}

export default LoanList