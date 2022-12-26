import { Box, Typography } from "@mui/material";
import { MapTracing } from "../components/MapTracing";
import { StepperTracing } from "../components/StepperTracing";
import { useAppSelector } from "../../store/hooks/hooks";
import { Navigate } from 'react-router-dom'
import Logo from '../assets/Logo.svg'
import bg from '../assets/bg.png';
import Footer from '../components/Footer';

export const TracingPage = () => {
  const { clientName, clientReference, time, orderStatus } = useAppSelector(state => state.client)

  return (
    ( orderStatus === 'sending' )
    ?
      <Box    
        sx={{
          display: 'flex',       
          flexDirection: 'column',
          backgroundImage: `url(${bg})`,
          justifyContent: 'space-between',
          minHeight: '100vh'
        }}
      >       
        <Box
          display='flex'
          maxWidth="xl"
          sx={{mx: {xl: 'auto'},}}
          flexDirection={{xs: 'column', sm: 'row'}}
        >
          <Box
            width={{xs: '90%', sm:'40%'}}
            sx={{
              mt: {xs: '1rem', md: '2rem'}, 
              pr: {xs: 0, md: '2rem'},
              ml: '1rem'
            }}
          >
            <Box
              display='flex'
              flexDirection='column'
              textAlign='center'
              justifyContent='center'
              paddingBottom='2rem'
            >
              <Box>
                <img src={Logo} alt="logo" />
              </Box>
              <Typography
                fontSize={{xs: 20, md: 30}}
                fontWeight='bold'
                color='secondary'
              >
                Seguimiento de Pedido
              </Typography>
            </Box>

            <Box
              display='flex'
              flexDirection='column'
            >
              <Typography
                fontSize={{xs: 16, md: 22}}
              >
                Hora que realizo el pedido
              </Typography>
              <Typography
                fontSize={{xs: 16, md: 22}}
                sx={{color: 'warning.main'}}
              >
                {time}
              </Typography>

              <StepperTracing />

              <Typography
                fontSize={{xs: 10, md: 14}}
                sx={{color: 'info.main'}}
                mb={5}
              >
                (Version en desarrollo, presione "NEXT" para simular el progreso del pedido)
              </Typography>
              
              <Typography
                fontSize={{xs: 10, md: 14}}
                sx={{color: 'info.main'}}
              >
                Realizo el pedido:
              </Typography>
              <Typography
                fontSize={{xs: 13, md: 16}}
                mb='1rem'
              >
                {clientName}
              </Typography>

              <Typography
                fontSize={{xs: 10, md: 14}}
                sx={{color: 'info.main'}}
              >
                Referencia:
              </Typography>
              <Typography
                fontSize={{xs: 13, md: 16}}
              >
                {clientReference}
              </Typography>
            </Box>
          </Box>

          <Box
            display='flex'
            width={{xs: '100%', sm:'60%'}}
            sx={{
              px: '0.5rem' 
            }}
          >
            <MapTracing />
          </Box>
        </Box>

        <Footer />
      </Box>
    : <Navigate to="/menu" />
  )
}