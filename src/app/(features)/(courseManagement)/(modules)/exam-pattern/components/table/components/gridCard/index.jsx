"use client";
import { useNavigation } from "@/components/navigation";
import { useParams } from "next/navigation";
import { BadgeCheck, Lock, Timer, ListChecks, Shield, Users, Eye, Download, AlertTriangle, CheckCircle, Clock, FileText } from "lucide-react";

export default function ExamCard({ data }) {
    const { navigate } = useNavigation();

    const handleCardClick = () => {
        navigate(`/exam-pattern/details/${data.id}`);
    };

    // Helper function to get status color
    const getStatusColor = (status) => {
        switch (status?.toUpperCase()) {
            case "ACTIVE":
                return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
            case "INACTIVE":
                return "bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300";
            case "DRAFT":
                return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
            default:
                return "bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300";
        }
    };

    // Helper function to get status icon
    const getStatusIcon = (status) => {
        switch (status?.toUpperCase()) {
            case "ACTIVE":
                return <CheckCircle className="w-3 h-3" />;
            case "INACTIVE":
                return <Clock className="w-3 h-3" />;
            case "DRAFT":
                return <FileText className="w-3 h-3" />;
            default:
                return <FileText className="w-3 h-3" />;
        }
    };

    return (
        <div
            className="group relative w-full h-[280px] overflow-hidden rounded-lg bg-white shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-orange-300 dark:bg-gray-800/90 dark:hover:bg-gray-800 dark:border-gray-700 dark:hover:border-orange-500 cursor-pointer flex flex-col"
            onClick={handleCardClick}
        >
            {/* Header Section */}
            <div className="relative p-4 flex flex-col flex-grow">
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.status)}`}>
                        {getStatusIcon(data.status)}
                        {data.status?.toLowerCase() || "draft"}
                    </span>
                    {data.securitySettings?.enableAIProctoring && (
                        <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-1 rounded-full text-xs">
                            <Shield className="w-3 h-3" /> AI Monitored
                        </span>
                    )}
                </div>

                {/* Exam Name */}
                <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200 line-clamp-2 mb-2">
                    {data.name || "Untitled Exam"}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 flex-grow">{data.description || "No description provided."}</p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <FileText className="w-3 h-3" />
                        <span>{data.sections?.length || 0} Sections</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Users className="w-3 h-3" />
                        <span>{data.accessControlSettings?.maxAttempts || 1} Attempts</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <BadgeCheck className="w-3 h-3" />
                        <span>{data.resultsSettings?.passingPercentage || 60}% Pass</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Timer className="w-3 h-3" />
                        <span>{data.resultsSettings?.showResultsImmediately ? "Instant" : "Delayed"}</span>
                    </div>
                </div>

                {/* Feature Tags */}
                <div className="flex gap-1 flex-wrap">
                    {data.shuffleQuestions && (
                        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 rounded text-xs">
                            <ListChecks className="w-3 h-3" /> Shuffled
                        </span>
                    )}

                    {data.securitySettings?.enableBrowserLockdown && (
                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 px-2 py-0.5 rounded text-xs">
                            <Lock className="w-3 h-3" /> Secure
                        </span>
                    )}

                    {data.resultsSettings?.enableResultsDownload && (
                        <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 px-2 py-0.5 rounded text-xs">
                            <Download className="w-3 h-3" /> Export
                        </span>
                    )}

                    {data.resultsSettings?.showCorrectAnswers && (
                        <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 px-2 py-0.5 rounded text-xs">
                            <Eye className="w-3 h-3" /> Answers
                        </span>
                    )}

                    {data.accessControlSettings?.enableAccessCode && (
                        <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 px-2 py-0.5 rounded text-xs">
                            <AlertTriangle className="w-3 h-3" /> Protected
                        </span>
                    )}
                </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
    );
}
