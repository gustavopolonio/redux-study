import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from '../features/counter/counterSlice'
import { postsReducer } from '../features/posts/postsSlice'
import { usersReducer } from '../features/users/usersSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store