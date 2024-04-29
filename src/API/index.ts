import { ProductFormProps, UserFormProps, iUser } from "../types/types"

export const getOrders = async () => {
  const response = await fetch("/api/order")
    return await response.json()
}

// USUARIOS
export const getUsers = async () => {
  const response = await fetch("/api/user")
    return await response.json()
}

export const postUser = async (values: UserFormProps) => {
  const response = await fetch("/api/user", {
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
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
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    return response
}

// PRODUCTOS
export const getProducts = async () => {
  const response = await fetch("/api/product")
    return await response.json()
}

export const postProduct = async (values: ProductFormProps) => {
  const response = await fetch("/api/product", {
    method: "POST",
    headers:{
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
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  })
    return response
}
