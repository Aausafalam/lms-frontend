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
 * ExamBuilderDetailPreview Component
 * Displays a comprehensive preview of the exam builder data
 */
export function ExamBuilderDetailPreview({ initialData, viewportWidth, onDetailsPage }) {
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
                    <div className={isMobile || isTablet ? "space-y-6" : "col-span-2 space-y-6"}>
                        {/* Basic Details */}
                        {/* <ContentCard title="Basic Information" subTitle="Essential exam details and configuration" Icon={BookOpen} headerColor="blue">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <Code className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Exam Code</span>
                                        </div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{data.examCode || "Not set"}</p>
                                    </div>

                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <BookOpen className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Exam Type</span>
                                        </div>
                                        <p className="font-semibold text-gray-900 dark:text-white capitalize">{data.examType || "Not set"}</p>
                                    </div>
                                </div>

                                {data.description && (
                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <BookOpen className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</span>
                                        </div>
                                        <p className="text-gray-900 dark:text-white">{data.description}</p>
                                    </div>
                                )}
                            </div>
                        </ContentCard> */}

                        {/* Schedule Information */}
                        {/* <ContentCard title="Schedule & Timing" subTitle="Exam timing and duration details" Icon={Calendar} headerColor="green">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <Calendar className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                                        <span className="text-sm font-medium text-green-800 dark:text-green-200">Start Date & Time</span>
                                    </div>
                                    <p className="font-semibold text-green-900 dark:text-green-100">{formatDateTime(data.startDate, data.startTime)}</p>
                                </div>

                                <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <Clock className="h-4 w-4 mr-2 text-red-600 dark:text-red-400" />
                                        <span className="text-sm font-medium text-red-800 dark:text-red-200">End Time</span>
                                    </div>
                                    <p className="font-semibold text-red-900 dark:text-red-100">{data.endTime || "Not set"}</p>
                                </div>

                                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <Timer className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                                        <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Duration</span>
                                    </div>
                                    <p className="font-semibold text-blue-900 dark:text-blue-100">{data.durationInMinutes ? `${data.durationInMinutes} minutes` : "Not set"}</p>
                                </div>

                                <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <Award className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                                        <span className="text-sm font-medium text-purple-800 dark:text-purple-200">Version</span>
                                    </div>
                                    <p className="font-semibold text-purple-900 dark:text-purple-100">{data.version || "1.0.0"}</p>
                                </div>
                            </div>
                        </ContentCard> */}

                        {/* Exam Pattern Preview */}
                        {/* {data.examPattern && (
                            <ContentCard title="Selected Exam Pattern" subTitle="Pattern configuration and structure" Icon={Layers} headerColor="purple">
                                <div className="space-y-4">
                                    <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-700">
                                        <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">{data.examPattern.name}</h4>
                                        <p className="text-sm text-purple-700 dark:text-purple-300 mb-3">{data.examPattern.description}</p>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{data.examPattern.sections?.length || 0}</div>
                                                <div className="text-xs text-purple-600 dark:text-purple-400">Sections</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                                    {data.examPattern.sections?.reduce((total, section) => total + (section.questionsCount || 0), 0) || 0}
                                                </div>
                                                <div className="text-xs text-purple-600 dark:text-purple-400">Questions</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                                    {data.examPattern.sections?.reduce((total, section) => {
                                                        return (
                                                            total +
                                                            (section.questionGroups?.reduce((sectionTotal, group) => {
                                                                const questionsInGroup = (group.range?.[1] || 0) - (group.range?.[0] || 0) + 1;
                                                                return sectionTotal + questionsInGroup * (group.marksPerQuestion || 0);
                                                            }, 0) || 0)
                                                        );
                                                    }, 0) || 0}
                                                </div>
                                                <div className="text-xs text-purple-600 dark:text-purple-400">Total Marks</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        <p>This pattern will be used as the structure for your exam. You can customize it further if needed.</p>
                                    </div>
                                </div>
                            </ContentCard>
                        )} */}
                    </div>

                    {/* Sidebar */}
                    {isDesktop && (
                        <div className="space-y-6">
                            {/* Language Options */}
                            {/* {data.languageOptions && data.languageOptions.length > 0 && (
                                <ContentCard title="Language Options" subTitle="Available exam languages" Icon={Globe} headerColor="teal">
                                    <div className="space-y-2">
                                        {data.languageOptions.map((language, index) => (
                                            <div key={index} className="flex items-center text-sm">
                                                <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                                <span className="text-gray-700 dark:text-gray-300 capitalize">{language}</span>
                                            </div>
                                        ))}
                                    </div>
                                </ContentCard>
                            )} */}

                            {/* Tags */}
                            {/* {data.tags && data.tags.length > 0 && (
                                <ContentCard title="Tags" subTitle="Exam categorization" Icon={Tag} headerColor="orange">
                                    <div className="flex flex-wrap gap-2">
                                        {data.tags.map((tag, index) => (
                                            <Badge key={index} variant="outline" className="text-xs capitalize">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </ContentCard>
                            )} */}

                            {/* Publication Status */}
                            {/* <ContentCard
                                title="Publication Status"
                                subTitle="Current exam status"
                                Icon={data.isPublished ? CheckCircle : AlertTriangle}
                                headerColor={data.isPublished ? "green" : "yellow"}
                            >
                                <div className={`p-3 rounded-lg ${data.isPublished ? "bg-green-50 dark:bg-green-950/20" : "bg-yellow-50 dark:bg-yellow-950/20"}`}>
                                    <div className="flex items-center">
                                        {data.isPublished ? (
                                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                                        ) : (
                                            <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mr-2" />
                                        )}
                                        <span className={`font-medium ${data.isPublished ? "text-green-800 dark:text-green-200" : "text-yellow-800 dark:text-yellow-200"}`}>
                                            {data.isPublished ? "Published" : "Draft"}
                                        </span>
                                    </div>
                                    <p className={`text-sm mt-1 ${data.isPublished ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-400"}`}>
                                        {data.isPublished ? "This exam is live and available to students" : "This exam is in draft mode and not yet published"}
                                    </p>
                                </div>
                            </ContentCard> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
