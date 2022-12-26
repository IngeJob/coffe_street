import { createSlice } from '@reduxjs/toolkit'

interface authProps {
  status: string
  username: string | null,
  fullname: string | null,
  email: string | null,
  role: string | null,
  phone: string | null,
  condition: string | null,
  token: string | null,
  avatar: string | null ,
  errorMsg: string | null
}

const initialState:authProps = {
  status: 'not-authenticated', // 'not-authenticated', 'authenticated', 'checking'
  username: null,
  email: null,
  role: null,
  fullname: null,
  phone: null,
  condition: null,
  token: null,
  avatar: null,
  errorMsg: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated'
      state.username = payload.username
      state.fullname = payload.fullname
      state.email = payload.email
      state.phone = payload.phone
      state.condition = payload.condition
      state.role = payload.role
      state.token = payload.token
      state.avatar = payload.avatar.secure_url
      state.errorMsg = null
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated'
      state.username = null
      state.fullname = null
      state.email = null
      state.phone = null
      state.condition = null
      state.role = null
      state.token = null
      state.avatar = null
      state.errorMsg = (payload?.errorMsg) ? payload.errorMsg : null
    },
    errorMessage: (state, { payload }) => {
      state.errorMsg = payload
    },
    updateAvatar: (state, action) => {
      state.avatar = action.payload
    },
    updateAuthProfile: (state, { payload }) => {
      state.fullname = payload.fullname
      state.username = payload.username
      state.phone = payload.phone
      state.errorMsg = null
    },
  }
})

export const { 
  login, 
  logout, 
  errorMessage, 
  updateAvatar, 
  updateAuthProfile
} = authSlice.actions
