import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AuthState, User } from "./types/authTypes"

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true
            state.user = action.payload
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
        }
    }
})

export const { login, logout } = authSlice.actions
export const authReducer = authSlice.reducer