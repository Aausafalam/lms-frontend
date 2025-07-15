"use client";

import { useState, useEffect } from "react";
import Stats from "@/components/stats";
import { Book, BookOpen, Clock, GraduationCap } from "lucide-react";

/**
 * ExamPattern Statistics Component
 * @description Displays examPattern-related statistics and metrics
 */
const ExamPatternStats = ({ className, data }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const generateData = (statsData) => ({
        grid: isMobile ? 2 : 5,
        gridItems: [
            {
                title: "Total ExamPatterns",
                value: statsData?.totalExamPatterns || 156,
                icon: <Book className="h-4 w-4 sm:h-5 sm:w-5" />,
                variant: "orange",
                trend: null,
            },
            {
                title: "Active ExamPatterns",
                value: statsData?.activeExamPatterns || 89,
                icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />,
                variant: "blue",
                trend: { value: 12, isPositive: true },
            },
            {
                title: "Ongoing ExamPatterns",
                value: statsData?.ongoingExamPatterns || 23,
                icon: <Clock className="h-4 w-4 sm:h-5 sm:w-5" />,
                variant: "purple",
                trend: null,
            },
            {
                title: "Completed ExamPatterns",
                value: statsData?.completedExamPatterns || 45,
                icon: <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />,
                variant: "green",
                trend: { value: 8, isPositive: true },
            },
            {
                title: "Draft ExamPatterns",
                value: statsData?.draftExamPatterns || 12,
                icon: <Book className="h-4 w-4 sm:h-5 sm:w-5" />,
                variant: "gray",
                trend: null,
            },
        ],
        url: "/get-examPattern-stats",
        method: "GET",
    });

    return <Stats generateData={generateData} className={className} data={data} />;
};

export default ExamPatternStats;
