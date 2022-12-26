import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { clientSlice } from './client/clientSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    client: clientSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})