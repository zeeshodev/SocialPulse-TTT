import { GoogleGenerativeAI } from "@google/generative-ai";
import './config/env.js';

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
        console.error("No API key found");
        return;
    }

    const genai = new GoogleGenerativeAI(apiKey);
    // Access the model manager to list models
    // Note: The Node SDK might not expose listModels directly on the main class in all versions,
    // but let's try to find a way or just test a known working model like 'gemini-pro'.

    // Actually, for the JS SDK, we might not have a direct listModels method easily accessible 
    // without using the REST API directly or a specific manager.
    // Let's try to just run a simple generation with 'gemini-1.5-flash' to isolate the issue,
    // and also try 'gemini-pro'.

    console.log("Testing gemini-1.5-flash...");
    try {
        const model = genai.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.5-flash:", result.response.text());
    } catch (e) {
        console.error("Failed gemini-1.5-flash:", e.message);
    }

    console.log("\nTesting gemini-pro...");
    try {
        const model = genai.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-pro:", result.response.text());
    } catch (e) {
        console.error("Failed gemini-pro:", e.message);
    }
}

listModels();
