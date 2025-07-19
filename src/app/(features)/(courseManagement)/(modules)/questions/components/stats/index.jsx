"use client";

import { useState, useEffect } from "react";
import Stats from "@/components/stats";
import { Book, BookOpen, Clock, GraduationCap } from "lucide-react";

/**
 * Question Statistics Component
 * @description Displays question-related statistics and metrics
 */
const QuestionStats = ({ className, data }) => {
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
                title: "Total Questions",
                value: statsData?.totalQuestions || 156,
                icon: <Book className="h-4 w-4 sm:h-5 sm:w-5" />,
                variant: "orange",
                trend: null,
            },
            {
                title: "Active Questions",
                value: statsData?.activeQuestions || 89,
                icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />,
                variant: "blue",
                trend: { value: 12, isPositive: true },
            },
            {
                title: "Ongoing Questions",
                value: statsData?.ongoingQuestions || 23,
                icon: <Clock className="h-4 w-4 sm:h-5 sm:w-5" />,
                variant: "purple",
                trend: null,
            },
            {
                title: "Completed Questions",
                value: statsData?.completedQuestions || 45,
                icon: <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />,
                variant: "green",
                trend: { value: 8, isPositive: true },
            },
            {
                title: "Draft Questions",
                value: statsData?.draftQuestions || 12,
                icon: <Book className="h-4 w-4 sm:h-5 sm:w-5" />,
                variant: "gray",
                trend: null,
            },
        ],
        url: "/get-question-stats",
        method: "GET",
    });

    return <Stats generateData={generateData} className={className} data={data} />;
};

export default QuestionStats;
