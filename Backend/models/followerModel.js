import mongoose from "mongoose";

const followerSchema = new mongoose.Schema({
    followerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    followingId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, { timestamps: true });

followerSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

const FollowerModel = mongoose.model('Follower', followerSchema);

export default FollowerModel;
