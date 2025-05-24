"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function CourseProgress({ progress }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#fff8f0] to-[#fff5f5] dark:from-[#1f1a15] dark:to-[#1f1515] border border-orange-100 dark:border-orange-900/20 shadow-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full transform -translate-x-1/3 translate-y-1/3"></div>

            <div className="relative p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="w-full">
                        <h3 className="text-lg font-bold bg-gradient-to-r from-[#ff9500] to-[#ff5f6d] bg-clip-text text-transparent">Your Learning Journey</h3>
                        <div className="flex items-center gap-2 justify-between w-full">
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">{progress.percentage}% Complete</span>
                            <Button variant="primary" size="xs" className="rounded-2xl">
                                Resume
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
                    <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ff9500] to-[#ff5f6d] rounded-full"
                        style={{
                            width: animate ? `${progress.percentage}%` : "0%",
                            transition: "width 1s cubic-bezier(0.65, 0, 0.35, 1)",
                        }}
                    ></div>
                </div>

                <div className="flex flex-wrap gap-2 ">
                    {[
                        {
                            label: "Completed",
                            value: `${progress.completedLessons}/${progress.totalLessons}`,
                            icon: (
                                <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            ),
                        },
                        {
                            label: "Time",
                            value: progress.timeSpent,
                            icon: (
                                <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            ),
                        },
                        {
                            label: "Next",
                            value: progress.nextLesson.title.length > 10 ? progress.nextLesson.title.substring(0, 10) + "..." : progress.nextLesson.title,
                            icon: (
                                <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                            ),
                        },
                        {
                            label: "Badges",
                            value: `${progress.achievements.earned}/${progress.achievements.total}`,
                            icon: (
                                <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="8" r="7"></circle>
                                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                                </svg>
                            ),
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-white max-w-32 w-full dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center"
                        >
                            <div className="mb-1">{item.icon}</div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                            <p className="text-xs font-bold text-gray-800 dark:text-white">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
