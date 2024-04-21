import { EuroCircleOutlined, HomeOutlined, ProductOutlined, UserOutlined } from "@ant-design/icons"
import { Menu, Space } from "antd"
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Space direction="vertical">
      <Menu
        defaultSelectedKeys={["/dashboard"]}
        onClick={({ key }) => navigate(key)}
        items={[
          { icon: <HomeOutlined style={{fontSize: 18}}/>, label: "Inicio", key: "/dashboard", style: {marginBottom: '15px'} },
          { icon: <ProductOutlined style={{fontSize: 18}}/>, label: "Productos", key: "/dashboard/products", style: {marginBottom: '15px'} },
          { icon: <EuroCircleOutlined style={{fontSize: 18}}/>, label: "Ventas", key: "/dashboard/invoices", style: {marginBottom: '15px'} },
          { icon: <UserOutlined style={{fontSize: 18}}/>, label: "Usuarios", key: "/dashboard/users", style: {marginBottom: '15px'} },
        ]}
        style={{
          width: 240,
          height: 320,
          fontSize: 18
        }}
      />
    </Space>
  )
}

export default Sidebar
