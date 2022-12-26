import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from 'react'
import { MenuCategories } from "../components/MenuCategories";
import { ClientLayout } from "../layouts/ClientLayout";
import axios from 'axios';
import { categoryProductProps } from "../features/types";
import { MenuListProducts } from "../components/MenuListProducts";


export const MenuPage = () => {
  const [categories, setCategories] = useState(Array<categoryProductProps>)

  const url = 'https://coffe-store-api.vercel.app/product/productsByCategory'
  useEffect(() => {
    const request = async () => { 
      try{
        const response = await axios.get( url)
        const axiosResp = await response.data
        if (!axiosResp.success){
          console.log('Error al obtener la data')
        }
        setCategories(axiosResp.data)     
      } catch(e) {
        console.log('error: ', e)
      }
    }
    request()
  }, [])
  
  return (
    <ClientLayout>
      <Box>
        <Box
          display={ categories.length == 0  ? 'flex':'none'}  
          alignItems='center'
          flexDirection='column'
        >
          <Typography
            fontSize={{xs: 18, sm: 25}}
            pb='2rem'
          >
            Cargando......
          </Typography>
          <CircularProgress 
            color='primary'
            size='8rem'
          />

        </Box>
        <Box
          display='flex'
          height='78vh'
          flexDirection={{xs: 'column', sm: 'row'}}
        >
          <MenuCategories categories={categories} />
          <MenuListProducts categoryProducts={categories} />
        </Box>
      </Box>
    </ClientLayout>
  )
}