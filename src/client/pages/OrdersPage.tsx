import { useEffect, useState } from 'react'
import { Box, IconButton, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { OrderCard } from '../components/OrderCard';
import { getOrdersByUser } from '../hooks/getOrdersByUser'
import { ArrowCircleLeft } from '@mui/icons-material';
import bg from '../assets/bg.png';
import Logo from '../../client/assets/Logo.svg'
import { ordersByUserProps } from '../features/types';

export const OrdersPage = () => {
  const [ orders, setOrders ] = useState(Array<ordersByUserProps>)
  const [ msg, setMsg ] = useState('')

  useEffect(() => {
    const ordersByUser = async ()  =>{
      const res = await getOrdersByUser()
      if (!res.success){
        console.log('Error al obtener la data')
      }
       setOrders(res.data)
       setMsg('Aún no realiza una orden')
    }
    ordersByUser()
  }, [])

  return (
    <Box 
      sx={{
        backgroundColor: 'success.main',
        minHeight: '100vh',
        backgroundImage: `url(${bg})`,
      }}
    >       
      <Box 
        maxWidth='xl'
        display='flex'
        sx={{
          mx: 'auto',
        }}
      >
        <Box
          display='flex'
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
                justifyContent: 'center'
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
                Tus órdenes
              </Typography> 
            </Box>
            
            <Box
              display='flex'
              sx={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {      
              orders.length === 0
                ? 
                  <p>{msg}</p>
                : 
                  <>
                    {orders.map( (order, index) =>  
                      <OrderCard  
                        key={index}
                        order={order} 
                      />
                    )}
                  </>
              }
            </Box>  
              
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
