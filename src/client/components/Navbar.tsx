import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { Link as RouterLink } from 'react-router-dom';
import { logout } from '../../store/auth/authSlice';
import Logo from '../assets/Logo.svg'
import bg from '../assets/bg.png';

import { AppBar, Avatar, Badge, Box, Button, Container, Divider, Drawer, IconButton, Link, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon, Menu as MenuIcon, PermIdentity as PermIcon } from '@mui/icons-material';
import { Cart } from './Cart';

const pages = [
  {
    name: 'Inicio',
    link: '/home'
  },
  {
    name: 'Sobre Nosotros',
    link: '/about'
  },
  {
    name: 'Menu',
    link: '/menu'
  },
]
  
const user = {
  login: [
    {
      name: 'Perfil',
      link: '/profile'
    },
    {
      name: 'Órdenes',
      link: '/orders'
    },
    {
      name: 'Cerrar Sesión',
      link: '/'
    }
  ],
  logout: [
    {
      name: 'Iniciar Sesión',
      link: '/auth/login'
    },
    {
      name: 'Registrarse',
      link: '/auth/register'
    }
  ]
}

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const { totalProducts } = useAppSelector(state => state.client)

  const { status, username, avatar } = useAppSelector(state => state.auth)
  const [userSettings, setUserSettings] = useState(user.logout)

  useEffect(() => {
    if (status !== 'authenticated') {
      setUserSettings(user.logout)
    } else {
      setUserSettings(user.login)
    }
  }, [status])

  const dispatch = useAppDispatch()
  const logoutUser = () => {
    dispatch(logout({}))
    localStorage.removeItem('token')
  }
  
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [OpenCartMenu, setOpenCartMenu] = useState(false)
  const handleCart = () => setOpenCartMenu(!OpenCartMenu)

  const[navColor, setNavColor] = useState(false); 
      const changeColor = () => {
        if(window.scrollY >=40){
          setNavColor(true)
        } else {
          setNavColor(false)
        }
      }
    window.addEventListener("scroll", changeColor)

  return(
    <AppBar
      position="sticky"
      color={navColor? 'success': 'transparent'}
    >
      <Container 
        maxWidth="xl" 
        sx={{
          px: { xs: 2, sm: 3, md: 4, lg: 5 },
        }}
      >
        <Toolbar 
          disableGutters
          sx={{justifyContent: 'space-between' }}
        >
          {/* logo */}
          <Box 
            sx={{ 
              flexGrow: {xs: 1, md: 0},
              mr: 1 
              }}
          >
            <Link
                component={RouterLink}
                to='/home'
                underline='none'
            >
              <img src={Logo} alt="logo" />
            </Link>
          </Box>

          {/* links desktop */}
          <Box
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
                alignItems: 'center'
              }
            }}
          >
            {pages.map((page) =>
              <Link
                component={RouterLink}
                to={`${page.link}`}
                underline="hover"
                key={page.name}
                sx={{
                  color: 'secondary.main',
                  fontWeight: 'bold',
                  m: 2,
                }}
              >
                {page.name}
              </Link>
            )}
          </Box>

          {/* user/cart in desktop */}
          <Box 
            sx={{  
              display: 'flex',
              alignItems: 'center', 
            }}
          >
            <Link
              underline="hover"
              onClick={handleCart}
              sx={{
                color: 'background_black.main',
                display: 'flex',
                alignItems: 'center',
                m: 2,
                cursor: 'pointer'
              }}
            >
              <Badge badgeContent={totalProducts} color="primary" sx={{ mr: 0.5 }}>
                <ShoppingCartIcon color='secondary' />
              </Badge>
            </Link> 
            <Box
              sx={{  
                display: { xs: 'none', md: 'flex' },
              }}
            >   
              {status !== 'authenticated'
                ?(
                  <>
                    <Link
                      component={RouterLink}
                      to='/auth/login'
                      underline='none'
                      sx={{pr: 1}}
                    >                    
                      <Button
                        variant='outlined'
                        color='secondary'
                        startIcon={<PermIcon />}
                        sx={{
                          textTransform: 'none',
                          px: 1,
                        }}
                      >                     
                        Iniciar Sesion
                      </Button>
                    </Link>
                    <Link
                    component={RouterLink}
                    to='/auth/register'
                    underline='none'
                  >                    
                    <Button
                      variant='contained'
                      color='secondary'
                      sx={{
                        textTransform: 'none',
                        px: 0.5,
                      }}
                    >
                      Registrarse
                    </Button>
                  </Link>
                </>               
                ):(
                  <>                   
                    <Link
                      underline="hover"
                      onClick={handleOpenUserMenu}
                      sx={{
                        color: 'background_black.main',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Typography
                        sx={{ mr: 0.5 }}
                        textAlign="center"
                      >
                        {username}
                      </Typography>
                      <Avatar alt="Remy Sharp" src={avatar? avatar : 'https://res.cloudinary.com/dxb5m6akt/image/upload/v1671137302/avatar/feychc6tliolxdiemvhd.jpg'} />
                    </Link>
                      <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        {userSettings.map((userSetting) =>
                          <Link
                            component={RouterLink}
                            to={`${userSetting.link}`}
                            key={userSetting.name}
                            underline="hover"
                            onClick={handleCloseUserMenu}
                          >
                            <MenuItem>
                              {userSetting.name !== 'Cerrar Sesión'
                                ?
                                  <Typography
                                    color = 'primary'
                                    textAlign = 'center'
                                  >
                                    {userSetting.name}
                                  </Typography>
                                :
                                  <Typography
                                    color = 'primary'
                                    textAlign = 'center'
                                    onClick = {() => logoutUser()}
                                  >
                                    {userSetting.name}
                                  </Typography>                                 
                              }
                            </MenuItem>
                          </Link>
                        )}
                      </Menu>
                  </>  
                )
              }
            </Box>            
          </Box>

          {/* menu hamb mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page) =>
                <Link
                  component={RouterLink}
                  to={`${page.link}`}
                  key={page.name}
                  underline="hover"
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      color='secondary'                 
                    >
                      {page.name}
                    </Typography>
                  </MenuItem>
                </Link>
              )}
              <Divider />
              {userSettings.map((userSetting) =>
                <Link
                  component={RouterLink}
                  to={`${userSetting.link}`}
                  key={userSetting.name}
                  underline="hover"
                  onClick={handleCloseUserMenu}
                >
                  <MenuItem>
                    {userSetting.name !== 'Cerrar Sesión'
                      ?
                        <Typography
                          color = 'primary'
                          textAlign = 'center'
                        >
                          {userSetting.name}
                        </Typography>
                      :
                        <Typography
                          color = 'primary'
                          textAlign = 'center'
                          onClick = {() => logoutUser()}
                        >
                          {userSetting.name}
                        </Typography>                                 
                    }
                  </MenuItem>
                </Link>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={OpenCartMenu}
        onClose={handleCart}
        PaperProps={{
          sx: {
            maxWidth: '410px',
            backgroundImage: `url(${bg})`,
          }
        }}
      >
        <Cart handleCart={handleCart} />
      </Drawer>
    </AppBar>
  )
}