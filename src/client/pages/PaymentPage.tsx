import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { Navigate, useNavigate } from 'react-router-dom'
import { updateClientName, updateClientPhone, updateClientReference, updatePayMethod } from "../../store/client/clientSlice";
import { Box, Typography, TextField, Radio, RadioGroup, FormControlLabel, FormControl, InputLabel, InputAdornment, IconButton, OutlinedInput, Modal } from '@mui/material'
import { ClientLayout } from "../layouts/ClientLayout";
import { PaymentMap } from "../components/PaymentMap";
import { OrderSummary } from '../components/OrderSummary'
import {Search as SearchIcon} from '@mui/icons-material';

export const PaymentPage = () => {
  const [user, setUser] = useState({fullname: '', phone: '', reference: '', payMethod: ''})
  const [ errorName, setErrorName ] = useState('')
  const [ errorPhone, setErrorPhone ] = useState('')
  const [ safetoSend, setSafeToSend ] = useState(true)
  const { status, fullname, phone, condition } = useAppSelector(state => state.auth)
  const { orderStatus, totalProducts, clientAddress } = useAppSelector(state => state.client)

  const [openMap, setOpenMap] = useState(false);
  const handleMap = () => setOpenMap(!openMap)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(()=> {
    if(orderStatus === 'buying'){
      setUser({fullname: (fullname || ''), phone: (phone || ''), reference:'', payMethod:'efectivo'})
      dispatch(updateClientName(fullname)),
      dispatch(updateClientPhone(phone))
      dispatch(updateClientReference(''))
      dispatch(updatePayMethod('efectivo'))
    }
    if(!(condition === 'VERIFIED')){
      navigate('/verify')
    }
  }, [])

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if(name==='fullname') setUser({...user, fullname: value})
    if(name==='phone') setUser({...user, phone: value})
    if(name==='reference') setUser({...user, reference: value})
    if(name==='payMethod') dispatch(updatePayMethod(value))
  }

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if(name==='fullname') {
      const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,40}$/
      if(!value.match(regex)){
        setErrorName('Nombre inválido')
        setSafeToSend(false)
      } else{
        setErrorName('')
        setSafeToSend(true)
      }
      dispatch(updateClientName(value))
    }
    if(name==='phone'){
      const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im
      if(!value.match(regex)){
        setErrorPhone('Número de teléfono/celular inválido')
        setSafeToSend(false)
      } else{
        setErrorPhone('')
        setSafeToSend(true)
      }
      dispatch(updateClientPhone(value))
    }    
    if(name==='reference') dispatch(updateClientReference(value))
  }

  return (
    orderStatus === 'buying'
      ?status === 'authenticated'
        ? totalProducts > 0
          ?<ClientLayout>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'flex-start',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: { xs: '95%', sm: '48%' },
                  pt: 1,
                  mr: 4
                }}
              >
                <Typography
                  component='div'
                  sx={{
                    mb: 4,
                    fontSize: { xs: 28, md: 30 },
                    fontWeight: 'bold',
                    textDecoration: 'underline'
                  }}
                >
                  Entrega
                </Typography>
                <Typography
                  component='div'
                  sx={{
                    mb: 2,
                    color: 'primary.main',
                    fontSize: { xs: 18, md: 22 },
                    fontWeight: 'bold',
                  }}
                >
                  Información
                </Typography>
                <TextField
                  label="Nombre y apellido"
                  required
                  type="text"
                  fullWidth
                  name="fullname"
                  autoComplete='off'
                  value={user.fullname || ''}
                  onChange = {onInputChange} 
                  onBlur= {onInputBlur}
                  sx={{ mb: 2 }}
                  helperText={errorName? errorName: ''}
                  error={errorName.length>0}
                />
                <FormControl 
                  sx={{mb: 2}}
                  variant="outlined"
                  fullWidth
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Dirección*
                  </InputLabel>
                  <OutlinedInput
                    type='text'   
                    name="direction"     
                    onClick={handleMap}
                    autoComplete='off'
                    value={clientAddress}
                    endAdornment={
                      <InputAdornment 
                        position="end"
                      >
                        <IconButton
                          onClick={handleMap}
                          sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                          }}
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    label= 'Dirección*'
                  />      
                </FormControl>  
                <TextField
                  label="Referencia"
                  type="text"
                  fullWidth
                  name="reference"
                  autoComplete='off'
                  onChange = {onInputChange} 
                  onBlur= {onInputBlur}
                  placeholder="Ej: Casa blanca a lado de una tienda"
                  sx={{ mb: 2 }}
                />  
                <TextField
                  label="Teléfono"
                  required
                  type="text"
                  fullWidth
                  name="phone"
                  autoComplete='off'
                  value={user.phone || ''}
                  onChange = {onInputChange} 
                  onBlur= {onInputBlur}
                  sx={{ mb: 4 }}
                  helperText={errorPhone? errorPhone: ''}
                  error={errorPhone.length>0}
                />       
                
                <Typography
                  component='div'
                  sx={{
                    mb: 2,
                    color: 'primary.main',
                    fontSize: { xs: 18, md: 22 },
                    fontWeight: 'bold',
                  }}
                >
                  Método de pago
                </Typography>
                <RadioGroup
                  defaultValue="efectivo"
                  onChange={onInputChange}              
                  name="payMethod"
                  sx={{ mb: 2 }}
                >
                  <FormControlLabel value="efectivo" control={<Radio color='primary' />} label="Efectivo/contraentrega" />
                  <FormControlLabel value="tarjeta" control={<Radio color='primary' />} label="Tarjeta de credito/debito" />
                  <FormControlLabel value="paypal" control={<Radio color='primary' />} label="Paypal" />
                </RadioGroup>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  py: 2,
                  px: 3,
                  mb: 5,
                  backgroundColor: 'rgba(223, 195, 124, 0.3)',
                  width: { xs: '95%', sm: '52%' }
                }}
              >
                <Typography
                  component='div'
                  sx={{
                    mb: 4,
                    fontSize: { xs: 28, md: 30 },
                    fontWeight: 'bold',        
                    textDecoration: 'underline'
                  }}
                >
                  Resumen de orden
                </Typography>
                <OrderSummary safeToSend={safetoSend} />
              </Box>
              <Modal
                open={openMap}
              >
                <PaymentMap handleMap={handleMap} />
              </Modal>
            </Box>
          </ClientLayout>
        : <Navigate to="/menu" />
      : <Navigate to="/auth/login" />
    : <Navigate to="/tracing" />
  )
}
