import { AreaChart } from '@tremor/react';
import { Typography } from 'antd';

const chartData = [
  {
    fecha: 'Enero 2024',
    Ventas: Math.floor(Math.random() * 100),
  },
  {
    fecha: 'Febrero 2024',
    Ventas: Math.floor(Math.random() * 100),
  },
  {
    fecha: 'Marzo 2024',
    Ventas: Math.floor(Math.random() * 100),
  },
  {
    fecha: 'Abril 2024',
    Ventas: Math.floor(Math.random() * 100),
  },
  {
    fecha: 'Mayo 2024',
    Ventas: Math.floor(Math.random() * 100),
  },
  {
    fecha: 'Junio 2024',
    Ventas: Math.floor(Math.random() * 100),
  },
  {
    fecha: 'Julio 2024',
    Ventas: Math.floor(Math.random() * 100),
  },
  {
    fecha: 'Agosto 2024',
    Ventas: Math.floor(Math.random() * 100),
  },
  {
    fecha: 'Septiembre 2024',
    Ventas: Math.floor(Math.random() * 100),
  },
  {
    fecha: 'Octubre 2024',
    Ventas: Math.floor(Math.random() * 100),
  },
  {
    fecha: 'Noviembre 2024',
    Ventas: Math.floor(Math.random() * 100),
  },
  {
    fecha: 'Diciembre 2024',
    Ventas: Math.floor(Math.random() * 100),
  },
]

const valueFormatter = (value: number) => `${value}`;

const SellsChart = () => {
  return (
    <>
      <Typography.Title level={4}>Ventas mensuales</Typography.Title>
      <p className="text-tremor-metric text-gray-500 font-semibold">{ Math.floor(Math.random() * 1200)}</p>
      <AreaChart
        className="mt-4 h-72"
        data={chartData}
        index="fecha"
        yAxisWidth={65}
        categories={['Ventas']}
        colors={['indigo']}
        valueFormatter={valueFormatter}
      />
    </>
  )
}

export default SellsChart 
