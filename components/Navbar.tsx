import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, TrendingUp, Hash, PenTool, Clock, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: '/', label: 'Insights', icon: Clock },
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/topics', label: 'Topics', icon: TrendingUp },
        { path: '/tags', label: 'Tags', icon: Hash },
        { path: '/how-to-use', label: 'How to Use', icon: BookOpen },
        { path: '/create', label: 'Create Post', icon: PenTool, comingSoon: true },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <span className="block font-bold text-xl tracking-tight text-white leading-none">SocialPulse</span>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-400 uppercase">AI Analytics</span>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive(item.path)
                                            ? 'bg-white/10 text-white'
                                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.label}
                                    {item.comingSoon && (
                                        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[9px] font-bold bg-indigo-500 text-white rounded-full">
                                            SOON
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
};
