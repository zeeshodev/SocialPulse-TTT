import React from 'react';
import { CheckCircle2, TrendingUp, Users, Clock } from 'lucide-react';

const benefits = [
    "Save 20+ hours per week on content planning",
    "Increase engagement rates by up to 300%",
    "Data-backed decisions, no more guesswork",
    "Unified workflow for all social channels",
    "AI that adapts to your unique brand voice"
];

export const WhyChooseUs: React.FC = () => {
    return (
        <section className="py-32 bg-[#020617] relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute right-0 top-1/4 w-1/2 h-1/2 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium mb-6 backdrop-blur-md">
                            <TrendingUp className="w-3 h-3" />
                            <span>Why SocialPulse?</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                            Stop Guessing. <br />
                            Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Growing.</span>
                        </h2>
                        <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-xl">
                            Traditional social media management is time-consuming and often relies on intuition. SocialPulse changes the game by leveraging advanced AI to tell you exactly what to post, when to post it, and why.
                        </p>

                        <div className="space-y-5">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-4 group">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                    </div>
                                    <span className="text-slate-300 group-hover:text-white transition-colors">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-indigo-500/20 rounded-[2.5rem] blur-3xl -z-10 transform rotate-6"></div>

                        {/* Main Card */}
                        <div className="bg-slate-900/80 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500" />

                            {/* Header */}
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <p className="text-sm text-slate-400 mb-1">Total Audience Growth</p>
                                    <h3 className="text-3xl font-bold text-white">+127.5%</h3>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium flex items-center gap-1">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>Trending</span>
                                </div>
                            </div>

                            {/* Chart Area (Visual Representation) */}
                            <div className="h-48 flex items-end justify-between gap-2 mb-10 px-2">
                                {[40, 65, 45, 80, 55, 90, 75, 100].map((height, i) => (
                                    <div key={i} className="w-full bg-slate-800/50 rounded-t-lg relative group overflow-hidden" style={{ height: `${height}%` }}>
                                        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-emerald-500/20 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500/50 group-hover:h-full group-hover:bg-emerald-500/10 transition-all duration-500" />
                                    </div>
                                ))}
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-800/50 rounded-2xl p-4 border border-white/5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                                            <Users className="w-4 h-4 text-indigo-400" />
                                        </div>
                                        <span className="text-sm text-slate-400">Engagement</span>
                                    </div>
                                    <p className="text-xl font-bold text-white">24.8k</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-2xl p-4 border border-white/5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-orange-500/10 rounded-lg">
                                            <Clock className="w-4 h-4 text-orange-400" />
                                        </div>
                                        <span className="text-sm text-slate-400">Time Saved</span>
                                    </div>
                                    <p className="text-xl font-bold text-white">12h/wk</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Element */}
                        <div className="absolute -bottom-6 -left-6 bg-slate-800 border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur-md animate-bounce" style={{ animationDuration: '3s' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">AI</div>
                                <div>
                                    <p className="text-xs text-slate-400">AI Insight</p>
                                    <p className="text-sm font-medium text-white">Viral trend detected!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
