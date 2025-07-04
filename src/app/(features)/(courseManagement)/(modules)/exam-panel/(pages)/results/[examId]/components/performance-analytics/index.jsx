"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Clock, Target } from "lucide-react"

const PerformanceAnalytics = ({ results }) => {
  const performanceData = results?.performanceAnalytics || {}

  return (
    <div className="space-y-6">
      {/* Time Analysis */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            Time Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {performanceData.averageTimePerQuestion || "0s"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Time/Question</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {performanceData.fastestQuestion || "0s"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Fastest Question</p>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {performanceData.slowestQuestion || "0s"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Slowest Question</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accuracy by Difficulty */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-500" />
            Accuracy by Difficulty Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { level: "Easy", accuracy: performanceData.easyAccuracy || 0, color: "bg-green-500" },
              { level: "Medium", accuracy: performanceData.mediumAccuracy || 0, color: "bg-orange-500" },
              { level: "Hard", accuracy: performanceData.hardAccuracy || 0, color: "bg-red-500" },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">{item.level}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.accuracy}%</span>
                </div>
                <Progress value={item.accuracy} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject-wise Performance */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-orange-500" />
            Subject-wise Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData.subjectPerformance?.map((subject, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{subject.name}</h4>
                  <span
                    className={`font-bold ${
                      subject.score >= 80
                        ? "text-green-600 dark:text-green-400"
                        : subject.score >= 60
                          ? "text-orange-600 dark:text-orange-400"
                          : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {subject.score}%
                  </span>
                </div>
                <Progress value={subject.score} className="h-2 mb-2" />
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Correct: {subject.correct}</span>
                  <span>Wrong: {subject.wrong}</span>
                  <span>Skipped: {subject.skipped}</span>
                </div>
              </div>
            )) || <p className="text-gray-500 dark:text-gray-400 text-center py-4">No subject-wise data available.</p>}
          </div>
        </CardContent>
      </Card>

      {/* Performance Trends */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Strengths</h4>
              <div className="space-y-2">
                {performanceData.insights?.strengths?.map((strength, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    {strength}
                  </div>
                )) || <p className="text-sm text-gray-500 dark:text-gray-400">No specific strengths identified.</p>}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Areas to Improve</h4>
              <div className="space-y-2">
                {performanceData.insights?.improvements?.map((improvement, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-red-700 dark:text-red-300">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    {improvement}
                  </div>
                )) || (
                  <p className="text-sm text-gray-500 dark:text-gray-400">Great job! No major areas for improvement.</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PerformanceAnalytics
