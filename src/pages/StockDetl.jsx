import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import FinnHub from '../apis/FinnHub'
import StockChart from '../Components/StockChart'
import { StockData } from '../Components/StockData'

const formateData = (data) => {
  return data.t.map((el, index) => {
    return {
      x: el * 1000,
      y: Math.floor(data.c[index])
    }
  })
}

const StockDetl = () => {
  const { symbol } = useParams()
  const [chartData, setChartData] = useState()
  useEffect(() => {
    const date = new Date()
    const currentTime = Math.floor(date.getTime() / 1000)
    let fromOneDay;
    let fromWeakDay;
    let fromYearDay;
    if (date.getDay() == 0) {
      fromOneDay = currentTime - 3 * 60 * 60 * 24
    } else if (date.getDay() == 6) {
      fromOneDay = currentTime - 2 * 60 * 60 * 24
    } else {
      fromOneDay = currentTime - 60 * 60 * 24
    }
    fromWeakDay = 7 * 60 * 60 * 24
    fromYearDay = 367 * 60 * 60 * 24
    const fromDay = [{ from: fromOneDay, resul: 30 }, { from: fromWeakDay, resul: 60 }, { from: fromYearDay, resul: "W" }]
    console.log(date.getDay())
    console.log(currentTime)
    const FetchData = async () => {
      const responses = await Promise.all(fromDay.map((from) => {
        console.log(from)
        return FinnHub.get("/stock/candle", {
          params: {
            symbol,
            resolution: from.resul,
            from: from.from,
            to: currentTime,
          }
        })
      }))
      console.log(responses)
      setChartData({
        day: formateData(responses[0].data),
        year: formateData(responses[1].data),
        weak: formateData(responses[2].data)
      })
    }
    FetchData()
  }, [symbol])
  useEffect(() => {
    console.log("chart data")
    console.log(chartData)
  }, [chartData])

  return (chartData && (
    <div style={{ display: 'flex', justifyContent: 'center', height: '95vh' }}>
      <StockChart chartData={chartData} symbol={symbol} />
      <StockData symbol={symbol} />
    </div>)
  )
}
export default StockDetl