import { NotificationOutlined } from '@ant-design/icons'
import React from 'react'
import SubTopBar from '../../TopBar/SubTopBar'

function Notice() {
  return (
    <div className='absolute left-60 top-16 p-0 m-0 w-full h-full'>
      <SubTopBar icon={<NotificationOutlined />} name="Notice" />
    </div>
  )
}

export default Notice