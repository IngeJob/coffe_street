import { Box } from '@mui/material'
import { FormImg } from '../components/FormImg'
import { FormRegister } from '../components/FormRegister';
import registerImg from '../assets/registerImg.jpg';

export const RegisterPage = () => {
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
        <FormImg imagen={registerImg} />
        <FormRegister />
      </Box>
    </Box>
  )
}
