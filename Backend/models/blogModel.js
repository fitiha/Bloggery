import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },
    author: {
        type: String,
        ref: 'User',
        // required: true
    }
})

const blogModel = mongoose.model('Blog', blogSchema);

export default blogModel;