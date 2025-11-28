import React, { useState, useEffect } from 'react';
import { fetchSocialInsights, fetchTrendingTopics, checkBackendHealth } from './services/geminiService';
import { SocialInsightsResponse, TrendingData, ScheduledPost, PostedItem } from './types';
import { PlatformCard } from './components/PlatformCard';
import { TrendingSection } from './components/TrendingSection';
import { CreatePostModal } from './components/ScheduleModal';
import { ScheduledPostsList } from './components/ScheduledPostsList';
import { HistoryList } from './components/HistoryList';
import { Toaster, toast } from 'react-hot-toast';
import { 
  Activity, 
  Settings, 
  RefreshCw, 
  Zap, 
  Search,
  Globe,
  Plus,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

const DEFAULT_INDUSTRY = "General Tech & Lifestyle";

const App: React.FC = () => {
  const [industry, setIndustry] = useState<string>(DEFAULT_INDUSTRY);
  const [tempIndustry, setTempIndustry] = useState<string>(DEFAULT_INDUSTRY);
  
  const [data, setData] = useState<SocialInsightsResponse | null>(null);
  const [trendingData, setTrendingData] = useState<TrendingData | null>(null);
  
  // Scheduling & Posting State
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [recentPosts, setRecentPosts] = useState<PostedItem[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createPlatform, setCreatePlatform] = useState<string>('Twitter (X)');
  
  // Independent Loading States
  const [insightsLoading, setInsightsLoading] = useState<boolean>(false);
  const [trendingLoading, setTrendingLoading] = useState<boolean>(false);
  
  const [error, setError] = useState<string | null>(null);
  const [backendError, setBackendError] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scrolled, setScrolled] = useState(false);

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial Health Check
  useEffect(() => {
    checkBackendHealth().then(isHealthy => {
      if (!isHealthy) {
        setBackendError(true);
        toast.error("Cannot connect to server. Ensure backend is running.");
      } else {
        setBackendError(false);
        handleFetchInsights();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchInsights = (forceIndustry?: string) => {
    const targetIndustry = forceIndustry || industry;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    setError(null);
    setTrendingData(null); // Clear old trending data
    // Keep old insights data while loading new to prevent flash, unless error
    
    // 1. Fetch Main Insights
    setInsightsLoading(true);
    fetchSocialInsights(targetIndustry, timezone)
      .then(result => {
        setData(result);
      })
      .catch(err => {
        console.error(err);
        setError(err.message || "Failed to load insights.");
      })
      .finally(() => {
        setInsightsLoading(false);
      });

    // 2. Fetch Trending Topics (Independently)
    setTrendingLoading(true);
    fetchTrendingTopics(targetIndustry)
      .then(result => {
        setTrendingData(result);
      })
      .catch(err => {
        console.warn("Trending fetch error", err);
      })
      .finally(() => {
        setTrendingLoading(false);
      });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempIndustry.trim()) {
      setIndustry(tempIndustry);
      handleFetchInsights(tempIndustry);
    }
  };

  const handleOpenCreate = (platformName: string = 'Twitter (X)') => {
    setCreatePlatform(platformName);
    setIsCreateModalOpen(true);
  };

  const handleSchedulePost = (platform: string, date: string, content: string) => {
    const newPost: ScheduledPost = {
      id: Date.now().toString(),
      platform,
      scheduledTime: date,
      content,
      createdAt: Date.now()
    };
    setScheduledPosts(prev => [...prev, newPost]);
    setIsCreateModalOpen(false);
    toast.success("Post scheduled successfully");
  };

  const handlePostNow = async (platform: string, content: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newPost: PostedItem = {
      id: Date.now().toString(),
      platform,
      content,
      postedAt: Date.now(),
      status: 'Success'
    };
    
    setRecentPosts(prev => [newPost, ...prev]);
    setIsCreateModalOpen(false);
    toast.success("Posted to " + platform);
  };

  const handleDeletePost = (id: string) => {
    setScheduledPosts(prev => prev.filter(p => p.id !== id));
    toast.success("Scheduled post removed");
  };

  const isLoading = insightsLoading || trendingLoading;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 pb-20 relative overflow-x-hidden selection:bg-indigo-500/30">
      
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f8fafc',
            border: '1px solid rgba(255,255,255,0.1)',
          },
          success: {
            iconTheme: { primary: '#34d399', secondary: '#1e293b' },
          },
          error: {
            iconTheme: { primary: '#fb7185', secondary: '#1e293b' },
          },
        }}
      />

      {/* Ambient Background Effects */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      {/* Floating Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-[#020617]/80 backdrop-blur-xl border-white/5 shadow-lg' : 'bg-transparent border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="block font-bold text-xl tracking-tight text-white leading-none">SocialPulse</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-400 uppercase">AI Analytics</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:flex flex-col items-end mr-2 text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-0.5">Local Time</span>
                <span className="font-mono text-sm font-medium text-slate-200">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <button 
                onClick={() => handleOpenCreate()}
                className="bg-white text-slate-900 hover:bg-indigo-50 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Create
              </button>
              <button 
                onClick={() => handleFetchInsights()}
                disabled={isLoading}
                className={`p-2.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-transparent hover:border-white/10 ${isLoading ? 'animate-spin opacity-50' : ''}`}
                title="Refresh Insights"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 relative z-10">
        
        {/* Hero & Search Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6 backdrop-blur-md">
            <Sparkles className="w-3 h-3" />
            <span>AI-Powered Realtime Strategy</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white leading-[1.1]">
            Master Your Social <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Presence Instantly</span>
          </h1>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get personalized posting schedules, virality predictions, and trending content ideas tailored to your specific industry.
          </p>

          <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0B1120] rounded-xl flex items-center p-2 border border-white/10 shadow-2xl">
              <Search className="w-5 h-5 text-slate-500 ml-3 mr-3" />
              <input 
                type="text" 
                value={tempIndustry}
                onChange={(e) => setTempIndustry(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 h-10"
                placeholder="Enter your niche (e.g., SaaS, Fitness, Gaming)..."
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-6 py-2 rounded-lg font-medium text-sm transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
              >
                {isLoading ? 'Analyzing...' : 'Generate Insights'}
                {!isLoading && <Zap className="w-4 h-4 fill-white" />}
              </button>
            </div>
            <div className="flex justify-center gap-4 mt-4 text-xs text-slate-500">
               <span className="flex items-center gap-1.5"><Globe className="w-3 h-3" /> {Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
               <span>•</span>
               <span>Powered by Gemini 2.5</span>
            </div>
          </form>
        </div>

        {/* Backend Error Alert */}
        {backendError && (
          <div className="max-w-4xl mx-auto bg-amber-500/10 border border-amber-500/20 text-amber-200 p-4 rounded-2xl mb-12 flex items-center gap-4 backdrop-blur-md">
            <div className="p-3 bg-amber-500/20 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-100">Server Connection Issue</h3>
              <p className="text-sm opacity-80">Could not connect to the analysis server. Please ensure the backend is running on port 3000.</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-4xl mx-auto bg-rose-500/10 border border-rose-500/20 text-rose-200 p-4 rounded-2xl mb-12 flex items-center gap-4 backdrop-blur-md">
            <div className="p-3 bg-rose-500/20 rounded-xl">
              <Settings className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <h3 className="font-semibold text-rose-100">Analysis Failed</h3>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          </div>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-16">
            
            {/* Left Column: Trending & History */}
            <div className="xl:col-span-4 space-y-12">
              {trendingLoading && (
                  <div className="bg-slate-800/20 rounded-2xl p-6 h-48 animate-pulse border border-white/5 flex items-center justify-center">
                    <span className="text-slate-500 text-sm">Loading Trending Topics...</span>
                  </div>
              )}
              {!trendingLoading && trendingData && <TrendingSection data={trendingData} />}
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <ScheduledPostsList posts={scheduledPosts} onDelete={handleDeletePost} />
                  <HistoryList items={recentPosts} />
              </div>
            </div>
        </div>

        {/* Platform Forecasts */}
        {insightsLoading && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse mb-20">
             {[1, 2, 3].map(i => (
               <div key={i} className="h-72 bg-slate-800/30 rounded-2xl border border-white/5"></div>
             ))}
           </div>
        )}

        {!insightsLoading && data && (
          <>
            {/* General Advice Banner */}
            <div className="max-w-5xl mx-auto relative bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-slate-900/40 border border-indigo-500/30 rounded-2xl p-8 mb-16 overflow-hidden animate-in fade-in zoom-in duration-500">
              <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="p-4 bg-indigo-500/20 rounded-2xl border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                    <Zap className="w-8 h-8 text-indigo-300" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">Strategic Overview</h2>
                    <p className="text-slate-300 leading-relaxed text-lg font-light">{data.generalAdvice}</p>
                  </div>
              </div>
            </div>

            <div className="mb-20">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Activity className="w-6 h-6 text-indigo-400" />
                Platform Forecasts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.platforms.map((platform) => (
                  <PlatformCard 
                    key={platform.name} 
                    platform={platform} 
                    onSchedule={() => handleOpenCreate(platform.name)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      <CreatePostModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSchedule={handleSchedulePost}
        onPostNow={handlePostNow}
        initialPlatform={createPlatform}
      />
    </div>
  );
};

export default App;