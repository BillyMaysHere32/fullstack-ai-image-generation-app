import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './postsSlice'
import { userReducer } from './usersSlice'
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer
  },
})