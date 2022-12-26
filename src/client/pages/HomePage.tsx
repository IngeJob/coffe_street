import { useEffect } from "react";
import { Box } from "@mui/material";
import BannerInfo from "../components/BannerInfo";
import BannerSocial from "../components/BannerSocial";
import { ClientLayout } from "../layouts/ClientLayout";
import { useDispatch } from 'react-redux'
import { updateClientLocation, updateClientAddress } from "../../store/client/clientSlice";

export const HomePage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    if(!navigator.geolocation){
        console.log("El navegador no soporta geolocation");
    } else{
      navigator.geolocation.getCurrentPosition(
          function (position) {
            dispatch(updateClientLocation([
              position.coords.latitude,
              position.coords.longitude
            ]))
            dispatch(updateClientAddress('Ubicación actual'))
          }, 
          function (error) {
              console.log(error)
          },
          {
              enableHighAccuracy: true
          }
      )      
    }       
  }, [])

  return (
    <ClientLayout>
      <Box
        display='flex'
        flexDirection={{xs: 'column', md: 'row'}}
      >
        <BannerInfo />
        <BannerSocial />
      </Box>
    </ClientLayout>
  )
}