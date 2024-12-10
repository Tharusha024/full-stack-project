import React from 'react'
import './SubMenuItem.css'
function SubMenuItem() {
  return (
    <Menu.SubMenu key={props.key} icon={props.icon} title={props.title}></Menu.SubMenu>
  )
}

export default SubMenuItem