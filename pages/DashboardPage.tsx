import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';
import { ConnectAccounts } from '../components/ConnectAccounts';
import { ScheduledPostsList } from '../components/ScheduledPostsList';
import { HistoryList } from '../components/HistoryList';
import { toast } from 'react-hot-toast';
import { ScheduledPost, PostedItem } from '../types';

export const DashboardPage: React.FC = () => {
    const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
    const [recentPosts, setPostedItems] = useState<PostedItem[]>([]);
    const [connectedPlatforms, setConnectedPlatforms] = useState({
        twitter: false,
        linkedin: false,
        tiktok: false
    });

    useEffect(() => {
        fetchPosts();
        fetchUserStatus();
    }, []);

    const fetchUserStatus = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/user`);
            if (res.ok) {
                const data = await res.json();
                if (data.authenticated && data.user?.connectedPlatforms) {
                    setConnectedPlatforms(data.user.connectedPlatforms);
                }
            }
        } catch (err) {
            console.error("Failed to fetch user status", err);
        }
    };

    const fetchPosts = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/posts`);
            if (res.ok) {
                const allPosts = await res.json();
                const scheduled = allPosts.filter((p: any) => p.status === 'scheduled').map((p: any) => ({
                    id: p._id,
                    platform: p.platform,
                    content: p.content,
                    scheduledTime: p.scheduledTime,
                    createdAt: new Date(p.createdAt).getTime()
                }));
                const posted = allPosts.filter((p: any) => p.status === 'posted' || p.status === 'failed').map((p: any) => ({
                    id: p._id,
                    platform: p.platform,
                    content: p.content,
                    postedAt: new Date(p.postedAt || p.createdAt).getTime(),
                    status: p.status === 'posted' ? 'Success' : 'Failed'
                }));

                setScheduledPosts(scheduled);
                setPostedItems(posted);
            }
        } catch (err) {
            console.error("Failed to load posts", err);
        }
    };

    const handleDeletePost = async (id: string) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/posts/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success("Post removed");
                fetchPosts();
            }
        } catch (err) {
            toast.error("Failed to delete post");
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 pb-20 relative overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 relative z-10">

                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-slate-400">Manage your connected accounts and scheduled posts</p>
                </div>

                {/* Connect Accounts Section */}
                <ConnectAccounts connectedPlatforms={connectedPlatforms} />

                {/* Scheduled Posts & History */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ScheduledPostsList posts={scheduledPosts} onDelete={handleDeletePost} />
                    <HistoryList items={recentPosts} />
                </div>
            </main>
        </div>
    );
};
