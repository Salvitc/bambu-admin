import { DonutChart, Legend } from "@tremor/react";
import { Typography } from "antd";

const ProductsChart = () => {
  return (
    <>
      <Typography.Title level={4}>Productos por categoría</Typography.Title>
      <div className="flex items-center justify-center space-x-6 mt-10">
      <DonutChart
        className="w-full h-72"
        variant="pie"
        data={[
          { name: "Flores", value: Math.floor(Math.random() * 100) },
          { name: "Jardinería", value: Math.floor(Math.random() * 100) },
          { name: "Otros", value: Math.floor(Math.random() * 100) },
          { name: "Encargos", value: Math.floor(Math.random() * 100) },
        ]}
        colors={['blue', 'cyan', 'indigo', 'violet']}
        valueFormatter={(value: number) => `${value} productos`} />
      <Legend 
        categories={['Flores', 'Jardinería', 'Otros', 'Encargos']}
        colors={['blue', 'cyan', 'indigo', 'violet']}
        className="max-w-xs"
      />
      </div>
    </>
  )
}

export default ProductsChart

