"use client";

import { useState, useEffect } from "react";
import { Star, Clock, Users, BookOpen, ChevronRight, Heart, Share2, Award } from "lucide-react";
import Banner from "../../../../assets/cardBanner.avif";
import Instructor from "../../../../assets/instructorImage.avif";
import Pattern from "../../../../assets/pattern.avif";
import Image from "next/image";
import { useNavigation } from "@/components/navigation";

export default function CourseCard({ data }) {
    const { navigate } = useNavigation();
    // Course data state with default values
    const [courseData, setCourseData] = useState({
        id: "7890",
        title: "Complete Web Development Bootcamp 2025",
        description: "Master HTML, CSS, JavaScript, React and Node.js with practical projects and real-world applications.",
        instructor: {
            name: "Sarah Johnson",
            title: "Senior Developer & Instructor",
            image: Instructor,
        },
        categories: ["Web Development", "JavaScript"],
        rating: 4.8,
        reviewCount: "2.5k",
        duration: "12 weeks",
        studentCount: "12.5k",
        lessonCount: "75",
        price: {
            current: "$89.99",
            original: "$129.99",
            discount: "30% OFF",
        },
        badges: ["Bestseller", "New"],
        banner: Banner,
    });

    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(35);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (data) {
            setCourseData((prevData) => ({ ...prevData, ...data }));
        }
    }, [data]);

    return (
        <div className="flex items-center justify-center">
            <div
                className="relative w-full  overflow-hidden rounded-xl bg-white shadow-xl transition-all duration-500 dark:bg-gray-800 hover:shadow-2xl dark:hover:bg-gray-700"
                // style={{
                //     transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                //     boxShadow: isHovered ? "0 20px 40px -10px rgba(249, 115, 22, 0.25)" : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                // }}
                // onMouseEnter={() => setIsHovered(true)}
                // onMouseLeave={() => setIsHovered(false)}
            >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5 dark:opacity-10">
                    <Image src={Pattern} alt="" className="h-full w-full object-cover" />
                </div>

                {/* Course Image - REDUCED HEIGHT */}
                <div className="relative h-40 w-full overflow-hidden sm:h-48">
                    <Image src={courseData.banner} alt={courseData.title} className="h-full w-full object-cover transition-transform duration-700 ease-in-out hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    {/* Top badges */}
                    <div className="absolute right-3 top-3 flex space-x-2">
                        {courseData.badges.map((badge, index) => (
                            <span key={index} className={`rounded-full ${index === 0 ? "bg-orange-500" : "bg-purple-600"} px-2 py-0.5 text-xs  uppercase tracking-wider text-white shadow-lg`}>
                                {badge}
                            </span>
                        ))}
                    </div>

                    {/* Bottom content */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star, index) => (
                                    <Star key={index} className={`h-4 w-4 ${index < Math.floor(courseData.rating) ? "fill-yellow-400 text-yellow-400" : "fill-yellow-400/30 text-yellow-400/30"}`} />
                                ))}
                                <span className="ml-1 text-xs font-medium text-white">{courseData.rating}</span>
                                <span className="text-xs text-gray-300">({courseData.reviewCount})</span>
                            </div>

                            <button onClick={() => setIsFavorite(!isFavorite)} className="rounded-full bg-white/10 p-1.5 backdrop-blur-sm transition-colors hover:bg-white/20">
                                <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Course Content - CONDENSED */}
                <div className="relative p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {courseData.categories.map((category, index) => (
                                <span
                                    key={index}
                                    className={`rounded-full ${
                                        index === 0 ? "bg-orange-100 text-orange-500 dark:bg-orange-900/30 dark:text-orange-400" : "bg-blue-100 text-blue-500 dark:bg-blue-900/30 dark:text-blue-400"
                                    } px-2 py-0.5 text-xs font-semibold`}
                                >
                                    {category}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>{courseData.duration}</span>
                        </div>
                    </div>

                    <h3 onClick={() => navigate(`/courses/details/${courseData.id}`)} className="mb-2 text-base font-bold text-gray-900 dark:text-white hover:underline">
                        {courseData.title}
                    </h3>

                    <p className="mb-3 text-xs leading-relaxed text-gray-600 dark:text-gray-300">{courseData.description}</p>

                    {/* Instructor - CONDENSED */}
                    <div className="mb-3 flex items-center">
                        <div className="mr-2 h-8 w-8 overflow-hidden rounded-full ring-1 ring-orange-500 ring-offset-1 dark:ring-offset-gray-800">
                            <Image src={courseData.instructor.image} alt={courseData.instructor.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-900 dark:text-white">{courseData.instructor.name}</p>
                            <div className="flex items-center">
                                <Award className="mr-1 h-3 w-3 text-orange-500" />
                                <p className="text-xs text-gray-500 dark:text-gray-400">{courseData.instructor.title}</p>
                            </div>
                        </div>
                        <button className="ml-auto rounded-full bg-gray-100 p-1.5 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                            <Share2 className="h-3 w-3" />
                        </button>
                    </div>

                    {/* Stats - CONDENSED TO SINGLE ROW */}
                    <div className="mb-3 flex justify-between">
                        <div className="flex items-center gap-1 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 px-2 py-1 dark:from-orange-900/20 dark:to-orange-800/20">
                            <Users className="h-3 w-3 text-orange-500" />
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{courseData.studentCount}</span>
                        </div>
                        <div className="flex items-center gap-1 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 px-2 py-1 dark:from-orange-900/20 dark:to-orange-800/20">
                            <BookOpen className="h-3 w-3 text-orange-500" />
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{courseData.lessonCount} Lessons</span>
                        </div>
                        <div className="flex items-center gap-1 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 px-2 py-1 dark:from-orange-900/20 dark:to-orange-800/20">
                            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-center text-[8px] font-bold text-white">A+</div>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Certificate</span>
                        </div>
                    </div>

                    {/* Progress Bar - SHORTER */}
                    <div className="mb-3">
                        <div className="mb-1 flex justify-between">
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Course Progress</span>
                            <span className="text-xs font-medium text-orange-500">{progress}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                            <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>

                    {/* Price and CTA - CONDENSED */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center">
                                <span className="text-base font-bold text-gray-900 dark:text-white">{courseData.price.current}</span>
                                <span className="ml-2 text-xs text-gray-500 line-through dark:text-gray-400">{courseData.price.original}</span>
                                <span className="ml-2 rounded-md bg-green-100 px-1 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                    {courseData.price.discount}
                                </span>
                            </div>
                        </div>
                        <button className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-1.5 text-xs font-medium text-white shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                            <span className="relative z-10 flex items-center">
                                Continue
                                <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </span>
                            <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
