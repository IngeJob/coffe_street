import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Box, Link } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { addProductsToCart } from '../../store/client/clientSlice'
import { productProps } from '../features/types'

type MenuCardProps = {
  product: productProps;
}

export const MenuCard = ({product}: MenuCardProps) => {
  const dispatch = useAppDispatch()
  const productsList: productProps[] = useAppSelector( (state) => state.client.productsList )

  const handleAddProduct = (productClicked: productProps) => {
    const isProductInCart = productsList.find(productInCart => productInCart._id === productClicked._id)
    if (isProductInCart) {
      const newAmount = productsList.map(productAdded => (
        productAdded._id === productClicked._id
          ? { ...productAdded, amount: (productAdded.amount||0) + 1 }
          : { ...productAdded }
      ))
      dispatch(addProductsToCart([...newAmount]))
    } else {
      dispatch(addProductsToCart([...productsList, { ...productClicked, amount: 1 }]))
    }
  }

  return (
    <Box
      sx={{
        display: 'inline-flex',
        position: 'relative',
        mt: '20px',
        mr: '20px'
      }}
    >
      <Card
        sx={{
          maxWidth: 300,
          minWidth: 220,
          p: '1rem',
          '&:hover':
            { boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }
        }}
      >
        <Link
          component={RouterLink}
          to={`/product/${product._id}`}
          underline='none'
          state={product}
        >
          <CardMedia
            component="img"
            image={product.image? product.image : 'https://picsum.photos/500/400'}
            alt='name'
            sx={{
              minHeight: '200px',
              maxHeight: '250px',
              objectFit: 'cover'
            }}
          />
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              px: 0,
              pb:'0 !important',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >             
              <Typography
                paragraph
                color='secondary'
                sx={{
                  flexGrow: 3,
                  display: 'flex',
                  mb: 0,
                  fontSize: 16,
                  fontWeight: 'bold'
                }}
              >
                {product.name}
              </Typography>

              <Typography
                paragraph
                sx={{
                  display: 'flex',
                  flexGrow: 1,
                  mb: 0,
                  fontSize: 16,
                  fontWeight: 'bold',
                  justifyContent: 'flex-end',
                  color: 'warning.main'
                }}
              >
                ${product.price}
              </Typography>
            </Box>
            <Typography
              sx={{
                mb: 0,
                fontSize: 14,
                justifyContent: 'flex-end',
                color: 'info.main'
              }}            
            >
              {product.description} 
            </Typography>
          </CardContent>
        </Link>  
      </Card>
      <Button
        color='primary'
        variant='contained'
        onClick={() => { handleAddProduct(product) }}
        sx={{
          position: 'absolute',
          fontSize: 32,
          color: 'white',
          p: 0,
          top: 25,
          right: 25,
          minWidth: '35px',
          height: '35px',
          borderRadius: '50%',
          transition: '0.5s',
          '&:hover': {
            transform: 'scale(1.1)'
          }
        }}
      >
        +
      </Button>
    </Box>
  )
}
