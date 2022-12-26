import { Box, CardMedia, Typography, Button } from '@mui/material'
import { addProductsToCart, removeProductsFromCart, deleteProductsFromCart } from '../../store/client/clientSlice'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { productProps } from "../features/types";

type cartProduct = {
  product: productProps
}

const CartProduct = ({ product }: cartProduct) => {
  const dispatch = useAppDispatch()
  const productsList: productProps[] = useAppSelector(state => state.client.productsList)

  const handleAddProduct = (productClicked: productProps) => {
    const newAmount = productsList.map(productAdded => (
      productAdded._id === productClicked._id
        ? { ...productAdded, amount: (productAdded.amount||0) + 1 }
        : { ...productAdded }
    ))
    dispatch(addProductsToCart([...newAmount]))
  }

  const handleRemoveProduct = (clickedId: string) => {
    const newAmount = productsList.map(productAdded => (
      productAdded._id === clickedId
        ? { ...productAdded, amount: (productAdded.amount || 0) - 1 }
        : { ...productAdded }
    ))
    dispatch(removeProductsFromCart([...newAmount]))
    newAmount.forEach(feId => (
      feId._id === clickedId ? (feId.amount === 0 ? dispatch(deleteProductsFromCart([feId._id, feId.amount])) : null) : null
    ))
  }

  const handleDeleteProduct = (clickedId: string, clickedAmount: number) => {
    dispatch(deleteProductsFromCart([clickedId, clickedAmount]))
  }

  return (
    <Box
      sx={{ py: 1 }}
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
          width: '50%',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyItems: 'flex-start',
          mr: 1
        }}
      >
        <Typography
            variant='h6'
            sx={{
              fontWeight: 'bold',
              mb: 0
            }}
        >
          {product.name}
        </Typography>
        <Typography
          paragraph
          sx={{
            mb: 0,
            fontSize: 14,
            color: 'info.main',
          }}
        >
          {product.description}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%'
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
        <Typography
          paragraph
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexGrow: 1,
            mb: 0,
            fontSize: 20,
            fontWeight: 'bold',
            color: 'warning.main'
          }}
        >
          ${product.price * (product.amount || 0)}
        </Typography>
      </Box>
      </Box>

    {/* Buttons */}
      <Box
        sx={{
          display: 'flex'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '50%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              boxShadow: 'rgba(0, 0, 0, 0.25) 0px 5px 10px',
              borderRadius: '5px',
              backgroundColor: '#fff'
            }}
          >
            <Button
              color='secondary'
              variant='text'
              onClick={() => { handleRemoveProduct(product._id) }}
              sx={{
                fontSize: 30,
                p: 0,
                minWidth: '30px',
                height: '35px',
                borderRadius: '5px 0 0 5px',
                '&:hover':
                  { backgroundColor: '#eee' }
              }}
            >
              -
            </Button>

            <Box sx={{ borderLeft: '2px solid #f0f0f0', width: '2px', height: 12 }}/>
            <Button
              color='secondary'
              variant='text'
              disabled
              sx={{
                fontSize: 20,
                p: 0,
                color: '#000 !important',
                minWidth: '30px',
                borderRadius: 0,
                '&:hover':
                  { backgroundColor: '#eee' }
              }}
            >
              {product.amount}
            </Button>
            <Box sx={{ borderLeft: '2px solid #f0f0f0', width: '2px', height: 12 }}/>

            <Button
              color='secondary'
              variant='text'
              onClick={() => { handleAddProduct(product) }}
              sx={{
                fontSize: 22,
                p: 0,
                minWidth: '30px',
                height: '35px',
                borderRadius: '0 5px 5px 0',
                '&:hover':
                  { backgroundColor: '#eee' }
              }}
            >
              +
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '50%',
            justifyContent: 'center',
            pl: 1
          }}
        >
          <Button
            color='error'
            startIcon={<DeleteIcon />}
            onClick={() => { handleDeleteProduct(product._id, (product.amount || 0)) }}
          >
            Descartar
          </Button>
        </Box>
      </Box>
        <Box sx={{ borderTop: '1px solid #1E1E1E', height: 1, mt: 2 }}/>
    </Box>
  )
}

export default CartProduct
