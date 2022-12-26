import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Alert, Box, Button, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ArrowCircleLeft, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { submitRegister } from '../hooks/SubmitRegister';
import { logout } from '../../store/auth/authSlice';
import Logo from '../../client/assets/Logo.svg'

export const FormRegister = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { errorMsg } = useAppSelector(state => state.auth)

  const { register, handleSubmit, formState: {errors}, watch, reset} = useForm();
  const watchPass = watch('password', '')

  const handleSubmitForm: SubmitHandler<FieldValues> = async (data) => {
    const resp = await submitRegister(data)
    if(!resp.success){
      dispatch(logout(resp))
    } else {  
      reset();
      dispatch(logout({}));
      navigate('/auth/login')
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
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
          justifyContent: 'space-between',
        }}
      >
        <Box
          display='flex'
          sx={{
            flexDirection: 'column',
            alignItems: 'flex-end',
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
            Crear una cuenta
          </Typography> 
        </Box>

        <Box
          display='flex'
          component='form'
          onSubmit={handleSubmit(handleSubmitForm)}
          autoComplete='off'
          sx={{
            flexDirection: 'column',
            alignItems: {sm: 'center', md:'flex-end'},
            '& > :not(style)': {my: 2, maxWidth: '25rem' },
          }}
        >
          <TextField 
            label="Nombre Completo"
            size='small'
            sx={{display: 'block'}}
            type='text'
            color='secondary'
            fullWidth
            autoFocus
            {...register('fullname', {
              required: "Ingrese su nombre",
              pattern: {
                value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,40}$/,
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
              }
            })}
            error={!!errors?.username}
            helperText={errors?.username?.message}
          />
          
          <TextField 
            label="Correo"
            size='small'
            sx={{display: 'block'}}
            type='email'
            color='secondary'
            fullWidth
            {...register('email', {
              required: "Ingrese su correo electrónico",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                message: 'correo electrónico inválido'
              }
            })}
            error={!!errors?.email}
            helperText={errors?.email?.message}
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
            Crear cuenta
          </Button>
        </Box> 
      </Box> 
    </Box>
  )
}  