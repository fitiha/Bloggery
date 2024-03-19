import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {},
}

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        addUser: (state, action) => {  //reducer function 1
            state.value = { ...state.value, ...action.payload };
        },
        removeUser: (state) => { //reducer function 2
            state.value = {};
        }
    },
})

// Action creators are generated for each case reducer function
export const { addUser, removeUser } = currentUserSlice.actions

export default currentUserSlice.reducer