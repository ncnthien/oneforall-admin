/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const API_URL = 'http://localhost:5000/api'

const mapData = (chartData: any) => {
  const { statistics } = chartData
  const data = statistics.map((item: any) => item.total)
  const labels = statistics.map((item: any) =>
    moment().month(item.month).format('MMMM')
  )

  return {
    data,
    labels,
  }
}

export const useChartData = (year: number) => {
  const [chartData, setChartData] = useState({
    data: [],
    labels: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data: chartData } = await axios.get(
        `${API_URL}/statistical?year=${2022}`
      )
      setChartData(mapData(chartData))
    }
    fetchData()
  }, [year])

  return chartData
}
