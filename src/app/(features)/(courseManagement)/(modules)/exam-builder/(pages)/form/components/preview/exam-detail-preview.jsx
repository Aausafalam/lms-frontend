"use client";

import { useState } from "react";
import { Clock, Users, Layers, CheckCircle, AlertTriangle, Settings, Globe, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExamContentCard } from "./exam-details-content-card";

const devicePresets = {
    mobile: 400,
    tablet: 768,
    desktop: 1024,
};

export function ExamDetailPreview({ data, viewportWidth, onDetailsPage }) {
    const [selectedSection, setSelectedSection] = useState(0);

    const isMobile = viewportWidth <= devicePresets.mobile;
    const isTablet = viewportWidth > devicePresets.mobile && viewportWidth <= devicePresets.tablet;
    const isDesktop = viewportWidth > devicePresets.tablet;

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

    return (
        <div className={`w-full ${onDetailsPage ? "max-w-[1225px]" : "max-h-[75vh] overflow-scroll"}`}>
            {/* Header Section */}
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white p-6 rounded-t-lg">
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <Badge className="bg-white/20 text-white border-white/30">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {data.status || "Draft"}
                        </Badge>
                        {data.shuffleQuestions && (
                            <Badge className="bg-white/20 text-white border-white/30">
                                <Settings className="h-3 w-3 mr-1" />
                                Shuffled Questions
                            </Badge>
                        )}
                    </div>

                    <div>
                        <h1 className={`font-bold text-white leading-tight ${isMobile ? "text-xl" : "text-2xl"}`}>{data.examName || "Exam Name"}</h1>
                        <p className="text-white/90 text-sm mt-1">{data.examCode || "EXAM-CODE-2025"}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center bg-white/15 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                            <Clock className="h-4 w-4 mr-2 text-yellow-300" />
                            <span className="text-white font-semibold text-sm">{data.durationInMinutes || 90} minutes</span>
                        </div>

                        <div className="flex items-center bg-white/15 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                            <Layers className="h-4 w-4 mr-2 text-green-300" />
                            <span className="text-white font-semibold text-sm">{data.sections?.length || 0} sections</span>
                        </div>

                        <div className="flex items-center bg-white/15 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                            <Users className="h-4 w-4 mr-2 text-blue-300" />
                            <span className="text-white font-semibold text-sm">{totalQuestions} questions</span>
                        </div>
                    </div>

                    {data.languageOptions?.length > 0 && (
                        <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-white/80" />
                            <span className="text-white/80 text-sm">Available in:</span>
                            <div className="flex flex-wrap gap-1">
                                {data.languageOptions.map((lang) => (
                                    <Badge key={lang} variant="outline" className="text-white border-white/30 text-xs">
                                        {lang}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-2 bg-gray-100 dark:bg-gray-900">
                <div className={isMobile || isTablet ? "space-y-6" : "grid grid-cols-3 gap-8"}>
                    <div className={isMobile || isTablet ? "space-y-6" : "col-span-2 space-y-6"}>
                        {/* Exam Overview */}
                        <ExamContentCard title="Exam Overview" Icon={Settings}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Questions</p>
                                    <p className="text-lg font-semibold">{totalQuestions}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Marks</p>
                                    <p className="text-lg font-semibold">{totalMarks}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                                    <p className="text-lg font-semibold">{data.durationInMinutes} min</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Sections</p>
                                    <p className="text-lg font-semibold">{data.sections?.length || 0}</p>
                                </div>
                            </div>
                        </ExamContentCard>

                        {/* Sections */}
                        <ExamContentCard title={"Exam Sections"} Icon={Layers} headerColor="purple">
                            <div className="space-y-4">
                                {data.sections?.map((section, index) => (
                                    <div
                                        key={section.sectionId || index}
                                        className={`p-4 rounded-lg border transition-all cursor-pointer ${
                                            selectedSection === index ? "border-blue-300 bg-blue-50 dark:bg-blue-950/20" : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                                        }`}
                                        onClick={() => setSelectedSection(index)}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-2 rounded-full mr-3">
                                                    <Layers className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-900 dark:text-white">{section.name || `Section ${index + 1}`}</h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {section.sectionId} • {section.subjectTag}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {section.isCompulsory && (
                                                    <Badge variant="outline" className="text-xs">
                                                        <AlertTriangle className="h-3 w-3 mr-1" />
                                                        Compulsory
                                                    </Badge>
                                                )}
                                                {section.sectionTimeLimit && (
                                                    <Badge variant="outline" className="text-xs">
                                                        <Timer className="h-3 w-3 mr-1" />
                                                        {section.sectionTimeLimit}m
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-500 dark:text-gray-400">Questions</p>
                                                <p className="font-medium">{section.questionsCount}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 dark:text-gray-400">To Attempt</p>
                                                <p className="font-medium">{section.questionsToAttempt}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 dark:text-gray-400">Groups</p>
                                                <p className="font-medium">{section.questionGroups?.length || 0}</p>
                                            </div>
                                        </div>

                                        {selectedSection === index && section.questionGroups && (
                                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Question Groups</h4>
                                                <div className="space-y-2">
                                                    {section.questionGroups.map((group, groupIndex) => (
                                                        <div key={groupIndex} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                                                            <div>
                                                                <p className="font-medium text-sm">
                                                                    Questions {group.range?.[0]} - {group.range?.[1]}
                                                                </p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">{group.questionType}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-sm font-medium text-green-600">+{group.marksPerQuestion}</p>
                                                                <p className="text-xs text-red-500">-{group.negativeMarks}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </ExamContentCard>

                        {/* Global Settings */}
                        {data.globalMarkingPolicy && (
                            <ExamContentCard title={"Marking Scheme"} headerColor="green" Icon={Settings}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-md">
                                        <span className="text-sm font-medium">Correct Answer</span>
                                        <span className="text-green-600 font-bold">+{data.globalMarkingPolicy.defaultCorrectMark}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-md">
                                        <span className="text-sm font-medium">Wrong Answer</span>
                                        <span className="text-red-600 font-bold">-{data.globalMarkingPolicy.defaultNegativeMark}</span>
                                    </div>
                                </div>
                            </ExamContentCard>
                        )}
                    </div>

                    {/* Sidebar */}
                    {isDesktop && (
                        <div className="space-y-6">
                            <Card className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                <CardContent className="p-6">
                                    <div className="text-center space-y-4">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                                            <CheckCircle className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-white font-bold text-xl">Ready to Start?</h3>
                                        <p className="text-white/90 text-sm">Begin this exam now</p>
                                        <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 font-bold py-3">Start Exam</Button>
                                        <div className="text-center text-white/80 text-xs space-y-1">
                                            <p>✓ {totalQuestions} Questions</p>
                                            <p>✓ {data.durationInMinutes} Minutes</p>
                                            <p>✓ {data.sections?.length} Sections</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Exam Rules */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm">Exam Rules</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {data.attemptRules?.allowSectionNavigation && (
                                        <div className="flex items-center text-xs">
                                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                            Section navigation allowed
                                        </div>
                                    )}
                                    {data.attemptRules?.allowBackNavigation && (
                                        <div className="flex items-center text-xs">
                                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                            Back navigation allowed
                                        </div>
                                    )}
                                    {data.attemptRules?.autoSubmitOnTimeEnd && (
                                        <div className="flex items-center text-xs">
                                            <AlertTriangle className="h-3 w-3 text-yellow-500 mr-2" />
                                            Auto-submit on timeout
                                        </div>
                                    )}
                                    {data.submissionRules?.confirmBeforeSubmit && (
                                        <div className="flex items-center text-xs">
                                            <CheckCircle className="h-3 w-3 text-blue-500 mr-2" />
                                            Confirmation before submit
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
