"use client";
import { useState, useEffect } from "react";

export function CourseStats({ stats }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 700);
        return () => clearTimeout(timer);
    }, []);

    // Array of stat items with their icons and data
    const statItems = [
        {
            icon: (
                <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
            ),
            value: stats.duration,
            label: "Duration",
        },
        {
            icon: (
                <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
            ),
            value: stats.lessons,
            label: "Lessons",
        },
        {
            icon: (
                <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
            ),
            value: stats.resources,
            label: "Resources",
        },
        {
            icon: (
                <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
            ),
            value: "Yes",
            label: "Certificate",
        },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {statItems.map((stat, index) => (
                <div
                    key={index}
                    className={`relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-500 ${
                        animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                >
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
                    <div className="relative p-3 flex items-center">
                        <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center mr-3">{stat.icon}</div>
                        <div>
                            <span className="text-sm font-bold text-gray-800 dark:text-white block">{stat.value}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
