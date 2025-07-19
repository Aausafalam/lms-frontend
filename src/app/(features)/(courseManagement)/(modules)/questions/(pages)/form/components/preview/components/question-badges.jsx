"use client";

import { HelpCircle, Target, Trophy, Clock, Zap } from "lucide-react";

export function QuestionBadges({ data, isMobile }) {
    const getDifficultyConfig = (difficulty) => {
        const configs = {
            very_easy: {
                bg: "bg-green-100 dark:bg-green-900",
                text: "text-green-800 dark:text-green-200",
                border: "border-green-200 dark:border-green-700",
            },
            easy: {
                bg: "bg-blue-100 dark:bg-blue-900",
                text: "text-blue-800 dark:text-blue-200",
                border: "border-blue-200 dark:border-blue-700",
            },
            medium: {
                bg: "bg-yellow-100 dark:bg-yellow-900",
                text: "text-yellow-800 dark:text-yellow-200",
                border: "border-yellow-200 dark:border-yellow-700",
            },
            hard: {
                bg: "bg-red-100 dark:bg-red-900",
                text: "text-red-800 dark:text-red-200",
                border: "border-red-200 dark:border-red-700",
            },
            very_hard: {
                bg: "bg-purple-100 dark:bg-purple-900",
                text: "text-purple-800 dark:text-purple-200",
                border: "border-purple-200 dark:border-purple-700",
            },
        };
        return configs[difficulty?.toLowerCase()] || configs.easy;
    };

    const getTypeConfig = (type) => {
        const configs = {
            MCQ: {
                bg: "bg-violet-100 dark:bg-violet-900",
                text: "text-violet-800 dark:text-violet-200",
                border: "border-violet-200 dark:border-violet-700",
            },
            TRUE_FALSE: {
                bg: "bg-indigo-100 dark:bg-indigo-900",
                text: "text-indigo-800 dark:text-indigo-200",
                border: "border-indigo-200 dark:border-indigo-700",
            },
            FILL_BLANKS: {
                bg: "bg-teal-100 dark:bg-teal-900",
                text: "text-teal-800 dark:text-teal-200",
                border: "border-teal-200 dark:border-teal-700",
            },
            ESSAY: {
                bg: "bg-rose-100 dark:bg-rose-900",
                text: "text-rose-800 dark:text-rose-200",
                border: "border-rose-200 dark:border-rose-700",
            },
            NUMERIC: {
                bg: "bg-sky-100 dark:bg-sky-900",
                text: "text-sky-800 dark:text-sky-200",
                border: "border-sky-200 dark:border-sky-700",
            },
        };
        return configs[type] || configs.MCQ;
    };

    const difficultyConfig = getDifficultyConfig(data.difficulty);
    const typeConfig = getTypeConfig(data.type);

    return (
        <div className={`flex flex-wrap gap-2 ${isMobile ? "text-xs" : "text-sm"}`}>
            {/* Question Type Badge */}
            <div className={`${typeConfig.bg} ${typeConfig.border} border rounded-md ${isMobile ? "px-2 py-1" : "px-3 py-1"}`}>
                <div className="flex items-center gap-1">
                    <HelpCircle className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
                    <span className={`font-medium ${typeConfig.text}`}>{data.type || "MCQ"}</span>
                </div>
            </div>

            {/* Difficulty Badge */}
            <div className={`${difficultyConfig.bg} ${difficultyConfig.border} border rounded-md ${isMobile ? "px-2 py-1" : "px-3 py-1"}`}>
                <div className="flex items-center gap-1">
                    <Target className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
                    <span className={`font-medium ${difficultyConfig.text} capitalize`}>{data.difficulty?.replace("_", " ") || "Easy"}</span>
                </div>
            </div>

            {/* Points Badge */}
            {data.points && (
                <div className={`bg-amber-100 dark:bg-amber-900 border border-amber-200 dark:border-amber-700 rounded-md ${isMobile ? "px-2 py-1" : "px-3 py-1"}`}>
                    <div className="flex items-center gap-1">
                        <Trophy className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
                        <span className="font-medium text-amber-800 dark:text-amber-200">{data.points} pts</span>
                    </div>
                </div>
            )}

            {/* Time Limit Badge */}
            {data.timeLimit && (
                <div className={`bg-rose-100 dark:bg-rose-900 border border-rose-200 dark:border-rose-700 rounded-md ${isMobile ? "px-2 py-1" : "px-3 py-1"}`}>
                    <div className="flex items-center gap-1">
                        <Clock className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
                        <span className="font-medium text-rose-800 dark:text-rose-200">{data.timeLimit}s</span>
                    </div>
                </div>
            )}

            {/* Status Badge */}
            <div className={`bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-md ${isMobile ? "px-2 py-1" : "px-3 py-1"}`}>
                <div className="flex items-center gap-1">
                    <Zap className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
                    <span className="font-medium text-green-800 dark:text-green-200">{data.status || "DRAFT"}</span>
                </div>
            </div>
        </div>
    );
}
