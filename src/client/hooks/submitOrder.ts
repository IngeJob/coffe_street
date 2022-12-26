import axios from 'axios';
import { clientProps } from '../../store/client/clientSlice';

export const submitOrder = async (data: clientProps) => {
  const token = localStorage.getItem('token')

  const config = {
    headers: { 
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token,
    },
  }
  const url = 'https://coffe-store-api.vercel.app/order/register'
  const dataSend = JSON.stringify(data)
  const response = await axios.post( url, dataSend, config)
  try{
    const jsonData = await response.data;
    if(!jsonData.success){
      console.log('Error al hacer la compra')
    }
    return jsonData
  } catch(err){
    console.log('error: ', err)
  }
}