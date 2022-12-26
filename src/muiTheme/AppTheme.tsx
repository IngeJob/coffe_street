import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { colorsTheme } from './colorsTheme'

type Props = {
  children: JSX.Element,
};

export const AppTheme = ( {children}: Props ) => {
  return (
    <ThemeProvider theme={ colorsTheme } >
      <CssBaseline />
      { children }
    </ThemeProvider>
  )
}
