"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function CourseFooterBanner({ course }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show the banner after scrolling down a bit
            setVisible(window.scrollY > 600);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#ff9500] to-[#ff5f6d] text-white py-4 z-50 shadow-lg transform transition-transform duration-500 ${
                visible ? "translate-y-0" : "translate-y-full"
            }`}
        >
            <div className="container mx-auto px-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center">
                        <div className="mr-4">
                            <span className="text-xl font-bold">${course.price}</span>
                            <span className="text-white/70 line-through ml-2">${course.originalPrice}</span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                            <svg className="h-4 w-4 inline mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            {course.saleEndsText}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-3xl">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                            Wishlist
                        </Button>
                        <Button variant="secondary" className="font-bold rounded-3xl">
                            Enroll Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
