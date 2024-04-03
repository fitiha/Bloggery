// import { configureStore } from '@reduxjs/toolkit'
// import currentUserReducer from './slices/currentUserSlice'
// import currentBlogsReducer from './slices/currentBlogsSlice.js';
// import checkTokenExpirationMiddleware from "../functions/checkTokenExpirationMiddleware.js";

// export const store = configureStore({
//     reducer: {
//         currentUser: currentUserReducer,
//         currentBlogs: currentBlogsReducer
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(checkTokenExpirationMiddleware)
// })

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import currentUserReducer from './slices/currentUserSlice';
import currentBlogsReducer from './slices/currentBlogsSlice';
import checkTokenExpirationMiddleware from '../functions/checkTokenExpirationMiddleware';

// Creating a root reducer that combines your reducers
const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    currentBlogs: currentBlogsReducer,
});

// Configuring the persist reducer
const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignoring action types from redux-persist
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(checkTokenExpirationMiddleware),
});

export const persistor = persistStore(store);
