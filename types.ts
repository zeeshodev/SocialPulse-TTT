
export interface HourlyForecast {
  hour: string;
  score: number; // 0-100
}

export enum PlatformStatus {
  EXCELLENT = "Excellent",
  GOOD = "Good",
  FAIR = "Fair",
  POOR = "Poor"
}

export interface PlatformInsight {
  name: string;
  currentStatus: PlatformStatus;
  nextBestSlot: string; // e.g., "Today, 5:00 PM"
  reasoning: string;
  hourlyForecast: HourlyForecast[];
  viralityScore: number; // 0-100
}

export interface SocialInsightsResponse {
  platforms: PlatformInsight[];
  generalAdvice: string;
}

export interface UserContext {
  industry: string;
  timezone: string;
}

export interface TrendingItem {
  topic: string;
  description: string;
  hashtags: string[];
  keywords: string[];
}

export interface TrendingData {
  items: TrendingItem[];
  rawText: string;
  sources: { title: string; uri: string }[];
}

export interface ScheduledPost {
  id: string;
  platform: string;
  content: string;
  scheduledTime: string; // ISO string
  createdAt: number;
}

export interface PostedItem {
  id: string;
  platform: string;
  content: string;
  postedAt: number;
  status: 'Success' | 'Failed';
}
