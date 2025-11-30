import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // We can use a generic ID or specific platform IDs
    // For a single-user app, we might just have one user document, 
    // but it's better to design for multiple.
    twitterId: String,
    linkedinId: String,
    googleId: String, // For YouTube
    tiktokId: String,
    instagramId: String,

    displayName: String,
    avatarUrl: String,

    // Store tokens securely
    tokens: {
        twitter: {
            accessToken: String,
            accessSecret: String, // Twitter v1.1 needs secret
        },
        linkedin: {
            accessToken: String,
            expiresAt: Date
        },
        google: {
            accessToken: String,
            refreshToken: String,
            expiresAt: Date
        },
        tiktok: {
            accessToken: String,
            refreshToken: String,
            expiresAt: Date
        },
        instagram: {
            accessToken: String,
            expiresAt: Date
        }
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

export default User;
