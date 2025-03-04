import React from 'react'
import { Menu } from 'antd'

import {
  DashboardOutlined,    
  ApartmentOutlined,     
  UserOutlined,          
  CalendarOutlined,      
  FileExclamationOutlined, 
  ProjectOutlined,       
  DollarOutlined,        
  FileDoneOutlined,      
  LaptopOutlined,       
  NotificationOutlined,  
  SettingOutlined,        
  MinusSquareOutlined
} from '@ant-design/icons';

function MenuList({ isSelected, setIsSelected }) {
  const handleMenuClick = (e) => {
    setIsSelected(e.key);
  };
  return (
    <Menu mode="inline"selectedKeys={[isSelected]} onClick={handleMenuClick}className="bg-cyan-400 text-white ">
        <Menu.Item className="font-menu" key="Dashboard" icon={<DashboardOutlined />} >Dashboard</Menu.Item>
        <Menu.SubMenu className="font-menu" key="Organization" icon={<ApartmentOutlined />} title="Organization">
        <Menu.Item className="submenuitem" key="Department" icon={<MinusSquareOutlined />} >Department</Menu.Item>
        <Menu.Item className="submenuitem" key="Designation" icon={<MinusSquareOutlined />} >Designation</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu className="font-menu" key="Employees" icon={<UserOutlined />} title="Employees">
        <Menu.Item className="submenuitem" key="Employees" icon={<MinusSquareOutlined />} >Employees</Menu.Item>
        <Menu.Item className="submenuitem" key="InactiveEmployee" icon={<MinusSquareOutlined />} >Inactive Employee</Menu.Item>
        <Menu.Item className="submenuitem" key="Disciplinary" icon={<MinusSquareOutlined />} >Disciplinary</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item className="font-menu" key="AttendanceReport" icon={<CalendarOutlined />} >Attendance Report</Menu.Item>
        <Menu.SubMenu className="font-menu" key="Leave" icon={<FileExclamationOutlined />} title="Leave">
        <Menu.Item className="submenuitem" key="LeaveApplication" icon={<MinusSquareOutlined />} >Leave Application</Menu.Item>
        <Menu.Item className="submenuitem" key="LeaveReport" icon={<MinusSquareOutlined />} >Leave Report</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu className="font-menu" key="Project" icon={<ProjectOutlined />} title="Project">
        <Menu.Item className="submenuitem" key="Projects" icon={<MinusSquareOutlined />} >Projects</Menu.Item>
        <Menu.Item className="submenuitem" key="TaskList" icon={<MinusSquareOutlined />} >Task List</Menu.Item>
        </Menu.SubMenu>
       
        <Menu.Item className="font-menu" key="PayrollList" icon={<DollarOutlined />} >Payroll</Menu.Item>
        
        
        <Menu.SubMenu className="font-menu" key="Assets" icon={<LaptopOutlined />} title="Assets">
        <Menu.Item className="submenuitem" key="AssetsCategory" icon={<MinusSquareOutlined />} >Assets Category</Menu.Item>
        <Menu.Item className="submenuitem" key="AssetsList" icon={<MinusSquareOutlined />} >Assets List</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item className="font-menu" key="Notice" icon={<NotificationOutlined />} >Notice</Menu.Item>
      
        
    </Menu>
  )
}

export default MenuList