import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import StockDetl from './pages/StockDetl'
import StockOverView from './pages/StockOverView'
import {WatchListProvider} from './context/WatchListcontext'

export default function App() {
  return (
    <main className="container">
      <WatchListProvider>
        <Router>
          <Routes>
          <Route path='/' element={<StockOverView/>}></Route>
            <Route path='/StockDetl/:symbol' element={<StockDetl/>}/>
          </Routes>
        </Router>
      </WatchListProvider>
    </main>
  )
}
