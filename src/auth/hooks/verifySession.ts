import axios from 'axios';

export const verifySession = async () => {

  const token = localStorage.getItem('token')
  if (token === null ) return null
  
  const config = {
    headers:  {token} ,
  }
  const url = 'https://coffe-store-api.vercel.app/users/verify'
  const response = await axios.post( url, {}, config)
  try{
    const jsonData = await response.data;
    if (jsonData.status === 401) {
      localStorage.removeItem('token')
      return null
    }
    return jsonData
  } catch(err){
    console.log('error: ', err)
    return null
  }
}