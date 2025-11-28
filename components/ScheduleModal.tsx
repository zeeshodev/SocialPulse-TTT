
import React, { useState, useEffect } from 'react';
import { X, Calendar, MessageSquare, Monitor, Send, Clock, Loader2 } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (platform: string, date: string, content: string) => void;
  onPostNow: (platform: string, content: string) => Promise<void>;
  initialPlatform?: string;
}

type Mode = 'schedule' | 'now';

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ 
  isOpen, 
  onClose, 
  onSchedule, 
  onPostNow,
  initialPlatform 
}) => {
  const [platform, setPlatform] = useState(initialPlatform || 'Twitter (X)');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [mode, setMode] = useState<Mode>('schedule');
  const [isPosting, setIsPosting] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setPlatform(initialPlatform || 'Twitter (X)');
      // Default to current time + 1 hour formatted for datetime-local
      const now = new Date();
      now.setHours(now.getHours() + 1);
      now.setMinutes(0);
      const isoString = now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
      setDate(isoString);
      setContent('');
      setMode('schedule');
      setIsPosting(false);
    }
  }, [isOpen, initialPlatform]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!platform || !content) return;

    if (mode === 'schedule') {
      if (date) {
        onSchedule(platform, date, content);
      }
    } else {
      setIsPosting(true);
      await onPostNow(platform, content);
      setIsPosting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-400" />
            Create Content
          </h2>

          <div className="flex bg-slate-950 p-1 rounded-lg mb-6 border border-slate-800">
            <button
              type="button"
              onClick={() => setMode('schedule')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${mode === 'schedule' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Calendar className="w-4 h-4" /> Schedule
            </button>
            <button
              type="button"
              onClick={() => setMode('now')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${mode === 'now' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Send className="w-4 h-4" /> Post Now
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Platform</label>
              <div className="relative">
                <Monitor className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none"
                >
                  <option value="Twitter (X)">Twitter (X)</option>
                  <option value="Instagram">Instagram</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook">Facebook</option>
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube Shorts">YouTube Shorts</option>
                </select>
              </div>
            </div>

            {/* Date Time - Only if Scheduling */}
            {mode === 'schedule' && (
              <div className="animate-in slide-in-from-top-2 duration-200">
                <label className="block text-sm font-medium text-slate-400 mb-1.5">When to post</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 pl-10 pr-3 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none [color-scheme:dark]"
                    required={mode === 'schedule'}
                  />
                </div>
              </div>
            )}

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Content</label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={mode === 'schedule' ? "What's on your mind for later?" : "What's happening right now?"}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none h-32 resize-none placeholder-slate-600"
                required
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-lg text-sm font-medium transition-colors"
                disabled={isPosting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isPosting}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  mode === 'now' 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                    : 'bg-slate-100 hover:bg-white text-slate-900'
                }`}
              >
                {isPosting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Posting...
                  </>
                ) : (
                  mode === 'now' ? 'Post Immediately' : 'Confirm Schedule'
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
