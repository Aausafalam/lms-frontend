"use client"
import { Settings, Bell, Globe, Palette, Clock } from "lucide-react"

const PreferencesSection = ({ data, onChange, errors, clearError }) => {
  const handleInputChange = (field, value) => {
    onChange({ [field]: value })
    clearError(field)
  }

  const handleNotificationChange = (type, enabled) => {
    const notifications = data.notifications || {}
    onChange({
      notifications: {
        ...notifications,
        [type]: enabled,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <Settings className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">User Preferences</h3>
            <p className="text-sm text-gray-500">Configure user interface and notification settings</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Language & Region */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-orange-600" />
              Language & Region
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  value={data.language || "en"}
                  onChange={(e) => handleInputChange("language", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                  <option value="pt">Portuguese</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                <select
                  value={data.timezone || "UTC"}
                  onChange={(e) => handleInputChange("timezone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Europe/London">London</option>
                  <option value="Europe/Paris">Paris</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Theme & Display */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Palette className="w-4 h-4 text-orange-600" />
              Theme & Display
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <select
                  value={data.theme || "light"}
                  onChange={(e) => handleInputChange("theme", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto (System)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                <select
                  value={data.dateFormat || "MM/DD/YYYY"}
                  onChange={(e) => handleInputChange("dateFormat", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  <option value="DD MMM YYYY">DD MMM YYYY</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-orange-600" />
              Notification Preferences
            </h4>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Email Notifications</div>
                    <div className="text-sm text-gray-500">Receive notifications via email</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.notifications?.email || false}
                    onChange={(e) => handleNotificationChange("email", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </label>

              <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Push Notifications</div>
                    <div className="text-sm text-gray-500">Receive browser push notifications</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.notifications?.push || false}
                    onChange={(e) => handleNotificationChange("push", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </label>

              <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">SMS Notifications</div>
                    <div className="text-sm text-gray-500">Receive notifications via SMS</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.notifications?.sms || false}
                    onChange={(e) => handleNotificationChange("sms", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </label>
            </div>
          </div>

          {/* Session Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              Session Settings
            </h4>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
              <select
                value={data.sessionTimeout || "30"}
                onChange={(e) => handleInputChange("sessionTimeout", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="480">8 hours</option>
                <option value="0">Never timeout</option>
              </select>
            </div>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={data.rememberMe || false}
                onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <div>
                <div className="font-medium text-gray-900">Remember Login</div>
                <div className="text-sm text-gray-500">Keep user logged in across browser sessions</div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreferencesSection
