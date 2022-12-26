import axios from 'axios';

interface avatarProps {
  avatar: string | File,
  username: string
}

export const submitAvatar = async ({avatar , username}: avatarProps) => {
  const data = new FormData();
  data.append('image', avatar);
  data.append('username', username);
  const config = {
    headers: { 
      'Content-Type': 'multipart/form-data'
    },
  }
  const url = 'https://coffe-store-api.vercel.app/users/avatar'
  const dataSend = data
  const response = await axios.post( url, dataSend, config)
  try{
    const axiosResponse = await response;
    const jsonData = axiosResponse.data;
    if(!jsonData.success){
      console.log('Error al subir la imagen')
    } else{
      console.log('Se actualizo la imagen')
    }
    return jsonData
  } catch(err){
    console.log('error: ', err)
  }
}