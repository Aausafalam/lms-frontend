"use client";

import { useState, useEffect } from "react";
import { Star, Clock, Heart, Share2, ChevronRight, BookOpen, User, Play } from "lucide-react";
import Image from "next/image";
import { useNavigation } from "@/components/navigation";
import apiConstants from "@/services/utils/constants";
import ApiUtils from "@/services/utils";
import { useParams } from "next/navigation";

/**
 * Video Card Component
 * @description Reusable card component for displaying video information
 */
export default function VideoCard({ data, view, onEdit, onDelete, onView }) {
    const { navigate } = useNavigation();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { courseId, moduleId, lessonId } = useParams();
    // Default video data structure
    const [videoData, setVideoData] = useState({
        id: "",
        name: "Video Title",
        description: "Video description",
        summary: "Video summary",
        rating: 0,
        tags: [],
        duration: 0,
        isFeatured: false,
        instructors: [],
    });

    useEffect(() => {
        if (data) {
            setVideoData((prevData) => ({ ...prevData, ...data }));
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
            onView(videoData.id);
        } else {
            navigate(`/videos/details/${videoData.id}?courseId=${courseId}&moduleId=${moduleId}&lessonId=${lessonId}`);
        }
    };

    const handleNameClick = (e) => {
        e.stopPropagation();
        handleCardClick();
    };

    const formatInstructorNames = () => {
        if (!videoData.instructors?.length) return "No instructor assigned";

        if (videoData.instructors.length === 1) {
            return videoData.instructors[0].name;
        } else if (videoData.instructors.length === 2) {
            return `${videoData.instructors[0].name} & ${videoData.instructors[1].name}`;
        } else {
            return `${videoData.instructors[0].name} +${videoData.instructors.length - 1}`;
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
                title: videoData.name,
                text: videoData.summary,
                url: window.location.origin + `/videos/details/${videoData.id}?courseId=${courseId}&moduleId=${moduleId}&lessonId=${lessonId}`,
            });
        }
    };

    const getImageUrl = (type = "thumbnailUrl") => {
        if (!videoData.id) return "";

        return `${apiConstants.BACKEND_API_BASE_URL}/course/${courseId}/module/${moduleId}/lesson/${lessonId}/video/${videoData.id}/getImage?type=${type}&token=${ApiUtils.getAuthToken()}`;
    };

    // Table Row Layout
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
                        // Mobile Layout
                        <>
                            {/* Video Image and Basic Info */}
                            <div className="flex items-start space-x-3">
                                <div className="relative h-16 w-20 rounded-md overflow-hidden flex-shrink-0">
                                    <Image width={80} height={64} src={getImageUrl() || "/placeholder.svg"} alt={videoData.name} className="h-full w-full object-cover" />
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
                                        {videoData.name}
                                    </h3>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <div className="flex items-center space-x-1">
                                            {[1, 2, 3, 4, 5].map((star, index) => (
                                                <Star key={index} className={`h-3 w-3 ${index < Math.floor(videoData.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`} />
                                            ))}
                                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{videoData.rating || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Video Details */}
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2" title={videoData.summary}>
                                    {videoData.summary || "No description provided"}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        {videoData.tags?.slice(0, 1).map((tag, index) => (
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

                            {/* Stats  */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-1">
                                        <Clock className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{videoData.duration || 0}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">hrs</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <User className="h-3 w-3 text-gray-500" />
                                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[80px]">{formatInstructorNames()}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        // Desktop Layout
                        <>
                            {/* Video Image and Basic Info */}
                            <div className="col-span-4 flex items-center space-x-3">
                                <div className="relative h-12 w-16 rounded-md overflow-hidden flex-shrink-0">
                                    <Image width={64} height={48} src={getImageUrl() || "/placeholder.svg"} alt={videoData.name} className="h-full w-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <div className="absolute top-1 right-1">
                                        <Play className="h-2 w-2 text-white" />
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3
                                        className="hover:underline font-semibold text-sm text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate cursor-pointer"
                                        onClick={handleNameClick}
                                    >
                                        {videoData.name}
                                    </h3>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <div className="flex items-center space-x-1">
                                            {[1, 2, 3, 4, 5].map((star, index) => (
                                                <Star key={index} className={`h-3 w-3 ${index < Math.floor(videoData.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`} />
                                            ))}
                                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{videoData.rating || 0}</span>
                                        </div>
                                        {videoData.tags?.slice(0, 1).map((tag, index) => (
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

                            {/* Video Details */}
                            <div className="col-span-4 flex items-center">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2" title={videoData.summary}>
                                        {videoData.summary || "No description provided"}
                                    </p>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center space-x-1">
                                            <User className="h-3 w-3 text-gray-500" />
                                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[100px]">{formatInstructorNames()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="col-span-3 flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                    <Clock className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{videoData.duration || 0}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Hours</span>
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
        <div onClick={handleCardClick} className="cursor-pointer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="relative w-full overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-900 dark:hover:bg-gray-800">
                {/* Video Image */}
                <div className="relative h-32 sm:h-36 w-full overflow-hidden">
                    <Image
                        width={400}
                        height={isMobile ? 128 : 144}
                        src={getImageUrl() || "/placeholder.svg"}
                        alt={videoData.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                            e.target.src = `/placeholder.svg?height=${isMobile ? 128 : 144}&width=400`;
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Top badges */}
                    <div className="absolute right-2 top-2">
                        {videoData.tags?.slice(0, 1).map((badge, index) => (
                            <span key={index} className="rounded-full bg-orange-500 px-2 py-0.5 text-xs font-medium text-white shadow-md capitalize">
                                {badge}
                            </span>
                        ))}
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star, index) => (
                                <Star key={index} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${index < Math.floor(videoData.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-400 text-gray-400"}`} />
                            ))}
                            <span className="ml-1 text-xs font-medium text-white">{videoData.rating || 0}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-200">
                            <Clock className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            <span>{videoData.duration || 0}h</span>
                        </div>
                    </div>
                </div>

                {/* Video Content */}
                <div className="relative p-3 sm:p-4">
                    <div className="mb-2">
                        <h3
                            className={`text-sm font-semibold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200 line-clamp-2 ${
                                isHovered ? "text-orange-500" : ""
                            }`}
                        >
                            {videoData.name}
                        </h3>
                    </div>

                    {/* Description */}
                    <p className="mb-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{videoData.summary || "No description available"}</p>

                    {/* Instructor */}
                    <div className="mb-3 flex items-center space-x-2">
                        <div className="flex -space-x-1">
                            {videoData.instructors.slice(0, 2).map((instructor, index) => (
                                <Image
                                    key={index}
                                    width={isMobile ? 16 : 20}
                                    height={isMobile ? 16 : 20}
                                    src="https://randomuser.me/api/portraits/women/44.jpg"
                                    alt={instructor.name}
                                    className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} rounded-full ring-1 ring-white dark:ring-gray-800`}
                                />
                            ))}
                            {(videoData.instructors?.length || 0) > 2 && (
                                <div
                                    className={`${
                                        isMobile ? "h-4 w-4" : "h-5 w-5"
                                    } rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300 ring-1 ring-white dark:ring-gray-800`}
                                >
                                    +{videoData.instructors.length - 2}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate block">{formatInstructorNames()}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <BookOpen className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            {videoData.videoCount || 0}
                        </div>
                    </div>

                    {/*  CTA */}
                    <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                            <button
                                onClick={toggleFavorite}
                                className="rounded-full bg-gray-100 p-1 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                <Heart className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                            </button>
                            <button
                                onClick={handleShare}
                                className="rounded-full bg-gray-100 p-1 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                <Share2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            </button>
                        </div>
                        <button className="flex items-center justify-center rounded-full h-7 w-7 bg-orange-500 text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20">
                            <span className="flex items-center">
                                <ChevronRight className="h-4 w-4" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
