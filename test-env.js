import './config/env.js';

const key = process.env.GEMINI_API_KEY || process.env.API_KEY;
console.log('--- ENV TEST ---');
if (key) {
    console.log(`Key found! Length: ${key.length}`);
    console.log(`Starts with: ${key.substring(0, 5)}...`);
    console.log(`Ends with: ...${key.substring(key.length - 5)}`);

    // Check for common issues
    if (key.startsWith('"') || key.startsWith("'")) console.log('WARNING: Key starts with quote');
    if (key.includes(' ')) console.log('WARNING: Key contains spaces');
} else {
    console.log('NO KEY FOUND in process.env');
}
console.log('--- END TEST ---');
