"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CourseNavigation({ scrolled }) {
    const [activeSection, setActiveSection] = useState("overview");

    // Navigation links for the course
    const navLinks = [
        { href: "#overview", label: "Overview", id: "overview" },
        { href: "#curriculum", label: "Curriculum", id: "curriculum" },
        { href: "#instructor", label: "Instructor", id: "instructor" },
        { href: "#reviews", label: "Reviews", id: "reviews" },
        { href: "#faq", label: "FAQ", id: "faq" },
    ];

    // Update active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map((link) => document.getElementById(link.id));
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [navLinks]);

    return (
        <div className={`transition-all duration-300 ${scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md" : "bg-transparent"}`}>
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-6">
                        <Link href="/courses" className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#ff9500] dark:hover:text-[#ff9500] transition-colors">
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            Back
                        </Link>
                        <nav className="hidden md:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors relative ${
                                        activeSection === link.id ? "text-[#ff9500]" : "text-gray-600 dark:text-gray-300 hover:text-[#ff9500] dark:hover:text-[#ff9500]"
                                    }`}
                                >
                                    {link.label}
                                    {activeSection === link.id && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff9500] to-[#ff5f6d] rounded-full"></span>}
                                </a>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Share Course"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="18" cy="5" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="18" cy="19" r="3"></circle>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                        </button>
                        <button
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Add to Wishlist"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
