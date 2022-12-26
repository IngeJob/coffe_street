import { Box } from '@mui/material'
import { FormImg } from '../components/FormImg'
import { FormLogin } from '../components/FormLogin'
import loginImg from '../assets/loginImg.jpg';

export const LoginPage = () => {
  return (
    <Box 
      sx={{
        backgroundColor: 'success.main',
        minHeight: '100vh'
      }}
    >       
      <Box 
        maxWidth='xl'
        display='flex'
        sx={{
          mx: 'auto',
        }}
      >
        <FormLogin />
        <FormImg imagen={loginImg} />
      </Box>
    </Box>
  )
}
