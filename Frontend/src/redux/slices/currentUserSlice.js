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
        clearState: (state) => { //reducer function 2 - logging out
            state.value = {};
            localStorage.clear();
            // window.location.reload();
        },
    },
})

// Action creators are generated for each case reducer function
export const { addUser, clearState } = currentUserSlice.actions

export default currentUserSlice.reducer