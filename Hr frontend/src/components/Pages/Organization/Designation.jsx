import { ApartmentOutlined, ArrowRightOutlined } from '@ant-design/icons'
import React from 'react'
import SubTopBar from '../../TopBar/SubTopBar'

function Designation() {
  return (
    <div className='absolute left-60 top-16 p-0 m-0 w-full h-full'>
      <SubTopBar icon={<ApartmentOutlined />} name="Organization" secondname="Designation" arrow={<ArrowRightOutlined className='size-3'/>}/>
    </div>
  )
}

export default Designation