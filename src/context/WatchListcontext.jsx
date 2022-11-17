import {createContext,useState} from 'react'

export const watchListContext=createContext();

export const WatchListProvider=(props)=>{
  const[watchList,setWatchList]=useState(JSON.parse(localStorage.getItem('watchList'))||["GOOGL","MSFT","AMZN"])
  //JSON.parse(localStorage.getItem('watchList'))||
  const addStock=(stock)=>{
    if(watchList.indexOf(stock)===-1){
      setWatchList([...watchList,stock])
      localStorage.setItem('watchList',JSON.stringify([...watchList,stock]))
    }
  }

  const deleteStock=(stock)=>{
    setWatchList(watchList.filter((el)=>{
      return el !==stock
    }))
    localStorage.setItem('watchList',JSON.stringify(watchList))
  }
  return(
    <watchListContext.Provider value={{watchList,addStock,deleteStock}}>
      {props.children}
    </watchListContext.Provider>
  )
}

