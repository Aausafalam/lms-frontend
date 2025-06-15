"use client";
import { useNavigation } from "@/components/navigation";
import { useParams } from "next/navigation";
import { Tag, Globe, BookOpen, Target, Clock, Award, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function QuestionCard({ data }) {
    const { navigate } = useNavigation();
    const { courseId } = useParams();

    const handleCardClick = () => {
        navigate(`/question-panel/details/${data.id}?courseId=${courseId}`);
    };

    // Helper function to get status color and styles
    const getStatusStyles = (status) => {
        switch (status?.toUpperCase()) {
            case "ACTIVE":
                return {
                    bg: "bg-emerald-50 border border-emerald-200",
                    text: "text-emerald-700",
                    dot: "bg-emerald-500",
                };
            case "DRAFT":
                return {
                    bg: "bg-amber-50 border border-amber-200",
                    text: "text-amber-700",
                    dot: "bg-amber-500",
                };
            case "INACTIVE":
                return {
                    bg: "bg-gray-50 border border-gray-200",
                    text: "text-gray-700",
                    dot: "bg-gray-500",
                };
            case "ARCHIVED":
                return {
                    bg: "bg-red-50 border border-red-200",
                    text: "text-red-700",
                    dot: "bg-red-500",
                };
            default:
                return {
                    bg: "bg-gray-50 border border-gray-200",
                    text: "text-gray-700",
                    dot: "bg-gray-500",
                };
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

    const statusStyles = getStatusStyles(data.status);

    return (
        <div
            className="group relative h-full overflow-hidden rounded-xl bg-white shadow-md border border-gray-200/60 transition-all duration-400 hover:shadow-2xl hover:shadow-orange-500/8 hover:border-orange-300/60 dark:bg-gray-900/95 dark:border-gray-800/60 dark:hover:border-orange-500/40 cursor-pointer backdrop-blur-sm"
            onClick={handleCardClick}
        >
            {/* Header Section */}
            <div className="relative p-3 pb-0">
                <div className="flex justify-between items-start mb-3">
                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${statusStyles.bg} ${statusStyles.text} transition-all duration-300`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${statusStyles.dot}`} />
                        <span className="capitalize">{data.status?.toLowerCase() || "draft"}</span>
                    </div>

                    {/* Question Type Badge */}
                    <Badge className={`text-xs ${getTypeColor(data.type)}`}>{data.type || "MCQ"}</Badge>
                </div>

                {/* Question Text Preview */}
                <div className="mb-3">
                    <p className="text-sm leading-tight text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300 line-clamp-3 min-h-8">
                        {data.text || "No question text provided"}
                    </p>
                </div>

                {/* Question ID */}
                {/* <div className="flex items-center gap-1 mb-2">
          <Target className="w-3 h-3 text-gray-500 dark:text-gray-400" />
          <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">
            {data.questionId || "Auto-generated"}
          </span>
        </div> */}
            </div>

            {/* Stats Section */}
            <div className="px-2 pb-2">
                <div className="p-2 rounded-lg bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/30 group-hover:from-gray-100 group-hover:to-slate-100 dark:group-hover:from-gray-800/70 dark:group-hover:to-slate-800/50 transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    {/* Main Details */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                                <BookOpen className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-900 dark:text-white capitalize">{data.category || "N/A"}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">Category</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                                <Award className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-900 dark:text-white">{data.points || 1} pts</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">Points</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                <Target className="w-3 h-3" />
                                Difficulty:
                            </span>
                            <Badge className={`text-xs ${getDifficultyColor(data.difficulty)}`}>{data.difficulty?.replace("_", " ") || "Easy"}</Badge>
                        </div>

                        {data.timeLimit && (
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Time:
                                </span>
                                <span className="font-medium text-gray-900 dark:text-white">{data.timeLimit}s</span>
                            </div>
                        )}

                        {data.language && (
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                    <Globe className="w-3 h-3" />
                                    Language:
                                </span>
                                <span className="font-medium text-gray-900 dark:text-white uppercase">{data.language}</span>
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    {data.tags && data.tags.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                            <div className="flex flex-wrap gap-1">
                                {data.tags.slice(0, 2).map((tag, index) => (
                                    <span key={index} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs bg-orange-50 text-orange-700 border border-orange-200">
                                        <Tag className="w-2.5 h-2.5" />
                                        {tag}
                                    </span>
                                ))}
                                {data.tags.length > 2 && <span className="text-xs text-gray-500 dark:text-gray-400">+{data.tags.length - 2} more</span>}
                            </div>
                        </div>
                    )}

                    {/* Public/Private Indicator */}
                    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Visibility:</span>
                            <div className="flex items-center gap-1">
                                {data.isPublic ? (
                                    <>
                                        <Eye className="w-3 h-3 text-green-600" />
                                        <span className="text-xs text-green-600 font-medium">Public</span>
                                    </>
                                ) : (
                                    <>
                                        <Eye className="w-3 h-3 text-gray-500" />
                                        <span className="text-xs text-gray-500 font-medium">Private</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
