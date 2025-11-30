import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Hash, Zap, Search, Sparkles, Copy, CheckCircle } from 'lucide-react';

export const TagsPage: React.FC = () => {
    const [topic, setTopic] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) return;

        setLoading(true);
        setTags([]);

        // Simulate AI generation (replace with actual API call later)
        setTimeout(() => {
            const generatedTags = [
                `#${topic.replace(/\s+/g, '')}`,
                `#${topic.replace(/\s+/g, '')}Tips`,
                `#${topic.replace(/\s+/g, '')}Community`,
                `#${topic.replace(/\s+/g, '')}2024`,
                '#Trending',
                '#Viral',
                '#Growth',
                '#Marketing',
                '#SocialMedia',
                '#ContentCreator'
            ];
            setTags(generatedTags);
            setLoading(false);
            toast.success('Tags generated!');
        }, 1500);
    };

    const handleCopy = (tag: string, index: number) => {
        navigator.clipboard.writeText(tag);
        setCopiedIndex(index);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleCopyAll = () => {
        navigator.clipboard.writeText(tags.join(' '));
        toast.success('All tags copied!');
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 pb-20 relative overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 relative z-10">

                {/* Hero & Search Section */}
                <div className="text-center max-w-3xl mx-auto mb-16 animate-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-6 backdrop-blur-md">
                        <Sparkles className="w-3 h-3" />
                        <span>AI-Powered Hashtag Generator</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white leading-[1.1]">
                        Generate Perfect <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">Hashtags</span>
                    </h1>
                    <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Create optimized hashtags and keywords for maximum reach and engagement.
                    </p>

                    <form onSubmit={handleGenerate} className="relative max-w-xl mx-auto group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-[#0B1120] rounded-xl flex items-center p-2 border border-white/10 shadow-2xl">
                            <Search className="w-5 h-5 text-slate-500 ml-3 mr-3" />
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 h-10"
                                placeholder="Enter your topic (e.g., Fitness, Travel, Tech)..."
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-2 rounded-lg font-medium text-sm transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
                            >
                                {loading ? 'Generating...' : 'Generate Tags'}
                                {!loading && <Zap className="w-4 h-4 fill-white" />}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="bg-slate-800/20 rounded-2xl p-6 h-48 animate-pulse border border-white/5 flex items-center justify-center">
                        <span className="text-slate-500 text-sm">Generating optimized hashtags...</span>
                    </div>
                )}

                {/* Generated Tags */}
                {!loading && tags.length > 0 && (
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 animate-in fade-in zoom-in duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Hash className="w-5 h-5 text-purple-400" />
                                Generated Hashtags
                            </h2>
                            <button
                                onClick={handleCopyAll}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Copy className="w-4 h-4" />
                                Copy All
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {tags.map((tag, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleCopy(tag, index)}
                                    className="group relative px-4 py-3 bg-slate-950 hover:bg-slate-800 border border-slate-700 hover:border-purple-500/50 rounded-lg transition-all text-left"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-purple-300 font-medium">{tag}</span>
                                        {copiedIndex === index ? (
                                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                                        ) : (
                                            <Copy className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
