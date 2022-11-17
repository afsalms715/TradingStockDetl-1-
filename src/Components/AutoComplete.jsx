import {useState,useEffect,useContext} from 'react'
import FinnHub from '../apis/FinnHub'
import {watchListContext} from '../context/WatchListcontext'

export const AutoComplete=()=>{
  const[search,setSearch]=useState("")
  const[results,setResult]=useState([])
  const {addStock}=useContext(watchListContext)
  useEffect(()=>{
    let isMounted=true
    const fetchData=async ()=>{
      try{
        const response=await FinnHub.get("/search",{
          params:{
            q:search
          }
        })
        console.log(response)
        if(isMounted){
          setResult(response.data.result)
        }
        console.log(results)
      }
      catch(err){ 
        console.log(err)
      }
    }
    if(search.length>0){
      fetchData()
    }
    else{
      setResult([])
    }
    return ()=>(isMounted=false)
  },[search])

  const renderDropDown=()=>{
    const showOrNot=search ? "show" : null;
    return(
      <ul style={{
        maxHeight:"500px",
        overflowY:"scrol",
        overflowX:"hidden",
        cursor:"pointer"
      }} className={`dropdown-menu ${showOrNot}`}>
        {results.map((dt)=>{
        if(dt.symbol.includes('.')==false){
          return(
              <li key={dt.symbol} onClick={()=>{
                  addStock(dt.symbol)
                  setSearch("")
              }} className="dropdown-item">
                {dt.description}({dt.symbol})
              </li>
            )
        }
        })}
      </ul>
    )
  }
  
  return(
    <div className="w-50 p-4 mx-auto rounded border">
      <div className="form-floating dropdown">       
        <input style={{backgroundColor:"rgba(145,158,171,0.04)"}} className="form-control" id="search" type="text" autoComplete="off" placeholder="search" value={search} onChange={(e)=>setSearch(e.target.value)} />
        <label style={{color:"gray"}} htmlFor="search">Search</label>
        {renderDropDown()}
      </div>
    </div>
  )
}