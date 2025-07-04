"use client"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Clock, Target, CheckCircle, Download, Share2, ArrowLeft, TrendingUp } from "lucide-react"
import { useNavigation } from "@/components/navigation"
import { useExamResults } from "../../../hooks/useExamResults"
import ResultsOverview from "./components/results-overview"
import QuestionAnalysis from "./components/question-analysis"
import PerformanceAnalytics from "./components/performance-analytics"
import ComparisonChart from "./components/comparison-chart"

const ExamResultsPage = () => {
  const { examId } = useParams()
  const { navigate } = useNavigation()
  const { results, loading, error } = useExamResults(examId)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading results...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <Button onClick={() => navigate("/exam-panel")}>Back to Exam Panel</Button>
        </div>
      </div>
    )
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 dark:text-green-400"
    if (score >= 60) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  const getGradeInfo = (score) => {
    if (score >= 90) return { grade: "A+", color: "bg-green-500" }
    if (score >= 80) return { grade: "A", color: "bg-green-500" }
    if (score >= 70) return { grade: "B+", color: "bg-blue-500" }
    if (score >= 60) return { grade: "B", color: "bg-blue-500" }
    if (score >= 50) return { grade: "C", color: "bg-orange-500" }
    return { grade: "F", color: "bg-red-500" }
  }

  const gradeInfo = getGradeInfo(results?.score || 0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/exam-panel")}
              className="border-gray-200 dark:border-gray-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Panel
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Exam Results</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {results?.examName} • {results?.examCode}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-gray-200 dark:border-gray-600 bg-transparent">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" className="border-gray-200 dark:border-gray-600 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Main Score Card */}
          <Card className="lg:col-span-2 border-gray-200 dark:border-gray-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/5" />
            <CardContent className="p-8 relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-bold ${getScoreColor(results?.score || 0)}`}>
                      {results?.score || 0}%
                    </span>
                    <Badge className={`${gradeInfo.color} text-white`}>Grade {gradeInfo.grade}</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-950/30 rounded-full">
                  <Trophy className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
              </div>

              <div className="space-y-3">
                <Progress value={results?.score || 0} className="h-3" />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>0%</span>
                  <span>Passing: {results?.passingScore || 60}%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <p
                      className={`font-medium ${
                        (results?.score || 0) >= (results?.passingScore || 60)
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {(results?.score || 0) >= (results?.passingScore || 60) ? "Passed" : "Failed"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Rank:</span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {results?.rank || "N/A"} / {results?.totalParticipants || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <Card className="border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Correct Answers</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {results?.correctAnswers || 0}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">out of {results?.totalQuestions || 0}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Time Taken</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{results?.timeTaken || "0m"}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">of {results?.totalTime || "0m"}</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Accuracy</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{results?.accuracy || 0}%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">overall accuracy</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Percentile</p>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {results?.percentile || 0}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">better than others</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Analysis */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="questions" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Question Analysis
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Performance
            </TabsTrigger>
            <TabsTrigger
              value="comparison"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Comparison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ResultsOverview results={results} />
          </TabsContent>

          <TabsContent value="questions">
            <QuestionAnalysis results={results} />
          </TabsContent>

          <TabsContent value="performance">
            <PerformanceAnalytics results={results} />
          </TabsContent>

          <TabsContent value="comparison">
            <ComparisonChart results={results} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ExamResultsPage
