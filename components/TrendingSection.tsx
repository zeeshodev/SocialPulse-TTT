import React, { useState } from 'react';
import { TrendingData, TrendingItem } from '../types';
import { TrendingUp, ExternalLink, Hash, Tag, Copy, Check } from 'lucide-react';

interface TrendingSectionProps {
  data: TrendingData;
}

const TrendingCard: React.FC<{ item: TrendingItem }> = ({ item }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyKeywords = async () => {
    if (!item.keywords || item.keywords.length === 0) return;
    
    const textToCopy = item.keywords.join(', ');
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="group relative bg-slate-800/40 backdrop-blur-sm p-5 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 flex flex-col h-full overflow-hidden">
      {/* Subtle Gradient Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative flex-grow z-10">
        <h3 className="text-lg font-semibold text-slate-100 mb-2 leading-tight group-hover:text-indigo-300 transition-colors">
          {item.topic}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {item.description}
        </p>
        
        {item.hashtags && item.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.hashtags.map((tag, tIdx) => (
              <span key={tIdx} className="inline-flex items-center text-[11px] font-medium bg-indigo-500/10 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/20 shadow-sm">
                <Hash className="w-2.5 h-2.5 mr-0.5 opacity-70" />
                {tag.replace(/^#/, '')}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {item.keywords && item.keywords.length > 0 && (
        <div className="relative z-10 mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-slate-500">
              <Tag className="w-3.5 h-3.5 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider opacity-70">Keywords</span>
            </div>
            
            <button
              onClick={handleCopyKeywords}
              className="group/btn relative p-1.5 -mr-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all active:scale-95"
              title="Copy keywords"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              
              {/* Tooltip */}
              {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg animate-in fade-in slide-in-from-bottom-2 whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
          </div>
          
          <p className="mt-2 text-xs text-slate-400 font-mono leading-relaxed break-words bg-black/20 p-2 rounded-lg border border-white/5">
            {item.keywords.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export const TrendingSection: React.FC<TrendingSectionProps> = ({ data }) => {
  if (!data || (data.items.length === 0 && !data.rawText)) return null;

  return (
    <div className="relative mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
          <TrendingUp className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-100">Trending Intelligence</h2>
          <p className="text-sm text-slate-400">Real-time topics and SEO keywords for your industry</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {data.items.length > 0 ? (
          data.items.map((item, idx) => (
            <TrendingCard key={idx} item={item} />
          ))
        ) : (
          <div className="col-span-full text-slate-400 italic bg-slate-800/30 p-8 rounded-2xl border border-slate-800 text-center">
            {data.rawText}
          </div>
        )}
      </div>

      {data.sources.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 px-2">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mr-2">Verified Sources:</span>
          {data.sources.map((source, idx) => (
            <a 
              key={idx}
              href={source.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-indigo-300 hover:text-white transition-colors bg-slate-800/50 hover:bg-indigo-600/20 px-3 py-1.5 rounded-full border border-white/5 hover:border-indigo-500/30"
            >
              <ExternalLink className="w-3 h-3" /> {source.title} 
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
