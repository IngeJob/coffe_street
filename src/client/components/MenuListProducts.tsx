import { Box, Grid, Typography } from '@mui/material'
import { categoryProductProps } from "../features/types";
import { MenuCard } from './MenuCard';

type MenuListProductsProps = {
    categoryProducts: categoryProductProps[]
}

export const MenuListProducts = ({categoryProducts}: MenuListProductsProps) => {
  return (
    <Box
      display='flex'
      width={{xs:'100%', sm: '80%'}}
      height='70vh'
      sx={{
        mt: {xs: '0.5rem', md: '3vh'}, 
        flexDirection: 'column',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          width: '10px',
	        backgroundColor: 'success.main',
        },
        '&::-webkit-scrollbar-track': {
          WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
          borderRadius: '10px',
	        backgroundColor: 'success.main',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '10px',
          background: 'linear-gradient(to right bottom, #F6EBDA, #2F2105)'
        }
      }}
    > 
      { categoryProducts.map( ({ name, _id, listProducts }) => 
        <Box
          key={_id}
          id={name}
          sx={{mb: 3}}
        >
          <Typography
  
            fontSize={{ xs:'1.2rem', sm:'1.5rem'}}
          >
            {name}
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              direction='row'
              justifyContent="space-around"
              alignItems="center"
              sx={{ py: 1 }}
              rowSpacing={2}
              columnSpacing={{ xs: 0, sm: 1, md: 2, lg: 2 }}
            >
              {listProducts.map(product => (
                <Grid
                  item
                  xs={10}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={3}
                  key={product._id}
                >
                  <MenuCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  )
}