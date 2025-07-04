"use client";

import { Calendar, Clock, Globe, Tag, Code, BookOpen, CheckCircle, AlertTriangle, Layers, Timer, Award, Target, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ContentCard } from "@/components/contentCard";
import { Header } from "@/components/header";

const devicePresets = {
    mobile: 400,
    tablet: 768,
    desktop: 1024,
};

/**
 * ExamDetailPreview Component
 * Displays a comprehensive preview of the exam builder data
 */
export function ExamDetailPreview({ initialData, viewportWidth, onDetailsPage }) {
    const data = initialData || {};

    // Responsive breakpoint detection
    const isMobile = viewportWidth <= devicePresets.mobile;
    const isTablet = viewportWidth > devicePresets.mobile && viewportWidth <= devicePresets.tablet;
    const isDesktop = viewportWidth > devicePresets.tablet;

    // Format date and time for display
    const formatDateTime = (date, time) => {
        if (!date) return "Not set";
        const dateStr = new Date(date).toLocaleDateString();
        return time ? `${dateStr} at ${time}` : dateStr;
    };

    const totalQuestions = data.examPattern?.sections?.reduce((total, section) => total + (section.questionsCount || 0), 0) || 0;
    const totalMarks =
        data.examPattern?.sections?.reduce((total, section) => {
            return (
                total +
                (section.questionGroups?.reduce((sectionTotal, group) => {
                    const questionsInGroup = (group.range?.[1] || 0) - (group.range?.[0] || 0) + 1;
                    return sectionTotal + questionsInGroup * (group.marksPerQuestion || 0);
                }, 0) || 0)
            );
        }, 0) || 0;

    const totalAttemptQuestions = data.examPattern?.sections?.reduce((total, section) => total + (section.questionsToAttempt || 0), 0) || 0;
    const compulsorySections = data.examPattern?.sections?.filter((section) => section.isCompulsory).length || 0;

    return (
        <div className={`w-full ${onDetailsPage ? "max-w-[1225px]" : "max-h-[75vh] overflow-scroll"}`}>
            <Header
                data={data}
                className="mb-5"
                badges={[
                    {
                        key: "status",
                        label: data.isPublished ? "Published" : "Draft",
                        icon: data.isPublished ? CheckCircle : AlertTriangle,
                    },
                    data.examType && {
                        key: "examType",
                        label: data.examType,
                        icon: BookOpen,
                    },
                    data.durationInMinutes && {
                        key: "duration",
                        label: `${data.durationInMinutes} min`,
                        icon: Timer,
                    },
                ].filter(Boolean)}
            />

            {/* Hero Summary Card */}
            <div>
                <div className="relative z-10  space-y-6">
                    {/* Hero Summary Table */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                        {/* Table Header */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Exam Overview</h2>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Complete section-wise breakdown</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{data.durationInMinutes || 90}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Minutes</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">{totalQuestions}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Questions</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalMarks}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Marks</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Responsive Table Container */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600">Category</th>
                                        <th className="px-3 py-3 text-center font-semibold text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600">Total Q.</th>
                                        <th className="px-3 py-3 text-center font-semibold text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600">Question No.</th>
                                        <th className="px-3 py-3 text-center font-semibold text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600">No. Of Questions</th>
                                        <th className="px-3 py-3 text-center font-semibold text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600">+ Mark</th>
                                        <th className="px-3 py-3 text-center font-semibold text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600">- Mark</th>
                                        <th className="px-3 py-3 text-center font-semibold text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600">Total Marks</th>
                                        <th className="px-3 py-3 text-center font-semibold text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600">Passing Marks</th>
                                        <th className="px-3 py-3 text-center font-semibold text-gray-800 dark:text-gray-200">Max Att. Q.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.examPattern?.sections?.map((section, sectionIndex) => {
                                        const sectionTotalMarks =
                                            section.questionGroups?.reduce((total, group) => {
                                                const questionsInGroup = (group.range?.[1] || 0) - (group.range?.[0] || 0) + 1;
                                                return total + questionsInGroup * (group.marksPerQuestion || 0);
                                            }, 0) || 0;

                                        // Generate color for section name
                                        const sectionColors = [
                                            "text-green-600 dark:text-green-400",
                                            "text-pink-600 dark:text-pink-400",
                                            "text-purple-600 dark:text-purple-400",
                                            "text-blue-600 dark:text-blue-400",
                                            "text-orange-600 dark:text-orange-400",
                                            "text-teal-600 dark:text-teal-400",
                                            "text-indigo-600 dark:text-indigo-400",
                                            "text-red-600 dark:text-red-400",
                                        ];
                                        const sectionColor = sectionColors[sectionIndex % sectionColors.length];

                                        return (
                                            section.questionGroups?.map((group, groupIndex) => {
                                                const questionsInGroup = (group.range?.[1] || 0) - (group.range?.[0] || 0) + 1;
                                                const isFirstGroupInSection = groupIndex === 0;

                                                return (
                                                    <tr
                                                        key={`${sectionIndex}-${groupIndex}`}
                                                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                                    >
                                                        {isFirstGroupInSection && (
                                                            <td
                                                                className={`px-4 py-3 font-medium border-r border-gray-200 dark:border-gray-600 ${sectionColor}`}
                                                                rowSpan={section.questionGroups?.length || 1}
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <span className="font-semibold">{section.name}</span>
                                                                    {section.isCompulsory && (
                                                                        <Badge className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700 text-xs shadow-none">
                                                                            Compulsory
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        )}
                                                        {isFirstGroupInSection && (
                                                            <td
                                                                className="px-3 py-3 text-center font-semibold text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600"
                                                                rowSpan={section.questionGroups?.length || 1}
                                                            >
                                                                {section.questionsCount}
                                                            </td>
                                                        )}
                                                        <td className="px-3 py-3 text-center text-gray-600 dark:text-gray-400 border-r border-gray-200 dark:border-gray-600">
                                                            <div className="text-[0.8rem]">
                                                                {group.range?.[0]} to {group.range?.[1]}
                                                            </div>
                                                        </td>
                                                        <td className="px-3 py-3 text-center font-medium text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600">
                                                            {questionsInGroup}
                                                        </td>
                                                        <td className="px-3 py-3 text-center border-r border-gray-200 dark:border-gray-600">
                                                            <span className="inline-block bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700 px-2 py-1 rounded text-xs font-medium">
                                                                {group.marksPerQuestion}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 py-3 text-center border-r border-gray-200 dark:border-gray-600">
                                                            <span className="inline-block bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700 px-2 py-1 rounded text-xs font-medium">
                                                                {group.negativeMarks}
                                                            </span>
                                                        </td>
                                                        {isFirstGroupInSection && (
                                                            <td
                                                                className="px-3 py-3 text-center font-bold text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600"
                                                                rowSpan={section.questionGroups?.length || 1}
                                                            >
                                                                {sectionTotalMarks}
                                                            </td>
                                                        )}
                                                        {isFirstGroupInSection && (
                                                            <td
                                                                className="px-3 py-3 text-center font-bold text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600"
                                                                rowSpan={section.questionGroups?.length || 1}
                                                            >
                                                                {section?.passingMarks || "10"}
                                                            </td>
                                                        )}
                                                        {isFirstGroupInSection && (
                                                            <td className="px-3 py-3 text-center font-semibold text-gray-800 dark:text-gray-200" rowSpan={section.questionGroups?.length || 1}>
                                                                {section.questionsToAttempt}
                                                            </td>
                                                        )}
                                                    </tr>
                                                );
                                            }) || (
                                                <tr key={sectionIndex} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                    <td className={`px-4 py-3 font-medium border-r border-gray-200 dark:border-gray-600 ${sectionColor}`}>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="font-semibold">{section.name}</span>
                                                            {section.isCompulsory && (
                                                                <Badge className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700 text-xs">
                                                                    Compulsory
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-3 text-center font-semibold text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600">
                                                        {section.questionsCount}
                                                    </td>
                                                    <td className="px-3 py-3 text-center text-gray-600 dark:text-gray-400 border-r border-gray-200 dark:border-gray-600">-</td>
                                                    <td className="px-3 py-3 text-center font-medium text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600">-</td>
                                                    <td className="px-3 py-3 text-center border-r border-gray-200 dark:border-gray-600">-</td>
                                                    <td className="px-3 py-3 text-center border-r border-gray-200 dark:border-gray-600">-</td>
                                                    <td className="px-3 py-3 text-center font-bold text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600">
                                                        {sectionTotalMarks}
                                                    </td>
                                                    <td className="px-3 py-3 text-center font-semibold text-gray-800 dark:text-gray-200">{section.questionsToAttempt}</td>
                                                </tr>
                                            )
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer Summary */}
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 border-t border-gray-200 dark:border-gray-600">
                            <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}>
                                {/* Attempt Rules */}
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-2 flex items-center">
                                        <Target className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                                        Attempt Rules
                                    </h4>
                                    <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                        {data.attemptRules?.minSectionsToAttempt && <p>• Minimum {data.attemptRules.minSectionsToAttempt} sections required</p>}
                                        {data.attemptRules?.maxSectionsToAttempt && <p>• Maximum {data.attemptRules.maxSectionsToAttempt} sections allowed</p>}
                                        {compulsorySections > 0 && (
                                            <p>
                                                • {compulsorySections} compulsory section{compulsorySections > 1 ? "s" : ""}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Section Types */}
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-2 flex items-center">
                                        <Layers className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                                        Section Types
                                    </h4>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                            <span className="text-xs text-gray-600 dark:text-gray-400">Compulsory</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                                            <span className="text-xs text-gray-600 dark:text-gray-400">Optional</span>
                                        </div>
                                    </div>
                                    <Badge className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700 text-xs shadow-sm">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {data.durationInMinutes || 90} Minutes Test
                                    </Badge>
                                </div>

                                {/* Quick Stats */}
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-2 flex items-center">
                                        <BarChart3 className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                                        Quick Stats
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                                            <span className="text-xs text-gray-600 dark:text-gray-400">Avg. per Section:</span>
                                            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                                                {data.examPattern?.sections?.length ? Math.round(totalQuestions / data.examPattern?.sections.length) : 0} questions
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                                            <span className="text-xs text-gray-600 dark:text-gray-400">Time per Question:</span>
                                            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                                                {totalQuestions ? Math.round(((data.durationInMinutes || 90) / totalQuestions) * 100) / 100 : 0} min
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className={`p-4 ${isDesktop ? "px-0" : ""}`}>
                <div className={isMobile || isTablet ? "space-y-6" : "grid grid-cols-3 gap-8"}>
                    <div className={isMobile || isTablet ? "space-y-6" : "col-span-2 space-y-6"}></div>
                </div>
            </div>
        </div>
    );
}
