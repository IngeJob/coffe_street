import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles/createPalette' {

  interface SimplePaletteColorOptions {
    light?: string;
    main: string;
    dark?: string;
    contrastText?: string;
    hover?: string;
  }
}

export const colorsTheme = createTheme({
  palette: {
    primary: {
      main: '#FF902B',
    },
    secondary: {
      main: '#2F2105',
    },
    error: {
      main: '#F05454',
    },
    warning: {
      main: '#94702A',
    },
    info: {
      main: '#7E7D7A',
    },
    success: {
      main: '#F6EBDA'
    }
  }
})
