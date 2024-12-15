import { ArrowRightOutlined, FileExclamationOutlined } from '@ant-design/icons'
import React from 'react'
import SubTopBar from '../../TopBar/SubTopBar'

function LeaveReport() {
  return (
    <div className='absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200'>
      <SubTopBar icon={<FileExclamationOutlined />} name="Leave" secondname="Leave Report" arrow={<ArrowRightOutlined className='size-3'/>}/>
    </div>
  )
}

export default LeaveReport