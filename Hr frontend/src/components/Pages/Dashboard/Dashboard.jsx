import { Layout } from 'antd'
import React from 'react'
import SubTopBar from '../../TopBar/SubTopBar'
import DashboardCard from './DashboardCard'
import { DashboardOutlined, FileExclamationOutlined, ProjectOutlined, UserOutlined } from '@ant-design/icons'
import DashboardBox from './DashboardBox'
import ToDoList from './ToDoList'
import ProjectTable from './ProjectTable'
import ActiveEmployeesCount from './ActiveEmployeesCount'
import InActiveEmployeesCount from './InActiveEmployeesCount'


const {Header} =Layout
function Dashboard() {
  return (
    <>
    <div className='absolute left-[15%] top-16 p-0 m-0 w-[85%] h-full bg-cyan-200'>
      <SubTopBar icon={<DashboardOutlined />} name="Dashboard"/>
      <div className='mx-4'>
      <div className='flex justify-between pt-[20px]'>
      <DashboardCard  count={<ActiveEmployeesCount />} name="Employees" key="Employees" icon={<UserOutlined className='text-black rounded-full p-1 w-12 h-12 flex items-center justify-center text-3xl bg-custom-pink'/>}/>
      <DashboardCard  count="3" name="Leave" key="Leave" icon={<FileExclamationOutlined className='text-black rounded-full p-1 w-12 h-12 flex items-center justify-center text-3xl bg-custom-green'/>}/>
      <DashboardCard  count="5" name="Projects" key="Projects" icon={<ProjectOutlined className='text-black rounded-full p-1 w-12 h-12 flex items-center justify-center text-3xl bg-custom-red'/>}/>
      </div>
      <div className='flex justify-between pt-[20px]'>
        <DashboardBox name="Inactive Employees" count={<InActiveEmployeesCount />} color="#FF00A6"/>
        <DashboardBox name="Pending leave Application" count="3" color="#06B532"/>
        <DashboardBox name="Upcoming Projects" count="5" color="#FF0000"/>
      </div>
      </div>
      <div className='flex justify-between mt-[40px] mx-4'>
      <div className='w-[900px] bg-white'>
      <ProjectTable />
      </div>
      <div>
      <ToDoList />
      </div>
      </div>
    </div>
    
    </>
  )
}

export default Dashboard