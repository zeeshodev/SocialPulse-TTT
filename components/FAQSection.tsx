import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "How does the AI prediction work?",
        answer: "Our AI analyzes millions of data points from social media platforms, including engagement rates, trending hashtags, and user activity patterns, to predict the optimal content and posting times for your specific niche."
    },
    {
        question: "Can I schedule posts for multiple platforms?",
        answer: "Yes! SocialPulse supports Twitter (X), LinkedIn, TikTok, Instagram, and YouTube Shorts. You can schedule content for all these platforms from a single unified dashboard."
    },
    {
        question: "Is my data secure?",
        answer: "Absolutely. We use industry-standard encryption and official OAuth APIs for all platform integrations. We never store your passwords, and we only request the permissions necessary to publish your posts."
    },
    {
        question: "Do you offer a free trial?",
        answer: "Yes, we offer a 14-day free trial on all our plans so you can experience the power of AI-driven social media management before committing."
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, there are no long-term contracts. You can cancel your subscription at any time from your account settings."
    }
];

export const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-32 relative overflow-hidden bg-[#020617]">
            {/* Background Effects */}
            <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6 backdrop-blur-md">
                        <HelpCircle className="w-3 h-3" />
                        <span>Support</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                    <p className="text-lg text-slate-400">Everything you need to know about SocialPulse.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`group bg-slate-900/40 border ${openIndex === index ? 'border-indigo-500/50 bg-slate-800/40' : 'border-white/5'} rounded-2xl overflow-hidden transition-all duration-300 hover:border-indigo-500/30`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`font-medium text-lg ${openIndex === index ? 'text-indigo-300' : 'text-slate-200 group-hover:text-white'} transition-colors`}>
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <div className="p-1 bg-indigo-500/20 rounded-lg">
                                        <ChevronUp className="w-5 h-5 text-indigo-400" />
                                    </div>
                                ) : (
                                    <div className="p-1 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
                                        <ChevronDown className="w-5 h-5 text-slate-500 group-hover:text-slate-300" />
                                    </div>
                                )}
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5 mt-2">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
