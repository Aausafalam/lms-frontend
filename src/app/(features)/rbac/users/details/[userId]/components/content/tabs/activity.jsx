"use client"

import { useState } from "react"
import {
  Activity,
  Clock,
  MapPin,
  Monitor,
  Smartphone,
  Globe,
  Download,
  RefreshCw,
  LogIn,
  LogOut,
  Edit,
  Eye,
  Shield,
  AlertTriangle,
} from "lucide-react"

const ActivityTab = ({ user }) => {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")

  const getActivityIcon = (type) => {
    switch (type) {
      case "LOGIN":
        return <LogIn className="w-4 h-4 text-green-600" />
      case "LOGOUT":
        return <LogOut className="w-4 h-4 text-gray-600" />
      case "PROFILE_UPDATE":
        return <Edit className="w-4 h-4 text-blue-600" />
      case "VIEW":
        return <Eye className="w-4 h-4 text-purple-600" />
      case "ROLE_CHANGE":
        return <Shield className="w-4 h-4 text-orange-600" />
      case "SECURITY":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case "LOGIN":
        return "bg-green-100"
      case "LOGOUT":
        return "bg-gray-100"
      case "PROFILE_UPDATE":
        return "bg-blue-100"
      case "VIEW":
        return "bg-purple-100"
      case "ROLE_CHANGE":
        return "bg-orange-100"
      case "SECURITY":
        return "bg-red-100"
      default:
        return "bg-gray-100"
    }
  }

  const getDeviceIcon = (device) => {
    if (device.toLowerCase().includes("mobile")) {
      return <Smartphone className="w-4 h-4 text-gray-500" />
    }
    return <Monitor className="w-4 h-4 text-gray-500" />
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: "LOGIN",
      action: "User logged in",
      timestamp: "2024-01-15T10:30:00Z",
      ipAddress: "192.168.1.100",
      location: "New York, US",
      device: "Desktop - Chrome",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    {
      id: 2,
      type: "PROFILE_UPDATE",
      action: "Updated profile information",
      timestamp: "2024-01-15T09:45:00Z",
      ipAddress: "192.168.1.100",
      location: "New York, US",
      device: "Desktop - Chrome",
      details: "Changed mobile number",
    },
    {
      id: 3,
      type: "VIEW",
      action: "Viewed user management page",
      timestamp: "2024-01-15T09:30:00Z",
      ipAddress: "192.168.1.100",
      location: "New York, US",
      device: "Desktop - Chrome",
    },
    {
      id: 4,
      type: "ROLE_CHANGE",
      action: "Role assignment changed",
      timestamp: "2024-01-14T16:20:00Z",
      ipAddress: "192.168.1.50",
      location: "New York, US",
      device: "Desktop - Firefox",
      details: "Added Manager role",
    },
    {
      id: 5,
      type: "LOGIN",
      action: "User logged in",
      timestamp: "2024-01-14T08:15:00Z",
      ipAddress: "10.0.0.25",
      location: "New York, US",
      device: "Mobile - Safari",
    },
    {
      id: 6,
      type: "LOGOUT",
      action: "User logged out",
      timestamp: "2024-01-13T18:45:00Z",
      ipAddress: "10.0.0.25",
      location: "New York, US",
      device: "Mobile - Safari",
    },
    {
      id: 7,
      type: "SECURITY",
      action: "Failed login attempt",
      timestamp: "2024-01-13T14:30:00Z",
      ipAddress: "203.0.113.1",
      location: "Unknown",
      device: "Desktop - Chrome",
      details: "Incorrect password",
    },
  ]

  const filteredActivities = activities.filter((activity) => {
    if (selectedFilter === "all") return true
    return activity.type === selectedFilter
  })

  // Activity statistics
  const stats = {
    totalSessions: activities.filter((a) => a.type === "LOGIN").length,
    avgSessionDuration: "2h 15m",
    lastLogin: activities.find((a) => a.type === "LOGIN")?.timestamp,
    securityEvents: activities.filter((a) => a.type === "SECURITY").length,
  }

  return (
    <div className="space-y-6">
      {/* Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sessions</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats.totalSessions}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <LogIn className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Session</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.avgSessionDuration}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Login</p>
              <p className="text-lg font-bold text-orange-600 mt-1">{formatDate(stats.lastLogin)}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Security Events</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.securityEvents}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Activity Log</h3>
          <div className="flex items-center gap-3">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="1d">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>

            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Activities</option>
              <option value="LOGIN">Logins</option>
              <option value="LOGOUT">Logouts</option>
              <option value="PROFILE_UPDATE">Profile Updates</option>
              <option value="VIEW">Page Views</option>
              <option value="ROLE_CHANGE">Role Changes</option>
              <option value="SECURITY">Security Events</option>
            </select>

            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>

            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}
              >
                {getActivityIcon(activity.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{activity.action}</h4>
                  <span className="text-sm text-gray-500">{formatDate(activity.timestamp)}</span>
                </div>

                {activity.details && <p className="text-sm text-gray-600 mb-2">{activity.details}</p>}

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <span>{activity.ipAddress}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{activity.location}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {getDeviceIcon(activity.device)}
                    <span>{activity.device}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Activity Found</h3>
            <p className="text-gray-500">No activities match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ActivityTab
