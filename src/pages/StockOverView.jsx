import { AutoComplete } from '../Components/AutoComplete'
import { StockList } from '../Components/StockList'
import trdimg from "../images/trdimg.jpg"
const StockOverView = () => {
  return (
    <div>
      <div className='text-center'>
        <img src={trdimg} width='200px;' />
        <h5>Charts View</h5>
      </div>
      <AutoComplete />
      <StockList />
    </div>
  )
}
export default StockOverView