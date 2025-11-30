import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Try .env.local if main env vars not found
if (!process.env.API_KEY && !process.env.GEMINI_API_KEY) {
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

// Log which strategies will be enabled
console.log('LinkedIn OAuth:', process.env.LINKEDIN_CLIENT_ID ? 'ENABLED' : 'DISABLED');
console.log('Twitter OAuth:', process.env.TWITTER_CONSUMER_KEY ? 'ENABLED' : 'DISABLED');
