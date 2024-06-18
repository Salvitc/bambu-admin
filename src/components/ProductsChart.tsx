import { DonutChart, Legend } from "@tremor/react";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { getProducts } from "../API";

const ProductsChart = () => {
  const [productsJardineria, setProductsJardineria] = useState<number>(0)
  const [productsFlores, setProductsFlores] = useState<number>(0)

  useEffect(() => {
    getProducts()
      .then((products) => {
        console.log(products)
        const flores = products.filter((product) => product.category === "flores").reduce((acc, _) => acc + 1, 0)
        setProductsFlores(flores)

        const jardineria = products.filter((product) => product.category === "jardinería").reduce((acc, _) => acc + 1, 0)
        setProductsJardineria(jardineria)

        console.log(flores + " " + jardineria)
      });

  }, [])

  return (
    <>
      <Typography.Title level={4}>Productos por categoría</Typography.Title>
      <div className="flex items-center justify-center space-x-6 mt-10">
        <DonutChart
          className="w-full h-72"
          variant="pie"
          data={[
            { name: "Flores", value: productsFlores },
            { name: "Jardinería", value: productsJardineria },
          ]}
          colors={['blue', 'cyan']}
          valueFormatter={(value: number) => `${value} productos`} />
        <Legend
          categories={['Flores', 'Jardinería']}
          colors={['blue', 'cyan', 'indigo', 'violet']}
          className="max-w-xs"
        />
      </div>
    </>
  )
}

export default ProductsChart

