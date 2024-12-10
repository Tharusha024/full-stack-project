import { ArrowRightOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import SubTopBar from '../../TopBar/SubTopBar'

function Disciplinary() {
  return (
    <>
    <div className='absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200'>
       <SubTopBar icon={<UserOutlined />} name="Employee" secondname="Disciplinary" arrow={<ArrowRightOutlined className='size-3'/>}/>
    </div>
    <div className='absolute left-[15%] top-40 p-0 m-0 w-[85%] h-full bg-cyan-200'>

    </div>
    </>
  )
}

export default Disciplinary