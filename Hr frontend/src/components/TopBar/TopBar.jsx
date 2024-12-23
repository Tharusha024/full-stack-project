import { Layout } from 'antd'
import React from 'react'
import LogoutButton from '../Pages/LoggingPage/LogOutButton'


const {Header} =Layout
function TopBar() {
  return (
    <div>
    <Layout>
        <Header className='fixed top-0 left-0 w-full h-16 z-50 p-0 flex justify-between items-center pr-4 bg-stone-900 shadow-md'>
            <img src="logo.png" alt="" className='w-20 h-20 m-0 cursor-pointer'/>
            <h1 className='text-cyan-400 font-menu text-xl cursor-pointer'>SmartForce</h1>
            <div>
            <img src="UserPic.png" alt="" className='w-11 h-11 m-0 rounded-full cursor-pointer'/>
            <LogoutButton />
            </div>
        </Header>
    </Layout>
    </div>
  )
}

export default TopBar