import { Box } from '@mui/material'
import { Navbar } from '../components/Navbar'
import bg from '../assets/bg.png';
import Footer from '../components/Footer';

type Props = {
    children: JSX.Element,
};

export const ClientLayout = ({children}: Props) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundImage: `url(${bg})`,
        minHeight: '100vh'
      }}
    >       
      <Navbar />
      <Box 
        maxWidth="xl"
        sx={{
          mx: {xl: 'auto'},
          px: { xs: 2, sm: 3, md: 4, lg: 5 },
          mt: { xs: 2, sm: 3, md: 4, lg: 5 },
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  )
}
