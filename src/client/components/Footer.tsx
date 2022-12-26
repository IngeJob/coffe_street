import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'secondary.main',
      
        py: '0.5rem',
        textAlign: 'center'
      }}
    >
      <Typography
        color='white'
        fontSize={{xs: '0.8rem', sm: '1rem'}}
      >
        © 2022 Copyright: Cafe Street
      </Typography>
    </Box>
  )
}

export default Footer