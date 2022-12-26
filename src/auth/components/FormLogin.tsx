import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Alert, Box, Button, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ArrowCircleLeft, Visibility, VisibilityOff } from '@mui/icons-material';
import Logo from '../../client/assets/Logo.svg'
import { submitLogin } from '../hooks/SubmitLogin';
import { login, logout } from '../../store/auth/authSlice';

export const FormLogin = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const { errorMsg } = useAppSelector(state => state.auth)
  const { register, handleSubmit, formState: {errors}, reset} = useForm();

  const handleSubmitForm: SubmitHandler<FieldValues> = async (data) => {
    const userData = await submitLogin(data)
    if(!userData){
      console.log('Error al iniciar sesion')
    } else{
      if(!userData.success){
        dispatch(logout(userData))
      } else{
        dispatch(login(userData))
        reset();
        navigate('/home')
      }
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

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
          mt: '1rem',
          mb: '15vh',
          px: {xs: '1rem', sm: '6rem', md:'4rem'},
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <img src={Logo} alt="logo" />
          <Typography
            fontWeight='bold'
            mb={{xs: '1rem', md: 0}}
            sx={{
              fontSize: {xs: '25px', sm: '30px', md:'40px'}
            }}
          >
            Bienvenido de nuevo 
          </Typography> 
          <Typography
            variant='body1'
            pb='1rem'
            sx={{
              color: 'info.main',
              fontSize: {sx: '15px', sm: '20px'}
            }}
          >
            Disfrute del mejor café de la ciudad 
          </Typography> 
        </Box>
        
        <Box
          component='form'
          onSubmit={handleSubmit(handleSubmitForm)}
          autoComplete='off'
          sx={{
            '& > :not(style)': {my: 2.5, maxWidth: '25rem' },
          }}
        >
          <TextField 
            autoFocus
            label="Correo o Usuario"
            sx={{display: 'block'}}
            type="string"
            color='secondary'
            fullWidth
            {...register('username_email', {
              required: "Ingrese su correo electrónico o usuario valido",
              pattern: {
                value: /^(?:[a-zA-Z0-9À-ÿ\u00f1\u00d1]{2,30}|[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})$/,
                message: 'usuario o correo electrónico inválido'
              }
            })}
            error={!!errors?.username_email}
            helperText={errors?.username_email?.message}
          />

          <TextField
            label="Contraseña"
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

          <Link
            component={RouterLink}
            display='block'
            color='secondary'
            sx={{
              textAlign: 'right',
              color: 'info.main',
              fontSize: {xs: '0.8rem', sm: '1rem'},
              '&:hover':
                { color: 'secondary.main' }
            }}
            to="/auth/forgot-password"
          >
            ¿Olvido la contraseña?
          </Link>

          <Box display={errorMsg ? '' : 'none'}>
            <Alert severity='error'>{errorMsg}</Alert> 
          </Box>

          <Button
            variant='contained'
            color='secondary'
            type='submit'
            fullWidth
          >
            Ingresar
          </Button>
        </Box>
        
        <Box
          display='flex'
        >
          <Typography
            color='secondary'
            fontSize={{xs: '0.8rem', sm: '1rem'}}
          >
            ¿No tienes cuenta?
          </Typography>
          <Link
            component={RouterLink}
            color="secondary"
            sx={{
              color: 'info.main',
              ml: '0.3rem',
              fontSize: {xs: '0.8rem', sm: '1rem'},
              '&:hover':
                  { color: 'secondary.main' }
            }}
            to="/auth/register"
          >
            Crear cuenta
          </Link>
        </Box>
      </Box>
      
    </Box>
  )
}      