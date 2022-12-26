import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { useLocation, Navigate } from 'react-router-dom'
import { addProductsToCart } from '../../store/client/clientSlice'
import { ClientLayout } from "../layouts/ClientLayout";
import { Box, IconButton, Link, Typography, CardMedia, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import { ArrowCircleLeft } from '@mui/icons-material';
import { productProps } from '../features/types'

export const ProductPage = () => {
  const dispatch = useAppDispatch()
  const productsList: productProps[] = useAppSelector( (state) => state.client.productsList )
  const [amountAdd, setAmountAdd] = useState(1)

  const data = useLocation()
  const product:productProps = data.state

  const handleAddProduct = (productClicked: productProps) => {
    const isProductInCart = productsList.find(productInCart => productInCart._id === productClicked._id)
    if (isProductInCart) {
      const newAmount = productsList.map(productAdded => (
        productAdded._id === productClicked._id
          ? { ...productAdded, amount: (productAdded.amount||0) + amountAdd }
          : { ...productAdded }
      ))
      for (let i = 0; i < amountAdd; i++) {
        dispatch(addProductsToCart([...newAmount]))
      }
    } else {
      for (let i = 0; i < amountAdd; i++) {
        i === 0
          ? dispatch(addProductsToCart([...productsList, { ...productClicked, amount: 1 }]))
          : dispatch(addProductsToCart([...productsList, { ...productClicked, amount: amountAdd }]))
      }
    }
    setAmountAdd(1)
  }

  const AddAmount = () => setAmountAdd(amountAdd + 1)
  const removeAmount = () => {
    if (amountAdd !== 1) {
      setAmountAdd(amountAdd - 1)
    }
  }
  return (
    product
      ? <ClientLayout>   
          <> 
          <Box sx={{mb: 2}}>
            <Link
              component={RouterLink}
              to='/menu'
              underline="hover"         
            >
              <IconButton >
                <ArrowCircleLeft 
                  color='secondary' 
                  sx={{fontSize: '2rem'}} 
                />
              </IconButton>
            </Link>
          </Box>
          <Box
            display='flex'
            flexDirection={{xs: 'column', sm: 'row'}}
          >
            <Box
              display='flex'
              width={{xs:'80%', sm: '50%', xl: '100%'}}
              maxHeight={{xs: '50vh', sm: '80vh'}}
              sx={{
                mx: 'auto',
                mr: {xs: 'auto', sm: 5}
              }}
            >
              <CardMedia
                sx={{
                  borderRadius: 3,
                  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                  objectFit: 'cover'
                }}
                component='img'
                image={product.image}
                alt={product.name}
                
              />
            </Box>

            <Box
              display='flex'
              width={{xs:'100%', sm: '50%'}}
              flexDirection='column'
              sx={{
                alignItems: 'flex-start',
                justifyItems: 'flex-start',
                mt: { xs: 3, md: '6vh' }
              }}
            >
              <Typography
                component='div'
                color='secondary' 
                sx={{
                  fontSize: { xs: 22, sm: 24, md: 36 },
                  fontWeight: 'bold',
                }}
              >
                {product.name}
              </Typography>
              <Typography
                component='div'
                sx={{
                  fontSize: { xs: 20, sm: 22, md: 32 },
                  color: 'warning.main',
                  fontWeight: 'bold',
                  mb: 5
                }}
                >
                  ${product.price}
              </Typography>
  
              <Typography
                paragraph   
                sx={{
                  fontSize: { xs: 14, sm: 16, md: 22 },
                  color: 'info.main'
                }}
              >
                {product.description}
              </Typography>
              
              {/* Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    maxHeight: 35,
                    mr: 2,
                    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 5px 10px',
                    borderRadius: '5px',
                    backgroundColor: '#fff'
                  }}
                >
                  <Button
                    color='secondary'
                    variant='text'
                    onClick={removeAmount}
                    sx={{
                      fontSize: {xs: 18, sm: 22, md: 26},
                      p: 0,
                      maxHeight: 35,
                      minWidth: {xs: 24, sm: 30, md: 36},
                      borderRadius: '5px 0 0 5px',
                      '&:hover':
                        { backgroundColor: '#eee' }
                    }}
                  >
                    -
                  </Button>

                  <Box sx={{ borderLeft: '2px solid #f0f0f0', width: '2px', height: 12 }}/>
                  <Button
                    color='primary'
                    variant='text'
                    disabled
                    sx={{
                      fontSize: {xs: 12, sm: 16, md: 20},
                      p: 0,
                      maxHeight: 35,
                      color: '#000 !important',
                      minWidth: {xs: 24, sm: 30, md: 36},
                      borderRadius: 0,
                      '&:hover':
                        { backgroundColor: '#eee' }
                    }}
                  >
                    {amountAdd}
                  </Button>
                  <Box sx={{ borderLeft: '2px solid #f0f0f0', width: '2px', height: 12 }}/>

                  <Button
                    color='secondary'
                    variant='text'
                    onClick={AddAmount}
                    sx={{
                      fontSize: {xs: 16, sm: 20, md: 24},
                      p: 0,
                      maxHeight: 35,
                      minWidth: {xs: 24, sm: 30, md: 36},
                      borderRadius: '0 5px 5px 0',
                      '&:hover':
                        { backgroundColor: '#eee' }
                    }}
                  >
                    +
                  </Button>
                </Box>

                <Button
                  variant='contained'
                  color= 'primary'
                  size='small'
                  onClick={() => { handleAddProduct(product) }}
                  sx={{
                    color: '#fff',
                    fontSize: {xs: 9, sm: 11, md: 14}
                  }}
                >
                  Añadir al Carrito
                </Button>
              </Box>
            </Box>
          </Box>
          </>     
        </ClientLayout>
      : <Navigate to="/menu" />
  )
}