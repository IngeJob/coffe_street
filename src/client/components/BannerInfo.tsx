import { Avatar, Box, Button, IconButton, Link, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { ShoppingCartOutlined as CartIcon, AccessTimeFilled as ClockIcon } from '@mui/icons-material/';

const BannerInfo = () => {
  return (
    <Box
      flexGrow={'1'}
      width='100%'
      sx={{
        mt: {xs: '0.5rem', md: '1vh'}, 
        pr: {xs: 0, md: '3rem'}
      }}
    >
      <Typography
        fontWeight='bold'
        mb={{xs: '2rem', md: 0}}
        sx={{
          fontSize: {xs: '35px', sm: '40px', md:'50px'}
        }}
      >
        Disfruta de tu 
          <Typography component='span' sx={{fontSize: {xs: '35px', sm: '40px', md:'50px'}}}> </Typography>
          <Typography
            component='span'
            fontWeight='bold'
            color= 'primary'
          sx={{
            fontSize: {xs: '35px', sm: '40px', md:'50px'}
          }}
          >
            café
          </Typography>
          <Typography component='span' sx={{fontSize: {xs: '35px', sm: '40px', md:'50px'}}}> </Typography>
        antes de tu trabajo
      </Typography>

      <Typography
        variant='body1'
        pb='1rem'
        sx={{
          color: 'info.main',
          fontSize: {sx: '15px', sm: '20px'}
        }}
      >
      Aumente su productividad y mejore su estado de ánimo con una taza de café por la mañana
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
          size={"large"}
          sx={{
            textTransform: 'none',
            borderRadius: '5rem',
            mb: '3rem',
          }}
        >
          Ordene ahora
        </Button>
      </Link>
      <Box
        display='flex'
      >
        <IconButton
          disabled
        >
          <ClockIcon 
            sx={{fontSize: {xs: '8rem', sm: '10rem'}}}
            color='secondary'
          />
        </IconButton>
        <Box
          display='flex'
          sx={{
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Typography
            color='secondary'
            pb= '1rem'
            sx={{
              fontWeight: 'bold',
              fontSize: {xs: '0.9rem', sm: '1.1rem'},
              letterSpacing: {xs: '0.04rem', sm:'0.1rem'},
              wordSpacing: {xs: '0.06rem', sm:'0.3rem'}
            }}
          >
            LUN-JUE 9AM - 7:30PM
          </Typography>
          <Typography
            color='secondary'
            pb= '1rem'
            sx={{
              fontWeight: 'bold',
              fontSize: {xs: '0.9rem', sm: '1.1rem'},
              letterSpacing: {xs: '0.04rem', sm:'0.1rem'},
              wordSpacing: {xs: '0.06rem', sm:'0.3rem'}
            }}
          >
            VIE-SAB  10AM - 8PM
          </Typography>
          <Typography
            color='secondary'
            sx={{
              fontWeight: 'bold',
              fontSize: {xs: '0.9rem', sm: '1.1rem'},
              letterSpacing: {xs: '0.04rem', sm:'0.1rem'},
              wordSpacing: {xs: '0.06rem', sm:'0.3rem'}
            }}
          >
            DOM  2PM - 8:30 PM
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default BannerInfo