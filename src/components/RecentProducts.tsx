import { useEffect, useState } from "react"
import { getProducts } from "../API"
import { Table, Tag } from "antd"
const RecentProducts = () => {
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  useEffect(() => {
    setLoadingProducts(true)
    getProducts().then((data) => {
      setProducts(data)
      setLoadingProducts(false)
    })
  }, [])
  return (
    <Table
      columns={[
        { title: "Producto", dataIndex: "name" },
        {
          title: "Precio", dataIndex: "price",
          render: (price: number) => (
            <Tag color="green">
              {price} €
            </Tag>
          ),
        },
        { title: "Stock", dataIndex: "amount" },
        {
          title: "Categoria", dataIndex: "category",
          render: (category: string) => (
            <Tag color="orange">
              {category}
            </Tag>
          ),
        },
      ]}
      dataSource={products}
      loading={loadingProducts}
    />
  )
}

export default RecentProducts
