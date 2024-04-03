import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
    content: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    _id: false,
})

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    },
    replies: [replySchema]
})

const commentModel = mongoose.model('Comment', commentSchema);

export default commentModel;