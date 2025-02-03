import { UserOutlined } from '@ant-design/icons'
import React from 'react'

function DashboardCard(props) {
  return (
    <div className='w-80 h-20 bg-white flex items-center p-0 justify-center gap-5 rounded-tl-xl rounded-br-xl'>
        {props.icon}
        <div className='flex flex-col text-center'>
            <p className='text-black font-average text-xl font-semibold'>{props.count}</p>
            <p className='text-black font-average text-xl font-semibold'>{props.name}</p> 
            <p className='text-black font-average text-sm font-thin cursor-pointer' key={props.key}>View Details</p>
        </div>
    </div>
  )
}

export default DashboardCard