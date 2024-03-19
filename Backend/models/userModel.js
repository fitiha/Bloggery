import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog', // Reference to the Blog model
    }]
})

const userModel = mongoose.model("User", userSchema);

export default userModel;

