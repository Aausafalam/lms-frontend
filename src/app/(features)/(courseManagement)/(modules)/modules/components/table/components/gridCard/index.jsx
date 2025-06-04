"use client";

import { useState, useEffect } from "react";
import { Clock, ChevronRight, BookOpen } from "lucide-react";
import Image from "next/image";
import { useNavigation } from "@/components/navigation";
import GlobalUtils from "@/lib/utils";
import apiConstants from "@/services/utils/constants";
import ApiUtils from "@/services/utils";
import { useParams } from "next/navigation";

export default function ModuleCard({ data }) {
    const { navigate } = useNavigation();
    const { courseId } = useParams();
    const [moduleData, setModuleData] = useState({
        id: "101",
        name: "Overview of Web Development",
        summary: "Get a comprehensive introduction to web development, covering HTML, CSS, and JavaScript. Learn the fundamentals of building responsive websites.",
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
        duration: "1",
        topicsCount: "15",
        publishedAt: "2025-01-15",
        banner: "https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg",
        featured: true,
        progress: 65, // Progress percentage (0-100)
    });

    useEffect(() => {
        if (data) {
            setModuleData((prevData) => ({ ...prevData, ...data }));
        }
    }, [data]);

    const handleCardClick = () => {
        navigate(`/modules/details/${moduleData.id}?courseId=${courseId}`);
    };

    // Format instructors names for display
    const formatInstructorNames = () => {
        if (moduleData.instructors.length === 1) {
            return moduleData.instructors[0].name;
        } else if (moduleData.instructors.length === 2) {
            return `${moduleData.instructors[0].name} & ${moduleData.instructors[1].name}`;
        } else {
            return `${moduleData.instructors[0].name} +${moduleData.instructors.length - 1}`;
        }
    };

    return (
        <div
            className="group relative w-full h-[300px] overflow-hidden rounded-md bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:bg-gray-800/90 dark:hover:bg-gray-800 cursor-pointer flex flex-col"
            onClick={handleCardClick}
        >
            {/* Banner image with gradient overlay */}
            <div className="relative h-36 w-full overflow-hidden">
                <Image
                    width={1000}
                    height={1000}
                    src={
                        `${apiConstants.BACKEND_API_BASE_URL}/course/${courseId}/module/${moduleData.id}/getImage?type=thumbnailUrl&token=${ApiUtils.getAuthToken()}` ||
                        "/placeholder.svg?height=400&width=600"
                    }
                    alt={moduleData.name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
            </div>

            {/* Card content */}
            <div className="relative p-4 flex flex-col flex-grow">
                {/* Title and duration */}
                <div className="mb-2 flex items-start justify-between">
                    <h3 className="text-sm font-bold leading-tight text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-200 line-clamp-2">
                        {moduleData.name}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 ml-2 shrink-0">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{moduleData.duration} Hours</span>
                    </div>
                </div>

                {/* Description */}
                <p className=" text-xs leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-3 min-h-12" title={moduleData.summary}>
                    {moduleData.summary}
                </p>

                {/* Footer with instructors and actions */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                    {/* Instructors */}
                    <div className="flex items-center">
                        <div className="flex -space-x-2 mr-2">
                            {moduleData.instructors.slice(0, 3).map((instructors, index) => (
                                <Image
                                    key={index}
                                    width={24}
                                    height={24}
                                    src={"https://randomuser.me/api/portraits/women/44.jpg" || "/placeholder.svg?height=24&width=24"}
                                    alt={instructors.name}
                                    className={GlobalUtils.cn("h-6 w-6 rounded-full ring-1 ring-white dark:ring-gray-800", moduleData.featured ? "ring-orange-500/50" : "")}
                                />
                            ))}
                            {moduleData.instructors.length > 3 && (
                                <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-medium text-gray-600 dark:text-gray-300 ring-1 ring-white dark:ring-gray-800">
                                    +{moduleData.instructors.length - 3}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate max-w-[120px]">{formatInstructorNames()}</span>
                            <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <BookOpen className="mr-1 h-3 w-3" />
                                {moduleData.topicsCount}
                            </span>
                        </div>
                    </div>

                    {/* Continue button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/modules/details/${moduleData.id}`);
                        }}
                        className="flex items-center justify-center rounded-full h-7 w-7 bg-orange-500 text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
