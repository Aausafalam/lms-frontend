"use client";

import { useState, useEffect } from "react";
import { Star, Clock, Heart, Share2, BookOpen, User, Play, Shield, Timer, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { useNavigation } from "@/components/navigation";
import { useParams } from "next/navigation";

/**
 * ExamPattern Card Component
 * @description Reusable card component for displaying examPattern information
 */
export default function ExamPatternCard({ data, view, onView }) {
    const { navigate } = useNavigation();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { courseId } = useParams();
    // Default examPattern data structure
    const [examPatternData, setExamPatternData] = useState({ data });

    useEffect(() => {
        if (data) {
            setExamPatternData((prevData) => ({ ...prevData, ...data }));
        }
    }, [data]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleCardClick = () => {
        if (onView) {
            onView(examPatternData.id);
        } else {
            navigate(`/examPatterns/details/${examPatternData.id}?courseId=${courseId}`);
        }
    };

    const handleNameClick = (e) => {
        e.stopPropagation();
        handleCardClick();
    };

    const formatInstructorNames = () => {
        if (!examPatternData.instructors?.length) return "No instructor assigned";

        if (examPatternData.instructors.length === 1) {
            return examPatternData.instructors[0].name;
        } else if (examPatternData.instructors.length === 2) {
            return `${examPatternData.instructors[0].name} & ${examPatternData.instructors[1].name}`;
        } else {
            return `${examPatternData.instructors[0].name} +${examPatternData.instructors.length - 1}`;
        }
    };

    const toggleFavorite = (e) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
        // TODO: Implement favorite functionality
    };

    const handleShare = (e) => {
        e.stopPropagation();
        // TODO: Implement share functionality
        if (navigator.share) {
            navigator.share({
                title: examPatternData.name,
                text: examPatternData.summary,
                url: window.location.origin + `/examPatterns/details/${examPatternData.id}?courseId=${courseId}`,
            });
        }
    };

    const getImageUrl = () => {
        return examPatternData.image || data.image || "/placeholder.svg";
    };

    // Helper function to get status color and styles
    const getStatusStyles = (status) => {
        switch (status?.toUpperCase()) {
            case "ACTIVE":
                return {
                    bg: "bg-emerald-50 border border-emerald-200",
                    text: "text-emerald-700",
                    dot: "bg-emerald-500",
                };
            case "INACTIVE":
                return {
                    bg: "bg-gray-50 border border-gray-200",
                    text: "text-gray-700",
                    dot: "bg-gray-500",
                };
            case "DRAFT":
                return {
                    bg: "bg-amber-50 border border-amber-200",
                    text: "text-amber-700",
                    dot: "bg-amber-500",
                };
            default:
                return {
                    bg: "bg-gray-50 border border-gray-200",
                    text: "text-gray-700",
                    dot: "bg-gray-500",
                };
        }
    };

    const statusStyles = getStatusStyles(data.status);
    const totalQuestions = data.sections?.reduce((acc, section) => acc + (section.questions?.length || 0), 0) || 0;
    const hasSecurityFeatures = data.securitySettings?.enableBrowserLockdown || data.securitySettings?.enableAIProctoring;

    // Table Row Layout - Updated to match card details
    if (view?.table) {
        return (
            <div className="w-full">
                <div
                    className={`grid ${
                        isMobile ? "grid-cols-1 gap-3 p-4" : "grid-cols-12 gap-4 px-4 py-3"
                    } border-b group relative w-full overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-gray-900 dark:hover:bg-gray-800/50 cursor-pointer border border-gray-200 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-600`}
                    onClick={handleCardClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isMobile ? (
                        // Mobile Layout - Updated
                        <>
                            {/* Header with Status */}
                            <div className="flex justify-between items-start mb-2">
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${statusStyles.bg} ${statusStyles.text}`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${statusStyles.dot}`} />
                                    <span className="capitalize">{data.status?.toLowerCase() || "draft"}</span>
                                </div>
                                {hasSecurityFeatures && (
                                    <div className="inline-flex items-center gap-1 bg-purple-50 border border-purple-200 text-purple-700 px-2 py-1 rounded-md text-xs font-medium">
                                        <Shield className="w-3 h-3" />
                                        <span>Secured</span>
                                    </div>
                                )}
                            </div>

                            {/* Exam Pattern Image and Basic Info */}
                            <div className="flex items-start space-x-3">
                                <div className="relative h-16 w-20 rounded-md overflow-hidden flex-shrink-0">
                                    <Image width={80} height={64} src={getImageUrl()} alt={examPatternData.name} className="h-full w-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <div className="absolute top-1 right-1">
                                        <Play className="h-2 w-2 text-white" />
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3
                                        className="hover:underline font-semibold text-sm text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 cursor-pointer"
                                        onClick={handleNameClick}
                                    >
                                        {data.name || "Untitled Exam"}
                                    </h3>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <div className="flex items-center space-x-1">
                                            {[1, 2, 3, 4, 5].map((star, index) => (
                                                <Star
                                                    key={index}
                                                    className={`h-3 w-3 ${index < Math.floor(examPatternData.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`}
                                                />
                                            ))}
                                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{examPatternData.rating || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Exam Pattern Details */}
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2" title={data.description}>
                                    {data.description || "No description provided for this examination."}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        {examPatternData.tags?.slice(0, 1).map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 capitalize"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex space-x-1">
                                        <button
                                            onClick={toggleFavorite}
                                            className="rounded-full bg-gray-100 p-1 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                        >
                                            <Heart className={`h-3 w-3 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                                        </button>
                                        <button
                                            onClick={handleShare}
                                            className="rounded-full bg-gray-100 p-1 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                        >
                                            <Share2 className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Compact Stats Section */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <BookOpen className="h-3 w-3 text-slate-600 dark:text-slate-400" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{totalQuestions}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">Q</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Timer className="h-3 w-3 text-slate-600 dark:text-slate-400" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{data.accessControlSettings?.maxAttempts || 1}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">Attempts</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-orange-50 border border-orange-200 text-orange-700">
                                    <BadgeCheck className="w-3 h-3" />
                                    <span className="text-xs font-semibold">{data.resultsSettings?.passingPercentage || 60}%</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        // Desktop Layout - Updated
                        <>
                            {/* Exam Pattern Image and Basic Info */}
                            <div className="col-span-4 flex items-center space-x-3">
                                <div className="relative h-12 w-16 rounded-md overflow-hidden flex-shrink-0">
                                    <Image width={64} height={48} src={getImageUrl()} alt={examPatternData.name} className="h-full w-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <div className="absolute top-1 right-1">
                                        <Play className="h-2 w-2 text-white" />
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${statusStyles.bg} ${statusStyles.text}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${statusStyles.dot}`} />
                                            <span className="capitalize">{data.status?.toLowerCase() || "draft"}</span>
                                        </div>
                                        {hasSecurityFeatures && (
                                            <div className="inline-flex items-center gap-1 bg-purple-50 border border-purple-200 text-purple-700 px-1.5 py-0.5 rounded-md text-xs font-medium">
                                                <Shield className="w-3 h-3" />
                                            </div>
                                        )}
                                    </div>
                                    <h3
                                        className="hover:underline font-semibold text-sm text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate cursor-pointer"
                                        onClick={handleNameClick}
                                    >
                                        {data.name || "Untitled Exam"}
                                    </h3>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <div className="flex items-center space-x-1">
                                            {[1, 2, 3, 4, 5].map((star, index) => (
                                                <Star
                                                    key={index}
                                                    className={`h-3 w-3 ${index < Math.floor(examPatternData.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`}
                                                />
                                            ))}
                                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{examPatternData.rating || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Exam Pattern Details */}
                            <div className="col-span-4 flex items-center">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2" title={data.description}>
                                        {data.description || "No description provided for this examination."}
                                    </p>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center space-x-1">
                                            <User className="h-3 w-3 text-gray-500" />
                                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[100px]">{formatInstructorNames()}</span>
                                        </div>
                                        {examPatternData.tags?.slice(0, 1).map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 capitalize"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Stats - Updated to match card layout */}
                            <div className="col-span-3 flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                    <BookOpen className="h-3 w-3 text-slate-600 dark:text-slate-400" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{totalQuestions}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Questions</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Timer className="h-3 w-3 text-slate-600 dark:text-slate-400" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{data.accessControlSettings?.maxAttempts || 1}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Attempts</span>
                                </div>
                                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-orange-50 border border-orange-200 text-orange-700">
                                    <BadgeCheck className="w-3 h-3" />
                                    <span className="text-xs font-semibold">{data.resultsSettings?.passingPercentage || 60}%</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="col-span-1 flex items-center justify-end space-x-2">
                                <div className="flex flex-col space-y-1">
                                    <button
                                        onClick={toggleFavorite}
                                        className="rounded-full bg-gray-100 p-1 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    >
                                        <Heart className={`h-3 w-3 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="rounded-full bg-gray-100 p-1 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    >
                                        <Share2 className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }

    // Card Layout (default)
    return (
        <div
            className="group relative h-full overflow-hidden rounded-xl bg-white shadow-md border border-gray-200/60 transition-all duration-400 hover:shadow-2xl hover:shadow-orange-500/8 hover:border-orange-300/60 dark:bg-gray-900/95 dark:border-gray-800/60 dark:hover:border-orange-500/40 cursor-pointer backdrop-blur-sm"
            onClick={handleCardClick}
        >
            {/* Header Section */}
            <div className="relative p-3 pb-0">
                <div className="flex justify-between items-start mb-3">
                    {/* Compact Status Badge */}
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${statusStyles.bg} ${statusStyles.text} transition-all duration-300`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${statusStyles.dot}`} />
                        <span className="capitalize">{data.status?.toLowerCase() || "draft"}</span>
                    </div>

                    {/* Security Badge */}
                    {hasSecurityFeatures && (
                        <div className="inline-flex items-center gap-1 bg-purple-50 border border-purple-200 text-purple-700 px-2 py-1 rounded-md text-xs font-medium">
                            <Shield className="w-3 h-3" />
                            <span>Secured</span>
                        </div>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold leading-tight text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300 mb-2 line-clamp-2">
                    {data.name || "Untitled Exam"}
                </h3>

                {/* Compact Description */}
                <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {data.description || "No description provided for this examination."}
                </p>
            </div>

            {/* Compact Stats Row */}
            <div className="px-2 pb-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/30 group-hover:from-gray-100 group-hover:to-slate-100 dark:group-hover:from-gray-800/70 dark:group-hover:to-slate-800/50 transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    {/* Questions & Duration */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                                <BookOpen className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{totalQuestions}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">Questions</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                                <Timer className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{data.accessControlSettings?.maxAttempts || 1}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">Attempts</p>
                            </div>
                        </div>
                    </div>

                    {/* Pass Rate */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-orange-50 border border-orange-200 text-orange-700">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        <span className="text-xs font-semibold">{data.resultsSettings?.passingPercentage || 60}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
