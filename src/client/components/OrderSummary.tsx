import { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { OrderProduct } from '../components/OrderProduct'
import { productProps, productAddedProps } from '../features/types'
import { submitOrder } from '../hooks/submitOrder';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { updateFinalPrice, handleOrderStatus, updateTime, addOrderList } from '../../store/client/clientSlice';

type safeToSendProp = {
  safeToSend: boolean
}

export const OrderSummary = ({safeToSend}: safeToSendProp) => {
  const clientOrder = useAppSelector(state => state.client)
  const { productsList } = useAppSelector(state => state.client)
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const calculateTotal = (products: productProps[]) =>
    products.reduce((ack: number, product: productProps) => ack + (product.amount || 0) * product.price, 0)
  const finalPrice = (calculateTotal(productsList) + 2).toFixed(2)

  //enviar solo id y amount del producto
  const orderList: Array<productAddedProps> = []
  productsList.forEach((product: productProps) => {
    const { _id, amount } = product
    const productAdded: productAddedProps = {
      amount,
      productId: _id
    }
    orderList.push(productAdded)
  });

  useEffect(()=>{
    dispatch(updateFinalPrice(finalPrice))
    dispatch(addOrderList(orderList))
  }, [])

  const handleSubmitOrder = async () => {
    if (safeToSend){
      const resp = await submitOrder(clientOrder)
      if(resp.success){
        dispatch(updateTime(resp.time))
        dispatch(handleOrderStatus('sending'))
        navigate('/tracing')
      } else {  
        console.log('ocurrio un error', resp.msg)
      }
    }
  } 

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      }}
    >
      {
        productsList.map((product: productProps) => (
          <OrderProduct product={product} key={product._id} />
        ))
      }
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          sx={{
            mb: 1
          }}
        >
          Subtotal:
        </Typography>
        <Typography
          sx={{
            fontSize: 17,
            fontWeight: 'bold'
          }}
        >
          ${calculateTotal(productsList).toFixed(2)}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          sx={{
            mb: 1
          }}
        >
          Costo de envío:
        </Typography>
        <Typography
          sx={{
            fontSize: 17,
            fontWeight: 'bold'
          }}
        >
          $2.00
        </Typography>
      </Box>
      <Box sx={{ borderTop: '1px solid #1E1E1E', height: 1, width: '100%', mb: 2 }} />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          mb: 5
        }}
      >
        <Typography
          sx={{
            fontSize: 19,
            fontWeight: 'bold'
          }}
        >
          Total:
        </Typography>
        <Typography
          sx={{
            fontSize: 19,
            fontWeight: 'bold',
            color: 'tertiary.main'
          }}
        >
          ${finalPrice}
        </Typography>
      </Box> 

      <Button
        variant='contained'
        color='primary'
        onClick={handleSubmitOrder}
        sx={{
          color: 'white',
          textDecoration: 'none'
        }}
      >
        Continuar con el pago
      </Button>
    </Box>
  )
}
