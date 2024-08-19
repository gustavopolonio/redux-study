import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface AuthState {
  username: string | null
}

const initialState: AuthState = {
  username: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    userLoggedOut: (state) => {
      state.username = null
    }
  }
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions
export const authReducer = authSlice.reducer

export const selectCurrentUserID = (state: RootState) => state.auth.username