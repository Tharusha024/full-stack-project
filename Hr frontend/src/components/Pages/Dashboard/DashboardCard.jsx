import { UserOutlined } from '@ant-design/icons'
import React from 'react'

function DashboardCard(props) {
  return (
    <div className='w-64 h-20 bg-white flex items-center p-0 justify-center gap-5 rounded-tl-xl rounded-br-xl'>
        {props.icon}
        <div>
            <p className='text-black font-average text-xl font-semibold'>{props.count} {props.name}</p>
            <p className='text-black font-average text-sm font-thin cursor-pointer'>View Details</p>
        </div>
    </div>
  )
}

export default DashboardCard