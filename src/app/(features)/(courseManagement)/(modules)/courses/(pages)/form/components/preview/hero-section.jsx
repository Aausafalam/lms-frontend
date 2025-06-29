"use client";

import { useState } from "react";
import { Play, Star, Users, Clock, Globe, Hash, CheckCircle, Flame, TrendingUp, Sparkles, Heart, Share2, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import apiConstants from "@/services/utils/constants";
import ApiUtils from "@/services/utils";

/**
 * Hero Section Component for Course Preview
 * Displays course banner, title, stats, and main CTAs
 */
export function HeroSection({ data, isMobile, isTablet, isDesktop }) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // Mock instructor data
    const getInstructorData = (id) => {
        const instructorIds = {
            1: {
                name: "Dr. Sarah Johnson",
                role: "Lead Instructor",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
                rating: 4.9,
                students: "50K+",
            },
            2: {
                name: "Prof. Michael Chen",
                role: "Technical Expert",
                avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
                rating: 4.8,
                students: "30K+",
            },
        };
        return instructorIds[id] || { name: "Instructor", role: "Course Creator", avatar: "/placeholder.svg?height=40&width=40" };
    };

    // Mock course stats
    const courseStats = {
        rating: 4.8,
        reviewCount: 2847,
        studentCount: 15420,
        lastUpdated: new Date("2024-01-15"),
    };

    return (
        <div
            className={`relative w-full bg-cover bg-center overflow-hidden ${isDesktop ? "rounded-xl" : ""} `}
            style={{
                backgroundImage: data.bannerImagePreview
                    ? `url('${data.bannerImagePreview}')`
                    : `url('${apiConstants.BACKEND_API_BASE_URL}/course/${data.id}/getImage?type=bannerImage&token=${ApiUtils.getAuthToken()}')` ||
                      "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')",
                // minHeight: isMobile ? "500px" : isTablet ? "600px" : "",
            }}
        >
            {/* Animated Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 via-purple-900/90 to-pink-900/95">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fillRule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fillOpacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-bounce"></div>
                <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 px-4 md:px-6 py-6  mx-auto">
                <div className={`${isDesktop ? "grid grid-cols-3 gap-12 items-center" : "space-y-8"}`}>
                    {/* Left Content */}
                    <div className={`${isDesktop ? "col-span-2" : ""} space-y-6`}>
                        {/* Top Badges */}
                        <div className="flex flex-wrap gap-3">
                            {data.status === "published" && (
                                <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700  shadow-none border-0 px-2 rounded-xl py-1 text-[0.75rem]">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Published
                                </Badge>
                            )}
                            {data.isFeatured && (
                                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-none border-0 px-2 rounded-xl py-1 text-[0.75rem]">
                                    <Flame className="h-3 w-3 mr-1" />
                                    Featured
                                </Badge>
                            )}
                            {data.tags?.includes("trending") && (
                                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-none border-0 px-2 rounded-xl py-1 text-[0.75rem]">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    Trending
                                </Badge>
                            )}
                            {data.tags?.includes("bestseller") && (
                                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-none border-0 px-2 rounded-xl py-1 text-[0.75rem]">
                                    <Award className="h-3 w-3 mr-1" />
                                    Bestseller
                                </Badge>
                            )}
                        </div>

                        {/* Course Title */}
                        <div className="space-y-2">
                            <h1 className={`font-bold text-white leading-tight tracking-tight ${isMobile ? "text-xl" : isTablet ? "text-xl" : "text-2xl"}`}>{data.name || "Course Title"}</h1>

                            {/* Course Summary */}
                            <p className={`text-white/90 font-light leading-relaxed ${isMobile ? "text-sm" : "text-sm"}`}>{data.summary || "Course summary will appear here"}</p>
                        </div>

                        {/* Course Code */}
                        {data.code && (
                            <div className="inline-flex items-center bg-white/15 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                                <Hash className="h-4 w-4 mr-2 text-yellow-300" />
                                <span className="text-white font-semibold text-sm">{data.code}</span>
                            </div>
                        )}

                        {/* Course Stats Row */}
                        <div className="flex flex-wrap items-center gap-6">
                            {/* Rating */}
                            <div className="flex items-center bg-white/15 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                                <div className="flex items-center mr-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(courseStats.rating) ? "text-yellow-400 fill-yellow-400" : "text-white/30"}`} />
                                    ))}
                                </div>
                                <span className="text-white font-semibold text-sm">
                                    {courseStats.rating} ({courseStats.reviewCount.toLocaleString()})
                                </span>
                            </div>

                            {/* Students */}
                            <div className="flex items-center bg-white/15 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                                <Users className="h-4 w-4 mr-2 text-blue-300" />
                                <span className="text-white font-semibold text-sm">{courseStats.studentCount.toLocaleString()} students</span>
                            </div>

                            {/* Duration */}
                            <div className="flex items-center bg-white/15 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                                <Clock className="h-4 w-4 mr-2 text-green-300" />
                                <span className="text-white font-semibold text-sm">{data.duration || 30} hours</span>
                            </div>

                            {/* Language */}
                            {data.languageCode && (
                                <div className="flex items-center bg-white/15 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                                    <Globe className="h-4 w-4 mr-2 text-purple-300" />
                                    <span className="text-white font-semibold text-sm">{data.languageCode}</span>
                                </div>
                            )}
                        </div>

                        {/* Instructors */}
                        {data.instructorIds?.length > 0 && (
                            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                                <div className="flex -space-x-3">
                                    {data.instructorIds.slice(0, 3).map((instructorId, index) => {
                                        const instructor = getInstructorData(instructorId);
                                        return (
                                            <Avatar key={index} className="border-0 h-8 w-8 ">
                                                <AvatarImage src={instructor.avatar || "/placeholder.svg"} alt={instructor.name} />
                                                <AvatarFallback className="bg-gradient-to-br border-0 from-orange-500 to-orange-500 text-white font-semibold">
                                                    {instructor.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                        );
                                    })}
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">Created by {data.instructorIds.map((id) => getInstructorData(id).name).join(" & ")}</p>
                                    <p className="text-white/80 text-xs">Expert Instructors • 4.9★ Rating</p>
                                </div>
                            </div>
                        )}

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 text-white shadow-2xl border-0 transition-all duration-300 transform hover:scale-105 hover:shadow-orange-500/25 px-4 py-2 text-base font-semibold">
                                <Sparkles className="mr-1 h-5 w-5" />
                                Enroll Now
                            </Button>

                            <Button
                                variant="outline"
                                className="bg-white/15 text-white hover:bg-white/25 backdrop-blur-md border-white/30 shadow-lg transition-all duration-300 transform hover:scale-105 px-4 py-2 font-semibold"
                                onClick={() => setIsVideoPlaying(true)}
                            >
                                <Play className="mr-1 h-5 w-5" />
                                Watch Preview
                            </Button>

                            <Button
                                variant="outline"
                                className="bg-white/15 text-white hover:bg-white/25 backdrop-blur-md border-white/30 shadow-lg transition-all duration-300 transform hover:scale-105 px-4 py-2 font-semibold"
                            >
                                <Heart className="mr-1 h-5 w-5" />
                                Wishlist
                            </Button>

                            <Button
                                variant="outline"
                                className="bg-white/15 text-white hover:bg-white/25 backdrop-blur-md border-white/30 shadow-lg transition-all duration-300 transform hover:scale-105 px-4 py-2 font-semibold"
                            >
                                <Share2 className="mr-1 h-5 w-5" />
                                Share
                            </Button>
                        </div>
                    </div>

                    {/* Right Content - Desktop Only */}
                    {isDesktop && (
                        <div className="space-y-6">
                            {/* Quick Action Card */}
                            <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
                                <div className="text-center space-y-4">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full mb-4">
                                        <Sparkles className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-white font-bold text-xl">Start Learning Today</h3>
                                    <p className="text-white/80 text-sm">Join thousands of students already enrolled</p>
                                    <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg border-0 py-3 font-semibold">
                                        Get Instant Access
                                    </Button>
                                    <div className="flex items-center justify-center space-x-4 text-white/80 text-xs">
                                        <span>✓ Lifetime Access</span>
                                        <span>✓ Certificate</span>
                                        {/* <span>✓ Mobile App</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
