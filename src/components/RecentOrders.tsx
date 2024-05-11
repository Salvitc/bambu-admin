import { useEffect, useState } from "react"
import { getOrders } from "../API"
import { Space, Table, Tag, Typography } from "antd"
import React from "react"
import { iInvoice } from "../types/types"
const RecentOrders = () => {
    const [orders, setOrders] = useState([])
    const [loadingOrders, setLoadingOrders] = useState(true)
    useEffect(() => {
      setLoadingOrders(true)
      getOrders().then((data) => {
        setOrders(data)
        setLoadingOrders(false)
      })
    }, [])

    return (
      <Table
        columns={[
          {
            title: 'Productos',
            key: 'products',
            render: (_: any, invoice: iInvoice) => (
              <Space>
                <Typography.Text>{invoice.products.reduce((sum, current) => { return sum + current.amount}, 0)}</Typography.Text>
              </Space>
            )
          },
          {
            title: "Precio",
            dataIndex: "amount",
            render: (amount: number) => (
              <Tag color="green">{amount} €</Tag>
            )
          },
          {
            title: 'Fecha',
            dataIndex: 'date',
            render: (_: any, invoice: iInvoice) => {
              return (
                <Space>
                  <Typography.Text>{new Date(invoice.date).toLocaleDateString()}</Typography.Text>
                </Space>
              )
            }
          },
      ]}
        dataSource={orders}
        loading={loadingOrders}
      />
    )
  }

  export default RecentOrders
