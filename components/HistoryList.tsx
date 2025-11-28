import React from 'react';
import { PostedItem } from '../types';
import { Check, History, ExternalLink } from 'lucide-react';

interface HistoryListProps {
  items: PostedItem[];
}

export const HistoryList: React.FC<HistoryListProps> = ({ items }) => {
  const sortedItems = [...items].sort((a, b) => b.postedAt - a.postedAt);

  return (
    <div className="bg-[#0F172A]/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <History className="w-5 h-5 text-blue-400" />
        </div>
        <h2 className="text-lg font-bold text-white">Action History</h2>
      </div>

      <div className="space-y-3 flex-grow overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
        {sortedItems.length > 0 ? (
            sortedItems.map((item) => (
            <div key={item.id} className="bg-slate-800/40 p-4 rounded-xl border border-white/5 flex items-start justify-between group hover:bg-slate-800/60 transition-colors">
                <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {item.platform}
                    </span>
                    <span className="text-[10px] text-slate-600">•</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(item.postedAt).toLocaleTimeString()}
                    </span>
                </div>
                <p className="text-sm text-slate-300 truncate opacity-90">{item.content}</p>
                </div>
                
                <div className="flex items-center">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 shadow-sm">
                        <Check className="w-3 h-3" /> Sent
                    </span>
                </div>
            </div>
            ))
        ) : (
            <div className="text-center py-10 border-2 border-dashed border-slate-800 rounded-xl">
                <p className="text-slate-500 text-sm">No recent activity recorded.</p>
            </div>
        )}
      </div>
    </div>
  );
};
