"use client";

import { HelpCircle, Tag, Globe, BookOpen, Target, Clock, Award, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ContentCard } from "@/components/contentCard";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

const devicePresets = {
    mobile: 400,
    tablet: 768,
    desktop: 1024,
};

/**
 * QuestionDetailPreview Component
 * Displays a comprehensive preview of the question data
 */
export function QuestionDetailPreview({ initialData, viewportWidth, onDetailsPage }) {
    const data = initialData || {};

    // Responsive breakpoint detection
    const isMobile = viewportWidth <= devicePresets.mobile;
    const isTablet = viewportWidth > devicePresets.mobile && viewportWidth <= devicePresets.tablet;
    const isDesktop = viewportWidth > devicePresets.tablet;

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case "very_easy":
                return "bg-green-100 text-green-800 border-green-200";
            case "easy":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "medium":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "hard":
                return "bg-orange-100 text-orange-800 border-orange-200";
            case "very_hard":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case "MCQ":
                return "bg-purple-100 text-purple-800 border-purple-200";
            case "TRUE_FALSE":
                return "bg-indigo-100 text-indigo-800 border-indigo-200";
            case "FILL_BLANKS":
                return "bg-teal-100 text-teal-800 border-teal-200";
            case "ESSAY":
                return "bg-pink-100 text-pink-800 border-pink-200";
            case "NUMERIC":
                return "bg-cyan-100 text-cyan-800 border-cyan-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const renderQuestionContent = () => {
        return (
            <div className="space-y-4">
                {/* Question Text */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Question</h3>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{data.text || "No question text provided"}</p>

                    {/* Question Image */}
                    {data.image && (
                        <div className="mt-4">
                            <img src={data.image || "/placeholder.svg"} alt="Question illustration" className="max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700" />
                        </div>
                    )}
                </div>

                {/* Answer Options based on question type */}
                {data.type === "MCQ" && data.options && (
                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">Answer Options</h4>
                        {data.options.map((option, index) => (
                            <div
                                key={option.id}
                                className={`p-3 rounded-lg border-2 transition-all ${
                                    option.isCorrect ? "border-green-500 bg-green-50 dark:bg-green-950/20" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold text-sm w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">{option.id.toUpperCase()}</span>
                                    <span className="text-gray-800 dark:text-gray-200">{option.text}</span>
                                    {option.isCorrect && <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {data.type === "TRUE_FALSE" && (
                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">Answer</h4>
                        <div className="flex gap-4">
                            <Button variant={data.answer?.value === true ? "default" : "outline"} className="pointer-events-none">
                                True {data.answer?.value === true && <CheckCircle className="h-4 w-4 ml-2" />}
                            </Button>
                            <Button variant={data.answer?.value === false ? "default" : "outline"} className="pointer-events-none">
                                False {data.answer?.value === false && <CheckCircle className="h-4 w-4 ml-2" />}
                            </Button>
                        </div>
                    </div>
                )}

                {data.type === "FILL_BLANKS" && data.answer && (
                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">Correct Answer</h4>
                        <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-700 rounded-lg">
                            <span className="font-medium text-green-800 dark:text-green-200">{data.answer.text}</span>
                            {data.answer.caseSensitive && <Badge className="ml-2 bg-blue-100 text-blue-800 border-blue-200">Case Sensitive</Badge>}
                        </div>
                    </div>
                )}

                {data.type === "NUMERIC" && data.answer && (
                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">Correct Answer</h4>
                        <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-700 rounded-lg">
                            <span className="font-medium text-green-800 dark:text-green-200">
                                {data.answer.value}
                                {data.answer.tolerance && ` (±${data.answer.tolerance})`}
                            </span>
                        </div>
                    </div>
                )}

                {data.type === "ESSAY" && data.answer && (
                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">Sample Answer / Rubric</h4>
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                            <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">{data.answer.sampleAnswer}</p>
                            {data.answer.maxWords && <Badge className="mt-2 bg-purple-100 text-purple-800 border-purple-200">Max Words: {data.answer.maxWords}</Badge>}
                        </div>
                    </div>
                )}

                {/* Explanation */}
                {data.explanation.text && (
                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">Explanation Text</h4>
                        <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-700 rounded-lg">
                            <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">{data.explanation?.text}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={`w-full ${onDetailsPage ? "max-w-[1225px]" : "max-h-[75vh] overflow-scroll p-2"}`}>
            {/* <Header
                isMobile={isMobile}
                data={data}
                className="mb-5"
                badges={[
                    {
                        key: "type",
                        label: data.type || "MCQ",
                        icon: HelpCircle,
                        className: getTypeColor(data.type),
                    },
                    {
                        key: "difficulty",
                        label: data.difficulty?.replace("_", " ") || "Easy",
                        icon: Target,
                        className: getDifficultyColor(data.difficulty),
                    },
                    data.points && {
                        key: "points",
                        label: `${data.points} pts`,
                        icon: Award,
                    },
                    data.timeLimit && {
                        key: "timeLimit",
                        label: `${data.timeLimit}s`,
                        icon: Clock,
                    },
                ].filter(Boolean)}
            /> */}

            {/* Main Question Preview */}
            <div className="space-y-6">{renderQuestionContent()}</div>

            {/* Content Section */}
            <div className={`p-0 mt-4 ${isDesktop ? "px-0" : ""}`}>
                <div className={isMobile || isTablet ? "space-y-6" : "grid grid-cols-3 gap-8"}>
                    <div className={isMobile || isTablet ? "space-y-6" : "col-span-2 space-y-6"}>
                        {/* Basic Details */}
                        <ContentCard title="Question Details" subTitle="Basic information about the question" Icon={BookOpen} headerColor="blue">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <Target className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Question ID</span>
                                        </div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{data.questionId || "Auto-generated"}</p>
                                    </div>

                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <BookOpen className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</span>
                                        </div>
                                        <p className="font-semibold text-gray-900 dark:text-white capitalize">{data.category || "Not set"}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <BookOpen className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</span>
                                        </div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{data.subject || "Not set"}</p>
                                    </div>

                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <Target className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Topic</span>
                                        </div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{data.topic || "Not set"}</p>
                                    </div>

                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <Globe className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Language</span>
                                        </div>
                                        <p className="font-semibold text-gray-900 dark:text-white uppercase">{data.language || "EN"}</p>
                                    </div>
                                </div>
                            </div>
                        </ContentCard>
                    </div>

                    {/* Sidebar */}
                    {isDesktop && (
                        <div className="space-y-6">
                            {/* Tags */}
                            {data.tags && data.tags.length > 0 && (
                                <ContentCard title="Tags" subTitle="Question categorization" Icon={Tag} headerColor="orange">
                                    <div className="flex flex-wrap gap-2">
                                        {data.tags.map((tag, index) => (
                                            <Badge key={index} variant="outline" className="text-xs capitalize">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </ContentCard>
                            )}

                            {/* Settings */}
                            <ContentCard title="Settings" subTitle="Question configuration" Icon={Target} headerColor="purple">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded border">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Public Question:</span>
                                        <Badge className={data.isPublic ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>{data.isPublic ? "Yes" : "No"}</Badge>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded border">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Partial Credit:</span>
                                        <Badge className={data.allowPartialCredit ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                                            {data.allowPartialCredit ? "Allowed" : "Not Allowed"}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded border">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                                        <Badge className={data.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>{data.status || "DRAFT"}</Badge>
                                    </div>
                                </div>
                            </ContentCard>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
