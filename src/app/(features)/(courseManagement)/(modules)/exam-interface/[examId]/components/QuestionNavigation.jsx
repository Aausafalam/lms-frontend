"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Bookmark, Eye, Target, Send, AlertCircle } from "lucide-react";

export default function QuestionNavigation({ questions, sections, currentQuestion, currentSection, onQuestionSelect, getQuestionStatus, answers, markedForReview, onSubmitTest, isWebcamRequired }) {
    const getStatusColor = (status) => {
        switch (status) {
            case "answered":
                return "bg-green-500 hover:bg-green-600 text-white";
            case "marked":
                return "bg-yellow-500 hover:bg-yellow-600 text-white";
            case "current":
                return "bg-orange-500 hover:bg-orange-600 text-white ring-2 ring-orange-200";
            case "not-answered":
                return "bg-red-100 hover:bg-red-200 text-red-700 border border-red-300";
            case "not-visited":
                return "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300";
            default:
                return "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "answered":
                return <CheckCircle className="w-2.5 h-2.5" />;
            case "marked":
                return <Bookmark className="w-2.5 h-2.5" />;
            case "current":
                return <Eye className="w-2.5 h-2.5" />;
            case "not-answered":
                return <AlertCircle className="w-2.5 h-2.5" />;
            default:
                return null;
        }
    };

    // Calculate statistics
    const totalQuestions = questions.length;
    const answeredCount = Object.keys(answers).length;
    const markedCount = markedForReview.size;
    const notAnsweredCount = totalQuestions - answeredCount;
    const visitedButNotAnswered = questions.filter((_, index) => {
        const status = getQuestionStatus(index);
        return status === "not-answered";
    }).length;
    const notVisitedCount = totalQuestions - answeredCount - visitedButNotAnswered;

    return (
        <Card className="bg-white dark:bg-gray-900 shadow-sm rounded-lg sticky top-4 mx-2 sm:mx-0">
            <CardHeader className="pb-3 px-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                        <Target className="w-4 h-4 text-orange-500" />
                        Questions
                    </CardTitle>
                    <div className="text-xs text-gray-500">
                        {answeredCount}/{totalQuestions}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="px-4 pb-4 space-y-4">
                {/* Question Grid */}
                <div className={` ${isWebcamRequired ? "max-h-60" : "max-h-[55vh]"}  overflow-auto flex flex-wrap gap-2.5`}>
                    {questions.map((question, index) => {
                        const status = getQuestionStatus(index);
                        return (
                            <Button
                                key={question.id}
                                size="sm"
                                className={`h-8 w-8 p-0 relative transition-all duration-200 rounded-md text-xs font-medium ${getStatusColor(status)}`}
                                onClick={() => onQuestionSelect(index)}
                                title={`Q${index + 1} - ${status.replace("-", " ")}`}
                            >
                                {index + 1}
                            </Button>
                        );
                    })}
                </div>

                {/* Compact Stats */}
                <div className="grid grid-cols-4 gap-2 py-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                        <div className="text-sm font-semibold text-green-600">{answeredCount}</div>
                        <div className="text-xs text-gray-500">Done</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-semibold text-yellow-600">{markedCount}</div>
                        <div className="text-xs text-gray-500">Review</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-semibold text-red-600">{visitedButNotAnswered}</div>
                        <div className="text-xs text-gray-500">Skipped</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-semibold text-gray-600">{notVisitedCount}</div>
                        <div className="text-xs text-gray-500">Pending</div>
                    </div>
                </div>

                {/* Submit Button */}
                <Button onClick={onSubmitTest} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition-all duration-200" size="sm">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Test
                </Button>

                {/* Compact Legend */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>Done</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                        <span>Review</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        <span>Current</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-300 rounded-full" />
                        <span>Skipped</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-300 rounded-full" />
                        <span>Pending</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
