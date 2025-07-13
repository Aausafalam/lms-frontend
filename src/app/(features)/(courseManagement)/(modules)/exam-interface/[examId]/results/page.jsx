"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Tabs from "@/components/tab";
import AnalyticsChart from "../components/AnalyticsChart";
import {
    ArrowLeft,
    Download,
    Trophy,
    Clock,
    Target,
    TrendingUp,
    Brain,
    Star,
    Award,
    BarChart3,
    PieChart,
    Activity,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Zap,
    BookOpen,
    Users,
    Shield,
    List,
    FileText,
    WorkflowIcon,
} from "lucide-react";
import DashboardLayout from "@/app/layouts";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Breadcrumb } from "@/components/Breadcrumb";

// Mock exam data (same as exam interface)
const mockExam = {
    id: "1",
    title: "Advanced Mathematics Comprehensive Exam",
    subtitle: "Final Assessment - Spring 2024",
    duration: 180,
    totalQuestions: 30,
    course: "MATH 401",
    instructor: "Dr. Sarah Johnson",
    sections: [
        {
            id: "calculus",
            name: "Calculus",
            questions: 10,
            difficulty: "Hard",
        },
        {
            id: "algebra",
            name: "Linear Algebra",
            questions: 10,
            difficulty: "Medium",
        },
        {
            id: "statistics",
            name: "Statistics",
            questions: 10,
            difficulty: "Medium",
        },
    ],
    questions: Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        section: i < 10 ? "calculus" : i < 20 ? "algebra" : "statistics",
        type: ["mcq", "true-false", "fill-blanks", "match-following", "subjective"][Math.floor(Math.random() * 5)],
        difficulty: ["easy", "medium", "hard"][Math.floor(Math.random() * 3)],
        points: Math.floor(Math.random() * 5) + 1,
        question: `Sample question ${i + 1}?`,
        topic: i < 10 ? "Calculus" : i < 20 ? "Linear Algebra" : "Statistics",
    })),
};

