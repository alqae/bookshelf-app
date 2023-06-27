import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token?: string | null
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      localStorage.setItem('token', action.payload)
      state.token = action.payload
    },
    clearToken(state) {
      localStorage.removeItem('token')
      state.token = null
    }
  },
})

export const { setToken, clearToken } = AuthSlice.actions
export default AuthSlice.reducer
