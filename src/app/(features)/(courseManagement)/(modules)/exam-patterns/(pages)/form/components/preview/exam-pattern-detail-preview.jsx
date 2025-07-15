"use client";

import { useEffect, useState } from "react";
import { Layers, CheckCircle, AlertTriangle, Settings, Timer, Award, Target, BookOpen, TrendingUp, Shield, Bell, BarChart3, Clock, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useExamPattern } from "@/services/context/exam-pattern";
import { useParams } from "next/navigation";
import { ContentCard } from "@/components/contentCard";
import { useInstructorList } from "@/services/hooks/instructor";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { Header } from "@/components/header";
import { useNavigation } from "@/components/navigation";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Enhanced ExamPattern Detail Preview Component
 * Renders a premium, responsive examPattern preview with modular components
 */

export function ExamPatternDetailPreview({ initialData, onDetailsPage, viewPort }) {
    const [selectedSection, setSelectedSection] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(1024);
    const { examPatternId } = useParams();
    const { courseId } = useQueryParams();
    const { examPatternDetails } = useExamPattern();
    const { instructorList } = useInstructorList();
    const data = onDetailsPage ? { ...examPatternDetails.data?.data, instructorIds: examPatternDetails.data?.data?.instructors?.map((item) => item.id) } : initialData;
    const { navigate } = useNavigation();
    // Responsive breakpoints
    useEffect(() => {
        const updateViewport = () => {
            setViewportWidth(window.innerWidth);
        };

        updateViewport();
        window.addEventListener("resize", updateViewport);
        return () => window.removeEventListener("resize", updateViewport);
    }, []);

    // Determine device type based on viewport width
    const isMobile = viewPort ? viewPort === "mobile" : viewportWidth <= 768;

    const isTablet = viewPort ? viewPort === "tablet" : viewportWidth > 768 && viewportWidth <= 1024;

    const isDesktop = viewPort ? viewPort === "desktop" : viewportWidth > 1024;

    useEffect(() => {
        onDetailsPage && examPatternDetails.fetch?.({ dynamicRoute: `/${courseId}/exam-pattern/${examPatternId}` });
        instructorList.fetch?.({ params: { responseType: "dropdown" } });
    }, [examPatternId]);

    if (onDetailsPage && examPatternDetails.isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner size="lg" />
                <span className="ml-2">Loading examPattern data...</span>
            </div>
        );
    }

    if (onDetailsPage && examPatternDetails.error) {
        return (
            <ErrorMessage
                title="Failed to load exam pattern"
                message={examPatternDetails.error || "Unable to fetch exam pattern data"}
                onRetry={() => examPatternDetails.fetch({ dynamicRoute: examPatternId })}
            />
        );
    }

    if (onDetailsPage && !examPatternDetails.data?.data) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Exam Pattern data not found</p>
            </div>
        );
    }
    const customBadges = [
        {
            key: "category",
            label: "Science",
            variant: "outline",
            className: "bg-blue-50 text-blue-700 border-blue-200",
        },
    ];
    const handleBack = () => navigate(`/courses/details/${courseId}`);
    const handleEdit = () => navigate(`/exam-patterns/form/${params.examPatternDetails}?courseId=${courseId}`);
    const handleDuplicate = () => console.log("Duplicate clicked");
    const handleDelete = () => console.log("Delete clicked");

    // Calculate exam statistics
    const totalQuestions = data.sections?.reduce((total, section) => total + (section.questionsCount || 0), 0) || 0;
    const totalMarks =
        data.sections?.reduce((total, section) => {
            return (
                total +
                (section.questionGroups?.reduce((sectionTotal, group) => {
                    const questionsInGroup = (group.range?.[1] || 0) - (group.range?.[0] || 0) + 1;
                    return sectionTotal + questionsInGroup * (group.marksPerQuestion || 0);
                }, 0) || 0)
            );
        }, 0) || 0;

    const totalAttemptQuestions = data.sections?.reduce((total, section) => total + (section.questionsToAttempt || 0), 0) || 0;
    const compulsorySections = data.sections?.filter((section) => section.isCompulsory).length || 0;

    return (
        <div className={`w-full ${(isTablet || isMobile) && !viewPort ? "" : onDetailsPage ? "max-h-[86vh] overflow-scroll" : "max-h-[75vh] overflow-scroll"} max-w-[1200px]`}>
            <Header
                isMobile={isMobile}
                data={{ ...data, number: "Exam Pattern 1" }}
                badges={customBadges}
                onBack={handleBack}
                onEdit={handleEdit}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
            />

            {/* Hero-Styled Exam Pattern Summary */}
            <div className="mt-2">
                <div className="relative z-10  space-y-6">
                    {/* Hero Summary Table */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                        {/* Table Header */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Exam Pattern Overview</h2>
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
                                    {data.sections?.map((section, sectionIndex) => {
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
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 border-t border-gray-200 dark:border-gray-600">
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
                                                {data.sections?.length ? Math.round(totalQuestions / data.sections.length) : 0} questions
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

            {/* Content Section with Standard Theme */}
            <div className={`p-4 ${isDesktop ? "px-0" : ""}`}>
                <div className={isMobile || isTablet ? "space-y-6" : "grid grid-cols-3 gap-8"}>
                    <div className={isMobile || isTablet ? "space-y-6" : "col-span-2 space-y-6"}>
                        {/* Sections */}
                        <ContentCard title="Exam Sections" subTitle="Detailed breakdown of all exam sections with question distribution and marking scheme" Icon={Layers} headerColor="purple">
                            <div className="space-y-4">
                                {data.sections?.map((section, index) => (
                                    <div
                                        key={section.sectionId || index}
                                        className={`p-4 rounded-lg border transition-all cursor-pointer ${
                                            selectedSection === index
                                                ? "border-purple-300 bg-purple-50 dark:bg-purple-950/20 shadow-md"
                                                : "border-gray-200 dark:border-gray-700 hover:border-purple-300 hover:shadow-sm"
                                        }`}
                                        onClick={() => setSelectedSection(index)}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center">
                                                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-2 rounded-full mr-3">
                                                    <BookOpen className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">{section.name || `Section ${index + 1}`}</h3>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                        {section.sectionId} • {section.subjectTag}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {section.isCompulsory && (
                                                    <Badge className="bg-red-100 text-red-700 border-red-200 text-xs shadow-none">
                                                        <AlertTriangle className="h-3 w-3 mr-1" />
                                                        Compulsory
                                                    </Badge>
                                                )}
                                                {section.sectionTimeLimit && (
                                                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs shadow-none">
                                                        <Timer className="h-3 w-3 mr-1" />
                                                        {section.sectionTimeLimit}m
                                                    </Badge>
                                                )}
                                                {section.shuffleQuestions && (
                                                    <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs shadow-none">
                                                        <Settings className="h-3 w-3 mr-1" />
                                                        Shuffled
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-4 text-sm">
                                            <div className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                                                <p className="text-gray-600 dark:text-gray-400 text-xs">Questions</p>
                                                <p className="font-bold text-gray-800 dark:text-gray-200">{section.questionsCount}</p>
                                            </div>
                                            <div className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                                                <p className="text-gray-600 dark:text-gray-400 text-xs">To Attempt</p>
                                                <p className="font-bold text-gray-800 dark:text-gray-200">{section.questionsToAttempt}</p>
                                            </div>
                                            <div className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                                                <p className="text-gray-600 dark:text-gray-400 text-xs">Groups</p>
                                                <p className="font-bold text-gray-800 dark:text-gray-200">{section.questionGroups?.length || 0}</p>
                                            </div>
                                            <div className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                                                <p className="text-gray-600 dark:text-gray-400 text-xs">Passing Marks</p>
                                                <p className="font-bold text-gray-800 dark:text-gray-200">{section.passingMarks || "N/A"}</p>
                                            </div>
                                        </div>

                                        {/* Question Groups Details */}
                                        {selectedSection === index && section.questionGroups && (
                                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                                                    <TrendingUp className="h-4 w-4 mr-2" />
                                                    Question Groups
                                                </h4>
                                                <div className="grid gap-3">
                                                    {section.questionGroups.map((group, groupIndex) => (
                                                        <div
                                                            key={groupIndex}
                                                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                                                        >
                                                            <div>
                                                                <p className="font-medium text-sm text-gray-800 dark:text-gray-200">
                                                                    Questions {group.range?.[0]} - {group.range?.[1]}
                                                                </p>
                                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                                    {group.questionType} • {(group.range?.[1] || 0) - (group.range?.[0] || 0) + 1} questions
                                                                </p>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="flex items-center space-x-2">
                                                                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">+{group.marksPerQuestion}</div>
                                                                    <div className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">-{group.negativeMarks}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </ContentCard>

                        {/* Global Settings */}
                        {data.globalMarkingPolicy && (
                            <ContentCard title="Global Marking Scheme" subTitle="Default marking policy applied across all sections unless overridden" headerColor="green" Icon={Award}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-700">
                                        <div>
                                            <span className="text-sm font-medium text-green-800 dark:text-green-200">Correct Answer</span>
                                            <p className="text-xs text-green-600 dark:text-green-400">Default marks</p>
                                        </div>
                                        <span className="text-green-600 font-bold text-xl">+{data.globalMarkingPolicy.defaultCorrectMark}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-700">
                                        <div>
                                            <span className="text-sm font-medium text-red-800 dark:text-red-200">Wrong Answer</span>
                                            <p className="text-xs text-red-600 dark:text-red-400">Negative marks</p>
                                        </div>
                                        <span className="text-red-600 font-bold text-xl">-{data.globalMarkingPolicy.defaultNegativeMark}</span>
                                    </div>
                                </div>
                            </ContentCard>
                        )}

                        {/* Security Settings */}
                        {data.securitySettings && (
                            <ContentCard title="Security & Proctoring" subTitle="Advanced security measures to ensure exam integrity and prevent malpractice" headerColor="red" Icon={Shield}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">Browser Security</h4>
                                        <div className="space-y-2">
                                            {data.securitySettings.enableBrowserLockdown && (
                                                <div className="flex items-center text-xs">
                                                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                                    <span className="text-gray-700 dark:text-gray-300">Browser lockdown enabled</span>
                                                </div>
                                            )}
                                            {data.securitySettings.disableRightClick && (
                                                <div className="flex items-center text-xs">
                                                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                                    <span className="text-gray-700 dark:text-gray-300">Right-click disabled</span>
                                                </div>
                                            )}
                                            {data.securitySettings.disableCopyPaste && (
                                                <div className="flex items-center text-xs">
                                                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                                    <span className="text-gray-700 dark:text-gray-300">Copy-paste disabled</span>
                                                </div>
                                            )}
                                            {data.securitySettings.enableFullScreenMode && (
                                                <div className="flex items-center text-xs">
                                                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                                    <span className="text-gray-700 dark:text-gray-300">Full-screen mode required</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">Monitoring</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-700 dark:text-gray-300">Max tab switches</span>
                                                <span className="font-medium text-gray-900 dark:text-gray-100">{data.securitySettings.maxTabSwitches}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-700 dark:text-gray-300">Suspicious activity threshold</span>
                                                <span className="font-medium text-gray-900 dark:text-gray-100">{data.securitySettings.suspiciousActivityThreshold}</span>
                                            </div>
                                            {data.securitySettings.allowedBrowsers && (
                                                <div className="text-xs">
                                                    <span className="text-gray-700 dark:text-gray-300">Allowed browsers: </span>
                                                    <span className="font-medium text-gray-900 dark:text-gray-100">{data.securitySettings.allowedBrowsers.join(", ")}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </ContentCard>
                        )}

                        {/* Results & Analytics */}
                        {data.resultsSettings && (
                            <ContentCard title="Results & Analytics" subTitle="Comprehensive result analysis and performance tracking for detailed insights" headerColor="blue" Icon={BarChart3}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">Result Display</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                                                <span className="text-sm text-blue-800 dark:text-blue-200">Passing Percentage</span>
                                                <span className="font-bold text-blue-600 dark:text-blue-400">{data.resultsSettings.passingPercentage}%</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                <span className="text-sm text-gray-700 dark:text-gray-300">Result Visibility Delay</span>
                                                <span className="font-medium text-gray-900 dark:text-gray-100">{data.resultsSettings.resultVisibilityDelay}h</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">Features</h4>
                                        <div className="space-y-2">
                                            {data.resultsSettings.showCorrectAnswers && (
                                                <div className="flex items-center text-xs">
                                                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                                    <span className="text-gray-700 dark:text-gray-300">Show correct answers</span>
                                                </div>
                                            )}
                                            {data.resultsSettings.showDetailedAnalysis && (
                                                <div className="flex items-center text-xs">
                                                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                                    <span className="text-gray-700 dark:text-gray-300">Detailed performance analysis</span>
                                                </div>
                                            )}
                                            {data.resultsSettings.showRanking && (
                                                <div className="flex items-center text-xs">
                                                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                                    <span className="text-gray-700 dark:text-gray-300">Ranking & leaderboard</span>
                                                </div>
                                            )}
                                            {data.resultsSettings.enableCertificateGeneration && (
                                                <div className="flex items-center text-xs">
                                                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                                    <span className="text-gray-700 dark:text-gray-300">Certificate generation</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </ContentCard>
                        )}
                    </div>

                    {/* Sidebar */}
                    {isDesktop && (
                        <div className="space-y-6">
                            {/* Exam Rules */}
                            <ContentCard title="Exam Rules" subTitle="Navigation and attempt guidelines" Icon={Settings} headerColor="orange">
                                <div className="space-y-3">
                                    {data.attemptRules?.allowSectionNavigation && (
                                        <div className="flex items-center text-xs">
                                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                            <span className="text-gray-700 dark:text-gray-300">Section navigation allowed</span>
                                        </div>
                                    )}
                                    {data.attemptRules?.allowBackNavigation && (
                                        <div className="flex items-center text-xs">
                                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                            <span className="text-gray-700 dark:text-gray-300">Back navigation allowed</span>
                                        </div>
                                    )}
                                    {data.attemptRules?.allowQuestionNavigation && (
                                        <div className="flex items-center text-xs">
                                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                            <span className="text-gray-700 dark:text-gray-300">Question navigation allowed</span>
                                        </div>
                                    )}
                                    {data.shuffleQuestions && (
                                        <div className="flex items-center text-xs">
                                            <AlertTriangle className="h-3 w-3 text-yellow-500 mr-2" />
                                            <span className="text-gray-700 dark:text-gray-300">Questions will be shuffled</span>
                                        </div>
                                    )}
                                    {data.shuffleSections && (
                                        <div className="flex items-center text-xs">
                                            <AlertTriangle className="h-3 w-3 text-yellow-500 mr-2" />
                                            <span className="text-gray-700 dark:text-gray-300">Sections will be shuffled</span>
                                        </div>
                                    )}
                                </div>
                            </ContentCard>

                            {/* Quick Stats */}
                            <ContentCard title="Quick Stats" subTitle="Key performance metrics" Icon={TrendingUp} headerColor="teal">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Avg. per Section:</span>
                                        <span className="font-medium text-gray-900 dark:text-gray-100">{data.sections?.length ? Math.round(totalQuestions / data.sections.length) : 0} questions</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Marks per Question:</span>
                                        <span className="font-medium text-gray-900 dark:text-gray-100">{totalQuestions ? Math.round((totalMarks / totalQuestions) * 100) / 100 : 0} avg</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Time per Question:</span>
                                        <span className="font-medium text-gray-900 dark:text-gray-100">
                                            {totalQuestions ? Math.round(((data.durationInMinutes || 90) / totalQuestions) * 100) / 100 : 0} min
                                        </span>
                                    </div>
                                </div>
                            </ContentCard>

                            {/* Exam Duration */}
                            <ContentCard title="Time Management" subTitle="Duration and timing details" Icon={Clock} headerColor="indigo">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg">
                                        <div>
                                            <span className="text-sm font-medium text-indigo-800 dark:text-indigo-200">Total Duration</span>
                                            <p className="text-xs text-indigo-600 dark:text-indigo-400">Exam time limit</p>
                                        </div>
                                        <span className="text-indigo-600 font-bold text-lg">{data.durationInMinutes || 90} min</span>
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                        <p>• Auto-submit when time ends</p>
                                        <p>• Timer visible throughout exam</p>
                                        <p>• Section-wise time limits may apply</p>
                                    </div>
                                </div>
                            </ContentCard>

                            {/* Access Control */}
                            {data.accessControlSettings && (
                                <ContentCard title="Access Control" subTitle="Entry requirements and restrictions" Icon={Lock} headerColor="violet">
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Max Attempts:</span>
                                            <span className="font-medium text-gray-900 dark:text-gray-100">{data.accessControlSettings.maxAttempts}</span>
                                        </div>
                                        {data.accessControlSettings.enableAccessCode && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">Access Code:</span>
                                                <span className="font-medium text-gray-900 dark:text-gray-100">Required</span>
                                            </div>
                                        )}
                                        {data.accessControlSettings.allowedUserGroups && (
                                            <div className="text-xs">
                                                <span className="text-gray-600 dark:text-gray-400">Allowed Groups:</span>
                                                <div className="mt-1 space-y-1">
                                                    {data.accessControlSettings.allowedUserGroups.map((group, index) => (
                                                        <Badge key={index} variant="outline" className="text-xs mr-1">
                                                            {group.replace("_", " ")}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </ContentCard>
                            )}

                            {/* Notifications */}
                            {data.notificationSettings && (
                                <ContentCard title="Notifications" subTitle="Communication and alerts setup" Icon={Bell} headerColor="yellow">
                                    <div className="space-y-2">
                                        {data.notificationSettings.enableEmailNotifications && (
                                            <div className="flex items-center text-xs">
                                                <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                                <span className="text-gray-700 dark:text-gray-300">Email notifications</span>
                                            </div>
                                        )}
                                        {data.notificationSettings.enableSMSNotifications && (
                                            <div className="flex items-center text-xs">
                                                <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                                <span className="text-gray-700 dark:text-gray-300">SMS notifications</span>
                                            </div>
                                        )}
                                        {data.notificationSettings.sendExamReminders && (
                                            <div className="flex items-center text-xs">
                                                <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                                <span className="text-gray-700 dark:text-gray-300">Exam reminders</span>
                                            </div>
                                        )}
                                        {data.notificationSettings.reminderIntervals && (
                                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                                <p>Reminder intervals: {data.notificationSettings.reminderIntervals.join("h, ")}h before exam</p>
                                            </div>
                                        )}
                                    </div>
                                </ContentCard>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
