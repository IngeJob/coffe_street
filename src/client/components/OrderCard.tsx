import { Box, Typography } from '@mui/material'
import { ordersByUserProps } from '../features/types'
import moment from 'moment'
import 'moment/locale/es'

type ordersProps = {
  order: ordersByUserProps
}
moment.locale('es');

export const OrderCard = ( {order}: ordersProps ) => {
  moment.locale("es");
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        py: 2,
        px: {xs: 1, sm: 3},
        mb: 5,
        backgroundColor: 'rgba(223, 195, 124, 0.3)',
        width: { xs: '95%', sm: '100%' }
      }}
    >
      <Typography
        component='div'
        color='info.main'
        fontSize={{xs: 12, md: 14}}
        sx={{
          mb: 1,
          fontWeight: 'bold',      
          textDecoration: 'underline'
        }}
      >
        {moment(order.date).format("DD/MM/yyyy")} | {moment(order.date).locale(false).format("LT")}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {xs:'column', sm: 'row'},
        }}
      >
        <Box
          display='flex'
          flexDirection='column'
          flexGrow='1'
          sx={{ mb:{xs: 1.5, sm: 0} }}
        >
          {order.orderList.map( (product, index) =>  
            <Box
              display='flex'
              flexDirection='row'
              key={index}
            >
              <Typography
                color='warning.main'
                fontSize={{xs: 15, md: 18}}
                sx={{ mr: 0.5 }}
              >
                ({product.amount})                 
              </Typography>
              <Typography
                fontSize={{xs: 15, md: 18}}
              >
                {product.productId.name}
              </Typography>
            </Box>
          )}  
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 2,
            ml: {xs: 0, md: 5},
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Box
              display= 'flex'
              flexDirection= 'column'
          >
            <Typography
              color='primary'
              fontWeight='bold'
              fontSize={{xs: 20, md: 28}}
            >
              ${order.finalPrice}
            </Typography>
            <Box
              display='flex'
              flexDirection='row'
            >
              <Typography
                color='warning.main'
                fontSize={{xs: 16, md: 20}}
                sx={{mr: 0.5}}
              >
                N° de productos:                 
              </Typography>
              <Typography
                fontSize={{xs: 16, md: 20}}
              >
                {order.totalProducts}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              color='warning.main'
              fontSize={{xs: 16, md: 20}}
              sx={{mr: 0.5}}
            >
              Estado:
            </Typography>
            <Typography
              fontSize={{xs: 16, md: 20}}
            >
              {order.status}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
