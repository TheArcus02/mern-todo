import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserInterface } from '../interfaces/interfaces'

const initialUserState =
  (JSON.parse(localStorage.getItem('user')!) as UserInterface) ||
  ({} as UserInterface)

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUserState,
  },
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
