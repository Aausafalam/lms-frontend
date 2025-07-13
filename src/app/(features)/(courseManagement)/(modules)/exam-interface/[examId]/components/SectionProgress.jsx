"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function SectionProgress({ sections, currentSection, getSectionProgress, onSectionChange, sectionTimeLeft }) {
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    };

    const getTimeColor = (timeLeft, totalTime) => {
        const percentage = (timeLeft / totalTime) * 100;
        if (percentage < 20) return "text-red-500";
        if (percentage < 50) return "text-yellow-500";
        return "text-green-500";
    };

    return (
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border-0">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Section Progress</h3>
                    <Badge variant="outline" className="text-orange-600 border-orange-200">
                        {sections.findIndex((s) => s.id === currentSection) + 1} of {sections.length}
                    </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {sections.map((section) => {
                        const IconComponent = section.icon;
                        const progress = getSectionProgress(section.id);
                        const timeLeft = sectionTimeLeft[section.id] || 0;
                        const totalTime = section.duration * 60;
                        const isActive = section.id === currentSection;
                        const isCompleted = progress === 100;

                        return (
                            <Button
                                key={section.id}
                                variant="ghost"
                                onClick={() => onSectionChange(section.id)}
                                className={`h-auto p-4 text-left relative overflow-hidden transition-all duration-300 ${
                                    isActive ? "bg-gradient-to-r from-orange-500/10 to-red-500/10 border-2 border-orange-200 dark:border-orange-800" : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                }`}
                            >
                                <div className="flex items-start justify-between w-full">
                                    <div className="flex items-start gap-3 flex-1">
                                        <div className={`p-2 rounded-lg bg-gradient-to-r ${section.color} ${isActive ? "shadow-lg" : "opacity-70"}`}>
                                            <IconComponent className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-semibold text-gray-900 dark:text-white truncate">{section.name}</h4>
                                                {isCompleted && <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />}
                                                {isActive && !isCompleted && <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />}
                                            </div>
                                            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-1">
                                                {section.questions} questions • {section.difficulty}
                                            </p>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-gray-500">Progress</span>
                                                    <span className="font-medium">{Math.round(progress)}%</span>
                                                </div>
                                                <Progress value={progress} className="h-1.5" />
                                                <div className="flex items-center justify-between text-xs">
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        <span className={getTimeColor(timeLeft, totalTime)}>{formatTime(timeLeft)}</span>
                                                    </div>
                                                    <Badge variant="secondary" className={`text-xs ${isActive ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" : ""}`}>
                                                        {isActive ? "Active" : isCompleted ? "Complete" : "Pending"}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Button>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