export default function ResultAnalytics() {
    const params = useParams();
    const router = useRouter();
    const [results, setResults] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [activeTab, setActiveTab] = useState({ id: "overview", label: "Overview" });

    useEffect(() => {
        // Load exam results
        const savedResults = localStorage.getItem(`exam_${params.id}_results`);
        if (savedResults) {
            const parsedResults = JSON.parse(savedResults);
            setResults(parsedResults);

            // Calculate comprehensive analysis
            const analysis = calculateComprehensiveAnalysis(parsedResults.answers, parsedResults.confidence);
            setAnalysis(analysis);
        }
    }, [params.id]);

    const calculateComprehensiveAnalysis = (answers, confidence) => {
        let correct = 0;
        let incorrect = 0;
        let attempted = 0;
        const topicPerformance = {};
        const difficultyPerformance = {};
        const sectionPerformance = {};
        const confidenceAnalysis = { 1: 0, 2: 0, 3: 0, 4: 0 };
        const questionAnalysis = [];
        const strongAreas = [];
        const weakAreas = [];

        mockExam.questions.forEach((question) => {
            const userAnswer = answers[question.id];
            const userConfidence = confidence[question.id] || 0;
            const hasAnswer = userAnswer !== undefined && userAnswer !== null && userAnswer !== "";

            if (hasAnswer) attempted++;
            if (userConfidence > 0) confidenceAnalysis[userConfidence]++;

            let isCorrect = false;
            if (question.type === "mcq" || question.type === "single-choice") {
                isCorrect = userAnswer === Math.floor(Math.random() * 4); // Mock correct answer
            } else if (question.type === "multi-choice") {
                isCorrect = hasAnswer && Math.random() > 0.4; // Mock correctness
            } else if (question.type === "subjective") {
                isCorrect = hasAnswer && Math.random() > 0.3; // Mock correctness
            } else if (question.type === "true-false") {
                isCorrect = hasAnswer && Math.random() > 0.5;
            } else if (question.type === "fill-blanks") {
                isCorrect = hasAnswer && Math.random() > 0.4;
            } else if (question.type === "match-following") {
                isCorrect = hasAnswer && Math.random() > 0.3;
            }

            if (hasAnswer) {
                if (isCorrect) correct++;
                else incorrect++;
            }

            // Topic performance
            const topic = question.topic || "General";
            if (!topicPerformance[topic]) {
                topicPerformance[topic] = { correct: 0, total: 0, points: 0 };
            }
            topicPerformance[topic].total++;
            topicPerformance[topic].points += question.points;
            if (isCorrect) topicPerformance[topic].correct++;

            // Difficulty performance
            if (!difficultyPerformance[question.difficulty]) {
                difficultyPerformance[question.difficulty] = { correct: 0, total: 0 };
            }
            difficultyPerformance[question.difficulty].total++;
            if (isCorrect) difficultyPerformance[question.difficulty].correct++;

            // Section performance
            const sectionName = mockExam.sections.find((s) => s.id === question.section)?.name || "Unknown";
            if (!sectionPerformance[sectionName]) {
                sectionPerformance[sectionName] = { correct: 0, total: 0, points: 0 };
            }
            sectionPerformance[sectionName].total++;
            sectionPerformance[sectionName].points += question.points;
            if (isCorrect) sectionPerformance[sectionName].correct++;

            questionAnalysis.push({
                question,
                userAnswer,
                userConfidence,
                isCorrect,
                attempted: hasAnswer,
                timeSpent: Math.floor(Math.random() * 300) + 30, // Mock time spent
            });
        });

        // Calculate strong and weak areas
        Object.entries(topicPerformance).forEach(([topic, perf]) => {
            const percentage = (perf.correct / perf.total) * 100;
            if (percentage >= 75) strongAreas.push(topic);
            else if (percentage < 50) weakAreas.push(topic);
        });

        const score = Math.round((correct / mockExam.totalQuestions) * 100);
        const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
        const totalPoints = mockExam.questions.reduce((sum, q) => sum + q.points, 0);
        const earnedPoints = questionAnalysis.filter((qa) => qa.isCorrect).reduce((sum, qa) => sum + qa.question.points, 0);

        return {
            score,
            accuracy,
            correct,
            incorrect,
            attempted,
            unattempted: mockExam.totalQuestions - attempted,
            totalPoints,
            earnedPoints,
            topicPerformance,
            difficultyPerformance,
            sectionPerformance,
            confidenceAnalysis,
            questionAnalysis,
            strongAreas,
            weakAreas,
            averageTimePerQuestion: Math.round(300 / attempted) || 0,
            efficiency: Math.round((correct / (300 / 60)) * 100) || 0,
        };
    };

    const getPerformanceLevel = (score) => {
        if (score >= 90)
            return {
                level: "Exceptional",
                color: "from-emerald-500 to-green-500",
                icon: "🏆",
                message: "Outstanding performance!",
            };
        if (score >= 80) return { level: "Excellent", color: "from-orange-500 to-red-500", icon: "🌟", message: "Great job!" };
        if (score >= 70) return { level: "Good", color: "from-orange-400 to-orange-600", icon: "👍", message: "Well done!" };
        if (score >= 60) return { level: "Average", color: "from-yellow-500 to-orange-500", icon: "📈", message: "Room for improvement" };
        return { level: "Needs Improvement", color: "from-red-500 to-orange-500", icon: "📚", message: "Keep practicing!" };
    };

    if (!results || !analysis) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-3 border-orange-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">Analyzing performance...</p>
                </div>
            </div>
        );
    }

    const performance = getPerformanceLevel(analysis.score);
    const timeSpent = Math.floor(results.timeSpent / 60);

    const breadcrumbItems = [
        {
            title: "Exam List",
            href: `/`,
            icon: <List className="h-3.5 w-3.5" />,
        },
        {
            title: "Exam Details",
            href: `/exam/details/${params.id}`,
            icon: <FileText className="h-3.5 w-3.5" />,
        },
        {
            title: "Results",
            icon: <WorkflowIcon className="h-3.5 w-3.5" />,
        },
    ];

    const tabs = [
        {
            id: "overview",
            label: "Overview",
            icon: <BarChart3 className="h-4 w-4" />,
            content: (
                <div className="space-y-4">
                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-0 shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                                    <PieChart className="w-4 h-4 text-orange-500" />
                                    Score Distribution
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2">
                                <AnalyticsChart
                                    type="pie"
                                    data={[
                                        { name: "Correct", value: analysis.correct, color: "#10b981" },
                                        { name: "Incorrect", value: analysis.incorrect, color: "#ef4444" },
                                        { name: "Skipped", value: analysis.unattempted, color: "#6b7280" },
                                    ]}
                                />
                            </CardContent>
                        </Card>

                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-0 shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                                    <BarChart3 className="w-4 h-4 text-orange-500" />
                                    Section Performance
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2">
                                <AnalyticsChart
                                    type="bar"
                                    data={Object.entries(analysis.sectionPerformance).map(([section, perf]) => ({
                                        name: section,
                                        value: Math.round((perf.correct / perf.total) * 100),
                                        color: "#f97316",
                                    }))}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-4 gap-3">
                        <Card className="bg-emerald-50/80 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 backdrop-blur">
                            <CardContent className="p-3 text-center">
                                <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                                <div className="text-lg font-bold text-emerald-700">{analysis.attempted}</div>
                                <div className="text-xs text-emerald-600">Attempted</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-red-50/80 dark:bg-red-900/20 border-red-200 dark:border-red-800 backdrop-blur">
                            <CardContent className="p-3 text-center">
                                <XCircle className="w-5 h-5 text-red-600 mx-auto mb-1" />
                                <div className="text-lg font-bold text-red-700">{analysis.unattempted}</div>
                                <div className="text-xs text-red-600">Skipped</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-orange-50/80 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 backdrop-blur">
                            <CardContent className="p-3 text-center">
                                <Award className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                                <div className="text-lg font-bold text-orange-700">{analysis.earnedPoints}</div>
                                <div className="text-xs text-orange-600">Points</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-purple-50/80 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 backdrop-blur">
                            <CardContent className="p-3 text-center">
                                <Zap className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                                <div className="text-lg font-bold text-purple-700">{analysis.efficiency}%</div>
                                <div className="text-xs text-purple-600">Efficiency</div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            ),
        },
        {
            id: "performance",
            label: "Performance",
            icon: <TrendingUp className="h-4 w-4" />,
            content: (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-0 shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-semibold">Topic Performance</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-2 space-y-3">
                            {Object.entries(analysis.topicPerformance).map(([topic, perf]) => {
                                const percentage = Math.round((perf.correct / perf.total) * 100);
                                return (
                                    <div key={topic} className="space-y-1">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-sm">{topic}</span>
                                            <span className="text-sm text-gray-600 font-semibold">{percentage}%</span>
                                        </div>
                                        <Progress value={percentage} className="h-2" />
                                        <div className="text-xs text-gray-500">
                                            {perf.correct}/{perf.total} correct
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>

                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-0 shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-semibold">Difficulty Analysis</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-2">
                            <AnalyticsChart
                                type="bar"
                                data={Object.entries(analysis.difficultyPerformance).map(([difficulty, perf]) => ({
                                    name: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
                                    value: Math.round((perf.correct / perf.total) * 100),
                                    color: difficulty === "easy" ? "#10b981" : difficulty === "medium" ? "#f59e0b" : "#ef4444",
                                }))}
                            />
                        </CardContent>
                    </Card>
                </div>
            ),
        },
        {
            id: "insights",
            label: "Insights",
            icon: <Brain className="h-4 w-4" />,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-0 shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base font-semibold text-emerald-700">Strong Areas</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2">
                                {analysis.strongAreas.length > 0 ? (
                                    <div className="space-y-2">
                                        {analysis.strongAreas.map((area) => (
                                            <Badge key={area} className="bg-emerald-100 text-emerald-800 text-xs">
                                                {area}
                                            </Badge>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">Focus on improving performance across all topics</p>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-0 shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base font-semibold text-red-700">Areas for Improvement</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2">
                                {analysis.weakAreas.length > 0 ? (
                                    <div className="space-y-2">
                                        {analysis.weakAreas.map((area) => (
                                            <Badge key={area} className="bg-red-100 text-red-800 text-xs">
                                                {area}
                                            </Badge>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">Great job! No major weak areas identified</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            ),
        },
        {
            id: "detailed",
            label: "Questions",
            icon: <Activity className="h-4 w-4" />,
            content: (
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-0 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold">Question Analysis</CardTitle>
                        <CardDescription className="text-sm">Detailed breakdown of each question</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                        <div className="space-y-2 max-h-80 overflow-y-auto">
                            {analysis.questionAnalysis.map((item, index) => (
                                <div
                                    key={item.question.id}
                                    className={`p-3 rounded-lg border transition-all ${
                                        !item.attempted
                                            ? "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                            : item.isCorrect
                                            ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800"
                                            : "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800"
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-xs px-2 py-1">
                                                Q{index + 1}
                                            </Badge>
                                            <Badge
                                                className={`text-xs px-2 py-1 ${
                                                    item.question.difficulty === "easy"
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : item.question.difficulty === "medium"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {item.question.difficulty}
                                            </Badge>
                                            <span className="text-xs text-gray-500">{item.question.topic}</span>
                                        </div>
                                        <Badge variant={!item.attempted ? "secondary" : item.isCorrect ? "default" : "destructive"} className="text-xs">
                                            {!item.attempted ? "Skipped" : item.isCorrect ? "✓" : "✗"}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ),
        },
    ];

    return (
        <ErrorBoundary>
            <DashboardLayout>
                <div>
                    <div className="space-y-4 p-4">
                        <Breadcrumb items={breadcrumbItems} />

                        {/* Compact Header */}
                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-sm border-0 rounded-lg">
                            <div className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-sm">
                                            <Trophy className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Exam Results</h1>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">{mockExam.title}</p>
                                        </div>
                                    </div>
                                    <Button size="sm" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl shadow-sm">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Compact Score Overview */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur border-0 shadow-sm rounded-lg">
                                <CardContent className="p-4 text-center">
                                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${performance.color} text-white text-lg font-bold mb-2`}>
                                        {analysis.score}%
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">Overall Score</div>
                                    <Badge className={`bg-gradient-to-r ${performance.color} text-white text-xs px-2 py-1 mt-1`}>{performance.level}</Badge>
                                </CardContent>
                            </Card>

                            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur border-0 shadow-sm rounded-lg">
                                <CardContent className="p-4 text-center">
                                    <Trophy className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                                    <div className="text-lg font-bold text-emerald-600">{analysis.correct}</div>
                                    <div className="text-xs text-gray-600">Correct</div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur border-0 shadow-sm rounded-lg">
                                <CardContent className="p-4 text-center">
                                    <Target className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                                    <div className="text-lg font-bold text-orange-600">{analysis.accuracy}%</div>
                                    <div className="text-xs text-gray-600">Accuracy</div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur border-0 shadow-sm rounded-lg">
                                <CardContent className="p-4 text-center">
                                    <Clock className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                    <div className="text-lg font-bold text-purple-600">{timeSpent}m</div>
                                    <div className="text-xs text-gray-600">Time Spent</div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Proctoring Alert */}
                        {results.violations && results.violations.length > 0 && (
                            <Card className="bg-red-50/90 dark:bg-red-900/20 border-red-200 dark:border-red-800 rounded-lg backdrop-blur">
                                <CardContent className="p-3">
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4 text-red-500" />
                                        <div className="text-sm">
                                            <span className="font-medium text-red-700">Proctoring Alert:</span>
                                            <span className="text-red-600 ml-1">{results.violations.length} violations detected</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Tabs */}
                        {/* <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-lg shadow-sm border-0"> */}
                            <Tabs defaultTab={activeTab} tabs={tabs} variant="underline" onTabChange={(tab) => setActiveTab(tab)} />
                        {/* </div> */}
                    </div>
                </div>
            </DashboardLayout>
        </ErrorBoundary>
    );
}
