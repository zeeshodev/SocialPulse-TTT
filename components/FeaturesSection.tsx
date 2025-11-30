import React from 'react';
import { Zap, TrendingUp, Calendar, Globe, Shield, BarChart3, ArrowRight } from 'lucide-react';

const features = [
    {
        icon: Zap,
        title: "AI-Powered Strategy",
        description: "Get instant, data-driven content strategies tailored to your specific niche and audience demographics.",
        color: "from-amber-500 to-orange-500"
    },
    {
        icon: TrendingUp,
        title: "Real-time Trend Analysis",
        description: "Stay ahead of the curve with our real-time detection of viral topics, hashtags, and emerging conversations.",
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: Calendar,
        title: "Smart Scheduling",
        description: "Post at the perfect moment. Our AI predicts the highest engagement windows for every platform.",
        color: "from-emerald-500 to-green-500"
    },
    {
        icon: Globe,
        title: "Multi-Platform Support",
        description: "Manage your presence across Twitter, LinkedIn, TikTok, Instagram, and YouTube from a single dashboard.",
        color: "from-purple-500 to-pink-500"
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        description: "Your data is protected with state-of-the-art encryption and secure OAuth integrations.",
        color: "from-red-500 to-rose-500"
    },
    {
        icon: BarChart3,
        title: "Deep Analytics",
        description: "Measure what matters. Track growth, engagement, and ROI with our comprehensive analytics suite.",
        color: "from-indigo-500 to-violet-500"
    }
];

export const FeaturesSection: React.FC = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-[#020617]">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6 backdrop-blur-md">
                        <Zap className="w-3 h-3" />
                        <span>Powerful Features</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Everything You Need to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Dominate Social Media</span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        SocialPulse provides the advanced tools and insights you need to grow your audience and maximize engagement, all in one beautiful dashboard.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group relative p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:bg-slate-800/60 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Hover Gradient Border Effect */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.color} opacity-[0.03]`} />
                                <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                                <div className="relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} p-[1px] mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                        <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">{feature.title}</h3>
                                    <p className="text-slate-400 leading-relaxed mb-6">
                                        {feature.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500 group-hover:text-white transition-colors cursor-pointer">
                                        Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
