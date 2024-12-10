import React from 'react'

function DashboardBox(props) {
  return (
    <div className='w-64 h-20 flex items-center pl-3 justify-center flex-col' style={{ backgroundColor: props.color }} >
        <p className='font-average text-2xl font-semibold'>{props.count}</p>
        <p className='font-average text-lg font-medium' >{props.name}</p>
    </div>
  )
}

export default DashboardBox