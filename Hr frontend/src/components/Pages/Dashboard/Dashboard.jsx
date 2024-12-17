import { Layout } from 'antd'
import React from 'react'
import SubTopBar from '../../TopBar/SubTopBar'
import DashboardCard from './DashboardCard'
import { DashboardOutlined, DollarOutlined, FileExclamationOutlined, ProjectOutlined, UserOutlined } from '@ant-design/icons'
import DashboardBox from './DashboardBox'

const {Header} =Layout
function Dashboard() {
  return (
    <>
    <div className='absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200'>
      <SubTopBar icon={<DashboardOutlined />} name="Dashboard"/>
      <div className='flex justify-between pl-[5%] pr-[5%] pt-[20px]'>
      <DashboardCard  count="10" name="Employees" icon={<UserOutlined className='text-black rounded-full p-1 w-12 h-12 flex items-center justify-center text-3xl bg-custom-pink'/>}/>
      <DashboardCard  count="3" name="Leave" icon={<FileExclamationOutlined className='text-black rounded-full p-1 w-12 h-12 flex items-center justify-center text-3xl bg-custom-green'/>}/>
      <DashboardCard  count="5" name="Projects" icon={<ProjectOutlined className='text-black rounded-full p-1 w-12 h-12 flex items-center justify-center text-3xl bg-custom-red'/>}/>
      <DashboardCard  count="2" name="Loan" icon={<DollarOutlined className='text-black rounded-full p-1 w-12 h-12 flex items-center justify-center text-3xl bg-custom-yellow'/>}/>
      </div>
      <div className='flex justify-between pl-[5%] pr-[5%] pt-[20px]'>
        <DashboardBox name="Former Employees" count="1" color="#FF00A6"/>
        <DashboardBox name="Pending leave Application" count="3" color="#06B532"/>
        <DashboardBox name="Upcoming Projects" count="5" color="#FF0000"/>
        <DashboardBox name="Loan Applications" count="3" color="#FBFF00"/>
      </div>
     
    </div>
    
    </>
  )
}

export default Dashboard