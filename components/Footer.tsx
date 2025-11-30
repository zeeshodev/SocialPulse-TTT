import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-[#020617] border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 p-2 rounded-lg">
                                <Activity className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl text-white">SocialPulse</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            AI-powered social media strategy and scheduling for the modern creator. Dominate your niche with data-driven insights.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                            <a href="#" className="text-slate-500 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms & Conditions</Link></li>
                            <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} SocialPulse AI. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
