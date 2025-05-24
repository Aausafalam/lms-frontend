"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CourseHero({ course, isVideoPlaying, setIsVideoPlaying }) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-[350px] md:h-[500px]  overflow-hidden rounded-2xl">
            {!isVideoPlaying ? (
                <>
                    <div className="absolute inset-0 bg-black/30 z-10"></div>
                    <div
                        className={`absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-20 
            ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
                    ></div>

                    <Image
                        src={course.bannerImage || "/placeholder.svg"}
                        alt={`${course.title} Banner`}
                        fill
                        className={`object-cover scale-110 ${loaded ? "scale-100" : "scale-110"} transition-transform duration-10000 ease-out`}
                        priority
                    />

                    <div className="absolute inset-0 z-30 flex items-center">
                        <div className="container mx-auto px-6">
                            <div className="max-w-3xl">
                                <div className={`flex items-center gap-3 mb-6 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} transition-all duration-700 delay-300`}>
                                    {course.badges.map((badge, index) => (
                                        <Badge className="text-[0.7rem] text-white" key={index} variant={badge.primary ? "primary" : "secondary"}>
                                            {badge.label}
                                        </Badge>
                                    ))}
                                </div>

                                <h1
                                    className={`text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-6 leading-tight tracking-tight 
                  ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} transition-all duration-700 delay-500`}
                                >
                                    {course.title}
                                </h1>

                                <p
                                    className={`text-white/90 text-sm md:text-md mb-8 max-w-2xl leading-relaxed
                  ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} transition-all duration-700 delay-700`}
                                >
                                    {course.description}
                                </p>

                                <div
                                    className={`flex flex-wrap items-center gap-6 text-white/90 mb-8
                  ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} transition-all duration-700 delay-900`}
                                >
                                    <div className="flex items-center backdrop-blur-md bg-white/10 px-4 py-2 rounded-full">
                                        <svg className="h-4 w-4 text-[#ff9500] mr-2" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                        <span className="font-medium">{course.rating}</span>
                                        <span className="text-white/70 ml-1 text-sm">({course.reviewCount.toLocaleString()} reviews)</span>
                                    </div>
                                    <div className="flex items-center backdrop-blur-md bg-white/10 px-4 py-2 rounded-full">
                                        <svg className="h-4 w-4 text-white/80 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="9" cy="7" r="4"></circle>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                        </svg>
                                        <span className="text-sm">{course.enrolledStudents.toLocaleString()} students enrolled</span>
                                    </div>
                                    <div className="flex items-center backdrop-blur-md bg-white/10 px-4 py-2 rounded-full">
                                        <svg className="h-4 w-4 text-white/80 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        <span className="text-sm">Last updated {course.lastUpdated}</span>
                                    </div>
                                </div>

                                <div
                                    className={`flex flex-wrap gap-4
                  ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} transition-all duration-700 delay-1000`}
                                >
                                    <Button variant="primary" className="rounded-3xl" onClick={() => setIsVideoPlaying(true)}>
                                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                        </svg>
                                        Watch Preview
                                    </Button>

                                    <Button variant="outline" className="text-white rounded-3xl">
                                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                            <polyline points="14 2 14 8 20 8"></polyline>
                                            <line x1="16" y1="13" x2="8" y2="13"></line>
                                            <line x1="16" y1="17" x2="8" y2="17"></line>
                                            <polyline points="10 9 9 9 8 9"></polyline>
                                        </svg>
                                        Course Syllabus
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="w-full h-full bg-black flex items-center justify-center">
                    <div className="relative w-full h-full max-w-5xl mx-auto">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${course.previewVideoUrl}?autoplay=1`}
                            title="Course Preview"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0"
                        ></iframe>
                        <button className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200" onClick={() => setIsVideoPlaying(false)}>
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
