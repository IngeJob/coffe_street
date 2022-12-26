import axios from 'axios';
import { FieldValues } from 'react-hook-form';

export const submitLogin = async (data: FieldValues) => {
  const config = {
    headers: { 
      Accept: 'application/json',
      'Content-Type': 'application/json', 
    },
  }
  const url = 'https://coffe-store-api.vercel.app/users/login'
  const dataSend = JSON.stringify(data)
  const response = await axios.post( url, dataSend, config)
  
  try{
    const axiosResponse = await response;
    const jsonData = axiosResponse.data
    if(!jsonData.success){
      console.log('Error al iniciar de sesion')
    } else {
      localStorage.setItem('token', jsonData.token)
    }
    return jsonData
  } catch(err){
    console.log('error: ', err)
    return null
  }
}