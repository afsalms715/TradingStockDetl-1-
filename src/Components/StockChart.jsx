import Chart from 'react-apexcharts'
import { useState } from "react"

const StockChart = ({ chartData, symbol }) => {
  console.log(chartData)
  const { day, weak, year } = chartData
  const [dateFormat, setDateFormat] = useState("24h")

  const getData = () => {
    switch (dateFormat) {
      case "24h":
        return day
      case "W":
        return weak
      case "M":
        return year
      default:
        return day
    }
  }
  const color = getData()[getData().length - 1].y - getData()[0].y
    > 0 ? "#26C281" : "#ed3419";

  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px"
      }
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300
      }
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false
      }
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM"
      }
    }
  }

  const series = [{
    name: symbol,
    data: getData()
  }]

  const selectedButton = (button) => {
    console.log("btn:" + button + "dateFormat:" + dateFormat)
    if (button === dateFormat) {
      return "btn btn-primary me-1";
    } else {
      return "btn btn-outline-primary me-1";
    }
  }

  return (
    <div className="mt-3 p-4 shadow-sm bg-white" style={{ width: '80%' }}>
      <Chart options={options} series={series} type="area" width="100%" />
      <div className="mt-1">
        <button onClick={() => setDateFormat("24h")} className={selectedButton("24h")} >24h</button>
        <button onClick={() => setDateFormat("M")} className={selectedButton("M")}>M</button>
        <button onClick={() => setDateFormat("W")} className={selectedButton("W")}>Y</button>
      </div>
    </div>
  )
}
export default StockChart