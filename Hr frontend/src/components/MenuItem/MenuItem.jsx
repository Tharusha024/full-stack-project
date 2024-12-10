import React from 'react'
import './MenuItem.css'
function MenuItem() {
  return (
    <Menu.Item key={props.key} icon={props.icon} title={props.title}></Menu.Item>
  )
}

export default MenuItem