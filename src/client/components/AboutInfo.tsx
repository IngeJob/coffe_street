import { Avatar, Box, Button, Link, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { ShoppingCartOutlined as CartIcon } from '@mui/icons-material/';

export const AboutInfo = () => {
  return (
    <Box
      display='flex'
      flexGrow={'1'}
      width='100%'
      pl={{ xs: 0, sm: '3rem', md: '4rem' }}
      sx={{
        mt: { xs: '1rem', sm: '3rem', md: '2rem'}, 
        flexDirection: 'column',
        justifyItems: 'center',
        alignItems: 'flex-start', 
      }}
    >
      <Typography
        component='div'
        color='secondary' 
        mb={{xs: '1rem', md: '2rem'}}
        sx={{
          fontSize: { xs: 22, sm: 24, md: 38 },
          fontWeight: 'bold',
        }}
      >
        ¿Quiénes somos?
      </Typography>
      <Typography
        fontWeight='bold'
        mb={{xs: '2rem', md: '4rem'}}
        sx={{
          fontSize: {xs: 16, sm: 22, md:26}
        }}
      >
        Te ofrecemos café de 
          <Typography component='span' sx={{fontSize: {xs: 16, sm: 22, md:26}}}> </Typography>
          <Typography
            component='span'
            fontWeight='bold'
            color= 'primary'
          sx={{
            fontSize: {xs: 16, sm: 22, md:26}
          }}
          >
            calidad
          </Typography>
          <br />
        y listo para entregar
      </Typography>

      <Typography
        paragraph  
        mb='2rem' 
        sx={{
          fontSize: { xs: 12, sm: 16, md: 19 },
          color: 'info.main'
        }}
      >
        Somos una compañia que prepara y distribuye deliciosas bebidas, nuestro principal producto está hecho con una receta secreta y se encuentra disponible en todas nuestras tiendas alrededor del país
      </Typography>

      <Link
        component={RouterLink}
        to='/menu'
        underline="none"
      >
        <Button
          variant= 'contained'
          endIcon={<Avatar sx={{bgcolor: 'primary.main'}}> <CartIcon /> </Avatar>}
          color='secondary'
          size={"medium"}
          sx={{
            textTransform: 'none',
            borderRadius: '5rem',
            mb: '3rem',
          }}
        >
          Ordene ahora
        </Button>
      </Link>
    </Box>
  )
}