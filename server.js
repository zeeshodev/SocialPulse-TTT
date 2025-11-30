import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables FIRST
import './config/env.js';

// Now import passport AFTER env vars are loaded
import connectDB from './config/db.js';
import Post from './models/Post.js';
import cron from 'node-cron';
import session from 'express-session';
import passport from './config/passport.js';
import { postToTwitter } from './services/twitterService.js';
import { postToLinkedIn } from './services/linkedinService.js';
import { postToTikTok } from './services/tiktokService.js';
import { postToYouTube } from './services/youtubeService.js';
import { postToInstagram } from './services/instagramService.js';

// Connect to Database
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const rawFrontend = process.env.FRONTEND_URL || 'http://localhost:5173';
const allowedOrigins = rawFrontend.split(',').map(s => s.trim()).filter(Boolean);

console.log('Allowed CORS origins:', allowedOrigins);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin) return next();
  if (!allowedOrigins.includes(origin)) {
    console.warn(`Blocked CORS origin: ${origin}`);
    return res.status(403).json({ error: 'CORS origin not allowed' });
  }
  return next();
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Session & Passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'pulseai_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true in production
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
app.use(passport.initialize());
app.use(passport.session());

const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// --- CRON JOB FOR SCHEDULED POSTS ---
// Check every minute
cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    const postsToPublish = await Post.find({
      status: 'scheduled',
      scheduledTime: { $lte: now }
    });

    for (const post of postsToPublish) {
      console.log(`Publishing scheduled post ${post._id} to ${post.platform}`);
      try {
        // TODO: Retrieve user tokens from DB based on who created the post
        // For now, we are using env vars as a fallback for single-user mode
        if (post.platform === 'Twitter (X)') {
          await postToTwitter(post.content, process.env.TWITTER_ACCESS_TOKEN);
        } else if (post.platform === 'LinkedIn') {
          await postToLinkedIn(post.content, process.env.LINKEDIN_ACCESS_TOKEN);
        } else if (post.platform === 'TikTok') {
          await postToTikTok(post.content, process.env.TIKTOK_ACCESS_TOKEN);
        } else if (post.platform === 'YouTube Shorts') {
          await postToYouTube(post.content, process.env.YOUTUBE_ACCESS_TOKEN);
        } else if (post.platform === 'Instagram') {
          await postToInstagram(post.content, process.env.INSTAGRAM_ACCESS_TOKEN);
        }

        post.status = 'posted';
        post.postedAt = new Date();
        await post.save();
      } catch (err) {
        console.error(`Failed to publish post ${post._id}:`, err);
        post.status = 'failed';
        post.error = err.message;
        await post.save();
      }
    }
  } catch (error) {
    console.error('Cron job error:', error);
  }
});

// --- API ROUTES ---

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/debug/origin', (req, res) => {
  res.json({ origin: req.headers.origin || null, headers: { origin: req.headers.origin } });
});

// --- AUTH ROUTES ---

// Get current user
app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: {
        id: req.user._id,
        displayName: req.user.displayName,
        avatarUrl: req.user.avatarUrl,
        connectedPlatforms: {
          twitter: !!req.user.tokens?.twitter?.accessToken,
          linkedin: !!req.user.tokens?.linkedin?.accessToken,
          tiktok: !!req.user.tokens?.tiktok?.accessToken
        }
      }
    });
  } else {
    res.json({ authenticated: false });
  }
});

// Twitter Auth
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/'); // Redirect back to frontend
  }
);

// LinkedIn Auth
app.get('/auth/linkedin', passport.authenticate('linkedin'));
app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

// TikTok Auth
app.get('/auth/tiktok', passport.authenticate('tiktok'));
app.get('/auth/tiktok/callback',
  passport.authenticate('tiktok', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

// Logout
app.post('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.json({ success: true });
  });
});


const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
let ai;
if (!apiKey) {
  console.warn("WARNING: No Gemini API key found. Set API_KEY or GEMINI_API_KEY in your environment.");
} else {
  console.log("Server initialized with Gemini API key present.");
  ai = new GoogleGenAI({ apiKey });
}

// --- POSTING ROUTES ---

