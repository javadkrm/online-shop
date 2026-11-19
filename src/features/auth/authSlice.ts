import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AuthState, User } from "./types/authTypes"
import { getAuthUser } from "./services/authStorage"

const savedUser = getAuthUser()

const initialState: AuthState = {
    isAuthenticated: savedUser !== null,
    user: savedUser,
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
        },
        
    }
})

export const { login, logout } = authSlice.actions
export const authReducer = authSlice.reducer