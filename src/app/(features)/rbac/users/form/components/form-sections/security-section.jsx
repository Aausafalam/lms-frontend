"use client"

import { useState } from "react"
import { Lock, Eye, EyeOff, Shield } from "lucide-react"

const SecuritySection = ({ data, onChange, errors, clearError }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleInputChange = (field, value) => {
    onChange({ [field]: value })
    clearError(field)

    // Calculate password strength
    if (field === "password") {
      calculatePasswordStrength(value)
    }
  }

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    setPasswordStrength(strength)
  }

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return "bg-red-500"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-blue-500"
      case 4:
      case 5:
        return "bg-green-500"
      default:
        return "bg-gray-300"
    }
  }

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return "Weak"
      case 2:
        return "Fair"
      case 3:
        return "Good"
      case 4:
      case 5:
        return "Strong"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <Lock className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
            <p className="text-sm text-gray-500">Set up user authentication and security</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={data.password || ""}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.password ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {data.password && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{getPasswordStrengthText()}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Password should contain uppercase, lowercase, numbers, and special characters
                </div>
              </div>
            )}

            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={data.confirmPassword || ""}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.confirmPassword ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Confirm password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>

          {/* Security Options */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-orange-600" />
              Security Options
            </h4>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.requirePasswordChange || false}
                  onChange={(e) => handleInputChange("requirePasswordChange", e.target.checked)}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <div>
                  <div className="font-medium text-gray-900">Require Password Change</div>
                  <div className="text-sm text-gray-500">User must change password on first login</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.enableTwoFactor || false}
                  onChange={(e) => handleInputChange("enableTwoFactor", e.target.checked)}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <div>
                  <div className="font-medium text-gray-900">Enable Two-Factor Authentication</div>
                  <div className="text-sm text-gray-500">Add an extra layer of security</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.accountLockout || false}
                  onChange={(e) => handleInputChange("accountLockout", e.target.checked)}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <div>
                  <div className="font-medium text-gray-900">Account Lockout Protection</div>
                  <div className="text-sm text-gray-500">Lock account after failed login attempts</div>
                </div>
              </label>
            </div>
          </div>

          {/* Password Expiry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
            <select
              value={data.passwordExpiry || "90"}
              onChange={(e) => handleInputChange("passwordExpiry", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">1 year</option>
              <option value="0">Never expires</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecuritySection
