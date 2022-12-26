import React, { useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Alert, Avatar, Box, Button, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowCircleLeft, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { Navigate, useNavigate } from 'react-router-dom'
import { AddPhotoAlternate as AddPhotoAlternateIcon} from '@mui/icons-material'
import { submitAvatar } from '../hooks/submitAvatar';
import { updateAvatar, updateAuthProfile, errorMessage } from '../../store/auth/authSlice';
import { updateProfile } from '../hooks/updateProfile';
import Logo from '../../client/assets/Logo.svg'

export const ProfileView = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { status, errorMsg, fullname, username, email, phone, avatar } = useAppSelector(state => state.auth)

  useEffect(()=> {
    setValue( 'fullname', fullname )
    setValue( 'username', username )  
    setValue( 'email', email )  
    setValue( 'phone', phone )  
  }, [status])


  const { register, handleSubmit, formState: {errors}, watch, setValue} = useForm();
  const watchPass = watch('password', '')

  const handleSubmitForm: SubmitHandler<FieldValues> = async (data) => {
    const resp = await updateProfile(data)
    if(!resp.success){
      console.log('Error: ', resp.msg)
      dispatch(errorMessage(resp.errorMsg))
    } else {  
      dispatch(updateAuthProfile(resp))
      navigate('/home')
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const saveImage = async (e: React.ChangeEvent) => {
    const target = (e.target as HTMLInputElement)
    const file = (target.files?.[0] || '')
    const resp = await submitAvatar({avatar: file, username: (username || '')})
    if(!resp.success){    
      console.log(resp.msg)
    } else {  
      dispatch(updateAvatar(resp.newAvatar))
      navigate('/home')
    }
  }

  return (
    status === 'authenticated'
    ? 
      <Box
        display='flex'
        flexGrow='1'
        width='100%'
        height='99vh'
        sx={{
          mt: '1vh',
          pl: '1vw',
          flexDirection: 'column',
        }}
      >
        <Box>
          <Link
            component={RouterLink}
            to='/home'
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
          sx={{
            mt: '0.5rem',
            mb: '15vh',
            px: {xs: '1rem', sm: '6rem', md:'4rem'},
            height: '100%',
            flexDirection: 'column',
          }}
        >
          <Box
            display='flex'
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={Logo} alt="logo" />
            <Typography
              fontWeight='bold'
              mb={{xs: '1rem', md: 0}}
              sx={{
                fontSize: {xs: '25px', sm: '30px', md:'40px'}
              }}
            >
              Perfil
            </Typography> 
          </Box>

          <Box
            display='flex'
            component='form'
            onSubmit={handleSubmit(handleSubmitForm)}
            autoComplete='off'
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              '& > :not(style)': {my: 2, maxWidth: '25rem' },
            }}
          >
            <Box position='relative'>
              <Avatar 
                src={avatar? avatar : 'https://res.cloudinary.com/dxb5m6akt/image/upload/v1671137302/avatar/feychc6tliolxdiemvhd.jpg'}
                alt="Travis Howard" 
                sx={{ 
                  width:{xs: '6rem', md: '9rem'},
                  height:{xs: '6rem', md: '9rem'}
                }}
              />         
              <IconButton 
                sx={{
                  position: 'absolute', 
                  bottom: {xs: '-10px', md: 0},
                  right: {xs: '-10px', md: 0},
                }}
                component="label"
              >    
                <input
                  accept="image/*"
                  type="file"
                  name='image'
                  id="image-loader"
                  hidden
                  onChange={saveImage}
                />                              
                  <AddPhotoAlternateIcon 
                    color='primary' 
                    sx={{fontSize: '2rem', cursor:'pointer'}} 
                  />                        
              </IconButton>        
            </Box>
            <TextField 
              label="Nombre"
              size='small'
              sx={{display: 'block'}}
              type='text'
              color='secondary'
              fullWidth           
              {...register('fullname', {
                required: "Ingrese su nombre",
                pattern: {
                  value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,30}$/,
                  message: 'Nombre inválido'
                }
              })}
              error={!!errors?.fullname}
              helperText={errors?.fullname?.message}
            />
            <TextField 
              label="Usuario"
              size='small'
              sx={{display: 'block'}}
              type='text'
              color='secondary' 
              fullWidth
              {...register('username', {
                required: "Ingrese nombre de usuario",
                pattern: {
                  value: /^[a-zA-Z0-9À-ÿ\u00f1\u00d1]{2,30}$/,
                  message: 'Nombre de usuario inválido'
                },
              })}
              error={!!errors?.username}
              helperText={errors?.username?.message}
            />

            <TextField
              label="Contraseña"
              size='small'
              sx={{display: 'block'}}
              type={showPassword ? 'text' : 'password'}
              color='secondary'
              fullWidth
              InputProps={{ 
                endAdornment:( 
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment> 
                )
              }}
              {...register('password', {
                required: "Ingrese su contraseña",
                pattern: {
                  value: /^(?=.*[A-ZÀ-ÿ\u00f1\u00d1])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-zÀ-ÿ\u00f1\u00d1].*[a-zÀ-ÿ\u00f1\u00d1]).{8,24}$/,
                  message: 'La contraseña debe tener mínimo 8 caracteres, incluidos una mayúscula, un número, un caracter especial(!@#$&*), dos minúsculas'
                }
              })}
              error={!!errors?.password}
              helperText={errors?.password?.message}
            />
            <TextField
              label="Confirmar Contraseña"
              size='small'
              sx={{display: 'block'}}
              type={showConfirmPassword ? 'text' : 'password'}
              color='secondary'
              fullWidth
              InputProps={{ 
                endAdornment:( 
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment> 
                )
              }}
              {...register('confirmPassword', {
                required: "Se necesita confirmar su contraseña",
                validate: value => value === watchPass || 'La contraseña no coincide'
              })}
              error={!!errors?.confirmPassword}
              helperText={errors?.confirmPassword?.message}
            />
            <TextField 
              label="Teléfono"
              size='small'
              sx={{display: 'block'}}
              type='tel'
              color='secondary'
              fullWidth
              {...register('phone', {
                required: "Ingrese su número de teléfono/celular",
                pattern: {
                  value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im,
                  message: 'Número de teléfono/celular inválido'
                }
              })}
              error={!!errors?.phone}
              helperText={errors?.phone?.message}
            />
            <Box display={errorMsg ? '' : 'none'}>
              <Alert severity='error'>{errorMsg}</Alert> 
            </Box>
            <Button
              variant='contained'
              color='secondary'
              type='submit'
              fullWidth
            >
              Actualizar
            </Button>
          </Box> 
        </Box> 
      </Box>
    : <Navigate to="/auth/login" />
  )
}  