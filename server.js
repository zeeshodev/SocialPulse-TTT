import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
// First try the default .env, then fall back to .env.local if present.
dotenv.config();
// If keys are not present after loading .env, try loading .env.local (common in many setups)
if (!process.env.API_KEY && !process.env.GEMINI_API_KEY) {
  // Use process.cwd() here to avoid referencing __dirname before it's defined
  const localEnvPath = path.join(process.cwd(), '.env.local');
  try {
    if (fs.existsSync(localEnvPath)) {
      dotenv.config({ path: localEnvPath });
      console.log('Loaded environment from .env.local');
    }
  } catch (err) {
    console.warn('Could not check for .env.local:', err?.message || err);
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Configure CORS to only allow requests from the frontend (set FRONTEND_URL to your frontend domain)
const rawFrontend = process.env.FRONTEND_URL || 'http://localhost:5173';
const allowedOrigins = rawFrontend.split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (curl, mobile apps, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS policy violation: origin not allowed'), false);
  }
}));
app.use(express.json());

// Serve Static Files from React Build (dist)
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// --- API ROUTES ---

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Initialize Gemini
// Support both API_KEY and GEMINI_API_KEY (the README/.env.local used GEMINI_API_KEY)
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
let ai;
if (!apiKey) {
  console.warn("WARNING: No Gemini API key found. Set API_KEY or GEMINI_API_KEY in your environment.");
} else {
  console.log("Server initialized with Gemini API key present.");
  ai = new GoogleGenAI({ apiKey });
}

app.post('/api/insights', async (req, res) => {
  try {
    const { industry, timezone } = req.body;
    
    if (!apiKey) {
      console.error("API Request blocked: No Gemini API key configured (API_KEY or GEMINI_API_KEY)." );
      return res.status(500).json({ error: "Server API Key not configured" });
    }

    const now = new Date();
    // Use the timezone provided by client or default to UTC
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
    
    // CLEANING: Strip markdown code blocks if present (common issue with LLMs)
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
    
    // Parse the text format on the server side
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

// Fallback for SPA routing (must be last)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});