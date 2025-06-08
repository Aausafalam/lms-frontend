"use client";
import { useNavigation } from "@/components/navigation";
import { useParams } from "next/navigation";
import { BadgeCheck, Lock, Timer, ListChecks, Shield, Eye, Download, AlertTriangle, BookOpen } from "lucide-react";

export default function ExamCard({ data }) {
    const { navigate } = useNavigation();
    const { courseId } = useParams();
    const handleCardClick = () => {
        navigate(`/exam-pattern/details/${data.id}?courseId=${courseId}`);
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
            case "INACTIVE":
                return {
                    bg: "bg-gray-50 border border-gray-200",
                    text: "text-gray-700",
                    dot: "bg-gray-500",
                };
            case "DRAFT":
                return {
                    bg: "bg-amber-50 border border-amber-200",
                    text: "text-amber-700",
                    dot: "bg-amber-500",
                };
            default:
                return {
                    bg: "bg-gray-50 border border-gray-200",
                    text: "text-gray-700",
                    dot: "bg-gray-500",
                };
        }
    };

    const statusStyles = getStatusStyles(data.status);
    const totalQuestions = data.sections?.reduce((acc, section) => acc + (section.questions?.length || 0), 0) || 0;
    const hasSecurityFeatures = data.securitySettings?.enableBrowserLockdown || data.securitySettings?.enableAIProctoring;

    // Get top 3 most important features
    const getTopFeatures = () => {
        const features = [];
        if (data.shuffleQuestions) features.push({ icon: ListChecks, label: "Shuffled", bg: "bg-blue-50 border border-blue-200", text: "text-blue-700" });
        if (data.securitySettings?.enableBrowserLockdown) features.push({ icon: Lock, label: "Secure", bg: "bg-red-50 border border-red-200", text: "text-red-700" });
        if (data.resultsSettings?.enableResultsDownload) features.push({ icon: Download, label: "Export", bg: "bg-indigo-50 border border-indigo-200", text: "text-indigo-700" });
        if (data.resultsSettings?.showCorrectAnswers) features.push({ icon: Eye, label: "Answers", bg: "bg-teal-50 border border-teal-200", text: "text-teal-700" });
        if (data.accessControlSettings?.enableAccessCode) features.push({ icon: AlertTriangle, label: "Protected", bg: "bg-amber-50 border border-amber-200", text: "text-amber-700" });
        return features.slice(0, 2);
    };

    const topFeatures = getTopFeatures();

    return (
        <div
            className="group relative  h-full overflow-hidden rounded-xl bg-white shadow-md border border-gray-200/60 transition-all duration-400 hover:shadow-2xl hover:shadow-orange-500/8 hover:border-orange-300/60  dark:bg-gray-900/95 dark:border-gray-800/60 dark:hover:border-orange-500/40 cursor-pointer backdrop-blur-sm"
            onClick={handleCardClick}
        >
            {/* Header Section */}
            <div className="relative p-3 pb-0">
                <div className="flex justify-between items-start mb-3">
                    {/* Compact Status Badge */}
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${statusStyles.bg} ${statusStyles.text} transition-all duration-300`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${statusStyles.dot}`} />
                        <span className="capitalize">{data.status?.toLowerCase() || "draft"}</span>
                    </div>

                    {/* Security Badge */}
                    {hasSecurityFeatures && (
                        <div className="inline-flex items-center gap-1 bg-purple-50 border border-purple-200 text-purple-700 px-2 py-1 rounded-md text-xs font-medium">
                            <Shield className="w-3 h-3" />
                            <span>Secured</span>
                        </div>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold leading-tight text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300 mb-2 line-clamp-2">
                    {data.name || "Untitled Exam"}
                </h3>

                {/* Compact Description */}
                <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {data.description || "No description provided for this examination."}
                </p>
            </div>

            {/* Compact Stats Row */}
            <div className="px-2 pb-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/30 group-hover:from-gray-100 group-hover:to-slate-100 dark:group-hover:from-gray-800/70 dark:group-hover:to-slate-800/50 transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    {/* Questions & Duration */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                                <BookOpen className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{totalQuestions}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">Questions</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                                <Timer className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{data.accessControlSettings?.maxAttempts || 1}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">Attempts</p>
                            </div>
                        </div>
                    </div>

                    {/* Pass Rate */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-orange-50 border border-orange-200 text-orange-700">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        <span className="text-xs font-semibold">{data.resultsSettings?.passingPercentage || 60}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
