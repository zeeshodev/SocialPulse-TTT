/**
 * Keep-Alive Script for Render Free Tier
 * 
 * This script pings your server every 10 minutes to prevent Render from
 * spinning down your free tier instance.
 * 
 * IMPORTANT: Only use this if you're on a PAID Render plan.
 * Free tier has limited bandwidth and this will consume it.
 * 
 * Better alternatives for free tier:
 * - UptimeRobot: https://uptimerobot.com (free, external)
 * - Cron-job.org: https://cron-job.org (free, external)
 */

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes

async function keepAlive() {
    try {
        const response = await fetch(`${SERVER_URL}/api/health`);
        const data = await response.json();
        console.log(`[${new Date().toISOString()}] Keep-alive ping successful:`, data);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Keep-alive ping failed:`, error.message);
    }
}

// Only run if explicitly enabled
if (process.env.ENABLE_KEEP_ALIVE === 'true') {
    console.log(`Keep-alive enabled. Pinging ${SERVER_URL} every ${PING_INTERVAL / 60000} minutes`);
    console.log('⚠️  WARNING: This consumes bandwidth. Use external services like UptimeRobot for free tier.');

    // Initial ping
    keepAlive();

    // Periodic pings
    setInterval(keepAlive, PING_INTERVAL);
} else {
    console.log('Keep-alive disabled. Set ENABLE_KEEP_ALIVE=true to enable.');
    console.log('Recommended: Use UptimeRobot (https://uptimerobot.com) instead for free tier.');
}

export default keepAlive;
