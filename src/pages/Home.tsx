import { EuroCircleOutlined, ProductOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import { Card, Space, Statistic, Typography } from "antd"
import SellsChart from "../components/SellsChart"
import ProductsChart from "../components/ProductsChart"

const Home = () => {
  return (
    <Space className="flex px-12 py-6 w-full" size={24} direction="vertical">
      <Typography.Title level={3}>Dashboard</Typography.Title>
      <Space className="flex flex-wrap justify-between" direction="horizontal">
        <Card>
          <Space direction="horizontal">
            <ProductOutlined
              style={{
                fontSize: 25,
                color: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.25)",
                borderRadius: "50%",
                padding: 12
              }}
            />
            <Statistic className="flex flex-col items-center" title="Productos" value={Math.floor(Math.random() * 100)} />
          </Space>
        </Card>
        <Card>
          <Space direction="horizontal">
            <ShoppingCartOutlined
              style={{
                fontSize: 25,
                color: "orange",
                backgroundColor: "rgba(255, 255, 0, 0.25)",
                borderRadius: "50%",
                padding: 12
              }}
            />
            <Statistic className="flex flex-col items-center" title="Ventas" value={Math.floor(Math.random() * 100)} />
          </Space>
        </Card>
        <Card>
          <Space direction="horizontal">
            <UserOutlined style={{
              fontSize: 25,
              color: "purple",
              backgroundColor: "rgba(255, 0, 255, 0.25)",
              borderRadius: "50%",
              padding: 12
            }}
            />
            <Statistic className="flex flex-col items-center" title="Clientes" value={Math.floor(Math.random() * 100)} />
          </Space>
        </Card>
        <Card>
          <Space direction="horizontal">
            <EuroCircleOutlined style={{
              fontSize: 25,
              color: "green",
              backgroundColor: "rgba(0, 255, 0, 0.25)",
              borderRadius: "50%",
              padding: 12
            }}
            />
            <Statistic className="flex flex-col items-center" title="Beneficios" value={Math.floor(Math.random() * 100)} />
          </Space>

        </Card>
      </Space>
      <Space className="flex flex-wrap items-start justify-between mt-20" size={30} direction="horizontal">
        <Space style={{ width: "500px" }} direction="vertical">
          <SellsChart />
        </Space>
        <Space style={{ width: "500px" }} direction="vertical">
          <ProductsChart />
        </Space>
      </Space>
    </Space>
  )
}

export default Home
