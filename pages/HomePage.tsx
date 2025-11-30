import React, { useState } from 'react';
import { fetchSocialInsights } from '../services/geminiService';
import { SocialInsightsResponse } from '../types';
import { PlatformCard } from '../components/PlatformCard';
import { toast } from 'react-hot-toast';
import { Activity, Zap, Search, Globe, Sparkles, Settings } from 'lucide-react';
import { FeaturesSection } from '../components/FeaturesSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { FAQSection } from '../components/FAQSection';
import { Footer } from '../components/Footer';

const DEFAULT_INDUSTRY = "";

export const HomePage: React.FC = () => {
    const [industry, setIndustry] = useState<string>(DEFAULT_INDUSTRY);
    const [tempIndustry, setTempIndustry] = useState<string>(DEFAULT_INDUSTRY);
    const [data, setData] = useState<SocialInsightsResponse | null>(null);
    const [insightsLoading, setInsightsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchInsights = (forceIndustry?: string) => {
        const targetIndustry = forceIndustry || industry;
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        setError(null);
        setInsightsLoading(true);

        fetchSocialInsights(targetIndustry, timezone)
            .then(result => {
                setData(result);
            })
            .catch(err => {
                console.error(err);
                setError("Unable to generate insights");
                toast.error("Unable to generate insights. Please try again.");
            })
            .finally(() => {
                setInsightsLoading(false);
            });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (tempIndustry.trim()) {
            setIndustry(tempIndustry);
            handleFetchInsights(tempIndustry);
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
                        <span>AI-Powered Realtime Strategy</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white leading-[1.1]">
                        Master Your Social <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Presence Instantly</span>
                    </h1>
                    <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Get personalized posting schedules and virality predictions tailored to your specific industry.
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
                                placeholder="Enter your niche (e.g., SaaS, Fitness, Gaming)..."
                            />
                            <button
                                type="submit"
                                disabled={insightsLoading}
                                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-6 py-2 rounded-lg font-medium text-sm transition-all shadow-md flex items-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {insightsLoading ? 'Analyzing...' : 'Generate Insights'}
                                {!insightsLoading && <Zap className="w-4 h-4 fill-white" />}
                            </button>
                        </div>
                        <div className="flex justify-center gap-4 mt-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1.5"><Globe className="w-3 h-3" /> {Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
                            <span>•</span>
                            <span>AI-Powered Analytics</span>
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
                            <h3 className="font-semibold text-rose-100">Unable to Generate Insights</h3>
                            <p className="text-sm opacity-80">We're experiencing technical difficulties. Please try again in a moment.</p>
                        </div>
                    </div>
                )}

                {/* Platform Forecasts */}
                {insightsLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse mb-20">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-72 bg-slate-800/30 rounded-2xl border border-white/5"></div>
                        ))}
                    </div>
                )}

                {!insightsLoading && data && (
                    <>
                        {/* General Advice Banner */}
                        <div className="max-w-5xl mx-auto relative bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-slate-900/40 border border-indigo-500/30 rounded-2xl p-8 mb-16 overflow-hidden animate-in fade-in zoom-in duration-500">
                            <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
                                <div className="p-4 bg-indigo-500/20 rounded-2xl border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                                    <Zap className="w-8 h-8 text-indigo-300" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-2">Strategic Overview</h2>
                                    <p className="text-slate-300 leading-relaxed text-lg font-light">{data.generalAdvice}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-20">
                            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <Activity className="w-6 h-6 text-indigo-400" />
                                Platform Forecasts
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data.platforms.map((platform) => (
                                    <PlatformCard
                                        key={platform.name}
                                        platform={platform}
                                        onSchedule={() => toast('Post scheduling coming soon!', { icon: '🚀' })}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </main>

            <FeaturesSection />
            <WhyChooseUs />
            <FAQSection />
            <Footer />
        </div>
    );
};
