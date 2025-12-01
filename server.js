import express from 'express';
import cors from 'cors';
import compression from 'compression';
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
import ContactMessage from './models/ContactMessage.js';
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

// Enable compression for all responses (reduces bandwidth by 60-80%)
app.use(compression({
  level: 6, // Compression level (0-9, 6 is good balance)
  threshold: 1024, // Only compress responses > 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Serve static files BEFORE session middleware for better performance
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath, {
  maxAge: '1d', // Cache static files for 1 day
  etag: true
}));

// Session & Passport (only for API/auth routes, not static files)
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'pulseai_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
});

// Apply session only to API and auth routes
app.use('/api/*', sessionMiddleware);
app.use('/auth/*', sessionMiddleware);
app.use('/api/*', passport.initialize());
app.use('/api/*', passport.session());
app.use('/auth/*', passport.initialize());
app.use('/auth/*', passport.session());

// --- SIMPLE CACHE FOR API RESPONSES ---
const cache = new Map();
const CACHE_DURATION = {
  insights: 5 * 60 * 1000, // 5 minutes
  trending: 15 * 60 * 1000 // 15 minutes
};

function getCached(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < cached.duration) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

function setCache(key, data, duration) {
  cache.set(key, { data, timestamp: Date.now(), duration });
}

// Clean cache every 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > value.duration) {
      cache.delete(key);
    }
  }
}, 30 * 60 * 1000);

// --- CRON JOB FOR SCHEDULED POSTS ---
// Check every minute (optimized to process max 10 posts at once)
let isProcessingScheduled = false;
cron.schedule('* * * * *', async () => {
  if (isProcessingScheduled) {
    console.log('Skipping cron: previous job still running');
    return;
  }

  isProcessingScheduled = true;
  try {
    const now = new Date();
    const postsToPublish = await Post.find({
      status: 'scheduled',
      scheduledTime: { $lte: now }
    }).limit(10); // Process max 10 posts per run

    if (postsToPublish.length > 0) {
      console.log(`Found ${postsToPublish.length} posts to publish`);
    }

    // Process posts in parallel for better performance
    await Promise.allSettled(postsToPublish.map(async (post) => {
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
    }));
  } catch (error) {
    console.error('Cron job error:', error);
  } finally {
    isProcessingScheduled = false;
  }
});

// --- API ROUTES ---

// Request timeout middleware (30 seconds for all API routes)
app.use('/api/*', (req, res, next) => {
  req.setTimeout(30000); // 30 second timeout
  res.setTimeout(30000);
  next();
});

app.get('/api/health', (req, res) => {
  const uptime = process.uptime();
  const memUsage = process.memoryUsage();
  res.status(200).json({
    status: 'ok',
    uptime: Math.floor(uptime),
    memory: {
      used: Math.floor(memUsage.heapUsed / 1024 / 1024) + 'MB',
      total: Math.floor(memUsage.heapTotal / 1024 / 1024) + 'MB'
    },
    cacheSize: cache.size
  });
});

app.get('/debug/origin', (req, res) => {
  res.json({ origin: req.headers.origin || null, headers: { origin: req.headers.origin } });
});

// Contact Form Submission
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = await ContactMessage.create({
      firstName,
      lastName,
      email,
      message
    });

    console.log(`New contact message from ${email}`);
    res.status(201).json({ success: true, message: "Message received" });

  } catch (error) {
    console.error("Contact API Error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
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
    const hour = clientTime.getHours();

    // Create cache key based on industry, day, and hour (not minute for better cache hits)
    const cacheKey = `insights:${industry || 'general'}:${day}:${hour}:${timezone || 'UTC'}`;

    // Check cache first
    const cached = getCached(cacheKey);
    if (cached) {
      console.log(`Returning cached insights for: ${industry} at ${time} (${day})`);
      return res.json(cached);
    }

    console.log(`Generating insights for: ${industry} at ${time} (${day})`);

    const prompt = `
      You are a world-class social media strategist and social traffic analyst and SEO master , Determine the best time to post on social media for the "${industry || 'general'}" industry right now.
      Current Context:
      - Industry/Niche: ${industry || 'General'}
      - Current Day: ${day}
      - Current Time: ${time}
      - Timezone: ${timezone}

      Task:
      Analyze real-time engagement patterns for:TikTok, Instagram, YouTube Shorts, Twitter (X), LinkedIn.
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
    const result = JSON.parse(jsonText);

    // Cache the result
    setCache(cacheKey, result, CACHE_DURATION.insights);

    res.json(result);

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

    // Create cache key based on industry
    const cacheKey = `trending:${industry || 'general'}`;

    // Check cache first
    const cached = getCached(cacheKey);
    if (cached) {
      console.log(`Returning cached trending topics for: ${industry}`);
      return res.json(cached);
    }

    console.log(`Fetching trending topics for: ${industry}`);

    const prompt = `
    You are a social media trends analyst and SEO master So you have to analyze the social trends with traffic analytics and provide accurate data to related industry or topic. Identify the best time to post on social media for the "${industry || 'general'}" industry right now.
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

    const result = {
      rawText: text,
      items,
      sources
    };

    // Cache the result
    setCache(cacheKey, result, CACHE_DURATION.trending);

    res.json(result);

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
