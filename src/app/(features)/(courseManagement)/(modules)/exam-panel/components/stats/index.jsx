"use client"
import { Clock, CheckCircle, Calendar, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const ExamStats = ({ stats }) => {
  const statCards = [
    {
      title: "Total Exams",
      value: stats?.total || 0,
      icon: Calendar,
      color: "bg-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Completed",
      value: stats?.completed || 0,
      icon: CheckCircle,
      color: "bg-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Upcoming",
      value: stats?.upcoming || 0,
      icon: Clock,
      color: "bg-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
      textColor: "text-orange-600 dark:text-orange-400",
    },
    {
      title: "Average Score",
      value: `${stats?.averageScore || 0}%`,
      icon: Target,
      color: "bg-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      textColor: "text-purple-600 dark:text-purple-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                {stat.title === "Average Score" && stats?.averageScore && (
                  <div className="space-y-1">
                    <Progress value={stats.averageScore} className="h-2" />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {stats.averageScore >= 80
                        ? "Excellent"
                        : stats.averageScore >= 60
                          ? "Good"
                          : stats.averageScore >= 40
                            ? "Average"
                            : "Needs Improvement"}
                    </p>
                  </div>
                )}
              </div>
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ExamStats
