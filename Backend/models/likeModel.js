import mongoose from "mongoose";
const { Schema } = mongoose;

const likeSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        // required: true
    },
},
    {
        timestamps: true
    }
)

const likeModel = mongoose.model('Like', likeSchema);

export default likeModel;