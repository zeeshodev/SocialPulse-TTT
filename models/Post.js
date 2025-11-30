import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true,
        enum: ['Twitter (X)', 'LinkedIn', 'Instagram', 'TikTok', 'YouTube Shorts']
    },
    content: {
        type: String,
        required: true
    },
    scheduledTime: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        enum: ['scheduled', 'posted', 'failed'],
        default: 'scheduled'
    },
    postedAt: {
        type: Date
    },
    error: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;
