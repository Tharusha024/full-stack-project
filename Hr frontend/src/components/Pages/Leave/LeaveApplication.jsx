import React from 'react'
import SubTopBar from '../../TopBar/SubTopBar'
import { ArrowRightOutlined, FileExclamationOutlined } from '@ant-design/icons'

function LeaveApplication() {
  return (
    <div className='absolute left-60 top-16 p-0 m-0 w-full h-full'>
       <SubTopBar icon={<FileExclamationOutlined />} name="Leave" secondname="Leave Application" arrow={<ArrowRightOutlined className='size-3'/>}/>
    </div>
  )
}

export default LeaveApplication