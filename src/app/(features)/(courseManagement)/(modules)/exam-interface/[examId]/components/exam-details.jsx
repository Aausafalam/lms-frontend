import DashboardLayout from "@/app/layouts";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    AlertTriangle,
    Award,
    BookOpen,
    Brain,
    Calculator,
    CheckCircle,
    Clock,
    Eye,
    FileText,
    Globe,
    Lightbulb,
    Monitor,
    PlayCircle,
    Shield,
    Target,
    Timer,
    Zap,
    BookMarked,
    TrendingUp,
    Award as TrophyIcon,
    Users,
    Info,
    List,
} from "lucide-react";
import React from "react";
import { Breadcrumb } from "@/components/Breadcrumb";

const ExamDetails = ({ examData, onStartExam }) => {
    // Calculate total questions and marks
    const totalQuestions = examData.examPattern.sections.reduce((sum, section) => sum + section.questionsCount, 0);
    const totalMarks = examData.examPattern.sections.reduce((sum, section) => {
        return (
            sum +
            section.questionGroups.reduce((groupSum, group) => {
                const questionsInGroup = group.range[1] - group.range[0] + 1;
                return groupSum + questionsInGroup * group.marksPerQuestion;
            }, 0)
        );
    }, 0);

    // Get subject icons
    const getSubjectIcon = (subjectTag) => {
        switch (subjectTag) {
            case "physics":
                return Zap;
            case "chemistry":
                return BookMarked;
            case "mathematics":
                return Calculator;
            default:
                return BookOpen;
        }
    };

    // Get subject colors (light backgrounds with dark text)
    const getSubjectColor = (subjectTag) => {
        switch (subjectTag) {
            case "physics":
                return "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800";
            case "chemistry":
                return "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800";
            case "mathematics":
                return "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800";
            default:
                return "bg-gray-50 dark:bg-gray-950/30 border-gray-200 dark:border-gray-800";
        }
    };

    const getSubjectIconColor = (subjectTag) => {
        switch (subjectTag) {
            case "physics":
                return "text-blue-600 dark:text-blue-400";
            case "chemistry":
                return "text-green-600 dark:text-green-400";
            case "mathematics":
                return "text-purple-600 dark:text-purple-400";
            default:
                return "text-gray-600 dark:text-gray-400";
        }
    };

    const breadcrumbItems = [
        {
            title: "Exam List",
            href: `/`,
            icon: <List className="h-3.5 w-3.5" />,
        },
        {
            title: "Exam Details",
            icon: <FileText className="h-3.5 w-3.5" />,
        },
    ];

    return (
        <ErrorBoundary>
            <DashboardLayout>
                <div className="space-y-4">
                    <Breadcrumb items={breadcrumbItems} />
                    {/* Compact Header Section */}
                    <Card className=" dark:from-slate-900 dark:to-slate-800 rounded-md">
                        <CardHeader className="pb-4">
                            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/40 dark:to-orange-800/40 rounded-lg">
                                        <Brain className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl lg:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">{examData.name}</CardTitle>
                                        <p className="text-[0.8rem] text-gray-600 dark:text-gray-300 mb-2">{examData.description}</p>
                                        <div className="flex flex-wrap items-center gap-3 text-xs">
                                            <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                                <FileText className="w-3 h-3" />
                                                {examData.examCode}
                                            </span>
                                            <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                                <Globe className="w-3 h-3" />
                                                {examData.languageOptions.join(", ")}
                                            </span>
                                            <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs">
                                                {examData.examType.toUpperCase()}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Compact Date and Time */}
                                <div className="text-right">
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Exam Schedule</div>
                                    <div className="text-base font-semibold text-gray-900 dark:text-gray-100">
                                        {new Date(examData.startDate).toLocaleDateString("en-US", {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </div>
                                    <div className="text-orange-600 dark:text-orange-400 font-medium text-sm">
                                        {examData.startTime} - {examData.endTime}
                                    </div>
                                </div>
                            </div>

                            {/* Compact Exam Statistics */}
                            <div className="grid grid-cols-4 gap-3 mt-4">
                                <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <Timer className="w-5 h-5 mx-auto mb-1 text-orange-500" />
                                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{examData.durationInMinutes}m</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Duration</div>
                                </div>
                                <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <Target className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{totalQuestions}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Questions</div>
                                </div>
                                <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <TrophyIcon className="w-5 h-5 mx-auto mb-1 text-green-500" />
                                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{totalMarks}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Marks</div>
                                </div>
                                <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <BookOpen className="w-5 h-5 mx-auto mb-1 text-purple-500" />
                                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{examData.examPattern.sections.length}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Sections</div>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    <div className="flex gap-4">
                        {/* Left Column - Sections & Question Pattern */}
                        <div className="w-[80%] space-y-4">
                            {/* Compact Sections & Question Pattern */}
                            <Card className=" shadow-sm bg-white dark:bg-gray-900  ">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
                                        <BookOpen className="w-4 h-4 text-orange-500" />
                                        Exam Structure
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* Two sections per row */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {examData.examPattern.sections.map((section, index) => {
                                            const IconComponent = getSubjectIcon(section.subjectTag);
                                            const colorClass = getSubjectColor(section.subjectTag);
                                            const iconColor = getSubjectIconColor(section.subjectTag);

                                            return (
                                                <div key={section.sectionId} className={`p-4 rounded-lg border-2 ${colorClass} hover:shadow-md transition-all duration-200`}>
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <IconComponent className={`w-5 h-5 ${iconColor}`} />
                                                            <h4 className="font-bold text-base text-gray-900 dark:text-gray-100">{section.name}</h4>
                                                        </div>
                                                        <Badge variant="outline" className="text-xs">
                                                            {index + 1}
                                                        </Badge>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                                        <div className="text-center">
                                                            <div className="text-base font-bold text-gray-900 dark:text-gray-100">{section.questionsCount}</div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">Questions</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-base font-bold text-gray-900 dark:text-gray-100">{section.questionsToAttempt}</div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">To Attempt</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-between items-center text-xs mb-3">
                                                        <span className="text-gray-600 dark:text-gray-400">
                                                            Passing: <span className="font-medium text-gray-900 dark:text-gray-100">{section.passingMarks}</span>
                                                        </span>
                                                        <span className="text-gray-600 dark:text-gray-400">
                                                            Types: <span className="font-medium text-gray-900 dark:text-gray-100">{section.questionGroups.length}</span>
                                                        </span>
                                                    </div>

                                                    {/* Compact Question Groups */}
                                                    <div className="space-y-1">
                                                        {section.questionGroups.map((group, groupIndex) => (
                                                            <div key={groupIndex} className="flex justify-between items-center text-xs bg-white/50 dark:bg-gray-800/50 p-2 rounded">
                                                                <span className="text-gray-700 dark:text-gray-300 font-medium">
                                                                    Q{group.range[0]}-{group.range[1]}
                                                                </span>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-green-600 dark:text-green-400 font-medium">+{group.marksPerQuestion}</span>
                                                                    {group.negativeMarks > 0 && <span className="text-red-500 dark:text-red-400 font-medium">-{group.negativeMarks}</span>}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Compact Info */}
                        <div className=" w-[20%] space-y-4">
                            {/* Security & Rules */}
                            <Card className="shadow-md">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
                                        <Shield className="w-4 h-4 text-red-500" />
                                        Security & Rules
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {/* Security Features */}
                                    <div className="space-y-2">
                                        {examData.examPattern.securitySettings.enableFullScreenMode && (
                                            <div className="flex items-center gap-2 text-xs">
                                                <Monitor className="w-3 h-3 text-blue-500 flex-shrink-0" />
                                                <span className="text-gray-700 dark:text-gray-300">Fullscreen required</span>
                                            </div>
                                        )}
                                        {examData.examPattern.securitySettings.preventTabSwitching && (
                                            <div className="flex items-center gap-2 text-xs">
                                                <AlertTriangle className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                                                <span className="text-gray-700 dark:text-gray-300">Max {examData.examPattern.securitySettings.maxTabSwitches} tab switches</span>
                                            </div>
                                        )}
                                        {examData.examPattern.securitySettings.disableRightClick && (
                                            <div className="flex items-center gap-2 text-xs">
                                                <Shield className="w-3 h-3 text-red-500 flex-shrink-0" />
                                                <span className="text-gray-700 dark:text-gray-300">Right-click disabled</span>
                                            </div>
                                        )}
                                        {examData.examPattern.securitySettings.disableCopyPaste && (
                                            <div className="flex items-center gap-2 text-xs">
                                                <Eye className="w-3 h-3 text-purple-500 flex-shrink-0" />
                                                <span className="text-gray-700 dark:text-gray-300">Copy-paste disabled</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-t pt-3">
                                        <div className="bg-orange-50 dark:bg-orange-950/30 p-2 rounded-lg mb-2">
                                            <div className="font-medium text-orange-800 dark:text-orange-400 text-xs">Passing Criteria</div>
                                            <div className="text-orange-700 dark:text-orange-300 text-xs">{examData.examPattern.resultsSettings.passingPercentage}% required</div>
                                        </div>
                                        <div className="bg-blue-50 dark:bg-blue-950/30 p-2 rounded-lg">
                                            <div className="font-medium text-blue-800 dark:text-blue-400 text-xs">Results</div>
                                            <div className="text-blue-700 dark:text-blue-300 text-xs">Available after {examData.examPattern.resultsSettings.resultVisibilityDelay}h</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Instructions */}
                            <Card className=" shadow-md">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
                                        <Info className="w-4 h-4 text-blue-500" />
                                        Instructions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex items-start gap-2">
                                            <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300">Navigate sections freely</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300">Auto-save enabled</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Clock className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300">Timer always visible</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <AlertTriangle className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300">Only {examData.examPattern.accessControlSettings.maxAttempts} attempt allowed</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Start Button */}
                    {onStartExam && (
                        <div className="flex justify-center">
                            <Button
                                onClick={onStartExam}
                                size="lg"
                                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                            >
                                <PlayCircle className="w-5 h-5 mr-2" />
                                Start Exam
                            </Button>
                        </div>
                    )}
                </div>
            </DashboardLayout>
        </ErrorBoundary>
    );
};

export default ExamDetails;
