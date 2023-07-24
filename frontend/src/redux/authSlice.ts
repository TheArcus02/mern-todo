import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserInterface } from '../interfaces/interfaces'

export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: {} as UserInterface },
  reducers: {
    login: (state, action: PayloadAction<UserInterface>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = {} as UserInterface
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
