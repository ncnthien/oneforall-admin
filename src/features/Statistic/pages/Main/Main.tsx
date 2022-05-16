import React, { useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useChartData } from 'hooks/useChartData'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const getOptions = (year: number) => ({
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: `Thống kê booking trong năm ${year}`,
    },
  },
})

const Main: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const { data, labels } = useChartData(currentYear)

  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: 'Total',
          data: data,
          backgroundColor: 'rgba(34, 211, 238, 0.7)',
        },
      ],
    }),
    [data, labels]
  )

  return <Bar options={getOptions(currentYear)} data={chartData} />
}

export default Main
