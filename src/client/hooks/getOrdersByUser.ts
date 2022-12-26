import axios from 'axios';

export const getOrdersByUser = async () => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { 
      token
    },
  }
  const url = 'https://coffe-store-api.vercel.app/order/ordersByUser'
  const response = await axios.get( url, config)
  try{
    return response.data
  } catch(err){
    console.log('error: ', err)
    return null
  }
  
}