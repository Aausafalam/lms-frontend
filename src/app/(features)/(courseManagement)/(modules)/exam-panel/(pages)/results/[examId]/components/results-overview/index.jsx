"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Clock, Target, Award, Users } from "lucide-react"

const ResultsOverview = ({ results }) => {
  const sectionResults = results?.sectionResults || []

  return (
    <div className="space-y-6">
      {/* Section-wise Performance */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-500" />
            Section-wise Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sectionResults.map((section, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">{section.name}</h4>
                  <Badge
                    className={`${
                      section.score >= 80
                        ? "bg-green-100 text-green-700 border-green-200"
                        : section.score >= 60
                          ? "bg-orange-100 text-orange-700 border-orange-200"
                          : "bg-red-100 text-red-700 border-red-200"
                    }`}
                  >
                    {section.score}%
                  </Badge>
                </div>

                <div className="space-y-2">
                  <Progress value={section.score} className="h-2" />
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Correct: {section.correct}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span>Wrong: {section.wrong}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>Time: {section.timeTaken}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-orange-500" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results?.strengths?.map((strength, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">{strength}</p>
                </div>
              )) || <p className="text-sm text-gray-500 dark:text-gray-400">No specific strengths identified.</p>}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-500" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results?.improvements?.map((improvement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">{improvement}</p>
                </div>
              )) || (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Great job! No major areas for improvement identified.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exam Statistics */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-500" />
            Exam Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{results?.totalParticipants || 0}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Participants</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{results?.averageScore || 0}%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{results?.highestScore || 0}%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Highest Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{results?.passPercentage || 0}%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pass Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResultsOverview
