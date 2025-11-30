import React, { useState } from 'react';
import { PlatformInsight, PlatformStatus } from '../types';
import { EngagementChart } from './EngagementChart';
import {
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  Video,
  TrendingUp,
  Clock,
  Sparkles,
  Share2,
  Check,
  CalendarPlus
} from 'lucide-react';

interface PlatformCardProps {
  platform: PlatformInsight;
  onSchedule: () => void;
}

const getIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('instagram')) return <Instagram className="w-6 h-6 text-pink-500" />;
  if (n.includes('facebook')) return <Facebook className="w-6 h-6 text-blue-600" />;
  if (n.includes('youtube')) return <Youtube className="w-6 h-6 text-red-500" />;
  if (n.includes('linkedin')) return <Linkedin className="w-6 h-6 text-blue-500" />;
  if (n.includes('twitter') || n.includes('x')) return <Twitter className="w-6 h-6 text-sky-400" />;
  if (n.includes('tiktok')) return <Video className="w-6 h-6 text-teal-400" />;
  return <TrendingUp className="w-6 h-6 text-gray-400" />;
};

const getStatusStyles = (status: PlatformStatus) => {
  switch (status) {
    case PlatformStatus.EXCELLENT: return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
    case PlatformStatus.GOOD: return { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
    case PlatformStatus.FAIR: return { text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
    case PlatformStatus.POOR: return { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' };
    default: return { text: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' };
  }
};

const getChartColor = (status: PlatformStatus) => {
  switch (status) {
    case PlatformStatus.EXCELLENT: return '#34d399';
    case PlatformStatus.GOOD: return '#60a5fa';
    case PlatformStatus.FAIR: return '#facc15';
    case PlatformStatus.POOR: return '#fb7185';
    default: return '#94a3b8';
  }
};

export const PlatformCard: React.FC<PlatformCardProps> = ({ platform, onSchedule }) => {
  const [copied, setCopied] = useState(false);
  const styles = getStatusStyles(platform.currentStatus);
  const chartColor = getChartColor(platform.currentStatus);

  const handleShare = async () => {
    const text = `📊 ${platform.name} Forecast\n` +
      `⚡ Status: ${platform.currentStatus}\n` +
      `🕒 Next Best: ${platform.nextBestSlot}\n` +
      `via SocialPulse AI`;

    if (navigator.share) {
      try { await navigator.share({ title: 'SocialPulse Insight', text }); } catch (err) { }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) { }
    }
  };

  return (
    <div className="group relative bg-[#0F172A]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/5 overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#1e293b] rounded-xl border border-white/5 shadow-inner">
            {getIcon(platform.name)}
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-100">{platform.name}</h3>
            <div className={`text-[11px] font-bold px-2 py-0.5 rounded-full border inline-flex items-center gap-1 uppercase tracking-wide mt-1 ${styles.text} ${styles.bg} ${styles.border}`}>
              {platform.currentStatus === PlatformStatus.EXCELLENT && <Sparkles className="w-3 h-3" />}
              {platform.currentStatus}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-bold text-slate-100 tabular-nums">{platform.viralityScore}</div>
          <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Virality Score</div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 mb-6 relative z-10">
        <div className="flex items-center gap-2.5 text-sm text-slate-300 bg-slate-800/50 p-3 rounded-xl border border-white/5">
          <Clock className="w-4 h-4 text-indigo-400" />
          <span>
            Best time: <span className="text-white font-semibold">{platform.nextBestSlot}</span>
          </span>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed min-h-[2.5rem]">
          {platform.reasoning}
        </p>
      </div>

      {/* Chart */}
      <div className="relative h-32 w-full -mx-2 mb-2">
        <EngagementChart data={platform.hourlyForecast || []} color={chartColor} />
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-2 pt-4 border-t border-white/5">
        <button
          onClick={onSchedule}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-800/50 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 text-sm font-medium transition-all border border-transparent hover:border-indigo-500/20"
        >
          <CalendarPlus className="w-4 h-4" /> Schedule
        </button>
        <button
          onClick={handleShare}
          className="px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all border border-transparent hover:border-white/10"
          title="Share"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
