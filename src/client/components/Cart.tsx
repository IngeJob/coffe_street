import { useAppSelector } from '../../store/hooks/hooks'
import { Link as RouterLink } from 'react-router-dom'
import { Toolbar, Box, Typography, Button } from '@mui/material'
import { ShoppingCart as ShoppingCartIcon, Close as CloseIcon } from '@mui/icons-material'
import { productProps } from "../features/types";
import CartProduct from './CartProduct';

type handleCartProp = {
    handleCart: () => void
}

export const Cart = ({handleCart}: handleCartProp) => {
  const totalProducts = useAppSelector(state => state.client.totalProducts)
  const productsList = useAppSelector(state => state.client.productsList)

  const calculateTotal = (products: productProps[]) =>
    products.reduce((ack, product) => ack + (product.amount || 0) * product.price, 0)

  return (
    <Toolbar
      sx={{
        flexDirection: 'column',
        pt: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'flex-end',
          flexDirection: 'column'
        }}
      >
        <Button
          variant='outlined'
          onClick={() => handleCart()}
          sx={{
            p: 0,
            ml: 1,
            minWidth: 20,
            fontWeight: 'bold',
            color: 'red',
            backgroundColor: 'white',
            borderRadius: '50%',
            border: '2px solid red',
            '&:hover':
            {
              border: '3px solid #000',
              backgroundColor: '#fef'
            }
          }}
        >
          <CloseIcon />
        </Button>
      </Box>

      <Box
        display='flex'
        sx={{ 
          flexDirection: 'column',  
          mb: 2
        }}
      >    
        <Box
          sx={{
            color: 'background_black.main',
            display: 'flex',
            alignItems: 'center',
           
          }}
        >
          <ShoppingCartIcon sx={{ color: 'tertiary.main', fontSize: 50 }} />
          <Typography
            variant='h5'
            textAlign="center"
            sx={{
              fontWeight: 'bold',
            }}
          >
            Carrito de compras
          </Typography>
        </Box>
        <Box sx={{ borderTop: '1px solid #1E1E1E', height: 1, }} />
      </Box>

      {productsList.length === 0
        ? <p>No hay productos en el carrito</p>
        : <>
          {
            productsList.map((product: productProps) => (
              <CartProduct product={product} key={product._id}/>
            ))
          }
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              pt: 2,
              width: '100%'
            }}
          >
            <Typography
              paragraph
              textAlign="center"
              sx={{
                mb: 1
              }}
            >
              N° de productos:
              <Button
                disabled
                sx={{
                  py: 0,
                  ml: 1,
                  minWidth: 40,
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: '#2F2105 !important',
                  backgroundColor: 'white'
                }}
              >
                {totalProducts}
              </Button>
            </Typography>
          </Box>

          <Button
            variant='contained'
            color='primary'
            component={RouterLink}
            to='/payment'
            sx={{
              color: 'white',
              textDecoration: 'none',
              width: '90%'
            }}
          >
            <Box 
              display='flex' 
              sx={{
                display: 'flex', 
                width: '100%',
                justifyContent: 'space-between'
                }}
            >
              <Typography>
                Ir a Pagar
              </Typography>
              <Typography>
              Sub-Total: ${calculateTotal(productsList).toFixed(2)}
              </Typography>
            </Box>
          </Button>         
        </>}
    </Toolbar>
  )
}