import { FormProps } from "../types/types"

export const getOrders = async () => {
  const response = await fetch("/api/order")
    return await response.json()
}


// PRODUCTOS
export const getProducts = async () => {
  const response = await fetch("/api/product")
    return await response.json()
}

export const postProduct = async (values: FormProps) => {
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

export const updateProduct = async (values: FormProps, id: string) => {
  const response = await fetch(`/api/product/${id}`, {
    method: "PUT",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  })
    return response
}
