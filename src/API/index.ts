import { FormProps } from "../types/types"

export const getOrders = async () => {
  const response = await fetch("https://dummyjson.com/carts/1")
    return await response.json()
}

export const getProducts = async () => {
  const response = await fetch("https://dummyjson.com/products")
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
