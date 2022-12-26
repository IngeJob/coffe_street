import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/auth/authSlice";
import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { ClientRoutes } from "../client/routes/ClientRoutes";
import { verifySession } from "../auth/hooks/verifySession";

export const AppRoutes = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getToken = async ( ) =>{
      const userData = await verifySession()
      if(!userData){
        logout({ errorMsg: 'Sesión de usuario no existe o ya expiró' })
      } else{
        if(!userData.success){
          console.log(userData.msg)
        } else{
          dispatch(login(userData))
        }
      } 
    }
    getToken()    
  }, [])

  return(
    <Routes>
      <Route path="/*" element={<ClientRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
    </Routes>
  )
}