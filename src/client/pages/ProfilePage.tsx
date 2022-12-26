import { Box } from '@mui/material'
import { ProfileView } from '../components/ProfileView'

export const ProfilePage = () => {
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
        <ProfileView />
      </Box>
    </Box>
  )
}
