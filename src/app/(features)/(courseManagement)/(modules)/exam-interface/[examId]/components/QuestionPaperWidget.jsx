"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, FileText, CheckCircle, Bookmark, Circle } from "lucide-react";

/**
 * QuestionPaperWidget Component
 *
 * Displays a comprehensive view of all exam questions organized by sections.
 * Allows users to navigate directly to any question and see their current status.
 *
 * Features:
 * - Section-wise question organization
 * - Question status indicators (answered/marked/unanswered)
 * - Direct navigation to any question
 * - Summary statistics
 * - Responsive design with scrollable content
 */
export default function QuestionPaperWidget({ questions, sections, answers, markedForReview, onQuestionSelect, onClose }) {
    /**
     * Determines the status of a question based on user interactions
     * @param question - The question object to check
     * @returns Status string: 'answered', 'marked', or 'unanswered'
     */
    const getQuestionStatus = (question) => {
        if (answers[question.id] !== undefined) return "answered";
        if (markedForReview.has(question.id)) return "marked";
        return "unanswered";
    };

    /**
     * Returns the appropriate icon for question status
     * @param status - The status string
     * @returns React icon component
     */
    const getStatusIcon = (status) => {
        switch (status) {
            case "answered":
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case "marked":
                return <Bookmark className="w-4 h-4 text-yellow-500" />;
            default:
                return <Circle className="w-4 h-4 text-gray-400" />;
        }
    };

    /**
     * Returns CSS classes for question status styling
     * @param status - The status string
     * @returns CSS class string
     */
    const getStatusColor = (status) => {
        switch (status) {
            case "answered":
                return "border-green-200 bg-green-50 dark:bg-green-900/20";
            case "marked":
                return "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20";
            default:
                return "border-gray-200 bg-white dark:bg-gray-800";
        }
    };

    /**
     * Handles question selection with error handling
     * @param index - The question index to navigate to
     */
    const handleQuestionSelect = (index) => {
        try {
            onQuestionSelect(index);
            onClose();
        } catch (error) {
            console.error("Error selecting question:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl">
                {/* Header Section */}
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <FileText className="w-6 h-6 text-purple-500" />
                            Question Paper
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    {/* Scrollable Questions Content */}
                    <ScrollArea className="h-[70vh]">
                        <div className="space-y-6">
                            {sections.map((section) => {
                                const sectionQuestions = questions.filter((q) => q.section === section.id);
                                const SectionIcon = section.icon;

                                return (
                                    <div key={section.id} className="space-y-3">
                                        {/* Section Header */}
                                        <div className={`flex items-center gap-3 p-3 rounded-md bg-gradient-to-r bg-orange-200/30 text-orange-600`}>
                                            <SectionIcon className="w-5 h-5" />
                                            <h3 className="font-semibold text-lg">{section.name}</h3>
                                            <Badge className="bg-white/20 text-orange-600 border-white/30">{sectionQuestions.length} questions</Badge>
                                        </div>

                                        {/* Section Questions */}
                                        <div className="grid gap-3">
                                            {sectionQuestions.map((question, index) => {
                                                const questionIndex = questions.findIndex((q) => q.id === question.id);
                                                const status = getQuestionStatus(question);

                                                return (
                                                    <Button
                                                        key={question.id}
                                                        variant="ghost"
                                                        onClick={() => handleQuestionSelect(questionIndex)}
                                                        className={`h-auto p-4 text-left justify-start border-2 rounded-xl transition-all hover:shadow-md ${getStatusColor(status)}`}
                                                    >
                                                        <div className="flex items-start gap-3 w-full">
                                                            {/* Question Number and Status */}
                                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                                <Badge variant="outline" className="font-semibold">
                                                                    Q{questionIndex + 1}
                                                                </Badge>
                                                                {getStatusIcon(status)}
                                                            </div>

                                                            {/* Question Details */}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <Badge
                                                                        className={`text-xs ${
                                                                            question.difficulty === "easy"
                                                                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                                                                : question.difficulty === "medium"
                                                                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                                                                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                                                        }`}
                                                                    >
                                                                        {question.difficulty}
                                                                    </Badge>
                                                                    <Badge variant="secondary" className="text-xs">
                                                                        {question.points} pts
                                                                    </Badge>
                                                                    <Badge variant="outline" className="text-xs">
                                                                        {question.type}
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{question.question}</p>
                                                            </div>
                                                        </div>
                                                    </Button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>

                    {/* Summary Statistics */}
                    <div className="mt-4 pt-4 border-t">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm font-medium">{Object.keys(answers).length} Answered</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Bookmark className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-medium">{markedForReview.size} Marked</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Circle className="w-4 h-4 text-gray-400" />
                                <span className="text-sm font-medium">{questions.length - Object.keys(answers).length} Remaining</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
