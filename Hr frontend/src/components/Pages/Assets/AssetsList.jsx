import { ArrowRightOutlined, LaptopOutlined } from '@ant-design/icons'
import React from 'react'
import SubTopBar from '../../TopBar/SubTopBar'

function AssetsList() {
  return (
    <div className='absolute left-60 top-16 p-0 m-0 w-full h-full'>
       <SubTopBar icon={<LaptopOutlined />} name="Assets" secondname="Assets List" arrow={<ArrowRightOutlined className='size-3'/>}/>
    </div>
  )
}

export default AssetsList