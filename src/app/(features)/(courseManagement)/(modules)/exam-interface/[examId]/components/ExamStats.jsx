"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, CheckCircle, Bookmark, Trophy, TrendingUp } from "lucide-react";

export default function ExamStats({ answered, marked, total, points, totalPoints, currentSection, sections }) {
    const progress = (answered / total) * 100;
    const pointsProgress = (points / totalPoints) * 100;

    const stats = [
        {
            icon: CheckCircle,
            label: "Answered",
            value: answered,
            total: total,
            color: "text-green-600",
            bgColor: "bg-green-50 dark:bg-green-900/20",
            progress: progress,
        },
        {
            icon: Bookmark,
            label: "Marked",
            value: marked,
            total: total,
            color: "text-yellow-600",
            bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
            progress: (marked / total) * 100,
        },
        {
            icon: Target,
            label: "Remaining",
            value: total - answered,
            total: total,
            color: "text-gray-600",
            bgColor: "bg-gray-50 dark:bg-gray-700",
            progress: ((total - answered) / total) * 100,
        },
        {
            icon: Trophy,
            label: "Points",
            value: points,
            total: totalPoints,
            color: "text-orange-600",
            bgColor: "bg-orange-50 dark:bg-orange-900/20",
            progress: pointsProgress,
        },
    ];

    return (
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border-0">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-orange-500" />
                        Exam Statistics
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Overall Progress: {Math.round(progress)}%</div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div key={index} className={`${stat.bgColor} p-4 rounded-xl transition-all duration-300 hover:scale-105`}>
                                <div className="flex items-center justify-between mb-2">
                                    <IconComponent className={`w-5 h-5 ${stat.color}`} />
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                                        <span className="text-sm text-gray-500">/ {stat.total}</span>
                                    </div>
                                    <Progress value={stat.progress} className="h-1.5" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Overall Progress Bar */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Overall Completion</span>
                        <span className="font-medium text-gray-900 dark:text-white">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Start</span>
                        <span className="text-orange-600 font-medium">
                            {answered} of {total} questions completed
                        </span>
                        <span>Finish</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
