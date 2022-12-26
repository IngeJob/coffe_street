import axios from 'axios';
import { FieldValues } from 'react-hook-form';

export const updateProfile = async (data: FieldValues) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { 
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token
    },
  }
  const url = 'https://coffe-store-api.vercel.app/users/profile'
  const dataSend = JSON.stringify(data)
  const response = await axios.put( url, dataSend, config)
  try{
    const axiosResponse = await response;
    const jsonData = axiosResponse.data;
    return jsonData
  } catch(err){
    console.log('error: ', err)
  }
  
}