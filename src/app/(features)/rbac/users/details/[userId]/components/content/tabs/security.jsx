"use client"

import { useState } from "react"
import {
  Shield,
  Lock,
  Key,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Globe,
  Eye,
  EyeOff,
  RefreshCw,
  Bell,
  Monitor,
} from "lucide-react"

const SecurityTab = ({ user }) => {
  const [showApiKeys, setShowApiKeys] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(user.security?.twoFactorEnabled || false)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Mock security data
  const securityData = {
    passwordLastChanged: "2024-01-10T14:30:00Z",
    twoFactorEnabled: false,
    apiKeysCount: 2,
    activeSessions: 3,
    lastSecurityAudit: "2024-01-01T00:00:00Z",
    securityScore: 85,
    recentSecurityEvents: [
      {
        id: 1,
        type: "LOGIN_SUCCESS",
        description: "Successful login from new device",
        timestamp: "2024-01-15T10:30:00Z",
        ipAddress: "192.168.1.100",
        location: "New York, US",
        severity: "low",
      },
      {
        id: 2,
        type: "PASSWORD_CHANGE",
        description: "Password changed successfully",
        timestamp: "2024-01-10T14:30:00Z",
        ipAddress: "192.168.1.100",
        location: "New York, US",
        severity: "medium",
      },
      {
        id: 3,
        type: "FAILED_LOGIN",
        description: "Failed login attempt - incorrect password",
        timestamp: "2024-01-08T09:15:00Z",
        ipAddress: "203.0.113.1",
        location: "Unknown",
        severity: "high",
      },
    ],
    activeSessions: [
      {
        id: 1,
        device: "Desktop - Chrome",
        location: "New York, US",
        ipAddress: "192.168.1.100",
        lastActivity: "2024-01-15T10:30:00Z",
        current: true,
      },
      {
        id: 2,
        device: "Mobile - Safari",
        location: "New York, US",
        ipAddress: "10.0.0.25",
        lastActivity: "2024-01-14T18:45:00Z",
        current: false,
      },
      {
        id: 3,
        device: "Desktop - Firefox",
        location: "Boston, US",
        ipAddress: "192.168.2.50",
        lastActivity: "2024-01-13T16:20:00Z",
        current: false,
      },
    ],
    apiKeys: [
      {
        id: 1,
        name: "Mobile App API Key",
        key: "sk_live_*********************abc123",
        created: "2024-01-01T00:00:00Z",
        lastUsed: "2024-01-15T08:30:00Z",
        permissions: ["read", "write"],
      },
      {
        id: 2,
        name: "Integration API Key",
        key: "sk_live_*********************def456",
        created: "2023-12-15T00:00:00Z",
        lastUsed: "2024-01-10T12:15:00Z",
        permissions: ["read"],
      },
    ],
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case "medium":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "low":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />
    }
  }

  const getSecurityScoreColor = (score) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Security Score</p>
              <p className={`text-2xl font-bold mt-1 ${getSecurityScoreColor(securityData.securityScore)}`}>
                {securityData.securityScore}%
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Sessions</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{securityData.activeSessions.length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Monitor className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">API Keys</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{securityData.apiKeysCount}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Key className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">2FA Status</p>
              <p className={`text-lg font-bold mt-1 ${twoFactorEnabled ? "text-green-600" : "text-red-600"}`}>
                {twoFactorEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${twoFactorEnabled ? "bg-green-100" : "bg-red-100"}`}>
              <Smartphone className={`w-6 h-6 ${twoFactorEnabled ? "text-green-600" : "text-red-600"}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>

        <div className="space-y-6">
          {/* Password */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Lock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Password</h4>
                <p className="text-sm text-gray-500">Last changed {formatDate(securityData.passwordLastChanged)}</p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Change Password
            </button>
          </div>

          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  twoFactorEnabled ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <Smartphone className={`w-5 h-5 ${twoFactorEnabled ? "text-green-600" : "text-red-600"}`} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">
                  {twoFactorEnabled ? "Enabled for enhanced security" : "Disabled - recommended to enable"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                twoFactorEnabled
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
            </button>
          </div>

          {/* Security Notifications */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Security Notifications</h4>
                <p className="text-sm text-gray-500">Get notified of suspicious activities</p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Configure
            </button>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Active Sessions</h3>
          <button className="text-sm text-red-600 hover:text-red-700 font-medium">Terminate All Sessions</button>
        </div>

        <div className="space-y-4">
          {securityData.activeSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900">{session.device}</h4>
                    {session.current && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Current</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {session.ipAddress}
                    </span>
                    <span>{session.location}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(session.lastActivity)}
                    </span>
                  </div>
                </div>
              </div>
              {!session.current && (
                <button className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors">
                  Terminate
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">API Keys</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            <Key className="w-4 h-4" />
            Generate New Key
          </button>
        </div>

        <div className="space-y-4">
          {securityData.apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Key className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{apiKey.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {showApiKeys ? apiKey.key : apiKey.key.replace(/[^*]/g, "*")}
                    </code>
                    <button
                      onClick={() => setShowApiKeys(!showApiKeys)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      {showApiKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <span>Created {formatDate(apiKey.created)}</span>
                    <span>Last used {formatDate(apiKey.lastUsed)}</span>
                    <div className="flex gap-1">
                      {apiKey.permissions.map((permission, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 rounded">
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Security Events */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Security Events</h3>

        <div className="space-y-4">
          {securityData.recentSecurityEvents.map((event) => (
            <div key={event.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  event.severity === "high"
                    ? "bg-red-100"
                    : event.severity === "medium"
                      ? "bg-yellow-100"
                      : "bg-green-100"
                }`}
              >
                {getSeverityIcon(event.severity)}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{event.description}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(event.severity)}`}>
                    {event.severity.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(event.timestamp)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    {event.ipAddress}
                  </span>
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SecurityTab
