import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { selectCurrentUserID } from "../auth/authSlice";
import { client } from "../../api/client";
import { createAppAsyncThunk } from "../../app/withTypes";

interface User {
  id: string
  name: string
}

export const fetchUsers = createAppAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await client.get<User[]>('/fakeApi/users')
    return response.data
  }
)

const initialState: User[] = []

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
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