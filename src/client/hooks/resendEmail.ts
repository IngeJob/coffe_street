import axios from 'axios';

export const resendEmail = async () => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { 
      token
    },
  }
  const url = 'https://coffe-store-api.vercel.app/users/resendEmail'
  const response = await axios.get( url, config)
  try{
    return response.data
  } catch(err){
    console.log('error: ', err)
  }
  
}