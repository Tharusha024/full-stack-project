import React, { useState } from "react";
import { Layout } from "antd";
import MenuList from "../MenuList/MenuList";
import Dashboard from "../Pages/Dashboard/Dashboard";  
import Department from "../Pages/Organization/Department";
import Designation from "../Pages/Organization/Designation";
import Employees from "../Pages/Employee/Employees";
import Disciplinary from "../Pages/Employee/Disciplinary";
import InactiveEmployee from "../Pages/Employee/InactiveEmployee";
import AttendanceList from "../Pages/Attendance/AttendanceList";
import AddAttendance from "../Pages/Attendance/AddAttendance";
import AttendanceReport from "../Pages/Attendance/AttendanceReport";
import LeaveApplication from "../Pages/Leave/LeaveApplication";
import LeaveReport from "../Pages/Leave/LeaveReport";
import Projects from "../Pages/Project/Projects";
import TaskList from "../Pages/Project/TaskList";
import PayrollList from "../Pages/Payroll/PayrollList";
import CheckPayroll from "../Pages/Payroll/CheckPayroll";
import LoanList from "../Pages/Loan/LoanList";
import LoanInstallment from "../Pages/Loan/LoanInstallment";
import AssetsCategory from "../Pages/Assets/AssetsCategory";
import AssetsList from "../Pages/Assets/AssetsList";
import Notice from "../Pages/Notice/Notice";
import Settings from "../Pages/Settings/Settings";

const { Sider } = Layout;

function SideBar() {
  const [isSelected, setIsSelected] = useState("Dashboard"); // State for selected menu

  // Render content dynamically based on the selected menu item
  const renderContent = () => {
    switch (isSelected) {
      case "Dashboard":
        return <Dashboard />;
      case "Department":
        return <Department />;
      case "Designation":
        return <Designation />;
      case "Employees":
        return <Employees />;
      case "Disciplinary":
        return <Disciplinary />;
      case "InactiveEmployee":
        return <InactiveEmployee />;
      case "AttendanceList":
        return <AttendanceList />;
      case "AddAttendance":
        return <AddAttendance />;
      case "AttendanceReport":
        return <AttendanceReport />;
      case "LeaveApplication":
        return <LeaveApplication />;  
      case "LeaveReport":
        return <LeaveReport />;   
      case "Projects":
        return <Projects />; 
      case "TaskList":
        return <TaskList />; 
      case "PayrollList":
        return <PayrollList />; 
      case "CheckPayroll":
        return <CheckPayroll />; 
      case "LoanList":
        return <LoanList />; 
      case "LoanInstallment":
        return <LoanInstallment />; 
      case "AssetsCategory":
        return <AssetsCategory />; 
      case "AssetsList":
        return <AssetsList />;
      case "Notice":
        return <Notice />;
      case "Settings":
        return <Settings />;
        
      default:
        return <div>Select an option from the menu</div>;
    }
  };

  return (
    <Layout className="h-screen flex">
      <Sider width="15%" className="left-0 top-16 overflow-hidden hover:overflow-y-auto">
        {/* Sidebar Menu */}
        <MenuList isSelected={isSelected} setIsSelected={setIsSelected} />
      </Sider>

      {/* Content Area */}
      <Layout className="p-4 flex-1 overflow-auto">{renderContent()}</Layout>
    </Layout>
  );
}

export default SideBar;
