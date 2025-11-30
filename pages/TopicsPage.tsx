import React, { useState } from 'react';
import { fetchTrendingTopics } from '../services/geminiService';
import { TrendingData } from '../types';
import { TrendingSection } from '../components/TrendingSection';
import { toast } from 'react-hot-toast';
import { TrendingUp, Search, Globe, Sparkles, Settings } from 'lucide-react';

const DEFAULT_INDUSTRY = "General Tech & Lifestyle";

export const TopicsPage: React.FC = () => {
    const [industry, setIndustry] = useState<string>(DEFAULT_INDUSTRY);
    const [tempIndustry, setTempIndustry] = useState<string>(DEFAULT_INDUSTRY);
    const [trendingData, setTrendingData] = useState<TrendingData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchTopics = (forceIndustry?: string) => {
        const targetIndustry = forceIndustry || industry;

        setError(null);
        setLoading(true);

        fetchTrendingTopics(targetIndustry)
            .then(result => {
                setTrendingData(result);
            })
            .catch(err => {
                console.error(err);
                setError("Unable to fetch trending topics");
                toast.error("Unable to fetch trending topics. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (tempIndustry.trim()) {
            setIndustry(tempIndustry);
            handleFetchTopics(tempIndustry);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 pb-20 relative overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 relative z-10">

                {/* Hero & Search Section */}
                <div className="text-center max-w-3xl mx-auto mb-16 animate-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6 backdrop-blur-md">
                        <Sparkles className="w-3 h-3" />
                        <span>AI-Powered Topic Discovery</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white leading-[1.1]">
                        Discover What's <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Trending Now</span>
                    </h1>
                    <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Get real-time trending topics, hashtags, and keywords for your industry.
                    </p>

                    <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-[#0B1120] rounded-xl flex items-center p-2 border border-white/10 shadow-2xl">
                            <Search className="w-5 h-5 text-slate-500 ml-3 mr-3" />
                            <input
                                type="text"
                                value={tempIndustry}
                                onChange={(e) => setTempIndustry(e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 h-10"
                                placeholder="Enter your industry (e.g., Tech, Fashion, Gaming)..."
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-6 py-2 rounded-lg font-medium text-sm transition-all shadow-md flex items-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Searching...' : 'Find Topics'}
                                {!loading && <TrendingUp className="w-4 h-4" />}
                            </button>
                        </div>
                        <div className="flex justify-center gap-4 mt-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1.5"><Globe className="w-3 h-3" /> Real-time Search</span>
                            <span>•</span>
                            <span>AI-Powered Discovery</span>
                        </div>
                    </form>
                </div>

                {/* Error State */}
                {error && (
                    <div className="max-w-4xl mx-auto bg-rose-500/10 border border-rose-500/20 text-rose-200 p-4 rounded-2xl mb-12 flex items-center gap-4 backdrop-blur-md">
                        <div className="p-3 bg-rose-500/20 rounded-xl">
                            <Settings className="w-6 h-6 text-rose-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-rose-100">Search Unavailable</h3>
                            <p className="text-sm opacity-80">We couldn't fetch trending topics right now. Please try again shortly.</p>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="bg-slate-800/20 rounded-2xl p-6 h-48 animate-pulse border border-white/5 flex items-center justify-center">
                        <span className="text-slate-500 text-sm">Searching for trending topics...</span>
                    </div>
                )}

                {/* Trending Topics */}
                {!loading && trendingData && <TrendingSection data={trendingData} />}
            </main>
        </div>
    );
};
