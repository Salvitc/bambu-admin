import { useEffect, useState } from "react"
import { getOrders } from "../API"
import { Table } from "antd"
const RecentOrders = () => {
    const [orders, setOrders] = useState([])
    const [loadingOrders, setLoadingOrders] = useState(true)
    useEffect(() => {
      setLoadingOrders(true)
      getOrders().then((data) => {
        setOrders(data.products)
        setLoadingOrders(false)
      })
    }, [])

    return (
      <Table
        columns={[
          { title: "Producto", dataIndex: "title"},
          { title: "Cantidad", dataIndex: "quantity"},
          { title: "Precio", dataIndex: "price"},
        ]}
      dataSource={orders}
      loading={loadingOrders}
    />
  )
}

export default RecentOrders
