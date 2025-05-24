"use client";

import Stats from "@/components/stats";
import { Book, BookOpen, Clock, GraduationCap } from "lucide-react";
import React from "react";

const CourseStats = ({ className }) => {
    const generateData = (data) => {
        return {
            grid: 5,
            gridItems: [
                {
                    title: "Total Courses",
                    value: data?.totalCourses || 156,
                    icon: <Book className="h-5 w-5" />,
                    variant: "orange",
                    trend: null,
                },
                {
                    title: "Active Courses",
                    value: data?.activeCourses || 89,
                    icon: <BookOpen className="h-5 w-5" />,
                    variant: "blue",
                    trend: { value: 12, isPositive: true },
                },
                {
                    title: "Ongoing Courses",
                    value: data?.ongoingCourses || 23,
                    icon: <Clock className="h-5 w-5" />,
                    variant: "purple",
                    trend: null,
                },
                {
                    title: "Completed Courses",
                    value: data?.completedCourses || 45,
                    icon: <GraduationCap className="h-5 w-5" />,
                    variant: "green",
                    trend: { value: 8, isPositive: true },
                },
                {
                    title: "Draft Courses",
                    value: data?.draftCourses || 12,
                    icon: <Book className="h-5 w-5" />,
                },
            ],
            url: "/get-course-stats",
            method: "GET",
        };
    };

    return <Stats generateData={generateData} className={className} />;
};

export default CourseStats;
