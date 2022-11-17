import {useState,useEffect,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import FinnHub from '../apis/FinnHub'
import { BsFillCaretUpFill } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import {watchListContext} from '../context/WatchListcontext'

export const StockList=()=>{
  const[stock,setStock]=useState([])
  const {watchList}=useContext(watchListContext)
  const navigate=useNavigate()
  console.log(watchList)
  const changeColor=(change)=>{
    return change > 0 ? "success" : "danger"
  }
  const changeIcon=(change)=>{
    return change > 0 ? <BsFillCaretUpFill/>:<BsFillCaretDownFill/>
  }
  const handleStockClick=(symbol)=>{
    navigate(`/StockDetl/${symbol}`)
  }
  useEffect(()=>{
    let isMounted=true
    const fetchData= async ()=>{
        console.log("inside fetchData")
        try{         
          const responses= await Promise.all(watchList.map((stocks)=>{
            return FinnHub.get("/quote",{
              params:{
                symbol:stocks
              }
            })
          }))
          const data=responses.map((resp)=>{
            return{
              data:resp.data,
              symbol:resp.config.params.symbol
            }
          })
          console.log(data)
          if(isMounted){
            setStock(data)
          }         
        }catch(err){
          console.log("error")
          console.log(err)
        }      
      }
      fetchData()
      return ()=>(isMounted=false)
    },[watchList])  
  return(
    <div>
      <table className="table table-hover mt-5">
        <thead style={{color:"rgb(79,89,102)"}}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            stock.map((data)=>{
              return(
                <tr style={{cursor:"pointer"}} onClick={()=>handleStockClick(data.symbol)} className="table-row" key={data.symbol}>
                  <th scope="row">{data.symbol}</th>
                  <td>{data.data.c}</td>
                  <td className={`text-${changeColor(data.data.d)}`}>{data.data.d}{changeIcon(data.data.d)}</td>
                  <td className={`text-${changeColor(data.data.dp)}`}>{data.data.dp}{changeIcon(data.data.dp)}</td>
                  <td>{data.data.h}</td>
                  <td>{data.data.l}</td>
                  <td>{data.data.o}</td>
                  <td>{data.data.pc}</td>
                  <td><button className='btn btn-danger btn-sm d-inline-block ml-3 delete-button'>Remove</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}