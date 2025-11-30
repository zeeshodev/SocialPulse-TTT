import React from 'react';
import { Shield, Clock, FileText, ArrowRight } from 'lucide-react';

export const TermsOfService: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 pt-32 pb-20 relative">
            {/* Background Effects */}
            <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Sidebar Navigation */}
                    <div className="lg:w-64 shrink-0">
                        <div className="sticky top-32 space-y-8">
                            <div>
                                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-indigo-400" />
                                    Contents
                                </h3>
                                <nav className="space-y-1 border-l-2 border-slate-800">
                                    <a href="#agreement" className="block pl-4 py-2 text-sm text-indigo-400 border-l-2 border-indigo-400 -ml-0.5 font-medium">Agreement to Terms</a>
                                    <a href="#license" className="block pl-4 py-2 text-sm text-slate-400 hover:text-white hover:border-slate-600 -ml-0.5 transition-all">Use License</a>
                                    <a href="#disclaimer" className="block pl-4 py-2 text-sm text-slate-400 hover:text-white hover:border-slate-600 -ml-0.5 transition-all">Disclaimer</a>
                                    <a href="#limitations" className="block pl-4 py-2 text-sm text-slate-400 hover:text-white hover:border-slate-600 -ml-0.5 transition-all">Limitations</a>
                                    <a href="#governing" className="block pl-4 py-2 text-sm text-slate-400 hover:text-white hover:border-slate-600 -ml-0.5 transition-all">Governing Law</a>
                                </nav>
                            </div>

                            <div className="bg-slate-900/50 rounded-xl p-6 border border-white/5">
                                <h4 className="font-semibold text-white mb-2">Need Help?</h4>
                                <p className="text-sm text-slate-400 mb-4">If you have questions about these terms, please contact us.</p>
                                <a href="/contact" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1">
                                    Contact Support <ArrowRight className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-grow">
                        <div className="mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6">
                                <Shield className="w-3 h-3" />
                                <span>Legal Document</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms of Service</h1>
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <Clock className="w-4 h-4" />
                                <span>Last updated: {new Date().toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none">
                            <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
                                <section id="agreement" className="mb-12 scroll-mt-32">
                                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm">1</span>
                                        Agreement to Terms
                                    </h2>
                                    <p className="text-slate-300 leading-relaxed">
                                        By accessing our website at SocialPulse, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                                    </p>
                                </section>

                                <section id="license" className="mb-12 scroll-mt-32">
                                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm">2</span>
                                        Use License
                                    </h2>
                                    <p className="text-slate-300 leading-relaxed mb-4">
                                        Permission is granted to temporarily download one copy of the materials (information or software) on SocialPulse's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                                    </p>
                                    <ul className="space-y-3 text-slate-300 list-none pl-0">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span>Modify or copy the materials;</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span>Attempt to decompile or reverse engineer any software contained on SocialPulse's website;</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span>Remove any copyright or other proprietary notations from the materials; or</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span>Transfer the materials to another person or "mirror" the materials on any other server.</span>
                                        </li>
                                    </ul>
                                </section>

                                <section id="disclaimer" className="mb-12 scroll-mt-32">
                                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm">3</span>
                                        Disclaimer
                                    </h2>
                                    <p className="text-slate-300 leading-relaxed">
                                        The materials on SocialPulse's website are provided on an 'as is' basis. SocialPulse makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                                    </p>
                                </section>

                                <section id="limitations" className="mb-12 scroll-mt-32">
                                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm">4</span>
                                        Limitations
                                    </h2>
                                    <p className="text-slate-300 leading-relaxed">
                                        In no event shall SocialPulse or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SocialPulse's website, even if SocialPulse or a SocialPulse authorized representative has been notified orally or in writing of the possibility of such damage.
                                    </p>
                                </section>

                                <section id="governing" className="scroll-mt-32">
                                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm">5</span>
                                        Governing Law
                                    </h2>
                                    <p className="text-slate-300 leading-relaxed">
                                        These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                                    </p>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
