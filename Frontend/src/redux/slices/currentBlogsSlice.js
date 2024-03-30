import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {},
}

export const currentBlogsSlice = createSlice({
    name: 'currentBlogs',
    initialState,
    reducers: {
        addBlogs: (state, action) => {
            state.value = action.payload;
        },
        incrementLikes: (state, action) => {
            // console.log("request hit", JSON.parse(JSON.stringify(state.value)));
            const blogs = state.value;
            const blogIndex = blogs.findIndex(blog => blog._id === action.payload.id);
            // console.log("blog in that index is: ", JSON.parse(JSON.stringify(blogs[blogIndex])))
            ++blogs[blogIndex].likes;
            return state;
        },
        decrementLikes: (state, action) => {
            const blogs = state.value;
            const blogIndex = blogs.findIndex(blog => blog._id === action.payload.id);
            --blogs[blogIndex].likes;
        },
    },
})

export const { addBlogs, clearBlogs, incrementLikes, decrementLikes } = currentBlogsSlice.actions

export default currentBlogsSlice.reducer