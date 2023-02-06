import { useState, useEffect } from 'react'
import finnhub from '../apis/FinnHub'
export const StockData = ({ symbol }) => {
  const [stockData, setStockData] = useState()
  let isMounted = true
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const responce = await finnhub.get("/stock/profile2", {
          params: {
            symbol
          }
        })
        console.log(responce.data)
        if (isMounted) {
          setStockData(responce.data)
        }
        console.log(stockData)
      } catch (err) {
        console.log(err)
      }
    }
    fetchdata()
    return () => (isMounted = false);
  }, [symbol])
  return <div>
    {stockData && (
      <div className='row border bg-white rounded p-4 mt-5'>
        <div className='col'>
          <div>
            <span className='fw-bold'>Name:</span>
            {stockData.name}
          </div>
          <div>
            <span className='fw-bold'>Country:</span>
            {stockData.country}
          </div>
          <div>
            <span className='fw-bold'>Ticker:</span>
            {stockData.ticker}
          </div>
        </div>
        <div className='col'>
          <div>
            <span className='fw-bold'>Exchange:</span>
            {stockData.exchange}
          </div>
          <div>
            <span className='fw-bold'>Industry:</span>
            {stockData.finnhubIndustry}
          </div>
          <div>
            <span className='fw-bold'>IPO:</span>
            {stockData.ipo}
          </div>
        </div>
        <div className='col'>
          <div>
            <span className='fw-bold'>MarketCap:</span>
            {stockData.marketCapitalization}
          </div>
          <div>
            <span className='fw-bold'>Shares Outstanding:</span>
            {stockData.shareOutstanding}
          </div>
          <div>
            <span className='fw-bold'>URL:</span>
            <a href={stockData.weburl}>{stockData.weburl}</a>
          </div>
        </div>
      </div>
    )}
  </div>
}