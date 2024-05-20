import { Button, Form, Input, Modal, Space, Table, TableProps, Typography } from "antd"
import React, { useEffect } from "react"
import { UserFormProps, iUser } from "../types/types"
import { deleteUser, getUsers, postUser, updateUser } from "../API"

const User = () => {
  const [users, setUsers] = React.useState<iUser[]>([])
  const [loadingUsers, setLoadingUsers] = React.useState<boolean>(true)
  const [modal, contextHolder] = Modal.useModal() 
  const [refresh, setRefresh] = React.useState(false)

  const columns: TableProps<iUser>['columns'] = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Apellido',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Usuario',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: "Dirección",
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, user: iUser) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(user)}className="text-blue-700 bg-blue-50 rounded-lg border border-blue-200">Editar</Button>
          <Button onClick={() => handleDelete(user._id!)} className="text-red-700 bg-red-50 rounded-lg border border-red-200">Eliminar</Button>
        </Space>
      ),
    },
   ]

  const handleEdit = (user: iUser) => {
    modal.confirm({
      title: 'Editar usuario',
      okText: 'Editar',
      cancelText: 'Cancelar',
      okButtonProps: {
        form: 'update_user',
        htmlType: 'submit'
      },
      content: (
        <Form
          id="update_user"
          labelCol={{span: 6}}
          wrapperCol={{span: 16}}
          layout="horizontal"
          style={{maxWidth: 1200}}
          onFinish={(values: UserFormProps) => {
            updateUser(values, user._id!)
              .then((response: any) => {
                if (response.ok) {
                  modal.success({
                    content: 'usuario actualizado correctamente'
                  })
                  setRefresh(!refresh)
                } else {
                  modal.error({
                    content: (
                      <>
                        <h1>Error al actualizar el usuario</h1>
                        <p>{response.statusText}</p>
                      </>
                    )
                  })
                }
              })
              .catch((error: any) => {
                modal.error({
                  content: (
                    <>
                      <h1>Error al actualizar el usuario</h1>
                      <p>{error}</p>
                    </>
                  )
                })
              })
          }}
          initialValues={{
            name: user.name,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            role: user.role.code,
            address: user.address
          }}
        >
          <Form.Item label="Nombre" name="name" rules={[{required: true, message: 'Introduce un nombre.'}]}>
            <Input className="rounded-lg"/>
          </Form.Item>
          <Form.Item label="Apellidos" name="lastname" rules={[{required: true, message: 'Añade los apellidos'}]}>
            <Input className="rounded-lg"/>
          </Form.Item>
          <Form.Item label="Usuario" name="username" rules={[{required: true, message: 'Añade el nombre de usuario'}]}>
            <Input className="rounded-lg"/>
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{required: true, message: 'Añade el email'}]}>
            <Input className="rounded-lg"/>
          </Form.Item>
          <Form.Item label="Dirección" name="address" rules={[{required: true, message: 'Añade la dirección'}]}>
            <Input className="rounded-lg"/>
          </Form.Item>
          <Form.Item name="role"/>
        </Form>
      )
    })
  }
  
  const handleDelete = (id: string) => {
    modal.confirm({
      title: '¿Estás seguro de eliminar este usuario?',
      content: 'Esta acción no se puede deshacer',
      okType: "danger",
      onOk: () => {
        deleteUser(id)
          .then((response) => {
            if (response.ok) {
              modal.success({
                content: 'usuario eliminado correctamente'
              })
              setRefresh(!refresh)
            } else {
              modal.error({
                content: (
                  <>
                    <h1>Error al eliminar el usuario</h1>
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
                  <h1>Error al eliminar el usuario</h1>
                  <p>{error}</p>
                </>
              )
            })
          })
        }
    })
  }
  
  const handleCreateAdmin = () => {
    modal.confirm({
      title: 'Crear administrador',
      okText: 'Crear',
      cancelText: 'Cancelar',
      okButtonProps: {
        form: 'create_admin',
        htmlType: 'submit'
      },
      content: (
        <Form
          id="create_admin"
          labelCol={{span: 8}}
          wrapperCol={{span: 20}}
          layout="horizontal"
          style={{maxWidth: 1200}}
          onFinish={(values: UserFormProps) => {
            console.log(values)
            postUser(values)
              .then((response: any) => {
                if (response.ok) {
                  modal.success({
                    content: 'administrador creado correctamente'
                  })
                  setRefresh(!refresh)
                } else {
                  modal.error({
                    content: (
                      <>
                        <h1>Error al crear el administrador</h1>
                        <p>{response.statusText}</p>
                      </>
                    )
                  })
                }
              })
              .catch((error: any) => {
                modal.error({
                  content: (
                    <>
                      <h1>Error al crear el administrador</h1>
                      <p>{error}</p>
                    </>
                  )
                })
              })
          }}
        >
          <Form.Item label="Nombre" name="name" rules={[{required: true, message: 'Introduce un nombre.'}]}>
            <Input className="rounded-lg"/>
          </Form.Item>
          <Form.Item label="Apellidos" name="lastname" rules={[{required: true, message: 'Añade los apellidos'}]}>
            <Input className="rounded-lg"/>
          </Form.Item>
          <Form.Item label="Usuario" name="username" rules={[{required: true, message: 'Añade el nombre de usuario'}]}>
            <Input className="rounded-lg"/>
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{required: true, message: 'Añade el email'}]}>
            <Input className="rounded-lg"/>
          </Form.Item>
          <Form.Item label="Dirección" name="address" rules={[{required: true, message: 'Añade la dirección'}]}>
            <Input className="rounded-lg"/>
          </Form.Item>
          <Form.Item label="Contraseña" name="password" rules={[{required: true, message: 'Añade una contraseña'}]}>
            <Input className="rounded-lg" type="password"/>
          </Form.Item>
          <Form.Item name="role"/>
        </Form>
      )
    })
  }

  useEffect(() => {
    setLoadingUsers(true)
    getUsers().then((data) => {
      setUsers(data)
      setLoadingUsers(false)
      console.log(data)
    })
  }, [refresh])

  return (
    <Space direction="vertical" className="px-12 py-6 w-full">
      <Space direction="vertical" className="mb-14">
        <Typography.Title level={3}>Clientes</Typography.Title>
        <Table 
          columns={columns}
          dataSource={users.filter(user => user.role.code === 'CUSTOMER')}
          loading={loadingUsers}
        />
      </Space>
      <Space direction="vertical">
        <Space direction="horizontal" className="flex justify-between">
          <Typography.Title level={3}>Administradores</Typography.Title>
          <Button className="text-green-700 bg-green-50 rounded-lg border border-green-200" onClick={handleCreateAdmin}>Crear admin</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={users.filter(user => user.role.code=== 'ADMIN')}
          loading={loadingUsers} 
        />
      </Space>
      {contextHolder}
    </Space>
   )
}

export default User 
