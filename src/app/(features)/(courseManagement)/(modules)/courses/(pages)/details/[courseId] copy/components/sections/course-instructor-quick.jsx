"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function CourseInstructorQuick({ instructor }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-md transition-all duration-700 ${
                animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-500/5 to-transparent rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-500/5 to-transparent rounded-full"></div>

            <div className="relative p-4 flex items-center gap-3">
                <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-orange-500/20 shadow-md">
                        <Image src={instructor.avatar || "/placeholder.svg"} alt={instructor.name} fill className="object-cover" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>

                <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Course by</p>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{instructor.name}</p>
                    </div>
                    <p className="text-orange-500 text-xs font-medium">{instructor.title}</p>

                    <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center">
                            <svg className="h-3 w-3 text-orange-500 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <span className="text-xs text-gray-600 dark:text-gray-300">{instructor.rating}</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="h-3 w-3 text-gray-500 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            <span className="text-xs text-gray-600 dark:text-gray-300">{instructor.students}</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="h-3 w-3 text-gray-500 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                            </svg>
                            <span className="text-xs text-gray-600 dark:text-gray-300">{instructor.courses}</span>
                        </div>
                    </div>
                </div>

                <Button variant="outline" className="text-xs rounded-full py-1 px-3 flex-shrink-0">
                    Profile
                </Button>
            </div>
        </div>
    );
}
