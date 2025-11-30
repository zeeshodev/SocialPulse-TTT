import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

// Serialize user to session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// --- TWITTER STRATEGY ---
if (process.env.TWITTER_CONSUMER_KEY && process.env.TWITTER_CONSUMER_SECRET) {
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "/auth/twitter/callback"
    },
        async (token, tokenSecret, profile, done) => {
            try {
                let user = await User.findOne({ twitterId: profile.id });

                if (!user) {
                    // Create new user if not exists
                    user = new User({
                        twitterId: profile.id,
                        displayName: profile.displayName,
                        avatarUrl: profile.photos?.[0]?.value,
                        tokens: {
                            twitter: {
                                accessToken: token,
                                accessSecret: tokenSecret
                            }
                        }
                    });
                } else {
                    // Update tokens
                    user.tokens.twitter = { accessToken: token, accessSecret: tokenSecret };
                    // Merge profile info if missing
                    if (!user.displayName) user.displayName = profile.displayName;
                }

                await user.save();
                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    ));
}

// --- LINKEDIN STRATEGY ---
if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
    passport.use(new LinkedInStrategy({
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/linkedin/callback",
        scope: ['openid', 'profile', 'email'],  // Removed 'w_member_social' until LinkedIn approves it
        state: true
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ linkedinId: profile.id });

                if (!user) {
                    user = new User({
                        linkedinId: profile.id,
                        displayName: profile.displayName,
                        avatarUrl: profile.photos?.[0]?.value,
                        tokens: {
                            linkedin: {
                                accessToken: accessToken,
                                // LinkedIn tokens expire, usually 60 days
                                expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
                            }
                        }
                    });
                } else {
                    user.tokens.linkedin = {
                        accessToken: accessToken,
                        expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
                    };
                }

                await user.save();
                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    ));
}

// --- TIKTOK STRATEGY ---
if (process.env.TIKTOK_CLIENT_KEY && process.env.TIKTOK_CLIENT_SECRET) {
    const OAuth2Strategy = (await import('passport-oauth2')).Strategy;

    passport.use('tiktok', new OAuth2Strategy({
        authorizationURL: 'https://www.tiktok.com/v2/auth/authorize/',
        tokenURL: 'https://open.tiktokapis.com/v2/oauth/token/',
        clientID: process.env.TIKTOK_CLIENT_KEY,
        clientSecret: process.env.TIKTOK_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/tiktok/callback",
        scope: ['user.info.basic', 'video.publish'],
        state: true
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // TikTok doesn't provide profile in callback, need to fetch it
                const response = await fetch('https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const data = await response.json();
                const tiktokProfile = data.data?.user;

                let user = await User.findOne({ tiktokId: tiktokProfile?.open_id });

                if (!user) {
                    user = new User({
                        tiktokId: tiktokProfile?.open_id,
                        displayName: tiktokProfile?.display_name || 'TikTok User',
                        avatarUrl: tiktokProfile?.avatar_url,
                        tokens: {
                            tiktok: {
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
                            }
                        }
                    });
                } else {
                    user.tokens.tiktok = {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
                    };
                }

                await user.save();
                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    ));
}

export default passport;
