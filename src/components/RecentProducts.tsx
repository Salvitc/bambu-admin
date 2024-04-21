import { useEffect, useState } from "react"
import { getProducts } from "../API"
import { Table } from "antd"

const RecentProducts = () => {
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  useEffect(() => {
    setLoadingProducts(true)
    getProducts().then((data) => {
      setProducts(data.products)
      setLoadingProducts(false)
    })
  }, [])
  return (
    <Table
      columns={[
        { title: "Producto", dataIndex: "title"},
        { title: "Precio", dataIndex: "price"},
        { title: "Stock", dataIndex: "stock"},
        { title: "Categoria", dataIndex: "category"},
      ]}
      dataSource={products}
      loading={loadingProducts}
    />
  )
}

export default RecentProducts
