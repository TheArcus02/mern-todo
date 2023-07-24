import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { userInterface } from '../interfaces/interfaces'

export interface UserState {
  user: userInterface
}

export const userSlice = createSlice({
  name: 'user',
  initialState: { user: {} as userInterface },
  reducers: {
    login: (state, action: PayloadAction<userInterface>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = {} as userInterface
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
