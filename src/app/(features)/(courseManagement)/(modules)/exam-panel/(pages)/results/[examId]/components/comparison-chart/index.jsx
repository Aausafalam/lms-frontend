"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, BarChart3, Award } from "lucide-react"

const ComparisonChart = ({ results }) => {
  const comparisonData = results?.comparison || {}

  return (
    <div className="space-y-6">
      {/* Overall Comparison */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-500" />
            Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{results?.score || 0}%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your Score</p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{comparisonData.averageScore || 0}%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Class Average</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{comparisonData.topScore || 0}%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Highest Score</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{results?.percentile || 0}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Percentile</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Distribution */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-orange-500" />
            Score Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { range: "90-100%", count: comparisonData.distribution?.range90_100 || 0, color: "bg-green-500" },
              { range: "80-89%", count: comparisonData.distribution?.range80_89 || 0, color: "bg-blue-500" },
              { range: "70-79%", count: comparisonData.distribution?.range70_79 || 0, color: "bg-orange-500" },
              { range: "60-69%", count: comparisonData.distribution?.range60_69 || 0, color: "bg-yellow-500" },
              { range: "Below 60%", count: comparisonData.distribution?.range_below_60 || 0, color: "bg-red-500" },
            ].map((item, index) => {
              const percentage = comparisonData.totalParticipants
                ? (item.count / comparisonData.totalParticipants) * 100
                : 0
              const isYourRange =
                results?.score >= Number.parseInt(item.range.split("-")[0]) &&
                results?.score <= (Number.parseInt(item.range.split("-")[1]) || 100)

              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    isYourRange
                      ? "border-orange-300 bg-orange-50 dark:border-orange-600 dark:bg-orange-950/30"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.range}
                      {isYourRange && (
                        <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-1 rounded">You are here</span>
                      )}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.count} students ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Ranking Information */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-orange-500" />
            Your Ranking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">#{results?.rank || "N/A"}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your Rank</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                out of {comparisonData.totalParticipants || 0} students
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{results?.percentile || 0}%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Percentile</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Better than {results?.percentile || 0}% students
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {comparisonData.passedStudents || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Students Passed</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {comparisonData.passPercentage || 0}% pass rate
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Comparison Chart */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Performance Metrics Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                metric: "Overall Score",
                yourValue: results?.score || 0,
                average: comparisonData.averageScore || 0,
                top: comparisonData.topScore || 0,
                unit: "%",
              },
              {
                metric: "Time Efficiency",
                yourValue: results?.timeEfficiency || 0,
                average: comparisonData.averageTimeEfficiency || 0,
                top: comparisonData.topTimeEfficiency || 0,
                unit: "%",
              },
              {
                metric: "Accuracy Rate",
                yourValue: results?.accuracy || 0,
                average: comparisonData.averageAccuracy || 0,
                top: comparisonData.topAccuracy || 0,
                unit: "%",
              },
            ].map((item, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white">{item.metric}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-orange-600 dark:text-orange-400">Your Score</span>
                    <span className="font-medium text-orange-600 dark:text-orange-400">
                      {item.yourValue}
                      {item.unit}
                    </span>
                  </div>
                  <Progress value={item.yourValue} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600 dark:text-blue-400">Class Average</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      {item.average}
                      {item.unit}
                    </span>
                  </div>
                  <Progress value={item.average} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-600 dark:text-green-400">Top Score</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {item.top}
                      {item.unit}
                    </span>
                  </div>
                  <Progress value={item.top} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ComparisonChart
