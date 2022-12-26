import { Box, CardMedia } from "@mui/material";
import { ClientLayout } from "../layouts/ClientLayout";
import imgAbout from '../assets/about.jpg';
import { AboutInfo } from "../components/AboutInfo";

export const AboutPage = () => {

  return (
    <ClientLayout>
      <Box
        display='flex'
        flexDirection={{xs: 'column', sm: 'row'}}
        height={{xs: 'default', sm: '75vh'}}
      >
        <Box
          display='flex'
          flexGrow={'1'}
          width={{xs: '100%', sm: '100%', md: '92%'}}
          pl={{xs: '0', sm: '1rem'}}
          height={{xs: '40vh', sm: '100%'}}
          sx={{
            justifyContent: 'center',
            alignItems: 'center', 
          }}
        >
          <CardMedia
            component='img'
            image={imgAbout}
            height= '95%'
            alt="banner"
            sx={{
              objectFit: 'fill', 
              mt: {sm: '1rem', md: 0}, 
              width: {xs: '50%', sm: '90%', md: '70%'}
            }}
          />
        </Box>
        <AboutInfo />
      </Box>
    </ClientLayout>
  )
}