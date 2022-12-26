import { Box, CardMedia } from '@mui/material';

interface imgProp{
  imagen: string
}

export const FormImg: React.FC<imgProp> = ({imagen}) => {
  return (
    <Box
      flexGrow={'1'}
      width='100%'
      height='100vh'
      sx={{
        display:{xs: 'none', md: 'flex'}
      }}
    >
      <CardMedia 
        component='img'
        image={imagen}
        height= '100%'
        alt="login"
        sx={{
          objectFit: 'fill', 
        }}
      />
    </Box>
  )
}      