import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import { Space } from "antd"
const Dashboard = () => { 
  return (
    <Space className="flex antialiased" direction="vertical">
      <Header />
      <div className="flex items-start">
        <Sidebar />
        <Outlet />
      </div>
    </Space>
  )
}

export default Dashboard
