import React from 'react';
import { Shield, Clock, FileText, ArrowRight, Lock } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
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
                                    <a href="#introduction" className="block pl-4 py-2 text-sm text-indigo-400 border-l-2 border-indigo-400 -ml-0.5 font-medium">Introduction</a>
                                    <a href="#data-collection" className="block pl-4 py-2 text-sm text-slate-400 hover:text-white hover:border-slate-600 -ml-0.5 transition-all">Data We Collect</a>
                                    <a href="#data-usage" className="block pl-4 py-2 text-sm text-slate-400 hover:text-white hover:border-slate-600 -ml-0.5 transition-all">How We Use Your Data</a>
                                    <a href="#data-sharing" className="block pl-4 py-2 text-sm text-slate-400 hover:text-white hover:border-slate-600 -ml-0.5 transition-all">Data Sharing</a>
                                    <a href="#data-security" className="block pl-4 py-2 text-sm text-slate-400 hover:text-white hover:border-slate-600 -ml-0.5 transition-all">Data Security</a>
                                    <a href="#cookies" className="block pl-4 py-2 text-sm text-slate-400 hover:text-white hover:border-slate-600 -ml-0.5 transition-all">Cookies</a>
                                    <a href="#your-rights" className="block pl-4 py-2 text-sm text-slate-400 hover:text-white hover:border-slate-600 -ml-0.5 transition-all">Your Rights</a>
                                    <a href="#data-retention" className="block pl-4 py-2 text-sm text-slate-400 hover:text-white hover:border-slate-600 -ml-0.5 transition-all">Data Retention</a>
                                    <a href="#contact" className="block pl-4 py-2 text-sm text-slate-400 hover:text-white hover:border-slate-600 -ml-0.5 transition-all">Contact Us</a>
                                </nav>
                            </div>

                            <div className="bg-slate-900/50 rounded-xl p-6 border border-white/5">
                                <h4 className="font-semibold text-white mb-2">Questions?</h4>
                                <p className="text-sm text-slate-400 mb-4">If you have privacy concerns, we're here to help.</p>
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
                                <Lock className="w-3 h-3" />
                                <span>Privacy & Security</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <Clock className="w-4 h-4" />
                                <span>Last updated: {new Date().toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none">
                            <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
                                <section id="introduction" className="mb-12 scroll-mt-32">
                                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm">1</span>
                                        Introduction
                                    </h2>
                                    <p className="text-slate-300 leading-relaxed mb-4">
                                        Welcome to SocialPulse ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                                    </p>
                                    <p className="text-slate-300 leading-relaxed">
                                        This policy applies to all information collected through our services, including our website, mobile applications, and any related services, sales, marketing, or events (collectively, the "Services").
                                    </p>
                                </section>

                                <section id="data-collection" className="mb-12 scroll-mt-32">
                                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm">2</span>
                                        Data We Collect
                                    </h2>
                                    <p className="text-slate-300 leading-relaxed mb-4">
                                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                                    </p>
                                    <ul className="space-y-3 text-slate-300 list-none pl-0">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span><strong className="text-white">Identity Data:</strong> Includes first name, last name, username or similar identifier, and social media profile information.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span><strong className="text-white">Contact Data:</strong> Includes email address, telephone number, and mailing address.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span><strong className="text-white">Technical Data:</strong> Includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span><strong className="text-white">Usage Data:</strong> Includes information about how you use our website, products, and services, including analytics data and engagement metrics.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span><strong className="text-white">Marketing and Communications Data:</strong> Includes your preferences in receiving marketing from us and your communication preferences.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span><strong className="text-white">Social Media Data:</strong> Includes data from connected social media accounts, including posts, engagement metrics, and audience insights.</span>
                                        </li>
                                    </ul>
                                </section>

                                <section id="data-usage" className="mb-12 scroll-mt-32">
                                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm">3</span>
                                        How We Use Your Data
                                    </h2>
                                    <p className="text-slate-300 leading-relaxed mb-4">
                                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                                    </p>
                                    <ul className="space-y-3 text-slate-300 list-none pl-0">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span>To provide and maintain our Services, including monitoring usage and improving functionality.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span>To manage your account and provide customer support.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span>To perform analytics and generate insights about social media trends and engagement.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span>To send you marketing communications (with your consent where required by law).</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span>To comply with legal obligations and protect our rights.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span>To detect, prevent, and address technical issues and fraudulent activity.</span>
                                        </li>
                                    </ul>
                                </section>

                                <section id="data-sharing" className="mb-12 scroll-mt-32">
                                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm">4</span>
                                        Data Sharing and Disclosure
                                    </h2>
                                    <p className="text-slate-300 leading-relaxed mb-4">
                                        We may share your personal data with the following categories of recipients:
                                    </p>
                                    <ul className="space-y-3 text-slate-300 list-none pl-0 mb-4">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span><strong className="text-white">Service Providers:</strong> Third-party vendors who perform services on our behalf, such as hosting, analytics, and customer support.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span><strong className="text-white">Social Media Platforms:</strong> When you connect your social media accounts, we may share data with those platforms as necessary to provide our Services.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span><strong className="text-white">Legal Authorities:</strong> When required by law or to protect our rights and safety.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span><strong className="text-white">Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business.</span>
                                        </li>
                                    </ul>
                                    <p className="text-slate-300 leading-relaxed">
                                        We do not sell your personal data to third parties for their marketing purposes.
                                    </p>
                                </section>

                                <section id="data-security" className="mb-12 scroll-mt-32">
                                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm">5</span>
                                        Data Security
                                    </h2>
                                    <p className="text-slate-300 leading-relaxed mb-4">
                                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. These measures include:
                                    </p>
                                    <ul className="space-y-3 text-slate-300 list-none pl-0 mb-4">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span>Encryption of data in transit and at rest using industry-standard protocols.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span>Regular security assessments and vulnerability testing.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span>Limited access to personal data to authorized personnel only.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span>Secure authentication and access control mechanisms.</span>
                                        </li>
                                    </ul>
                                    <p className="text-slate-300 leading-relaxed">
                                        However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
                                    </p>
                                </section>

                                <section id="cookies" className="mb-12 scroll-mt-32">
                                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm">6</span>
                                        Cookies and Tracking Technologies
                                    </h2>
                                    <p className="text-slate-300 leading-relaxed mb-4">
                                        We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
                                    </p>
                                    <p className="text-slate-300 leading-relaxed mb-4">
                                        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                                    </p>
                                    <p className="text-slate-300 leading-relaxed">
                                        We use both session and persistent cookies for the purposes set out below:
                                    </p>
                                    <ul className="space-y-3 text-slate-300 list-none pl-0">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span><strong className="text-white">Essential Cookies:</strong> Required for the operation of our website.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span><strong className="text-white">Analytics Cookies:</strong> Help us understand how visitors interact with our website.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span><strong className="text-white">Preference Cookies:</strong> Remember your preferences and settings.</span>
                                        </li>
                                    </ul>
                                </section>

                                <section id="your-rights" className="mb-12 scroll-mt-32">
                                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm">7</span>
                                        Your Privacy Rights
                                    </h2>
                                    <p className="text-slate-300 leading-relaxed mb-4">
                                        Under certain circumstances, you have rights under data protection laws in relation to your personal data:
                                    </p>
                                    <ul className="space-y-3 text-slate-300 list-none pl-0">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span><strong className="text-white">Right to Access:</strong> Request access to your personal data.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span><strong className="text-white">Right to Correction:</strong> Request correction of inaccurate or incomplete personal data.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span><strong className="text-white">Right to Erasure:</strong> Request deletion of your personal data.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span><strong className="text-white">Right to Object:</strong> Object to processing of your personal data.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span><strong className="text-white">Right to Data Portability:</strong> Request transfer of your personal data.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                                            <span><strong className="text-white">Right to Withdraw Consent:</strong> Withdraw consent at any time where we are relying on consent to process your personal data.</span>
                                        </li>
                                    </ul>
                                </section>

                                <section id="data-retention" className="mb-12 scroll-mt-32">
                                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm">8</span>
                                        Data Retention
                                    </h2>
                                    <p className="text-slate-300 leading-relaxed mb-4">
                                        We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                                    </p>
                                    <p className="text-slate-300 leading-relaxed">
                                        To determine the appropriate retention period for personal data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure, the purposes for which we process your personal data, and whether we can achieve those purposes through other means, and the applicable legal requirements.
                                    </p>
                                </section>

                                <section id="contact" className="scroll-mt-32">
                                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm">9</span>
                                        Contact Us
                                    </h2>
                                    <p className="text-slate-300 leading-relaxed mb-4">
                                        If you have any questions about this privacy policy or our privacy practices, please contact us at:
                                    </p>
                                    <div className="bg-slate-800/50 rounded-lg p-6 border border-white/5">
                                        <p className="text-slate-300 mb-2"><strong className="text-white">Email:</strong> socialpulseai@gmail.com</p>
                                        <p className="text-slate-300 mb-2"><strong className="text-white">Phone:</strong> +92 (370) 7203692</p>
                                        <p className="text-slate-300"><strong className="text-white">Address:</strong> Main Boulevard, Paragon City, Lahore, Pakistan</p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
