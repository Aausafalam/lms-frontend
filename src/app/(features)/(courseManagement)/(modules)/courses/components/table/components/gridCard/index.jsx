"use client";

import { useState, useEffect } from "react";
import { Star, Clock, Heart, Share2, Award, ChevronRight, BookOpen } from "lucide-react";
import Image from "next/image";
import { useNavigation } from "@/components/navigation";
import GlobalUtils from "@/lib/utils";

export default function CourseCard({ data }) {
    const { navigate } = useNavigation();
    // Course data state with default values
    const [courseData, setCourseData] = useState({
        id: "7890",
        name: "Complete Web Development Bootcamp 2025",
        summary: "Master HTML, CSS, JavaScript, React and Node.js with practical projects and real-world applications.",
        instructors: [
            {
                name: "Sarah Johnson",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            {
                name: "Michael Chen",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
                name: "Emily Rodriguez",
                image: "https://randomuser.me/api/portraits/women/28.jpg",
            },
        ],
        categories: ["Web Development", "JavaScript"],
        rating: 4.8,
        reviewCount: "2.5k",
        duration: "12",
        studentCount: "12.5k",
        lessonCount: "75",
        price: {
            current: "$89.99",
            original: "$129.99",
            discount: "30% OFF",
        },
        tags: ["Bestseller", "New"],
        banner: "/banner.jpg",
        progress: 35,
    });

    const [isFavorite, setIsFavorite] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (data) {
            setCourseData((prevData) => ({ ...prevData, ...data }));
        }
    }, [data]);

    // Format instructors names for display
    const formatInstructorNames = () => {
        if (courseData.instructors.length === 1) {
            return courseData.instructors[0].name;
        } else if (courseData.instructors.length === 2) {
            return `${courseData.instructors[0].name} & ${courseData.instructors[1].name}`;
        } else {
            return `${courseData.instructors[0].name} +${courseData.instructors.length - 1}`;
        }
    };

    return (
        <div
            onClick={() => navigate(`/courses/details/${courseData.id}`)}
            className="flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="relative w-full  overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-500 dark:bg-gray-800 hover:shadow-2xl dark:hover:bg-gray-700"
                style={{ maxHeight: "400px" }}
            >
                {/* Premium glass effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/5 backdrop-blur-[1px] dark:from-white/5 dark:to-black/20"></div>

                {/* Course Image - Reduced height */}
                <div className="relative h-32 w-full overflow-hidden">
                    <Image
                        width={500}
                        height={300}
                        src={courseData.banner || "/placeholder.svg"}
                        alt={courseData.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    {/* Top tags */}
                    <div className="absolute right-3 top-3 flex space-x-2">
                        {courseData.tags.map((badge, index) => (
                            <span
                                key={index}
                                className={`rounded-full ${
                                    index === 0 ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-purple-500 to-indigo-600"
                                } px-2 py-0.5 text-xs uppercase tracking-wider text-white shadow-lg`}
                            >
                                {badge}
                            </span>
                        ))}
                    </div>

                    {/* Bottom content */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star, index) => (
                                    <Star key={index} className={`h-3 w-3 ${index < Math.floor(courseData.rating) ? "fill-yellow-400 text-yellow-400" : "fill-yellow-400/30 text-yellow-400/30"}`} />
                                ))}
                                <span className="ml-1 text-xs font-medium text-white">{courseData.rating}</span>
                                <span className="text-xs text-gray-300">({courseData.reviewCount})</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Content - Condensed */}
                <div className="relative p-3">
                    <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                            {courseData.categories.map((category, index) => (
                                <span
                                    key={index}
                                    className={`rounded-full ${
                                        index === 0
                                            ? "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-600 dark:from-orange-900/30 dark:to-orange-800/30 dark:text-orange-400"
                                            : "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 dark:from-blue-900/30 dark:to-blue-800/30 dark:text-blue-400"
                                    } px-2 py-0.5 text-[10px] font-semibold`}
                                >
                                    {category.name}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center text-[10px] text-gray-500 dark:text-gray-400">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>{courseData.duration} Hours</span>
                        </div>
                    </div>

                    <h3
                        onClick={() => navigate(`/courses/details/${courseData.id}`)}
                        className={`mb-1 cursor-pointer hover:underline text-[1rem] font-bold text-gray-900 dark:text-white hover:text-orange-500  dark:hover:text-orange-400 transition-colors duration-200 ${
                            isHovered && "text-orange-500"
                        }`}
                    >
                        {courseData.name}
                    </h3>

                    <p title={courseData.summary} className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-2 mb-2" name={courseData.summary}>
                        {courseData.summary}
                    </p>

                    {/* Instructor - Condensed */}
                    <div className="mb-2 flex items-center">
                        <div className="flex -space-x-2 mr-2">
                            {courseData.instructors.slice(0, 3).map((instructors, index) => (
                                <Image
                                    key={index}
                                    width={24}
                                    height={24}
                                    src={"https://randomuser.me/api/portraits/women/44.jpg" || "/placeholder.svg?height=24&width=24"}
                                    alt={instructors.name}
                                    className={GlobalUtils.cn("h-6 w-6 rounded-full ring-1 ring-white dark:ring-gray-800", courseData.featured ? "ring-orange-500/50" : "")}
                                />
                            ))}
                            {courseData.instructors.length > 3 && (
                                <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-medium text-gray-600 dark:text-gray-300 ring-1 ring-white dark:ring-gray-800">
                                    +{courseData.instructors.length - 3}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate max-w-[120px]">{formatInstructorNames()}</span>
                            <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <BookOpen className="mr-1 h-3 w-3" />
                                {courseData.lessonCount}
                            </span>
                        </div>
                        <div className="ml-auto flex space-x-1">
                            <button
                                onClick={() => setIsFavorite(!isFavorite)}
                                className="rounded-full bg-gray-100 p-1 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                <Heart className={`h-3 w-3 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                            </button>
                            <button className="rounded-full bg-gray-100 p-1 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                                <Share2 className="h-3 w-3" />
                            </button>
                        </div>
                    </div>

                    {/* Mini Progress Bar */}
                    <div className="mb-2">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] font-medium text-gray-700 dark:text-gray-300">Progress</span>
                            <span className="text-[9px] font-medium text-orange-500">{courseData.progress}%</span>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                            <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-1000 ease-out" style={{ width: `${courseData.progress}%` }}></div>
                        </div>
                    </div>

                    {/* Price and CTA - Condensed */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center">
                                <span className="text-sm font-bold text-gray-900 dark:text-white">{courseData.price.current}</span>
                                <span className="ml-1.5 text-[10px] text-gray-500 line-through dark:text-gray-400">{courseData.price.original}</span>
                                <span className="ml-1.5 rounded-md bg-gradient-to-r from-green-100 to-emerald-100 px-1 py-0.5 text-[9px] font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                    {courseData.price.discount}
                                </span>
                            </div>
                        </div>
                        <button className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-1 text-[10px] font-medium text-white shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                            <span className="relative z-10 flex items-center">
                                Continue
                                <ChevronRight className="ml-0.5 h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" />
                            </span>
                            <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
