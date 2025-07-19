"use client";
import { useState } from "react";
import { useNavigation } from "@/components/navigation";
import { useParams } from "next/navigation";
import { Tag, Globe, BookOpen, Target, Clock, Award, Eye, Star, Heart, Share2, User, Play, MoreVertical, Edit, Trash2, View } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQueryParams } from "@/lib/hooks/useQuery";
import Image from "next/image";

export default function QuestionCard({ data, view, onEdit, onDelete, onView }) {
    const { navigate } = useNavigation();
    const { examId } = useParams();
    const { courseId } = useQueryParams();
    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleCardClick = () => {
        if (onView) {
            onView(data);
        } else {
            navigate(`/questions/details/${data.id}?courseId=${courseId}&examId=${examId}`);
        }
    };

    const handleNameClick = (e) => {
        e.stopPropagation();
        handleCardClick();
    };

    const toggleFavorite = (e) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    const handleShare = (e) => {
        e.stopPropagation();
        // Handle share functionality
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        if (onEdit) onEdit(data);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (onDelete) onDelete(data);
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
    const isMobile = false; // You can implement mobile detection logic here

    // Table Row Layout
    if (view?.table) {
        return (
            <div className="w-full">
                <div
                    className={`grid ${
                        isMobile ? "grid-cols-1 gap-3 p-4" : "grid-cols-12 gap-4 px-4 py-3"
                    } border-b group relative w-full overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-gray-900 dark:hover:bg-gray-800/50 cursor-pointer border border-gray-200 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-600`}
                    onClick={handleCardClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isMobile ? (
                        // Mobile Layout
                        <>
                            {/* Question Info */}
                            <div className="flex items-start space-x-3">
                                <div className="relative h-16 w-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                    <BookOpen className="h-8 w-8 text-gray-400" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3
                                        className="hover:underline font-semibold text-sm text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 cursor-pointer"
                                        onClick={handleNameClick}
                                    >
                                        {data.text || "No question text provided"}
                                    </h3>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${statusStyles.bg} ${statusStyles.text}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${statusStyles.dot}`} />
                                            <span className="capitalize">{data.status?.toLowerCase() || "draft"}</span>
                                        </div>
                                        <Badge className={`text-xs ${getTypeColor(data.type)}`}>{data.type || "MCQ"}</Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Question Details */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Badge className={`text-xs ${getDifficultyColor(data.difficulty)}`}>{data.difficulty?.replace("_", " ") || "Easy"}</Badge>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">{data.language || "EN"}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Award className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{data.points || 1} pts</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{data.category || "General"}</p>
                            </div>

                            {/* Tags and Actions */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex flex-wrap gap-1">
                                    {data.tags?.slice(0, 2).map((tag, index) => (
                                        <span key={index} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs bg-orange-50 text-orange-700 border border-orange-200">
                                            <Tag className="w-2.5 h-2.5" />
                                            {tag}
                                        </span>
                                    ))}
                                    {data.tags?.length > 2 && <span className="text-xs text-gray-500 dark:text-gray-400">+{data.tags.length - 2}</span>}
                                </div>
                                <div className="flex space-x-1">
                                    <button
                                        onClick={toggleFavorite}
                                        className="rounded-full bg-gray-100 p-1 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    >
                                        <Heart className={`h-3 w-3 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="rounded-full bg-gray-100 p-1 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    >
                                        <Share2 className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        // Desktop Layout
                        <>
                            {/* Question Info */}
                            <div className="col-span-5 flex items-center space-x-3">
                                <div className="relative h-12 w-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                    <BookOpen className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3
                                        className="hover:underline font-semibold text-sm text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 cursor-pointer"
                                        onClick={handleNameClick}
                                    >
                                        {data.text || "No question text provided"}
                                    </h3>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${statusStyles.bg} ${statusStyles.text}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${statusStyles.dot}`} />
                                            <span className="capitalize">{data.status?.toLowerCase() || "draft"}</span>
                                        </div>
                                        <Badge className={`text-xs ${getTypeColor(data.type)}`}>{data.type || "MCQ"}</Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Category and Language */}
                            <div className="col-span-2 flex items-center">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{data.category || "General"}</p>
                                    <div className="flex items-center space-x-1">
                                        <Globe className="h-3 w-3 text-gray-500" />
                                        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">{data.language || "EN"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Difficulty and Points */}
                            <div className="col-span-2 flex items-center space-x-4">
                                <div className="space-y-1">
                                    <Badge className={`text-xs ${getDifficultyColor(data.difficulty)}`}>{data.difficulty?.replace("_", " ") || "Easy"}</Badge>
                                    <div className="flex items-center space-x-1">
                                        <Award className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{data.points || 1} pts</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tags and Visibility */}
                            <div className="col-span-2 flex items-center">
                                <div className="space-y-1">
                                    <div className="flex flex-wrap gap-1">
                                        {data.tags?.slice(0, 1).map((tag, index) => (
                                            <span key={index} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs bg-orange-50 text-orange-700 border border-orange-200">
                                                <Tag className="w-2.5 h-2.5" />
                                                {tag}
                                            </span>
                                        ))}
                                        {data.tags?.length > 1 && <span className="text-xs text-gray-500 dark:text-gray-400">+{data.tags.length - 1}</span>}
                                    </div>
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

                            {/* Actions */}
                            <div className="col-span-1 flex items-center justify-end space-x-2">
                                <div className="flex items-center space-x-1">
                                    <button
                                        onClick={toggleFavorite}
                                        className="rounded-full bg-gray-100 p-1 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    >
                                        <Heart className={`h-3 w-3 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="rounded-full bg-gray-100 p-1 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    >
                                        <Share2 className="h-3 w-3" />
                                    </button>
                                    {(onEdit || onDelete) && (
                                        <div className="relative">
                                            <button className="rounded-full bg-gray-100 p-1 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                                                <MoreVertical className="h-3 w-3" />
                                            </button>
                                            {isHovered && (
                                                <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                                                    {onEdit && (
                                                        <button
                                                            onClick={handleEdit}
                                                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                                        >
                                                            <Edit className="h-3 w-3" />
                                                            Edit
                                                        </button>
                                                    )}
                                                    {onView && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onView(data);
                                                            }}
                                                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                                        >
                                                            <View className="h-3 w-3" />
                                                            View
                                                        </button>
                                                    )}
                                                    {onDelete && (
                                                        <button
                                                            onClick={handleDelete}
                                                            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left"
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }

    // Card Layout (Default)
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
                    <p className="text-sm leading-tight text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300 line-clamp-2 h-9">
                        {data.text || "No question text provided"}
                    </p>
                </div>
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
