import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from './slices/currentUserSlice'
import checkTokenExpirationMiddleware from "../functions/checkTokenExpirationMiddleware.js";

export const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(checkTokenExpirationMiddleware)
})