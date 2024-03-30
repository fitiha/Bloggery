import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from './slices/currentUserSlice'
import currentBlogsReducer from './slices/currentBlogsSlice.js';
import checkTokenExpirationMiddleware from "../functions/checkTokenExpirationMiddleware.js";

export const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        currentBlogs: currentBlogsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(checkTokenExpirationMiddleware)
})