// Get all posts (scheduled + history)
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Create a new post (Schedule or Post Now)
app.post('/api/posts', async (req, res) => {
  try {
    const { platform, content, scheduledTime, postNow } = req.body;

    // Check if user is authenticated for the platform
    // For now, we allow it to proceed to use the mock/env fallback if not logged in
    // In production, you would enforce req.isAuthenticated() here.

    if (postNow) {
      // Post immediately
      let result;
      // Use user token if available, otherwise fall back to env (or mock)
      const userTokens = req.user?.tokens || {};

      if (platform === 'Twitter (X)') {
        result = await postToTwitter(content, userTokens.twitter?.accessToken || process.env.TWITTER_ACCESS_TOKEN);
      } else if (platform === 'LinkedIn') {
        result = await postToLinkedIn(content, userTokens.linkedin?.accessToken || process.env.LINKEDIN_ACCESS_TOKEN);
      } else if (platform === 'TikTok') {
        result = await postToTikTok(content, userTokens.tiktok?.accessToken || process.env.TIKTOK_ACCESS_TOKEN);
      } else if (platform === 'YouTube Shorts') {
        result = await postToYouTube(content, userTokens.google?.accessToken || process.env.YOUTUBE_ACCESS_TOKEN);
      } else if (platform === 'Instagram') {
        result = await postToInstagram(content, userTokens.instagram?.accessToken || process.env.INSTAGRAM_ACCESS_TOKEN);
      } else {
        // Fallback
        result = { id: 'mock-' + Date.now() };
      }

      const newPost = await Post.create({
        platform,
        content,
        status: 'posted',
        postedAt: new Date()
      });
      return res.json(newPost);

    } else {
      // Schedule
      const newPost = await Post.create({
        platform,
        content,
        scheduledTime: new Date(scheduledTime),
        status: 'scheduled'
      });
      return res.json(newPost);
    }

  } catch (error) {
    console.error('Posting error:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Delete a post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});


app.post('/api/insights', async (req, res) => {
  try {
    const { industry, timezone } = req.body;

    if (!apiKey) {
      console.error("API Request blocked: No Gemini API key configured (API_KEY or GEMINI_API_KEY).");
      return res.status(500).json({ error: "Server API Key not configured" });
    }

    const now = new Date();
    const clientTime = new Date(now.toLocaleString("en-US", { timeZone: timezone || "UTC" }));
    const day = clientTime.toLocaleDateString('en-US', { weekday: 'long' });
    const time = clientTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    console.log(`Generating insights for: ${industry} at ${time} (${day})`);

    const prompt = `
      You are a world-class social media strategist.
      Current Context:
      - Industry/Niche: ${industry || 'General'}
      - Current Day: ${day}
      - Current Time: ${time}
      - Timezone: ${timezone}

      Task:
      Analyze real-time engagement patterns for: Instagram, Twitter (X), LinkedIn, TikTok, and YouTube Shorts.
      Provide a forecast for the next 12 hours.
      Determine the 'currentStatus' (Excellent, Good, Fair, Poor) for posting RIGHT NOW.
      Provide the 'nextBestSlot' (e.g. 'Today 4:30 PM') if now is not ideal.
      Give a 'viralityScore' (0-100) representing the potential reach if posted now.
      Provide a short 'reasoning' (max 1 sentence).
      Provide an 'hourlyForecast' array for the next 6 hours with a score (0-100).
      Provide 'generalAdvice'.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            generalAdvice: { type: Type.STRING },
            platforms: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  currentStatus: { type: Type.STRING, enum: ["Excellent", "Good", "Fair", "Poor"] },
                  nextBestSlot: { type: Type.STRING },
                  reasoning: { type: Type.STRING },
                  viralityScore: { type: Type.INTEGER },
                  hourlyForecast: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        hour: { type: Type.STRING },
                        score: { type: Type.INTEGER }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    let jsonText = response.text;
    if (!jsonText) throw new Error("No data received from Gemini");

    jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();

    res.json(JSON.parse(jsonText));

  } catch (error) {
    console.error("API Insights Error:", error);
    res.status(500).json({ error: "Failed to fetch insights. Check server logs." });
  }
});

app.post('/api/trending', async (req, res) => {
  try {
    const { industry } = req.body;

    if (!apiKey) {
      return res.status(500).json({ error: "Server API Key not configured" });
    }

    const prompt = `
      Find 5 currently trending topics, news stories, or viral conversations relevant to the '${industry}' industry.
      Use Google Search to get real-time data.
      
      For each topic, provide:
      1. The Topic Name
      2. A brief description
      3. 3-5 relevant hashtags
      4. 3-5 short-term keywords for SEO
      
      Format the output strictly as a structured list:
      TREND: [Topic Name]
      DESC: [Description]
      TAGS: [comma separated hashtags]
      KEYS: [comma separated keywords]
      
      Do not use bolding or markdown.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const text = response.text || "";

    const items = [];
    const lines = text.split('\n');
    let currentItem = {};

    for (const line of lines) {
      const l = line.trim();
      if (l.startsWith('TREND:')) {
        if (currentItem.topic) items.push(currentItem);
        currentItem = { topic: l.substring(6).trim(), description: "", hashtags: [], keywords: [] };
      } else if (l.startsWith('DESC:') && currentItem.topic) {
        currentItem.description = l.substring(5).trim();
      } else if (l.startsWith('TAGS:') && currentItem.topic) {
        currentItem.hashtags = l.substring(5).split(',').map(s => s.trim()).filter(s => s);
      } else if (l.startsWith('KEYS:') && currentItem.topic) {
        currentItem.keywords = l.substring(5).split(',').map(s => s.trim()).filter(s => s);
      }
    }
    if (currentItem.topic) items.push(currentItem);

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .map((chunk) => chunk.web ? { title: chunk.web.title, uri: chunk.web.uri } : null)
      .filter((s) => s !== null);

    res.json({
      rawText: text,
      items,
      sources
    });

  } catch (error) {
    console.error("API Trending Error:", error);
    res.status(500).json({ error: "Failed to fetch trending topics" });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});