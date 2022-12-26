import { Box, Typography, CardMedia } from '@mui/material'
import { productProps } from '../features/types'

type OrderProductProps = {
    product: productProps
}

export const OrderProduct = ({ product }: OrderProductProps) => {
  return (
    <Box
      sx={{ pb: 3 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start'
        }}
      >
      <Box
        sx={{
          display: 'flex',
          width: '25%',
          mr: 2,
          mb: 1
        }}
      >
        <CardMedia
          sx={{
            mb: 1,
            borderRadius: 3,
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
          }}
          component='img'
          image={product.image}
          alt={product.name}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '50%',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyItems: 'flex-start',
          pr: 2
        }}
      >
        <Typography
            variant='h6'
            sx={{
              textDecoration: 'underline',
              fontSize: { sx: 15, sm: 18 },
              fontWeight: 'bold'
            }}
        >
          {product.name}
        </Typography>
        <Typography
          sx={{
            fontSize: 15
          }}
        >
            Cantidad: {product.amount}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '25%',
          justifyItems: 'flex-start',
          justifyContent: 'flex-end'
        }}
      >
        <Typography
          paragraph
          sx={{
            fontSize: { sx: 15, sm: 18 },
            fontWeight: 'bold',
            color: 'tertiary.main'
          }}
        >
          ${product.price * (product.amount || 0)}
        </Typography>
      </Box>
      </Box>
        <Box sx={{ borderTop: '1px solid #1E1E1E', height: 1 }}/>
    </Box>
  )
}
