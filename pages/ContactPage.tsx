import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, MessageSquare } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../config/api';

export const ContactPage: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        try {
            const res = await fetch(`${API_BASE_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                setSubmitted(true);
                toast.success("Message sent successfully!");
            } else {
                toast.error("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 pt-32 pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6 backdrop-blur-md">
                        <MessageSquare className="w-3 h-3" />
                        <span>We'd love to hear from you</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in Touch</h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Have questions about SocialPulse? We're here to help. Chat with our friendly team 24/7.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="group bg-slate-900/40 border border-white/5 p-8 rounded-2xl hover:bg-slate-800/40 hover:border-indigo-500/30 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-500/10 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
                                    <Mail className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Chat with us</h3>
                                    <p className="text-slate-400 mb-2">Speak to our friendly team via email.</p>
                                    <a href="mailto:socialpulseai@gmail.com" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">socialpulseai@gmail.com</a>
                                </div>
                            </div>
                        </div>

                        <div className="group bg-slate-900/40 border border-white/5 p-8 rounded-2xl hover:bg-slate-800/40 hover:border-indigo-500/30 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                                    <MapPin className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Visit us</h3>
                                    <p className="text-slate-400 mb-2">Visit our office HQ.</p>
                                    <p className="text-slate-300">Main Boulevard,Paragon City , Lahore , Pakistan</p>
                                </div>
                            </div>
                        </div>

                        <div className="group bg-slate-900/40 border border-white/5 p-8 rounded-2xl hover:bg-slate-800/40 hover:border-indigo-500/30 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                                    <Phone className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Call us</h3>
                                    <p className="text-slate-400 mb-2">Mon-Fri from 8am to 5pm.</p>
                                    <a href="tel:+923707203692" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">+92(370)7203692</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-20"></div>
                        <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
                            {submitted ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                    <p className="text-slate-400 mb-8">We'll get back to you as soon as possible.</p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-indigo-400 hover:text-indigo-300 font-medium"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="first-name" className="block text-sm font-medium text-slate-300 mb-2">First name</label>
                                            <input required name="firstName" type="text" id="first-name" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none" placeholder="First name" />
                                        </div>
                                        <div>
                                            <label htmlFor="last-name" className="block text-sm font-medium text-slate-300 mb-2">Last name</label>
                                            <input required name="lastName" type="text" id="last-name" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none" placeholder="Last name" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                                        <input required name="email" type="email" id="email" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none" placeholder="you@example.com" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                                        <textarea required name="message" id="message" rows={4} className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none" placeholder="Tell us how we can help..."></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                        {!isSubmitting && <Send className="w-4 h-4" />}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
