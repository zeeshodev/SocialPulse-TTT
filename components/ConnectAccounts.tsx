import React from 'react';
import { Twitter, Linkedin, Check, AlertCircle } from 'lucide-react';

interface ConnectAccountsProps {
    connectedPlatforms: {
        twitter: boolean;
        linkedin: boolean;
        tiktok: boolean;
    };
}

export const ConnectAccounts: React.FC<ConnectAccountsProps> = ({ connectedPlatforms }) => {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-semibold text-white">Connect Accounts</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">
                    COMING SOON
                </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Twitter */}
                <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#1DA1F2]/10 rounded-lg">
                            <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                        </div>
                        <div>
                            <div className="font-medium text-slate-200">Twitter (X)</div>
                            <div className="text-xs text-slate-500">
                                {connectedPlatforms.twitter ? 'Connected' : 'Not connected'}
                            </div>
                        </div>
                    </div>
                    {connectedPlatforms.twitter ? (
                        <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium px-3 py-1.5 bg-emerald-500/10 rounded-lg">
                            <Check className="w-4 h-4" />
                            <span>Active</span>
                        </div>
                    ) : (
                        <button
                            disabled
                            className="px-4 py-2 bg-slate-700 text-slate-400 text-sm font-bold rounded-lg cursor-not-allowed opacity-50"
                        >
                            Connect
                        </button>
                    )}
                </div>

                {/* LinkedIn */}
                <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#0A66C2]/10 rounded-lg">
                            <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                        </div>
                        <div>
                            <div className="font-medium text-slate-200">LinkedIn</div>
                            <div className="text-xs text-slate-500">
                                {connectedPlatforms.linkedin ? 'Connected' : 'Not connected'}
                            </div>
                        </div>
                    </div>
                    {connectedPlatforms.linkedin ? (
                        <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium px-3 py-1.5 bg-emerald-500/10 rounded-lg">
                            <Check className="w-4 h-4" />
                            <span>Active</span>
                        </div>
                    ) : (
                        <button
                            disabled
                            className="px-4 py-2 bg-slate-700 text-slate-400 text-sm font-bold rounded-lg cursor-not-allowed opacity-50"
                        >
                            Connect
                        </button>
                    )}
                </div>

                {/* TikTok */}
                <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#00F2EA]/10 rounded-lg">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#00F2EA">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                            </svg>
                        </div>
                        <div>
                            <div className="font-medium text-slate-200">TikTok</div>
                            <div className="text-xs text-slate-500">
                                {connectedPlatforms.tiktok ? 'Connected' : 'Not connected'}
                            </div>
                        </div>
                    </div>
                    {connectedPlatforms.tiktok ? (
                        <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium px-3 py-1.5 bg-emerald-500/10 rounded-lg">
                            <Check className="w-4 h-4" />
                            <span>Active</span>
                        </div>
                    ) : (
                        <button
                            disabled
                            className="px-4 py-2 bg-slate-700 text-slate-400 text-sm font-bold rounded-lg cursor-not-allowed opacity-50"
                        >
                            Connect
                        </button>
                    )}
                </div>

            </div>

            <div className="mt-4 flex items-start gap-2 text-xs text-slate-500 bg-slate-800/30 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                    Connecting accounts allows SocialPulse to post directly on your behalf.
                    We only request permission to create posts and read basic profile info.
                </p>
            </div>
        </div>
    );
};
