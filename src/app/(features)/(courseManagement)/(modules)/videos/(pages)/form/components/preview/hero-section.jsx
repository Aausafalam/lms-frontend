"use client";

import { useState } from "react";
import { Play, Clock, Hash, CheckCircle, Flame, TrendingUp, Sparkles, Award, Users, Star, Eye, View, EyeIcon } from "lucide-react";
import apiConstants from "@/services/utils/constants";
import ApiUtils from "@/services/utils";
import { useQueryParams } from "@/lib/hooks/useQuery";

export function VideoHeroSection({ data, isMobile, isTablet, isDesktop }) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const { courseId, moduleId, lessonId } = useQueryParams();
    const handlePlayClick = () => {
        setIsVideoPlaying(true);
    };

    const handlePauseClick = () => {
        setIsVideoPlaying(false);
    };

    return (
        <div className={`w-full mt-2 overflow-hidden  ${isDesktop ? "rounded-xl" : ""}`}>
            {/* Premium Video Player Section */}
            <div className="relative group">
                <div
                    className={`w-full relative bg-gradient-to-br from-gray-900 via-black to-gray-800 ${isDesktop ? "aspect-video" : "aspect-video"} overflow-hidden cursor-pointer max-h-[500px]`}
                    onClick={!isVideoPlaying ? handlePlayClick : undefined}
                    onMouseEnter={() => setShowControls(true)}
                    onMouseLeave={() => setShowControls(false)}
                >
                    {!isVideoPlaying ? (
                        // Premium Thumbnail Design
                        <>
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0">
                                <img
                                    src={
                                        data.thumbnailUrl
                                            ? `${apiConstants.BACKEND_API_BASE_URL}/course/${courseId}/module/${moduleId}/lesson/${lessonId}/video/${
                                                  data.id
                                              }/getImage?type=thumbnailUrl&token=${ApiUtils.getAuthToken()}`
                                            : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1280&h=720&fit=crop&crop=center" || "/placeholder.svg"
                                    }
                                    alt={data.name || "Video thumbnail"}
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                />
                                {/* Multi-layer gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-purple-500/10"></div>
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500"></div>
                            </div>

                            {/* Premium Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative group/play">
                                    {/* Animated rings */}
                                    <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping scale-150"></div>
                                    <div className="absolute inset-0 rounded-full border border-white/20 scale-125 group-hover/play:scale-150 transition-transform duration-500"></div>

                                    {/* Main play button */}
                                    <div className="relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 rounded-full p-4 shadow-2xl transform group-hover/play:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20">
                                        <Play className="h-8 w-8 text-white ml-1" fill="white" />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        // Video Player
                        <div className="relative w-full h-full">
                            <video
                                src={
                                    `${apiConstants.BACKEND_API_BASE_URL}/course/${courseId}/module/${moduleId}/lesson/${lessonId}/video/${
                                        data.id
                                    }/getVideo?type=videoUrl&token=${ApiUtils.getAuthToken()}` || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                                }
                                className="w-full h-full object-cover"
                                controls
                                autoPlay
                                onPause={handlePauseClick}
                                onPlay={() => setIsVideoPlaying(true)}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}
                </div>
            </div>

            {/* Premium Content Section */}
            <div className="bg-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4">
                <div className="mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        {/* Left Content */}
                        <div className="flex-1 space-y-4">
                            {/* Title and Meta */}
                            <div className="space-y-3">
                                <h1 className="text-md md:text-lg font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
                                    {data.name || "Advanced Physics Concepts - Quantum Mechanics Fundamentals"}
                                </h1>

                                {/* Meta Information */}
                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <Clock className="h-4 w-4 mr-1.5" />
                                        <span className="font-medium">{data.duration || "45"} min</span>
                                    </div>

                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <EyeIcon className="h-4 w-4 mr-1.5" />
                                        <span className="font-medium">2.4k students</span>
                                    </div>

                                    <div className="flex items-center">
                                        <Star className="h-4 w-4 mr-1 text-yellow-500" fill="currentColor" />
                                        <span className="font-medium text-gray-900 dark:text-white">4.9</span>
                                        <span className="text-gray-500 dark:text-gray-400 ml-1">(324 reviews)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            {data.tags && data.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {data.tags.map((tag, index) => {
                                        const tagStyles = {
                                            essential: {
                                                bg: "bg-gradient-to-r from-orange-500 to-red-500",
                                                icon: <Flame className="h-3 w-3" />,
                                                glow: "shadow-orange-500/25",
                                            },
                                            physics: {
                                                bg: "bg-gradient-to-r from-purple-500 to-indigo-500",
                                                icon: <TrendingUp className="h-3 w-3" />,
                                                glow: "shadow-purple-500/25",
                                            },
                                            class12: {
                                                bg: "bg-gradient-to-r from-amber-500 to-orange-500",
                                                icon: <Award className="h-3 w-3" />,
                                                glow: "shadow-amber-500/25",
                                            },
                                            published: {
                                                bg: "bg-gradient-to-r from-emerald-500 to-teal-500",
                                                icon: <CheckCircle className="h-3 w-3" />,
                                                glow: "shadow-emerald-500/25",
                                            },
                                        };

                                        const style = tagStyles[tag] || {
                                            bg: "bg-gradient-to-r from-blue-500 to-cyan-500",
                                            icon: <Sparkles className="h-3 w-3" />,
                                            glow: "shadow-blue-500/25",
                                        };

                                        return (
                                            <div
                                                key={index}
                                                className={`${style.bg} text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center space-x-1.5 shadow-lg ${style.glow} hover:scale-105 transition-all duration-300 border border-white/20`}
                                            >
                                                {style.icon}
                                                <span>{tag.charAt(0).toUpperCase() + tag.slice(1)}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Summary */}
                            {/* {data.summary && ( */}
                            <div className="">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                                    {data?.summary ||
                                        "Dive deep into the fascinating world of quantum mechanics and discover the fundamental principles that govern the behavior of matter and energy at the smallest scales."}
                                </p>
                            </div>
                            {/* )} */}
                        </div>

                        {/* Right Content - Instructors */}
                        {/* {data.instructors && data.instructors.length > 0 && (
                            <div className="lg:w-80">
                                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <Users className="h-5 w-5 mr-2 text-orange-500" />
                                        Expert Instructors
                                    </h3>

                                    <div className="space-y-4">
                                        {data.instructors.slice(0, 2).map((instructor, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center space-x-4 p-3 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-100 dark:border-orange-900/30 hover:shadow-md transition-all duration-300"
                                            >
                                                <Avatar className="h-12 w-12 border-2 border-orange-200 dark:border-orange-800 shadow-lg">
                                                    <AvatarImage
                                                        src={instructor.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" || "/placeholder.svg"}
                                                        alt={instructor.name}
                                                    />
                                                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold">
                                                        {instructor.name
                                                            ?.split(" ")
                                                            .map((n) => n[0])
                                                            .join("") || "IN"}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{instructor.name || "Dr. Sarah Johnson"}</h4>
                                                    <p className="text-orange-600 dark:text-orange-400 text-xs font-medium">{instructor.designation || "Physics Professor"}</p>
                                                    <div className="flex items-center mt-1">
                                                        <Star className="h-3 w-3 text-yellow-500 mr-1" fill="currentColor" />
                                                        <span className="text-xs text-gray-600 dark:text-gray-400">4.9 • 15k students</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
}
