import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserInterface } from '../interfaces/interfaces'

interface authStateInterface {
  user: UserInterface | null
}

const initialUserState: authStateInterface = {
  user: JSON.parse(
    localStorage.getItem('user')!,
  ) as UserInterface | null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialUserState,
  reducers: {
    login: (state, action: PayloadAction<UserInterface>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
