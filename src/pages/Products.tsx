import { Button, Checkbox, Form, Input, InputNumber, Modal, Space, Table, Tag, Typography, Upload } from "antd"
import { TableProps } from "antd"
import { deleteProduct, getProducts, postProduct, updateProduct } from "../API";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { DataType, FormProps, iProduct} from "../types/types";
import React from "react";


const Products = () => {
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [stockEnabled, setStockEnabled] = useState(false)
  const [modal, contextHolder] = Modal.useModal()
  const [refresh, setRefresh] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const columns: TableProps<DataType>["columns"] = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      hidden: true
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'amount',
      key: 'amount',
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
      render: (_: any, product: iProduct) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(product)}className="text-blue-700 bg-blue-50 rounded-lg border border-blue-200">Editar</Button>
          <Button onClick={() => handleDelete(product._id)} className="text-red-700 bg-red-50 rounded-lg border border-red-200">Eliminar</Button>
        </Space>
      ),
    },
  ].filter(item => !item.hidden)

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }


  const showModal = () => {
    setOpen(true)
  }

  const handleEdit = (product: iProduct) => {
    setOpenEdit(true)
    modal.confirm({
      title: 'Editar producto',
      okText: 'Editar',
      cancelText: 'Cancelar',
      okButtonProps: {
        form: 'update_product',
        htmlType: 'submit'
      },
      content: (
        <Form
          id="update_product"
          labelCol={{span: 6}}
          wrapperCol={{span: 16}}
          layout="horizontal"
          style={{maxWidth: 1200}}
          onFinish={(values: FormProps) => {
            updateProduct(values, product._id)
              .then((response) => {
                if (response.ok) {
                  modal.success({
                    content: 'Producto actualizado correctamente'
                  })
                  setRefresh(!refresh)
                } else {
                  modal.error({
                    content: (
                      <>
                        <h1>Error al actualizar el producto</h1>
                        <p>{response.statusText}</p>
                      </>
                    )
                  })
                }
              })
              .catch((error) => {
                modal.error({
                  content: (
                    <>
                      <h1>Error al actualizar el producto</h1>
                      <p>{error}</p>
                    </>
                  )
                })
              })
          }}
          initialValues={{
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            in_stock: product.in_stock,
            amount: product.amount
          }}
        >
          <Form.Item label="Nombre" name="name" rules={[{required: true, message: 'Introduce un nombre.'}]}>
            <Input className="rounded-lg" defaultValue={product.name}/>
          </Form.Item>
          <Form.Item label="Descripción" name="description" rules={[{required: true, message: 'Introduce una descripción'}]}>
            <Input.TextArea className="rounded-lg" defaultValue={product.description}/>
          </Form.Item>
          <Form.Item label="Categoría" name="category" rules={[{required: true, message: 'Selecciona una categoría'}]}>
            <Input className="rounded-lg" defaultValue={product.category}/>
          </Form.Item>
          <Form.Item label="Precio" name="price" rules={[{required: true, message: 'Introduce un precio'}]}>
            <InputNumber className="rounded-lg" defaultValue={product.price}/>
          </Form.Item>
          <Form.Item label="En Stock" name="in_stock" valuePropName="checked" rules={[{required: true}]}>
            <Checkbox
              defaultChecked={product.in_stock}
            />
          </Form.Item>
          <Form.Item label="Cantidad" name="amount" id="amount" rules={[{required: true}]}>
            <InputNumber 
              defaultValue={product.amount}
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
      )
    })
  }

  const handleDelete = (id: string) => {
    modal.confirm({
      title: '¿Estás seguro de eliminar este producto?',
      content: 'Esta acción no se puede deshacer',
      okType: "danger",
      onOk: () => {
        deleteProduct(id)
          .then((response) => {
            if (response.ok) {
              modal.success({
                content: 'Producto eliminado correctamente'
              })
              setRefresh(!refresh)
            } else {
              modal.error({
                content: (
                  <>
                    <h1>Error al eliminar el producto</h1>
                    <p>{response.statusText}</p>
                  </>
                )
              })
            }
          })
          .catch((error) => {
            modal.error({
              content: (
                <>
                  <h1>Error al eliminar el producto</h1>
                  <p>{error}</p>
                </>
              )
            })
          })
        }
    })
  }

  const handleOk = (values: FormProps) => {
    setLoading(true)
    postProduct(values)
      .then((response) => {
        setLoading(false)
        setOpen(false)
        if (response.ok) {
          modal.success({
            content: 'Producto añadido correctamente'
          })
          setRefresh(!refresh)
        } else {
          modal.error({
            content: (
              <>
                <h1>Error al añadir el producto</h1>
                <p>{response.statusText}</p>
              </>
            )
          })
        }
      })
      .catch((error) => {
        setLoading(false)
        modal.error({
            content: (
              <>
                <h1>Error al añadir el producto</h1>
                <p>{error}</p>
              </>
            )
          })
      })
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleEditCancel = () => {
    setOpenEdit(false)
  }

  useEffect(() => {
    setLoadingProducts(true)
    getProducts().then((data) => {
      setProducts(data)
      setLoadingProducts(false)
    })
  }, [refresh])

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
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button form="create_product" key="submit" htmlType="submit" type="primary" loading={loading}>
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
          onFinish={(values: FormProps) => {
            handleOk(values)
          }}
          initialValues={{
            in_stock: false,
            amount: 0
          }}
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
          <Form.Item label="En Stock" name="in_stock" valuePropName="checked" rules={[{required: true}]}>
            <Checkbox
              onChange={(e) => {
                  setStockEnabled(e.target.checked) 
                }}
            />
          </Form.Item>
          <Form.Item label="Cantidad" name="amount" id="amount" rules={[{required: true}]}>
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
      {contextHolder}
    </Space>
  )
}

export default Products
