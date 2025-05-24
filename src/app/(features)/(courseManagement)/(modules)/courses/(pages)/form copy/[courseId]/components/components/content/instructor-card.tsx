"use client";

import { Star, Users, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { InstructorType } from "./course-data";
import GlobalUtils from "@/lib/utils";

interface InstructorCardProps {
    instructor: InstructorType;
    compact?: boolean;
}

export function InstructorCard({ instructor, compact = false }: InstructorCardProps) {
    return (
        <div
            className={GlobalUtils.cn(
                "flex border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-800/40 hover:bg-orange-50/30 dark:hover:bg-orange-900/10 transition-all rounded-xl",
                "p-4 gap-4"
            )}
        >
            <div className="flex-shrink-0">
                <div className="relative">
                    <Avatar className="h-16 w-16 border-4 border-orange-100 dark:border-orange-900/30">
                        <AvatarImage src={getInstructorImage(instructor.id) || "/placeholder.svg"} alt={instructor.name} />
                        <AvatarFallback className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-lg">
                            {instructor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center border-2 border-white dark:border-gray-900">
                        <Star className="h-3 w-3" />
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{instructor.name}</h3>
                    <Badge variant="outline" className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800/40">
                        {instructor.reviewAverage} ★
                    </Badge>
                </div>
                <p className="text-orange-600 dark:text-orange-400 text-xs mb-1">{instructor.role}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">{instructor.company}</p>

                <div className="flex flex-wrap gap-2 text-xs">
                    <div className="flex items-center text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                        <Users className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400" />
                        <span>{formatNumber(instructor.studentCount)}</span>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                        <BookOpen className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400" />
                        <span>{instructor.courseCount} Courses</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper function to format large numbers
function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
}

// Helper function to get real instructor images
function getInstructorImage(id: string): string {
    const images = {
        "1": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
        "2": "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
        default: "/placeholder.svg?height=100&width=100",
    };

    return images[id as keyof typeof images] || images.default;
}
