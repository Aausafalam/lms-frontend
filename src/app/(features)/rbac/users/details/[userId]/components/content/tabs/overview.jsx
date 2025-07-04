"use client"

import { useState } from "react"
import { User, Mail, Phone, Calendar, Clock, Shield, Activity, MapPin, Globe, Edit, Eye, UserCheck } from "lucide-react"

const OverviewTab = ({ user }) => {
  const [activeTab, setActiveTab] = useState("overview")

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatLastLogin = (dateString) => {
    if (!dateString) return "Never"
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} days ago`
    return date.toLocaleDateString()
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "text-green-600 bg-green-100"
      case "INACTIVE":
        return "text-gray-600 bg-gray-100"
      case "SUSPENDED":
        return "text-red-600 bg-red-100"
      case "PENDING":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Account Status</p>
              <p className={`w-fit  mt-1 px-2 py-1 rounded-full text-sm ${getStatusColor(user.status)}`}>
                {user.status}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Assigned Roles</p>
              <p className="text-lg font-bold text-gray-900 mt-1">{user.roles.length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Activity</p>
              <p className="text-lg font-bold text-gray-900 mt-1">{formatLastLogin(user.lastLogin)}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-900">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </div>

            {user.mobile && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Mobile Number</p>
                  <p className="font-medium text-gray-900">{user.mobile}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium text-gray-900 capitalize">{user.gender.toLowerCase().replace("_", " ")}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Date Joined</p>
                <p className="font-medium text-gray-900">{formatDate(user.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium text-gray-900">{formatDate(user.updatedAt)}</p>
              </div>
            </div>

            {user.location && (
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">{user.location}</p>
                </div>
              </div>
            )}

            {user.timezone && (
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Timezone</p>
                  <p className="font-medium text-gray-900">{user.timezone}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Statistics</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{user.stats?.totalLogins || 0}</p>
            <p className="text-sm text-gray-600">Total Logins</p>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{user.stats?.sessionsThisMonth || 0}</p>
            <p className="text-sm text-gray-600">Sessions This Month</p>
          </div>

          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{user.roles.length}</p>
            <p className="text-sm text-gray-600">Active Roles</p>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{user.stats?.avgSessionDuration || "0m"}</p>
            <p className="text-sm text-gray-600">Avg Session</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <button
            onClick={() => setActiveTab("activity")}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            View All
          </button>
        </div>

        <div className="space-y-4">
          {user.recentActivity?.slice(0, 5).map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Activity className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
              </div>
              <div className="text-xs text-gray-400">{activity.ipAddress}</div>
            </div>
          )) || (
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No recent activity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OverviewTab
