"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function CourseSidebar({ course, setIsVideoPlaying }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="sticky top-0">
            <div
                className={`overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-xl transition-all duration-700 ${
                    animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
                <div className="relative aspect-video">
                    <Image src={course.thumbnailImage || "/placeholder.svg"} alt="Course thumbnail" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors duration-300 group"
                            onClick={() => setIsVideoPlaying(true)}
                        >
                            <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="p-5">
                    <div className="mb-1">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-[#ff9500] to-[#ff5f6d] bg-clip-text text-transparent">${course.price}</span>
                                <span className="text-gray-400 line-through text-md ml-2">${course.originalPrice}</span>
                            </div>
                            <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-medium">{course.discountPercentage}% OFF</div>
                        </div>

                        <div className="flex items-center text-sm text-orange-500 mb-3">
                            <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span className="font-medium">{course.saleEndsText}</span>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="primary" className="rounded-3xl w-full mb-3">
                                Enroll Now
                            </Button>
                            <Button variant="outline" className="w-full flex mb-3 py-[0.6rem] text-sm rounded-3xl">
                                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                Add to Wishlist
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-bold text-md text-gray-800 dark:text-white">This course includes:</h3>
                        <ul className="space-y-4">
                            {course.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center mr-3 shrink-0">
                                        {getFeatureIcon(feature.icon)}
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-800 dark:text-white text-sm">{feature.title}</span>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{feature.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-4"></div>

                    <div>
                        <h3 className="font-bold mb-4 text-gray-800 dark:text-white">Share this course:</h3>
                        <div className="flex items-center gap-3">
                            {[
                                { icon: "facebook", label: "Facebook" },
                                { icon: "twitter", label: "Twitter" },
                                { icon: "linkedin", label: "LinkedIn" },
                                { icon: "mail", label: "Email" },
                            ].map((social, index) => (
                                <button
                                    key={index}
                                    className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-500 transition-colors duration-200"
                                    aria-label={`Share on ${social.label}`}
                                >
                                    {getSocialIcon(social.icon)}
                                </button>
                            ))}
                            <Button variant="outline" className="ml-auto rounded-3xl">
                                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="18" cy="5" r="3"></circle>
                                    <circle cx="6" cy="12" r="3"></circle>
                                    <circle cx="18" cy="19" r="3"></circle>
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                                </svg>
                                Share
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper function to get the appropriate icon based on feature type
function getFeatureIcon(iconName) {
    switch (iconName) {
        case "video":
            return (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
            );
        case "file-text":
            return (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
            );
        case "download":
            return (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
            );
        case "globe":
            return (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
            );
        case "award":
            return (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
            );
        case "message-square":
            return (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            );
        default:
            return (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
            );
    }
}

// Helper function to get social media icons
function getSocialIcon(iconName) {
    switch (iconName) {
        case "facebook":
            return (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
            );
        case "twitter":
            return (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
            );
        case "linkedin":
            return (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                </svg>
            );
        case "mail":
            return (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            );
        default:
            return (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
            );
    }
}
