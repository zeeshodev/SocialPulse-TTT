import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables FIRST
import './config/env.js';

// Now import passport AFTER env vars are loaded
import connectDB from './config/db.js';
import ContactMessage from './models/ContactMessage.js';
import session from 'express-session';
import passport from './config/passport.js';
import { postToTwitter } from './services/twitterService.js';
import { postToLinkedIn } from './services/linkedinService.js';
import { postToTikTok } from './services/tiktokService.js';
import { postToYouTube } from './services/youtubeService.js';
import { postToInstagram } from './services/instagramService.js';

// Connect to Database (for contact form)
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
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
app.use(passport.initialize());
app.use(passport.session());

const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// --- API ROUTES ---

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
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

// AI Insights API
app.post('/api/insights', async (req, res) => {
  try {
    const { industry, timezone } = req.body;
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const genai = new GoogleGenerativeAI(apiKey);
    const model = genai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `You are a social media strategy expert. Analyze the "${industry || 'general'}" industry and provide insights for Twitter (X), LinkedIn, and TikTok.

Current timezone: ${timezone || 'UTC'}

Return a JSON object with this exact structure:
{
  "generalAdvice": "Brief strategic overview for this industry (2-3 sentences)",
  "platforms": [
    {
      "name": "Twitter (X)",
      "bestTime": "HH:MM AM/PM",
      "contentType": "Brief content recommendation",
      "viralityScore": 85,
      "reasoning": "Why this time and content type work"
    },
    {
      "name": "LinkedIn",
      "bestTime": "HH:MM AM/PM",
      "contentType": "Brief content recommendation",
      "viralityScore": 78,
      "reasoning": "Why this time and content type work"
    },
    {
      "name": "TikTok",
      "bestTime": "HH:MM AM/PM",
      "contentType": "Brief content recommendation",
      "viralityScore": 92,
      "reasoning": "Why this time and content type work"
    }
  ]
}

Provide realistic virality scores (60-95 range) and specific times based on the timezone.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const data = JSON.parse(jsonMatch[0]);
    res.json(data);

  } catch (error) {
    console.error('Insights API Error:', error);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

// Trending Topics API
app.post('/api/trending', async (req, res) => {
  try {
    const { industry } = req.body;
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const genai = new GoogleGenerativeAI(apiKey);
    const model = genai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `You are a social media trends analyst. Identify the top 5 trending topics for the "${industry || 'general'}" industry right now.

Return a JSON array with this exact structure:
[
  {
    "topic": "Topic name",
    "description": "Brief description of why it's trending",
    "platforms": ["Twitter (X)", "LinkedIn"],
    "trendScore": 85,
    "hashtags": ["#hashtag1", "#hashtag2"]
  }
]

Provide realistic trend scores (70-95 range) and relevant hashtags.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const data = JSON.parse(jsonMatch[0]);
    res.json(data);

  } catch (error) {
    console.error('Trending API Error:', error);
    res.status(500).json({ error: 'Failed to fetch trending topics' });
  }
});

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}`);
});
