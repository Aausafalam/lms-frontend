"use client"

import { Activity, Calendar, Key, Users, Edit, Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ActivityTab({ roleData }) {
  const getActivityIcon = (type) => {
    const icons = {
      role_created: <Plus className="h-4 w-4 text-green-500" />,
      role_updated: <Edit className="h-4 w-4 text-blue-500" />,
      privilege_added: <Key className="h-4 w-4 text-orange-500" />,
      privilege_removed: <Key className="h-4 w-4 text-red-500" />,
      user_assigned: <Users className="h-4 w-4 text-green-500" />,
      user_removed: <Users className="h-4 w-4 text-red-500" />,
      role_deleted: <Trash2 className="h-4 w-4 text-red-500" />,
    }
    return icons[type] || <Activity className="h-4 w-4 text-gray-500" />
  }

  const getActivityColor = (type) => {
    const colors = {
      role_created: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      role_updated: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      privilege_added: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
      privilege_removed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      user_assigned: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      user_removed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      role_deleted: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    }
    return colors[type] || "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{roleData.activityLog.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Activities</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {
                  roleData.activityLog.filter(
                    (activity) => activity.type.includes("added") || activity.type.includes("assigned"),
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Additions</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {roleData.activityLog.filter((activity) => activity.type.includes("updated")).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Updates</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {
                  roleData.activityLog.filter(
                    (activity) => activity.type.includes("removed") || activity.type.includes("deleted"),
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Removals</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-orange-500" />
            Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roleData.activityLog.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex-shrink-0 p-2 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{activity.action}</h4>
                      <Badge className={`text-xs ${getActivityColor(activity.type)}`}>
                        {activity.type.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{activity.description}</p>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                      <AvatarFallback className="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 text-xs">
                        {activity.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{activity.user.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
