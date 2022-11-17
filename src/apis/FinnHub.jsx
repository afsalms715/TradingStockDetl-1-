import axios from 'axios'
const TOKEN="cdfc1laad3i8a4q8vhm0cdfc1laad3i8a4q8vhmg";
export default axios.create({
  baseURL:"https://finnhub.io/api/v1",
  params:{
    token:TOKEN,
  }
})