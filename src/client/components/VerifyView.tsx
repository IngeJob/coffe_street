import { Box, Button, CardMedia, IconButton, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowCircleLeft } from '@mui/icons-material';
import { useAppSelector } from '../../store/hooks/hooks';
import { Navigate } from 'react-router-dom'
import { resendEmail } from '../hooks/resendEmail';

import Logo from '../../client/assets/Logo.svg'
import verifyImg from '../assets/verify.jpg'

export const VerifyView = () => {
  const { status } = useAppSelector(state => state.auth)

  const handleResendEmail = async ()  =>{
    const res = await resendEmail()
    console.log('Response: ', res.msg)
  }

  return (
    status === 'authenticated'
    ? 
      <Box
        display='flex'
        flexGrow='1'
        width='100%'
        sx={{
          mt: '1vh',
          pl: '1vw',
          flexDirection: 'column',
        }}
      >
        <Box>
          <Link
            component={RouterLink}
            to='/home'
            underline="hover"         
          >
            <IconButton >
              <ArrowCircleLeft 
                color='secondary' 
                sx={{fontSize: '2rem'}} 
              />
            </IconButton>
          </Link>
        </Box>

        <Box
          display='flex'
          sx={{
            mt: '0.5rem',
            mb: '15vh',
            px: {xs: '1rem', sm: '4rem', md:'7rem'},
            height: '100%',
            flexDirection: 'column',
          }}
        >
          <Box
            display='flex'
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={Logo} alt="logo" />
            <Typography
              fontWeight='bold'
              mb={{xs: '1rem', md: '2.5rem'}}
              sx={{
                fontSize: {xs: '25px', sm: '30px', md:'40px'}
              }}
            >
              Verificación de cuenta
            </Typography> 
          </Box>

          <Box
            display='flex'
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              mb={{xs: '1rem', md: 0}}
              color='info.main'
              pb='2rem'
              sx={{
                fontSize: {xs: '14px', sm: '18px', md:'24px'}
              }}
            >
              Por favor para continuar con su compra revise su correo electrónico (bandeja de entrada o correo no deseado) y de clic al enlace para verificar su cuenta
            </Typography> 
            <Button
              variant='contained'
              color='primary'
              onClick={handleResendEmail}
              sx={{
                color: '#fff',
                fontSize: {xs: 9, sm: 14, md: 16},
                mb: '3rem'
              }}
            >
              Volver a enviar correo de verificación 
            </Button>
            <CardMedia
            component='img'
            image={verifyImg}
            height= '95%'
            alt="verifyImg"
            sx={{
              objectFit: 'fill', 
              mt: {sm: '1rem', md: 0}, 
              width: {xs: '90%', sm: '90%', md: '40%'}
            }}
          />
          </Box> 
        </Box> 
      </Box>
    : <Navigate to="/auth/login" />
  )
}  