import { Button, Checkbox, Form, Input, InputNumber, Modal, Space, Table, Tag, Typography, Upload } from "antd"
import { TableProps } from "antd"
import { getProducts } from "../API";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: 'Nombre',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Precio',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
  },
  {
    title: 'Categoría',
    key: 'category',
    dataIndex: 'category',
    render: (category: string) => (
      <Tag color="orange">
        {category}
      </Tag>
    ),
  },
  {
    title: 'Acciones',
    key: 'actions',
    render: () => (
      <Space size="middle">
        <Button className="text-blue-700 bg-blue-50 rounded-lg border border-blue-200">Editar</Button>
        <Button className="text-red-700 bg-red-50 rounded-lg border border-red-200">Eliminar</Button>
      </Space>
    ),
  },
]

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}

const Products = () => {
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [stockEnabled, setStockEnabled] = useState(true)

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
  }

  const handleCancel = () => {
    setOpen(false)
  }

  useEffect(() => {
    setLoadingProducts(true)
    getProducts().then((data) => {
      setProducts(data.products)
      setLoadingProducts(false)
    })
  }, [])

  return (
    <Space direction="vertical" className="px-12 py-6 w-full">
      <Space direction="horizontal" className="flex flex-wrap justify-between">
        <Typography.Title level={3}>Productos</Typography.Title>
        <Button className="text-green-700 bg-green-50 rounded-lg border border-green-200" onClick={showModal}>Agregar producto</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={products}
        loading={loadingProducts} />
      <Modal
        open={open}
        title="Añadir nuevo producto"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button form="create_product" key="submit" htmlType="submit" type="primary" loading={loading} onClick={handleOk}>
            Aceptar
          </Button>
        ]}
      >
       <Form
          id="create_product"
          labelCol={{span: 6}}
          wrapperCol={{span: 16}}
          layout="horizontal"
          style={{maxWidth: 1200}}
        >
          <Form.Item label="Nombre" name="name" rules={[{required: true, message: 'Introduce un nombre.'}]}>
            <Input className="rounded-lg" />
          </Form.Item>
          <Form.Item label="Descripción" name="description" rules={[{required: true, message: 'Introduce una descripción'}]}>
            <Input.TextArea className="rounded-lg"/>
          </Form.Item>
          <Form.Item label="Categoría" name="category" rules={[{required: true, message: 'Selecciona una categoría'}]}>
            <Input className="rounded-lg" />
          </Form.Item>
          <Form.Item label="Precio" name="price" rules={[{required: true, message: 'Introduce un precio'}]}>
            <InputNumber className="rounded-lg"/>
          </Form.Item>
          <Form.Item label="En Stock" name="in_stock">
            <Checkbox
              checked={stockEnabled}
              defaultChecked
              onChange={(e) => {
                  setStockEnabled(e.target.checked) 
                }}
            />
          </Form.Item>
          <Form.Item label="Cantidad" name="amount">
            <InputNumber 
              disabled={!stockEnabled}
            />
          </Form.Item>
          <Form.Item label="Imagenes" name="image" valuePropName="imageList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card">
              <Button style={{ border: 0, background: "none"}}>
                <PlusOutlined />
              </Button>
            </Upload>              
          </Form.Item>
       </Form>
      </Modal>
    </Space>
  )
}

export default Products
