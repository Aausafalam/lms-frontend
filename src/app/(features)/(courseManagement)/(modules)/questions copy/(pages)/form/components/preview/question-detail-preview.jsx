"use client";

import { HelpCircle, Tag, Globe, BookOpen, Target, Clock, Award, CheckCircle, Sparkles, Star, Trophy, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ContentCard } from "@/components/contentCard";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

const devicePresets = {
    mobile: 400,
    tablet: 768,
    desktop: 1024,
};

/**
 * QuestionDetailPreviewOld Component
 * Displays a comprehensive preview of the question data with enhanced aesthetics
 */
export function QuestionDetailPreviewOld({ initialData, viewportWidth, onDetailsPage }) {
    const data = initialData || {};

    // Responsive breakpoint detection
    const isMobile = viewportWidth <= devicePresets.mobile;
    const isTablet = viewportWidth > devicePresets.mobile && viewportWidth <= devicePresets.tablet;
    const isDesktop = viewportWidth > devicePresets.tablet;

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case "very_easy":
                return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 shadow-green-100/50";
            case "easy":
                return "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200 shadow-blue-100/50";
            case "medium":
                return "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200 shadow-yellow-100/50";
            case "hard":
                return "bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border-orange-200 shadow-orange-100/50";
            case "very_hard":
                return "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200 shadow-red-100/50";
            default:
                return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200 shadow-gray-100/50";
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case "MCQ":
                return "bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200 shadow-purple-100/50";
            case "TRUE_FALSE":
                return "bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 border-indigo-200 shadow-indigo-100/50";
            case "FILL_BLANKS":
                return "bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 border-teal-200 shadow-teal-100/50";
            case "ESSAY":
                return "bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border-pink-200 shadow-pink-100/50";
            case "NUMERIC":
                return "bg-gradient-to-r from-cyan-100 to-sky-100 text-cyan-800 border-cyan-200 shadow-cyan-100/50";
            default:
                return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200 shadow-gray-100/50";
        }
    };

    const renderQuestionContent = () => {
        return (
            <div className="space-y-6">
                {/* Enhanced Question Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 border border-gray-200 dark:border-gray-700 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
                    <div className="relative p-6">
                        <div className="flex flex-wrap gap-3 mb-4">
                            <Badge className={`text-sm font-medium px-3 py-1 shadow-lg ${getTypeColor(data.type)}`}>
                                <HelpCircle className="h-4 w-4 mr-2" />
                                {data.type || "MCQ"}
                            </Badge>
                            <Badge className={`text-sm font-medium px-3 py-1 shadow-lg ${getDifficultyColor(data.difficulty)}`}>
                                <Target className="h-4 w-4 mr-2" />
                                {data.difficulty?.replace("_", " ") || "Easy"}
                            </Badge>
                            {data.points && (
                                <Badge className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200 shadow-amber-100/50 text-sm font-medium px-3 py-1 shadow-lg">
                                    <Trophy className="h-4 w-4 mr-2" />
                                    {data.points} pts
                                </Badge>
                            )}
                            {data.timeLimit && (
                                <Badge className="bg-gradient-to-r from-rose-100 to-pink-100 text-rose-800 border-rose-200 shadow-rose-100/50 text-sm font-medium px-3 py-1 shadow-lg">
                                    <Clock className="h-4 w-4 mr-2" />
                                    {data.timeLimit}s
                                </Badge>
                            )}
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-blue-500" />
                                Question
                            </h3>
                            <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-medium">{data.text || "No question text provided"}</p>
                        </div>

                        {data.image && (
                            <div className="mb-6">
                                <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-lg">
                                    <img src={data.image || "/placeholder.svg"} alt="Question illustration" className="w-full h-auto transition-transform duration-300 hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Enhanced Answer Options */}
                {data.type === "MCQ" && data.options && (
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            Answer Options
                        </h4>
                        <div className="grid gap-3">
                            {data.options.map((option, index) => (
                                <div
                                    key={option.id}
                                    className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                                        option.isCorrect
                                            ? "border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 shadow-green-100/50"
                                            : "border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:border-blue-300 dark:hover:border-blue-600"
                                    }`}
                                >
                                    {option.isCorrect && <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-green-500"></div>}
                                    <div className="p-4">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all ${
                                                    option.isCorrect
                                                        ? "bg-green-500 text-white shadow-lg"
                                                        : "bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 border-2 border-blue-200 dark:border-blue-700"
                                                }`}
                                            >
                                                {option.id.toUpperCase()}
                                            </div>
                                            <span className="text-gray-800 dark:text-gray-200 font-medium flex-1">{option.text}</span>
                                            {option.isCorrect && (
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                                    <Badge className="bg-green-100 text-green-800 border-green-200">Correct</Badge>
                                                </div>
                                            )}
                                        </div>
                                        {option.image && (
                                            <div className="mt-3 ml-14">
                                                <img
                                                    src={option.image || "/placeholder.svg"}
                                                    alt={`Option ${option.id.toUpperCase()}`}
                                                    className="max-w-xs h-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Enhanced True/False Display */}
                {data.type === "TRUE_FALSE" && (
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            Correct Answer
                        </h4>
                        <div className="flex gap-4">
                            <Button
                                variant={data.answer?.value === true ? "default" : "outline"}
                                className={`pointer-events-none transition-all ${data.answer?.value === true ? "bg-green-500 hover:bg-green-600 shadow-lg shadow-green-200" : "opacity-60"}`}
                                size="lg"
                            >
                                True
                                {data.answer?.value === true && <CheckCircle className="h-4 w-4 ml-2" />}
                            </Button>
                            <Button
                                variant={data.answer?.value === false ? "default" : "outline"}
                                className={`pointer-events-none transition-all ${data.answer?.value === false ? "bg-green-500 hover:bg-green-600 shadow-lg shadow-green-200" : "opacity-60"}`}
                                size="lg"
                            >
                                False
                                {data.answer?.value === false && <CheckCircle className="h-4 w-4 ml-2" />}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Enhanced Fill in the Blanks Display */}
                {data.type === "FILL_BLANKS" && data.answer && (
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            Correct Answer
                        </h4>
                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-200 dark:border-green-700 rounded-xl shadow-lg">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                                <span className="font-bold text-green-800 dark:text-green-200 text-lg">{data.answer.text}</span>
                                {data.answer.caseSensitive && <Badge className="bg-blue-100 text-blue-800 border-blue-200">Case Sensitive</Badge>}
                            </div>
                        </div>
                    </div>
                )}

                {/* Enhanced Numeric Answer Display */}
                {data.type === "NUMERIC" && data.answer && (
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            Correct Answer
                        </h4>
                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-200 dark:border-green-700 rounded-xl shadow-lg">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                                <span className="font-bold text-green-800 dark:text-green-200 text-lg">
                                    {data.answer.value}
                                    {data.answer.tolerance && <span className="text-sm font-normal ml-2">(±{data.answer.tolerance})</span>}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Enhanced Essay Answer Display */}
                {data.type === "ESSAY" && data.answer && (
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            Sample Answer / Rubric
                        </h4>
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-blue-200 dark:border-blue-700 rounded-xl shadow-lg">
                            <p className="text-blue-800 dark:text-blue-200 leading-relaxed">{data.answer.sampleAnswer}</p>
                            {data.answer.maxWords && <Badge className="mt-3 bg-purple-100 text-purple-800 border-purple-200">Max Words: {data.answer.maxWords}</Badge>}
                        </div>
                    </div>
                )}

                {/* Enhanced Explanation */}
                {data.explanation?.text && (
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-amber-500" />
                            Explanation
                        </h4>
                        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-2 border-amber-200 dark:border-amber-700 rounded-xl shadow-lg">
                            <p className="text-amber-800 dark:text-amber-200 leading-relaxed">{data.explanation.text}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    };
    const customBadges = [
        {
            key: "MCQ",
            label: data.type || "MCQ",
            variant: "outline",
            icon: HelpCircle,
            className: `text-sm font-medium px-3 py-1 shadow-lg ${getTypeColor(data.type)}`,
        },
        {
            key: "MCQ",
            label: data.difficulty?.replace("_", " ") || "Easy",
            variant: "outline",
            icon: Target,
            className: `text-sm font-medium px-3 py-1 shadow-lg ${getDifficultyColor(data.difficulty)}`,
        },
    ];

    const handleBack = () => console.log("Back clicked");
    const handleEdit = () => console.log("Edit clicked");
    const handleDuplicate = () => console.log("Duplicate clicked");
    const handleDelete = () => console.log("Delete clicked");

    return (
        <div className={`w-full ${onDetailsPage ? "max-w-[1225px]" : "max-h-[75vh] overflow-scroll p-2"}`}>
            <Header isMobile={isMobile} badges={customBadges} onBack={handleBack} onEdit={handleEdit} onDuplicate={handleDuplicate} onDelete={handleDelete} data={{ ...data, number: "Lesson 1" }} />
            {/* Main Question Preview */}
            <div className="space-y-8">{renderQuestionContent()}</div>

            {/* Enhanced Content Section */}
            <div className={`p-0 mt-8 ${isDesktop ? "px-0" : ""}`}>
                <div className={isMobile || isTablet ? "space-y-8" : "grid grid-cols-3 gap-8"}>
                    <div className={isMobile || isTablet ? "space-y-8" : "col-span-2 space-y-8"}>
                        {/* Enhanced Basic Details */}
                        <ContentCard
                            title="Question Details"
                            subTitle="Comprehensive information about this question"
                            Icon={BookOpen}
                            headerColor="blue"
                            className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/30"
                        >
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800 dark:to-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                        <div className="flex items-center mb-3">
                                            <Target className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Question ID</span>
                                        </div>
                                        <p className="font-bold text-gray-900 dark:text-white text-lg">{data.questionId || "Auto-generated"}</p>
                                    </div>

                                    <div className="p-4 bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800 dark:to-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                        <div className="flex items-center mb-3">
                                            <BookOpen className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category</span>
                                        </div>
                                        <p className="font-bold text-gray-900 dark:text-white text-lg capitalize">{data.category || "Not set"}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl border border-purple-200 dark:border-purple-700 shadow-sm">
                                        <div className="flex items-center mb-3">
                                            <BookOpen className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                                            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Subject</span>
                                        </div>
                                        <p className="font-bold text-purple-900 dark:text-purple-100">{data.subject || "Not set"}</p>
                                    </div>

                                    <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 rounded-xl border border-orange-200 dark:border-orange-700 shadow-sm">
                                        <div className="flex items-center mb-3">
                                            <Target className="h-5 w-5 mr-2 text-orange-600 dark:text-orange-400" />
                                            <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">Topic</span>
                                        </div>
                                        <p className="font-bold text-orange-900 dark:text-orange-100">{data.topic || "Not set"}</p>
                                    </div>

                                    <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-xl border border-cyan-200 dark:border-cyan-700 shadow-sm">
                                        <div className="flex items-center mb-3">
                                            <Globe className="h-5 w-5 mr-2 text-cyan-600 dark:text-cyan-400" />
                                            <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">Language</span>
                                        </div>
                                        <p className="font-bold text-cyan-900 dark:text-cyan-100 uppercase">{data.language || "EN"}</p>
                                    </div>
                                </div>
                            </div>
                        </ContentCard>
                    </div>

                    {/* Enhanced Sidebar */}
                    {isDesktop && (
                        <div className="space-y-6">
                            {/* Enhanced Tags */}
                            {data.tags && data.tags.length > 0 && (
                                <ContentCard
                                    title="Tags"
                                    subTitle="Question categorization"
                                    Icon={Tag}
                                    headerColor="orange"
                                    className="shadow-lg border-0 bg-gradient-to-br from-white to-orange-50/30 dark:from-gray-900 dark:to-orange-950/30"
                                >
                                    <div className="flex flex-wrap gap-2">
                                        {data.tags.map((tag, index) => (
                                            <Badge
                                                key={index}
                                                variant="outline"
                                                className="text-xs capitalize bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200 shadow-sm hover:shadow-md transition-all"
                                            >
                                                <Tag className="h-3 w-3 mr-1" />
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </ContentCard>
                            )}

                            {/* Enhanced Settings */}
                            <ContentCard
                                title="Settings"
                                subTitle="Question configuration"
                                Icon={Target}
                                headerColor="purple"
                                className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-900 dark:to-purple-950/30"
                            >
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                            {data.isPublic ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                            Public Question:
                                        </span>
                                        <Badge className={`shadow-sm ${data.isPublic ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-800 border-gray-200"}`}>
                                            {data.isPublic ? "Yes" : "No"}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                            <Award className="h-4 w-4" />
                                            Partial Credit:
                                        </span>
                                        <Badge className={`shadow-sm ${data.allowPartialCredit ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-800 border-gray-200"}`}>
                                            {data.allowPartialCredit ? "Allowed" : "Not Allowed"}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                            <Target className="h-4 w-4" />
                                            Status:
                                        </span>
                                        <Badge className={`shadow-sm ${data.status === "ACTIVE" ? "bg-green-100 text-green-800 border-green-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"}`}>
                                            {data.status || "DRAFT"}
                                        </Badge>
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
