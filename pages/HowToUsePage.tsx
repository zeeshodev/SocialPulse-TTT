import React from 'react';
import { Sparkles, TrendingUp, Hash, Clock, BarChart3, Zap, Target, CheckCircle, ArrowRight } from 'lucide-react';

export const HowToUsePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 pb-20 relative overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 relative z-10">

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6 backdrop-blur-md">
                        <Sparkles className="w-3 h-3" />
                        <span>Complete Guide</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white leading-tight">
                        How to Use <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">SocialPulse AI</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Master your social media strategy with AI-powered insights, trending topics, and smart hashtag generation.
                        This comprehensive guide will help you maximize your reach and engagement across all platforms.
                    </p>
                </div>

                {/* What is SocialPulse */}
                <section className="mb-16">
                    <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-slate-900/40 border border-indigo-500/30 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Zap className="w-6 h-6 text-indigo-400" />
                            What is SocialPulse AI?
                        </h2>
                        <p className="text-slate-300 leading-relaxed text-lg mb-4">
                            SocialPulse AI is an advanced social media analytics and optimization platform powered by Google's Gemini 2.5 AI.
                            It helps content creators, marketers, and businesses optimize their social media presence by providing:
                        </p>
                        <ul className="space-y-3 text-slate-300">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                <span><strong>Real-time posting insights</strong> - Know the best times to post for maximum engagement</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                <span><strong>Platform-specific recommendations</strong> - Get tailored advice for Twitter, LinkedIn, TikTok, YouTube, and Instagram</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                <span><strong>Trending topic discovery</strong> - Stay ahead with real-time trending topics in your industry</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                <span><strong>Smart hashtag generation</strong> - Create optimized hashtags for better discoverability</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Step-by-Step Guide */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                        <Target className="w-7 h-7 text-purple-400" />
                        Step-by-Step Guide
                    </h2>

                    {/* Step 1: Insights */}
                    <div className="mb-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-indigo-500/20 p-3 rounded-xl border border-indigo-500/30">
                                <Clock className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">1. Generate Time-Based Insights</h3>
                                <p className="text-slate-400 mb-4">
                                    Start by understanding when your audience is most active and receptive to your content.
                                </p>
                                <div className="bg-slate-950 rounded-lg p-4 border border-slate-700">
                                    <h4 className="font-semibold text-white mb-2">How to use:</h4>
                                    <ol className="space-y-2 text-slate-300 text-sm">
                                        <li className="flex items-start gap-2">
                                            <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                            <span>Navigate to the <strong>Insights</strong> page (home page)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                            <span>Enter your industry or niche (e.g., "Tech Startups", "Fitness", "E-commerce")</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                            <span>Click <strong>"Generate Insights"</strong> to get AI-powered recommendations</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                            <span>Review platform-specific forecasts showing optimal posting times and engagement predictions</span>
                                        </li>
                                    </ol>
                                </div>
                                <div className="mt-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3">
                                    <p className="text-sm text-indigo-300">
                                        <strong>💡 Pro Tip:</strong> The insights are based on your local timezone and current day/time,
                                        so they're always relevant to your posting schedule.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Trending Topics */}
                    <div className="mb-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-purple-500/30 transition-colors">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-purple-500/20 p-3 rounded-xl border border-purple-500/30">
                                <TrendingUp className="w-6 h-6 text-purple-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">2. Discover Trending Topics</h3>
                                <p className="text-slate-400 mb-4">
                                    Stay ahead of the curve by discovering what's trending in your industry right now.
                                </p>
                                <div className="bg-slate-950 rounded-lg p-4 border border-slate-700">
                                    <h4 className="font-semibold text-white mb-2">How to use:</h4>
                                    <ol className="space-y-2 text-slate-300 text-sm">
                                        <li className="flex items-start gap-2">
                                            <ArrowRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                                            <span>Go to the <strong>Topics</strong> page from the navigation menu</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ArrowRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                                            <span>Enter your industry or topic of interest</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ArrowRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                                            <span>Click <strong>"Find Topics"</strong> to search for trending content</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ArrowRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                                            <span>Browse through trending topics with descriptions, hashtags, and keywords</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ArrowRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                                            <span>Use these insights to create timely, relevant content</span>
                                        </li>
                                    </ol>
                                </div>
                                <div className="mt-4 bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                                    <p className="text-sm text-purple-300">
                                        <strong>💡 Pro Tip:</strong> Trending topics are powered by real-time Google Search data,
                                        ensuring you're always working with the latest trends.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Hashtag Generator */}
                    <div className="mb-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-pink-500/30 transition-colors">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-pink-500/20 p-3 rounded-xl border border-pink-500/30">
                                <Hash className="w-6 h-6 text-pink-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">3. Generate Smart Hashtags</h3>
                                <p className="text-slate-400 mb-4">
                                    Create optimized hashtags that increase your content's discoverability and reach.
                                </p>
                                <div className="bg-slate-950 rounded-lg p-4 border border-slate-700">
                                    <h4 className="font-semibold text-white mb-2">How to use:</h4>
                                    <ol className="space-y-2 text-slate-300 text-sm">
                                        <li className="flex items-start gap-2">
                                            <ArrowRight className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                                            <span>Navigate to the <strong>Tags</strong> page</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ArrowRight className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                                            <span>Enter your topic or content theme</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ArrowRight className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                                            <span>Click <strong>"Generate Tags"</strong> to create optimized hashtags</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ArrowRight className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                                            <span>Click on any hashtag to copy it to your clipboard</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ArrowRight className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                                            <span>Use <strong>"Copy All"</strong> to copy all hashtags at once</span>
                                        </li>
                                    </ol>
                                </div>
                                <div className="mt-4 bg-pink-500/10 border border-pink-500/20 rounded-lg p-3">
                                    <p className="text-sm text-pink-300">
                                        <strong>💡 Pro Tip:</strong> Mix popular and niche-specific hashtags for optimal reach.
                                        Use 5-10 hashtags per post for best results.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 4: Dashboard */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-emerald-500/20 p-3 rounded-xl border border-emerald-500/30">
                                <BarChart3 className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">4. Monitor Your Dashboard</h3>
                                <p className="text-slate-400 mb-4">
                                    Track your scheduled posts and posting history all in one place.
                                </p>
                                <div className="bg-slate-950 rounded-lg p-4 border border-slate-700">
                                    <h4 className="font-semibold text-white mb-2">Features:</h4>
                                    <ul className="space-y-2 text-slate-300 text-sm">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                            <span><strong>Connect Accounts</strong> - Link your social media accounts (Coming Soon)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                            <span><strong>Scheduled Posts</strong> - View and manage your upcoming posts</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                            <span><strong>Post History</strong> - Track your published content and performance</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Best Practices */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8">Best Practices for Maximum Results</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-indigo-400" />
                                Consistency is Key
                            </h3>
                            <p className="text-slate-400 text-sm">
                                Use SocialPulse AI regularly to stay updated on optimal posting times.
                                Audience behavior changes, so refresh your insights weekly.
                            </p>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-purple-400" />
                                Act on Trends Quickly
                            </h3>
                            <p className="text-slate-400 text-sm">
                                Trending topics have a short lifespan. When you discover a relevant trend,
                                create and publish content within 24-48 hours.
                            </p>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                <Hash className="w-5 h-5 text-pink-400" />
                                Test Different Hashtags
                            </h3>
                            <p className="text-slate-400 text-sm">
                                Generate multiple hashtag sets and A/B test them.
                                Track which combinations drive the most engagement.
                            </p>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-emerald-400" />
                                Time Zone Matters
                            </h3>
                            <p className="text-slate-400 text-sm">
                                SocialPulse AI uses your local timezone. If your audience is global,
                                consider their time zones when scheduling posts.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <details className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 group">
                            <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                                <span>How accurate are the posting time recommendations?</span>
                                <span className="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="text-slate-400 mt-4 text-sm">
                                Our recommendations are powered by Google's Gemini 2.5 AI, which analyzes billions of data points
                                including platform algorithms, user behavior patterns, and industry-specific trends. While no prediction
                                is 100% accurate, our insights are based on the most current data available.
                            </p>
                        </details>
                        <details className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 group">
                            <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                                <span>Can I use SocialPulse AI for multiple industries?</span>
                                <span className="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="text-slate-400 mt-4 text-sm">
                                Absolutely! You can generate insights for any industry or niche. Simply change the industry input
                                each time you generate insights. This is perfect for agencies managing multiple clients.
                            </p>
                        </details>
                        <details className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 group">
                            <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                                <span>Is there a limit to how many insights I can generate?</span>
                                <span className="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="text-slate-400 mt-4 text-sm">
                                Currently, SocialPulse AI is powered by the free tier of Google's Gemini API.
                                We recommend generating insights only when needed to conserve API usage and ensure the service
                                remains available for all users.
                            </p>
                        </details>
                        <details className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 group">
                            <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                                <span>When will account connection be available?</span>
                                <span className="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="text-slate-400 mt-4 text-sm">
                                We're actively working on OAuth integration for Twitter, LinkedIn, and TikTok.
                                This feature will allow you to connect your accounts and schedule posts directly from SocialPulse AI.
                                Stay tuned for updates!
                            </p>
                        </details>
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-slate-900/40 border border-indigo-500/30 rounded-2xl p-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to Master Social Media?</h2>
                    <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                        Start using SocialPulse AI today and transform your social media strategy with AI-powered insights.
                    </p>
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20"
                    >
                        Get Started Now
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </section>

            </main>
        </div>
    );
};
