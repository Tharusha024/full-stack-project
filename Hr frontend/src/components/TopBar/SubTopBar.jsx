import { ArrowRightOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import React from 'react'

const {Header} = Layout
function SubTopBar(props) {
  return (
        <Header className='w-full bg-white text-base h-8 flex items-center pl-3 m-0 text-black font-subtop font-semibold gap-3'>
        {props.icon}
        <p>{props.name}</p>
        {props.arrow}
        <p>{props.secondname}</p>
        </Header>
    
  )
}

export default SubTopBar