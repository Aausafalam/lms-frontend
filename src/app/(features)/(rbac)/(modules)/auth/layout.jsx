"use client";

import { useEffect } from "react";
import "./styles/index.css";
import AuthIcons from "./utils/icons";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { useNavigation } from "@/components/navigation";

const AuthLayout = ({ children }) => {
    const [localStorage, setLocalStorage] = useLocalStorage();
    const { navigate } = useNavigation();

    useEffect(() => {
        if (localStorage) {
            // navigate("/");
        }
    }, []);

    return (
        <div className="min-h-screen w-full overflow-hidden relative bg-slate-50 dark:bg-gray-900">
            <main className="relative z-10 flex min-h-screen">
                {/* Left side - Branding and visuals (expanded) */}
                <div className="hidden lg:flex lg:w-7/12 xl:w-8/12 bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-500 relative overflow-hidden">
                    {/* Abstract pattern overlay */}
                    <div className="absolute inset-0 opacity-10 mix-blend-overlay">
                        <svg className="w-full h-full" viewBox="0 0 800 800">
                            <defs>
                                <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <circle cx="10" cy="10" r="1.5" fill="#fff" />
                                </pattern>
                                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#fff" stopOpacity="0.1" />
                                    <stop offset="100%" stopColor="#fff" stopOpacity="0.05" />
                                </linearGradient>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#pattern)" />
                            <rect width="100%" height="100%" fill="url(#grad)" />
                        </svg>
                    </div>

                    {/* Content container */}
                    <div className="relative w-full h-full flex flex-col justify-center px-12 lg:px-16 xl:px-24 2xl:px-32">
                        {/* Logo */}
                        <div className="absolute top-12 left-12 lg:left-16 xl:left-24 2xl:left-32">
                            <div className="bg-white/90 backdrop-blur-sm text-orange-500 font-bold text-xl p-3 pl-4 pr-5 rounded-lg shadow-lg flex items-center">
                                <span className="mr-2 text-2xl">🎓</span>
                                LOGO
                            </div>
                        </div>

                        {/* Main content */}
                        <div className="max-w-2xl">
                            <h1 className="text-4xl lg:text-5xl xl:text-5xl font-bold mb-6 text-white leading-tight">Deliver engaging learning experiences with ease</h1>
                            <p className="text-xl lg:text-xl text-orange-50 mb-12 max-w-xl leading-relaxed">
                                Our LMS empowers educators and organizations to create, manage, and track learning effortlessly.
                            </p>

                            {/* Feature highlights with icons */}
                            <div className="space-y-6 mt-8">
                                <div className="flex items-center">
                                    <div className="bg-white/20 p-3 rounded-xl mr-4 shadow-lg backdrop-blur-sm">{AuthIcons.LIGHT}</div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">Interactive Learning Tools</h3>
                                        <p className="text-orange-50">Create engaging content with our intuitive course builder</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="bg-white/20 p-3 rounded-xl mr-4 shadow-lg backdrop-blur-sm">{AuthIcons.ANALYTICS}</div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">Advanced Analytics</h3>
                                        <p className="text-orange-50">Track progress and performance with detailed insights</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="bg-white/20 p-3 rounded-xl mr-4 shadow-lg backdrop-blur-sm">{AuthIcons.INTEGRATION}</div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">Seamless Integration</h3>
                                        <p className="text-orange-50">Connect with your existing tools and workflows</p>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial */}
                            <div className="mt-16 bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-xl">
                                <p className="text-white italic mb-4">
                                    "This LMS platform transformed how we deliver training to our global team. The analytics and engagement tools are exceptional."
                                </p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center text-orange-700 font-bold mr-3">JD</div>
                                    <div>
                                        <p className="text-white font-medium">Jane Doe</p>
                                        <p className="text-orange-100 text-sm">Director of Learning, Acme Inc.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-white/10 to-transparent rounded-full blur-xl transform translate-x-1/3 translate-y-1/3"></div>
                        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-lg"></div>
                    </div>
                </div>
                <div className="relative w-full lg:w-5/12 xl:w-8/12 flex">
                    {/* Background gradient and patterns */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 z-0">
                        {/* Abstract background shapes */}
                        <div className="absolute top-0 right-0 w-1/3 h-screen bg-gradient-to-b from-orange-500/10 to-amber-500/5 dark:from-orange-500/20 dark:to-amber-500/10 blur-3xl transform -translate-y-1/4 translate-x-1/4 rounded-full"></div>
                        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-amber-500/10 to-orange-500/5 dark:from-amber-500/20 dark:to-orange-500/10 blur-3xl transform translate-y-1/4 -translate-x-1/4 rounded-full"></div>

                        {/* Decorative grid pattern */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmMGYwZjAiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMGgzMHYzMEgweiIgZmlsbD0iI2Y4ZjhmOCIvPjwvZz48L3N2Zz4=')] opacity-30 dark:opacity-10"></div>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="floating absolute top-[15%] left-[10%] w-16 h-16 bg-gradient-to-br from-orange-500/20 to-amber-500/20 dark:from-orange-500/30 dark:to-amber-500/30 rounded-xl rotate-12"></div>
                        <div className="floating absolute top-[25%] right-[15%] w-24 h-24 bg-gradient-to-br from-amber-500/20 to-red-500/20 dark:from-amber-500/30 dark:to-red-500/30 rounded-full"></div>
                        <div className="floating absolute bottom-[20%] left-[20%] w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 dark:from-yellow-500/30 dark:to-orange-500/30 rounded-lg rotate-45"></div>
                    </div>
                    {/* Right side - form */}
                    {children}
                </div>
            </main>

            {/* Footer - desktop only */}
            <footer className="hidden lg:block py-4 px-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 backdrop-blur-sm absolute bottom-0 w-full z-10">
                <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <div>© 2025 WSO2 LLC. | Powered by company Logo</div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200">
                            Terms of Service
                        </a>
                    </div>
                    <div>
                        <button className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200">
                            <span className="mr-1">🇺🇸</span>
                            English - United States
                            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AuthLayout;
