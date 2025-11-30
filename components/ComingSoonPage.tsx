import React from 'react';
import { Sparkles } from 'lucide-react';

interface ComingSoonPageProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

export const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ title, description, icon }) => {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 pt-32 pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6 backdrop-blur-md">
                    <Sparkles className="w-3 h-3" />
                    <span>Coming Soon</span>
                </div>

                <div className="mb-8 flex justify-center">
                    <div className="p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl border border-white/10 backdrop-blur-sm">
                        {icon}
                    </div>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-white leading-tight">
                    {title}
                </h1>

                <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                    {description}
                </p>

                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-300">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">We're working on this feature</span>
                </div>
            </div>
        </div>
    );
};
