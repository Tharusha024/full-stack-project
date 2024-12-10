import React from 'react'
import SubTopBar from '../../TopBar/SubTopBar'
import { ApartmentOutlined, ArrowRightOutlined } from '@ant-design/icons'

function Department() {
  return (
    <div className='absolute left-60 top-16 p-0 m-0 w-full h-full'>
      <SubTopBar icon={<ApartmentOutlined />} name="Organization" secondname="Department" arrow={<ArrowRightOutlined className='size-3'/>}/>
    </div>
  )
}

export default Department