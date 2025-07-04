"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Trophy, Search, Filter, Download, Eye } from "lucide-react";
import { useNavigation } from "@/components/navigation";
import { useExamHistory } from "../../hooks/useExamHistory";
import { format } from "date-fns";

const ExamHistoryPage = () => {
    const { navigate } = useNavigation();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("date");

    const { history, loading, stats } = useExamHistory();

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800";
            case "in-progress":
                return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800";
            case "missed":
                return "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600";
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return "text-green-600 dark:text-green-400";
        if (score >= 60) return "text-orange-600 dark:text-orange-400";
        return "text-red-600 dark:text-red-400";
    };

    const filteredHistory = history
        .filter((exam) => {
            const matchesSearch = exam.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "all" || exam.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "date":
                    return new Date(b.completedAt || b.startedAt) - new Date(a.completedAt || a.startedAt);
                case "score":
                    return (b.score || 0) - (a.score || 0);
                case "name":
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Loading exam history...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Exam History</h1>
                        <p className="text-gray-600 dark:text-gray-400">Track your exam performance over time</p>
                    </div>
                    <Button variant="outline" className="border-gray-200 dark:border-gray-600 bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Export History
                    </Button>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card className="border-gray-200 dark:border-gray-700">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Exams</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.total || 0}</p>
                                </div>
                                <Calendar className="h-8 w-8 text-blue-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 dark:border-gray-700">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats?.completed || 0}</p>
                                </div>
                                <Trophy className="h-8 w-8 text-green-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 dark:border-gray-700">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
                                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats?.averageScore || 0}%</p>
                                </div>
                                <Trophy className="h-8 w-8 text-orange-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 dark:border-gray-700">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Best Score</p>
                                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats?.bestScore || 0}%</p>
                                </div>
                                <Trophy className="h-8 w-8 text-purple-500" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="border-gray-200 dark:border-gray-700 mb-6">
                    <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input placeholder="Search exams..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                                </div>
                            </div>
                            {/* <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="missed">Missed</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="date">Date</SelectItem>
                                    <SelectItem value="score">Score</SelectItem>
                                    <SelectItem value="name">Name</SelectItem>
                                </SelectContent>
                            </Select> */}
                        </div>
                    </CardContent>
                </Card>

                {/* Exam History List */}
                <div className="space-y-4">
                    {filteredHistory.map((exam) => (
                        <Card key={exam.id} className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{exam.name}</h3>
                                            <Badge className={getStatusColor(exam.status)}>{exam.status}</Badge>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{exam.description}</p>

                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-500" />
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    {exam.completedAt ? format(new Date(exam.completedAt), "MMM dd, yyyy") : format(new Date(exam.startedAt), "MMM dd, yyyy")}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-gray-500" />
                                                <span className="text-gray-600 dark:text-gray-400">{exam.duration} minutes</span>
                                            </div>
                                            {exam.score !== undefined && (
                                                <div className="flex items-center gap-2">
                                                    <Trophy className="h-4 w-4 text-gray-500" />
                                                    <span className={`font-medium ${getScoreColor(exam.score)}`}>{exam.score}%</span>
                                                </div>
                                            )}
                                            {exam.rank && (
                                                <div className="flex items-center gap-2">
                                                    <Trophy className="h-4 w-4 text-gray-500" />
                                                    <span className="text-gray-600 dark:text-gray-400">Rank #{exam.rank}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {exam.status === "completed" && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => navigate(`/exam-panel/results/${exam.id}`)}
                                                className="border-gray-200 dark:border-gray-600 bg-transparent"
                                            >
                                                <Eye className="h-4 w-4 mr-2" />
                                                View Results
                                            </Button>
                                        )}
                                        {exam.status === "in-progress" && (
                                            <Button size="sm" onClick={() => navigate(`/exam-panel/take-exam/${exam.id}`)} className="bg-orange-500 hover:bg-orange-600 text-white">
                                                Resume Exam
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {filteredHistory.length === 0 && (
                        <Card className="border-gray-200 dark:border-gray-700">
                            <CardContent className="p-12 text-center">
                                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No exam history found</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {searchQuery || statusFilter !== "all"
                                        ? "Try adjusting your search or filter criteria."
                                        : "You haven't taken any exams yet. Start taking exams to see your history here."}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExamHistoryPage;
