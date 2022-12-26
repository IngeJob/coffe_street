import { Box, CardMedia, IconButton, Link } from "@mui/material"
import { FacebookOutlined as FbIcon, Instagram, Twitter, Reddit, Pinterest, WhatsApp } from '@mui/icons-material/';
import imgHero from '../assets/imgHero.svg';

const socials = [
  {
    name: 'Facebook',
    img: <FbIcon sx={{color: 'secondary.main', fontSize: {xs:'1.5rem', sm: '2.5rem'}}} />,
    link: 'https://www.facebook.com/profile.php?id=100082913294031'
  },
  {
    name: 'Instagram',
    img: <Instagram sx={{color: 'secondary.main', fontSize: {xs:'1.5rem', sm: '2.5rem'}}} />,
    link: 'https://www.instagram.com/testdevworld/'
  },
  {
    name: 'WhatsApp',
    img: <WhatsApp sx={{color: 'secondary.main', fontSize: {xs:'1.5rem', sm: '2.5rem'}}} />,
    link: 'https://wa.me/+593999999999?text=Saludos,%20quisiera%20hacer%20un%20pedido%20a%20su%20tienda!'
   
  },
  {
    name: 'Twitter',
    img: <Twitter sx={{color: 'secondary.main', fontSize: {xs:'1.5rem', sm: '2.5rem'}}} />,
    link: 'https://twitter.com/home'
  },
  {
    name: 'Reddit',
    img: <Reddit sx={{color: 'secondary.main', fontSize: {xs:'1.5rem', sm: '2.5rem'}}} />,
    link: 'https://www.reddit.com'
  },
  {
    name: 'Pinterest',
    img: <Pinterest sx={{color: 'secondary.main', fontSize: {xs:'1.5rem', sm: '2.5rem'}}} />,
    link: 'https://www.pinterest.com.mx'
  },
]

const BannerSocial = () => {
  return (
    <Box
      display='flex'
      flexGrow={'1'}
      width='100%'
      sx={{
        mt: '1vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center', 
      }}
    >
      <CardMedia
        component='img'
        image={imgHero}
        height= '60%'
        alt="banner"
        sx={{
          objectFit: 'fill', 
          mb: 2,
          mt: {sm: '1rem', md: 0}, 
          width: {xs: '100%', sm: '60%', md: '90%'}
        }}
      />
      <Box
        sx={{
          pl: 5,
          display: 'flex',       
        }}
      >
        {socials.map((social) => 
          <Link
            href={`${social.link}`}
            target='_blank'
            rel='noopener noreferrer'
            underline="hover"
            key={social.name}
            sx={{ mr: 1 }}
          >
            <IconButton>
              {social.img}
            </IconButton>
          </Link>
        )}
      </Box>
    </Box>
  )
}

export default BannerSocial