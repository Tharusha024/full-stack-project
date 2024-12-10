import { ArrowRightOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import SubTopBar from '../../TopBar/SubTopBar'

function Disciplinary() {
  return (
    <div className='absolute left-60 top-16 p-0 m-0 w-full h-full'>
       <SubTopBar icon={<UserOutlined />} name="Employee" secondname="Disciplinary" arrow={<ArrowRightOutlined className='size-3'/>}/>
    </div>
  )
}

export default Disciplinary