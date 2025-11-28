import { SocialInsightsResponse, TrendingData } from "../types";
import toast from 'react-hot-toast';

// Determine API Base URL
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || '';

// Helper for fetch with timeout
const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 25000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

export const fetchSocialInsights = async (
  industry: string,
  timezone: string
): Promise<SocialInsightsResponse> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/insights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ industry, timezone })
    });

    if (!response.ok) {
      let errorMsg = `Server error: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMsg = errorData.error || errorMsg;
      } catch (e) {
        const text = await response.text();
        console.error("Non-JSON API Error:", text.substring(0, 200)); 
      }
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching insights from API:", error);
    if (error.name === 'AbortError') {
      toast.error("Analysis timed out. Server is busy.");
    } else {
      toast.error("Failed to fetch social insights.");
    }
    throw error;
  }
};

export const fetchTrendingTopics = async (industry: string): Promise<TrendingData> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/trending`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ industry })
    });

    if (!response.ok) {
      console.warn(`Trending API failed: ${response.status}`);
      return { items: [], rawText: "Could not refresh trending topics.", sources: [] };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching trending topics from API:", error);
    // Return empty structure so UI doesn't break
    return { items: [], rawText: "Trending topics unavailable.", sources: [] };
  }
};

// Quick health check to see if backend is reachable
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/api/health`, { method: 'GET' }, 5000);
    return res.ok;
  } catch (e) {
    return false;
  }
};