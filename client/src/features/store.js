import { configureStore } from '@reduxjs/toolkit'
import auth from "./auth/authSlice"
import profile from './profile/profileSlice'
import post from "./post/postSlice"

export const store = configureStore({
    reducer: { auth, profile, post },
})