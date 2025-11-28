import React from 'react';
import { ScheduledPost } from '../types';
import { Trash2, Clock, CalendarClock, MessageSquare } from 'lucide-react';
import { 
  Instagram, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Youtube, 
  Video, 
} from 'lucide-react';

interface ScheduledPostsListProps {
  posts: ScheduledPost[];
  onDelete: (id: string) => void;
}

const getPlatformIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('instagram')) return <Instagram className="w-3.5 h-3.5" />;
  if (n.includes('linkedin')) return <Linkedin className="w-3.5 h-3.5" />;
  if (n.includes('twitter') || n.includes('x')) return <Twitter className="w-3.5 h-3.5" />;
  if (n.includes('facebook')) return <Facebook className="w-3.5 h-3.5" />;
  if (n.includes('youtube')) return <Youtube className="w-3.5 h-3.5" />;
  if (n.includes('tiktok')) return <Video className="w-3.5 h-3.5" />;
  return <MessageSquare className="w-3.5 h-3.5" />;
};

export const ScheduledPostsList: React.FC<ScheduledPostsListProps> = ({ posts, onDelete }) => {
  // Always render container to maintain layout, just show empty state if needed
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime()
  );

  return (
    <div className="bg-[#0F172A]/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <CalendarClock className="w-5 h-5 text-emerald-400" />
        </div>
        <h2 className="text-lg font-bold text-white">Scheduled Queue</h2>
      </div>

      <div className="space-y-3 flex-grow overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
        {sortedPosts.length > 0 ? (
            sortedPosts.map((post) => (
            <div key={post.id} className="group bg-slate-800/40 p-4 rounded-xl border border-white/5 hover:border-emerald-500/20 transition-all hover:bg-slate-800/60">
                <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 text-emerald-300 bg-emerald-500/5 px-2.5 py-1 rounded-md text-xs font-semibold border border-emerald-500/10">
                    {getPlatformIcon(post.platform)}
                    <span>{post.platform}</span>
                </div>
                <button 
                    onClick={() => onDelete(post.id)}
                    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-all p-1.5 hover:bg-rose-500/10 rounded-lg"
                    title="Cancel Post"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
                </div>

                <p className="text-sm text-slate-300 line-clamp-2 mb-3 leading-relaxed">
                {post.content}
                </p>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                <Clock className="w-3 h-3 text-slate-500" />
                <span className="bg-slate-900/50 px-2 py-0.5 rounded border border-white/5">
                    {new Date(post.scheduledTime).toLocaleDateString()} • {new Date(post.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                </div>
            </div>
            ))
        ) : (
            <div className="text-center py-10 border-2 border-dashed border-slate-800 rounded-xl">
                <p className="text-slate-500 text-sm">No upcoming posts scheduled.</p>
            </div>
        )}
      </div>
    </div>
  );
};
