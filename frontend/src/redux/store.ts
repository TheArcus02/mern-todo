import { configureStore } from '@reduxjs/toolkit'
import todosSlice from './todosSlice'
import authSlice from './authSlice'

export const store = configureStore({
  reducer: {
    todos: todosSlice,
    auth: authSlice,
  },
  devTools: true,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
