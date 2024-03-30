import mongoose from 'mongoose';
const { Schema } = mongoose;

const categories = ['Technology', 'Health', 'Science', 'Business', 'Entertainment', 'Sports', 'Education', 'Lifestyle', 'Travel', 'Fashion', 'Food', 'Music', 'Politics', 'Art', 'Environment', 'Others'];

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
    },
    category: {
        type: String,
        enum: categories,
        // required: true
    },
    likes: {
        type: Number,
        default: 0
    },
},
    {
        timestamps: true
    }
)

const blogModel = mongoose.model('Blog', blogSchema);

export default blogModel;