import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {},
    likes: {},
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
        },
        setLikes: (state, action) => {
            state.likes = action.payload;
        },
        like: (state, action) => {
            // state.likes = { ...state.likes, ...action.payload }
            state.likes[action.payload] = true;
        },
        unlike: (state, action) => {
            state.likes[action.payload] = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { addUser, clearState, setLikes, like, unlike } = currentUserSlice.actions

export default currentUserSlice.reducer