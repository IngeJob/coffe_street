import { Box } from '@mui/material'
import { VerifyView } from '../components/VerifyView'

export const VerifyAccountPage = () => {
  return (
    <Box 
      sx={{
        backgroundColor: 'success.main',
        minHeight: '100vh'
      }}
    >       
      <Box 
        maxWidth='xl'
        display='flex'
        sx={{
          mx: 'auto',
        }}
      >
        <VerifyView />
      </Box>
    </Box>
  )
}
