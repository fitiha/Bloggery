import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {},
    comments: [],
    followings: []
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
        setComments: (state, action) => {
            state.comments = action.payload;
        },
        addComment: (state, action) => {
            state.comments.push(action.payload)
        },
        addReply: (state, action) => {
            state.comments.find(comment => comment._id == action.payload.commentId).replies.push(action.payload.replyContent)
        },
        updateComment: (state, action) => {
            state.comments.find(comment => comment._id == action.payload.com)._id = action.payload.newCom._id;
        },
        setFollowings: (state, action) => {
            state.followings = action.payload
        },
        addFollowing: (state, action) => {
            state.followings.push(action.payload);
        },
        updateFollowing: (state, action) => {
            const index = state.followings.findIndex(f => f._id == action.payload.tempId);
            if (index !== -1) {
                state.followings[index] = action.payload.newFollowing;
            }
        },
        removeFollowing: (state, action) => {
            state.followings = state.followings.filter(f => { f.followerId == action.payload.followerId && f.followingId == action.payload.followingId })
        }
    },
})

export const { addBlogs, clearBlogs, incrementLikes, decrementLikes, setComments, addComment, addReply, updateComment, setFollowings, addFollowing, updateFollowing, removeFollowing } = currentBlogsSlice.actions

export default currentBlogsSlice.reducer