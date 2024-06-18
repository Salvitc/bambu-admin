import { ProductFormProps, UserFormProps, iProduct, iUser, iInvoice } from "../types/types"

//PEDIDOS
export const getOrders = async (): Promise<iInvoice[]> => {
  const response = await fetch("/api/order")
  return await response.json()
}

export const getOrdersByDateRange = async (dates: string[]) => {
  const response = await fetch(`/api/order/dates/${dates[0]}/${dates[1]}`)
  return await response.json()
}

// USUARIOS
export const getUsers = async (): Promise<iUser[]> => {
  const response = await fetch("/api/user")
  return await response.json()
}

export const postUser = async (values: UserFormProps) => {
  const user: iUser = {
    lastname: values.lastname,
    username: values.username,
    email: values.email,
    password: values.password!,
    role: {
      code: 'ADMIN'
    },
    address: values.address,
    name: values.name
  }
  const response = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  return response
}

export const deleteUser = async (id: string) => {
  const response = await fetch(`/api/user/${id}`, {
    method: "DELETE"
  })
  return response
}

export const updateUser = async (values: UserFormProps, id: string) => {
  const user: iUser = {
    _id: id,
    name: values.name,
    lastname: values.lastname,
    username: values.username,
    email: values.email,
    role: {
      code: values.role
    },
    address: values.address
  }
  const response = await fetch(`/api/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  return response
}

export const logoutUser = async () => {
  const response = await fetch('/api/logout', {
    method: 'POST',
  });

  return response
}

// PRODUCTOS
export const getProducts = async (): Promise<iProduct[]> => {
  const response = await fetch("/api/product")
  return await response.json()
}

export const postProduct = async (values: ProductFormProps) => {
  const response = await fetch("/api/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  })
  return response
}

export const deleteProduct = async (id: string) => {
  const response = await fetch(`/api/product/${id}`, {
    method: "DELETE"
  })
  return response
}

export const updateProduct = async (values: ProductFormProps, id: string) => {
  const response = await fetch(`/api/product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  })
  return response
}
