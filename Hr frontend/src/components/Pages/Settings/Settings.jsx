import { SettingOutlined } from '@ant-design/icons'
import React from 'react'
import SubTopBar from '../../TopBar/SubTopBar'

function Settings() {
  return (
    <div className='absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200'>
      <SubTopBar icon={<SettingOutlined />} name="Settings"/>
    </div>
  )
}

export default Settings