"use client";

import { useState, useEffect } from "react";
import { Star, Clock, Heart, Share2, ChevronRight, BookOpen, User, Play } from "lucide-react";
import Image from "next/image";
import { useNavigation } from "@/components/navigation";
import apiConstants from "@/services/utils/constants";
import ApiUtils from "@/services/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Course Card Component
 * @description Reusable card component for displaying course information
 */
export default function CourseCard({ data, view, onEdit, onDelete, onView }) {
    const { navigate } = useNavigation();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Default course data structure
    const [courseData, setCourseData] = useState({
        id: "",
        name: "Course Title",
        description: "Course description",
        code: "",
        summary: "Course summary",
        rating: 0,
        tags: [],
        duration: 0,
        isFeatured: false,
        categories: [],
        instructors: [],
        price: null,
    });

    useEffect(() => {
        if (data) {
            setCourseData((prevData) => ({ ...prevData, ...data }));
        }
    }, [data]);

    const handleCardClick = () => {
        if (onView) {
            onView(courseData.id);
        } else {
            navigate(`/courses/details/${courseData.id}`);
        }
    };

    const handleNameClick = (e) => {
        e.stopPropagation();
        handleCardClick();
    };

    const formatInstructorNames = () => {
        if (!courseData.instructors?.length) return "No instructor assigned";

        if (courseData.instructors.length === 1) {
            return courseData.instructors[0].name;
        } else if (courseData.instructors.length === 2) {
            return `${courseData.instructors[0].name} & ${courseData.instructors[1].name}`;
        } else {
            return `${courseData.instructors[0].name} +${courseData.instructors.length - 1}`;
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
                title: courseData.name,
                text: courseData.summary,
                url: window.location.origin + `/courses/details/${courseData.id}`,
            });
        }
    };

    const getImageUrl = (type = "thumbnailUrl") => {
        if (!courseData.id) return "/placeholder.svg?height=144&width=400";

        return `${apiConstants.BACKEND_API_BASE_URL}/course/${courseData.id}/getImage?type=${type}&token=${ApiUtils.getAuthToken()}`;
    };

    // Table Row Layout
    if (view?.table) {
        return (
            <div className="w-full">
                <div
                    className="grid grid-cols-12 gap-4 px-4 py-3 border-b group relative w-full overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-gray-900 dark:hover:bg-gray-800/50 cursor-pointer border border-gray-200 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-600"
                    onClick={handleCardClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Course Image and Basic Info */}
                    <div className="col-span-4 flex items-center space-x-3">
                        <div className="relative h-12 w-16 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                                width={64}
                                height={48}
                                src={getImageUrl() || "/placeholder.svg"}
                                alt={courseData.name}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.target.src = "/placeholder.svg?height=48&width=64";
                                }}
                            />
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
                                {courseData.name}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center space-x-1">
                                    {[1, 2, 3, 4, 5].map((star, index) => (
                                        <Star key={index} className={`h-3 w-3 ${index < Math.floor(courseData.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`} />
                                    ))}
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{courseData.rating || 0}</span>
                                </div>
                                {courseData.tags?.slice(0, 1).map((tag, index) => (
                                    <span key={index} className="px-2 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 capitalize">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Course Details */}
                    <div className="col-span-4 flex items-center">
                        <div className="space-y-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2" title={courseData.summary}>
                                {courseData.summary || "No description provided"}
                            </p>
                            <div className="flex items-center space-x-2">
                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                    {courseData.categories[0]?.name}
                                </span>
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
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{courseData.duration || 0}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Hours</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <BookOpen className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{courseData.lessonCount || 0}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Lessons</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-end space-x-2">
                        <div className="text-right">
                            <div className="text-sm font-bold text-gray-900 dark:text-white">{courseData.price?.current || "Free"}</div>
                            {courseData.price?.original && <div className="text-xs text-gray-500 line-through dark:text-gray-400">{courseData.price.original}</div>}
                        </div>
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
                </div>
            </div>
        );
    }

    // Card Layout (default)
    return (
        <div onClick={handleCardClick} className="cursor-pointer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="relative w-full overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-900 dark:hover:bg-gray-800">
                {/* Course Image */}
                <div className="relative h-36 w-full overflow-hidden">
                    <Image
                        width={400}
                        height={144}
                        src={getImageUrl() || "/placeholder.svg"}
                        alt={courseData.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                            e.target.src = "/placeholder.svg?height=144&width=400";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Top badges */}
                    <div className="absolute right-2 top-2">
                        {courseData.tags?.slice(0, 1).map((badge, index) => (
                            <span key={index} className="rounded-full bg-orange-500 px-2 py-0.5 text-xs font-medium text-white shadow-md capitalize">
                                {badge}
                            </span>
                        ))}
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star, index) => (
                                <Star key={index} className={`h-3 w-3 ${index < Math.floor(courseData.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-400 text-gray-400"}`} />
                            ))}
                            <span className="ml-1 text-xs font-medium text-white">{courseData.rating || 0}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-200">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>{courseData.duration || 0}h</span>
                        </div>
                    </div>
                </div>

                {/* Course Content */}
                <div className="relative p-4">
                    {/* Category and Title */}
                    <div className="mb-2">
                        <div className="mb-1 flex items-center justify-between">
                            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">{courseData.categories[0]?.name}</span>
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
                        <h3
                            className={`text-sm font-semibold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200 line-clamp-2 ${
                                isHovered ? "text-orange-500" : ""
                            }`}
                        >
                            {courseData.name}
                        </h3>
                    </div>

                    {/* Description */}
                    <p className="mb-3 text-[0.8rem] text-gray-600 dark:text-gray-400 line-clamp-2">{courseData.summary || "No description available"}</p>

                    {/* Instructor */}
                    <div className="mb-3 flex items-center space-x-2">
                        <div className="flex -space-x-1">
                            {courseData.instructors.slice(0, 2).map((instructor, index) => (
                                <Image
                                    key={index}
                                    width={20}
                                    height={20}
                                    src="https://randomuser.me/api/portraits/women/44.jpg"
                                    alt={instructor.name}
                                    className="h-5 w-5 rounded-full ring-1 ring-white dark:ring-gray-800"
                                />
                            ))}
                            {(courseData.instructors?.length || 0) > 2 && (
                                <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300 ring-1 ring-white dark:ring-gray-800">
                                    +{courseData.instructors.length - 2}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate block">{formatInstructorNames()}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <BookOpen className="mr-1 h-3 w-3" />
                            {courseData.lessonCount || 0}
                        </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{courseData.price?.current || "Free"}</span>
                            {courseData.price?.original && <span className="text-xs text-gray-500 line-through dark:text-gray-400">{courseData.price.original}</span>}
                            {courseData.price?.discount && (
                                <span className="rounded bg-green-100 px-1 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">{courseData.price.discount}</span>
                            )}
                        </div>
                        <button className="group rounded-md bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1">
                            <span className="flex items-center">
                                Continue
                                <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
