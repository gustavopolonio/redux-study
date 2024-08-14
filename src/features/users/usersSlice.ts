import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

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

const {} = usersSlice.actions
export const usersReducer = usersSlice.reducer

export const selectAllUsers = (state: RootState) => state.users

export const selectUserByID = (state: RootState, userId: string) =>
  state.users.find(user => user.id === userId
)