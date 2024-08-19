import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { selectCurrentUserID } from "../auth/authSlice";

interface User {
  id: string
  name: string
}

const initialState: User[] = [
  { id: '0', name: 'Tiana' },
  { id: '1', name: 'Juuliaa' },
  { id: '2', name: 'Hulege' }
]

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export const usersReducer = usersSlice.reducer

export const selectAllUsers = (state: RootState) => state.users

export const selectUserByID = (state: RootState, userId: string) =>
  state.users.find(user => user.id === userId
)

export const selectCurrentUser = (state: RootState) => {
  const userId = selectCurrentUserID(state)
  if (userId) {
    return selectUserByID(state, userId)
  } else {
    return null
  }
}