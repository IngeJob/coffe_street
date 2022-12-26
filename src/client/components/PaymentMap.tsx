import { Box, Button, IconButton, Typography } from '@mui/material'
import { ArrowCircleLeft, ArrowDownward } from '@mui/icons-material';
import { MapLeaflet } from './MapLeaflet'; 

type handleMapProp = {
  handleMap: () => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  height: '90vh',
  bgcolor: 'success.main',
  boxShadow: 24,
  p: 4,
};

export const PaymentMap = ({handleMap}: handleMapProp) => {
  return (
    <Box sx={style}>
      <Box
        display='flex' 
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <IconButton 
          onClick={handleMap}
          sx={{p:0}}
        >
          <ArrowCircleLeft 
            color='secondary' 
            sx={{fontSize: { xs: '1.5rem', md: '2rem' }}} 
          />
        </IconButton>
        <Typography
          sx={{
            fontSize: { xs: 20, md: 30 },
            fontWeight: 'bold',
            pb: 0
          }}
        >
          Dirección de entrega
        </Typography>
        <Box />
      </Box>
      <Typography
        paragraph   
        sx={{
          fontSize: { xs: 12, sm: 16, md: 22 },
          color: 'info.main',
          textAlign: 'end',
        }}
      >
        Ingresa tu dirección en la lupa del mapa 
        <ArrowDownward sx={{fontSize: { xs: '1rem', md: '2rem' }}}/>
      </Typography>

      <Box
        display='flex'
        sx={{
          justifyContent: 'center',
          mb: 3,
        }}
      >
      <MapLeaflet />
      </Box>
      <Box
        display='flex'
        sx={{justifyContent: 'center'}}
      >
        <Button
          variant='contained'
          onClick={handleMap}
          size='large'
          sx={{color: 'white'}}
        >
          Aceptar
        </Button>
      </Box>
    </Box>
  )
}
