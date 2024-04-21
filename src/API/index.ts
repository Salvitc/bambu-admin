export const getOrders = async () => {
  const response = await fetch("https://dummyjson.com/carts/1")
    return await response.json()
}

export const getProducts = async () => {
  const response = await fetch("https://dummyjson.com/products")
    return await response.json()
}
