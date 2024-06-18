import { Button, Modal, Space, Table, TableProps, Typography, DatePicker, Form } from "antd"
import React, { useEffect } from "react"
import { iInvoice } from "../types/types"
import { getOrders, getOrdersByDateRange } from "../API"
import { PDFDownloadLink } from "@react-pdf/renderer"
import InvoicePdf from "../components/InvoicePdf"

interface DatesProps {
  dates: Date[]
}

const Invoices = () => {
  const [invoices, setInvoices] = React.useState<iInvoice[]>([])
  const [loadingInvoices, setLoadingInvoices] = React.useState<boolean>(true)
  const [modal, contextHolder] = Modal.useModal()

  const columns: TableProps<iInvoice>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'order_id',
      key: 'id'
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      render: (_: any, invoice: iInvoice) => {
        return (
          <Space>
            <Typography.Text>{new Date(invoice.date).toLocaleString()}</Typography.Text>
          </Space>
        )
      }
    },
    {
      title: 'Cliente',
      key: 'customer',
      render: (_: any, invoice: iInvoice) => {
        return (
          <Space>
            <Typography.Text>{invoice.user.name} {invoice.user.lastname}</Typography.Text>
          </Space>
        )
      }
    },
    {
      title: 'Productos',
      key: 'products',
      render: (_: any, invoice: iInvoice) => (
        <Space>
          <Typography.Text>{invoice.products.reduce((sum, current) => { return sum + current.amount }, 0)}</Typography.Text>
        </Space>
      )
    },
    {
      title: 'Total',
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, invoice: iInvoice) => (
        <Space>
          <Button type="default" className="text-blue-700 bg-blue-50 rounded-lg border border-blue-200" onClick={handleShow(invoice)}>Detalles</Button>
          <Button type="primary" className="text-green-700 bg-green-50 rounded-lg border border-green-200" onClick={handleExport(invoice)}>Exportar</Button>
        </Space>
      )
    }
  ]

  const handleShow = (invoice: iInvoice) => () => {
    modal.info({
      title: 'Detalles del pedido',
      content: (
        <Space direction="vertical" className="w-full">
          <Space direction="horizontal" className="w-full">
            <Typography.Text>Cliente:</Typography.Text>
            <Typography.Text>{invoice.user.name} {invoice.user.lastname}</Typography.Text>
          </Space>
          <Space direction="horizontal" className="w-full">
            <Typography.Text>Fecha:</Typography.Text>
            <Typography.Text>{new Date(invoice.date).toLocaleDateString()}</Typography.Text>
          </Space>
          <Space direction="horizontal" className="w-full">
            <Typography.Text>Total:</Typography.Text>
            <Typography.Text>{invoice.total}</Typography.Text>
          </Space>
          <Space direction="vertical" className="w-full">
            <Typography.Text>Productos:</Typography.Text>
            <Table
              dataSource={invoice.products}
              columns={[
                {
                  title: 'Nombre',
                  dataIndex: 'name',
                  key: 'name'
                },
                {
                  title: 'Cantidad',
                  dataIndex: 'amount',
                  key: 'amount'
                },
                {
                  title: 'Precio',
                  dataIndex: 'price',
                  key: 'price'
                }
              ]}
            />
          </Space>
        </Space>
      )
    })

  }

  const handleExport = (invoice: iInvoice) => () => {
    modal.confirm({
      title: 'Exportar factura',
      okText: 'Exportar',
      cancelText: 'Cancelar',
      content: (
        <Space direction="vertical" className="w-full">
          <Typography.Text>¿Estás seguro que deseas exportar la factura?</Typography.Text>
        </Space>
      ),
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <PDFDownloadLink document={<InvoicePdf invoice={invoice} />} fileName={`invoice-${invoice._id}.pdf`}>
            <OkBtn />
          </PDFDownloadLink>
        </>
      )
    })
  }

  const handleExportByDate = () => () => {
    const { RangePicker } = DatePicker
    modal.confirm({
      title: 'Exportar facturas por fecha',
      okText: 'Exportar',
      cancelText: 'Cancelar',
      content: (
        <Space direction="vertical" className="w-full">
          <Typography.Text>Introduce las fechas a exportar: </Typography.Text>
          <Form
            id="dates-form"
            onFinish={(values: DatesProps) => {
              getOrdersByDateRange(values.dates.map(date => date.toISOString()))
                .then((_: iInvoice[]) => {
                })
            }}
          >
            <Form.Item name="dates" rules={[{ required: true, message: "Debe introducir un rango de fechas." }]}>
              <RangePicker />
            </Form.Item>
          </Form>
        </Space>
      ),
      footer: (_, { CancelBtn }) => (
        <>
          <CancelBtn />
          <Button type="primary" form="dates-form" key="submit" htmlType="submit">
            Exportar
          </Button>
        </>
      ),
    })
  }

  useEffect(() => {
    setLoadingInvoices(true)
    getOrders().then((data) => {
      setInvoices(data)
      setLoadingInvoices(false)
    })

  }, [])

  return (
    <Space direction="vertical" className="px-12 py-6 w-full">
      <Space direction="horizontal" className="flex justify-between w-full">
        <Typography.Title level={2}>Pedidos</Typography.Title>
        <Button type="primary" className="text-green-700 bg-green-50 rounded-lg border border-green-200" onClick={handleExportByDate()}>Exportar facturas</Button>
      </Space>
      <Table
        dataSource={invoices}
        loading={loadingInvoices}
        columns={columns}
      />
      {contextHolder}
    </Space>
  )
}

export default Invoices
