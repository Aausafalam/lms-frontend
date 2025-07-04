"use client"

import { memo, useState } from "react"
import { Lock, Eye, EyeOff, Shield, CheckCircle, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { FormSection } from "@/components/formSection"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export const SecuritySection = memo(function SecuritySection({ handlers = {}, formData = {}, sectionRef, isActive }) {
  const { handleInputChange } = handlers
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSwitchChange = (field, checked) => {
    handleInputChange({
      target: {
        name: field,
        value: checked,
      },
    })
  }

  return (
    <FormSection
      id="security"
      title="Security Settings"
      icon={<Lock className="h-5 w-5" />}
      description="Configure user authentication and security options"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <Input
              label="Password"
              labelIcon={<Lock className="h-3.5 w-3.5" />}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={formData.password || ""}
              onChange={handleInputChange}
              required
              helperText="Minimum 8 characters with uppercase, lowercase, numbers, and symbols"
              error={!formData.password ? "Password is required" : ""}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="relative">
            <Input
              label="Confirm Password"
              labelIcon={<Lock className="h-3.5 w-3.5" />}
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={formData.confirmPassword || ""}
              onChange={handleInputChange}
              required
              helperText="Re-enter the password to confirm"
              error={
                formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword
                  ? "Passwords do not match"
                  : ""
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <Shield className="w-4 w-4 text-blue-500" />
            Security Options
          </h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    formData.requirePasswordChange
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-gray-100 dark:bg-gray-900/30"
                  }`}
                >
                  {formData.requirePasswordChange ? (
                    <CheckCircle className="h-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium">Require Password Change</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">User must change password on first login</p>
                </div>
              </div>
              <Switch
                checked={formData.requirePasswordChange || false}
                onCheckedChange={(checked) => handleSwitchChange("requirePasswordChange", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    formData.enableTwoFactor ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-900/30"
                  }`}
                >
                  {formData.enableTwoFactor ? (
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Enable 2FA for enhanced security</p>
                </div>
              </div>
              <Switch
                checked={formData.enableTwoFactor || false}
                onCheckedChange={(checked) => handleSwitchChange("enableTwoFactor", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    formData.accountLockout ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-900/30"
                  }`}
                >
                  {formData.accountLockout ? (
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium">Account Lockout Protection</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Lock account after failed login attempts</p>
                </div>
              </div>
              <Switch
                checked={formData.accountLockout || false}
                onCheckedChange={(checked) => handleSwitchChange("accountLockout", checked)}
              />
            </div>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-950/10 rounded-lg p-4 border border-orange-100 dark:border-orange-900/20">
          <p className="text-sm text-orange-700 dark:text-orange-400 flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>
              Strong security settings help protect user accounts from unauthorized access. Enable appropriate options
              based on your security requirements.
            </span>
          </p>
        </div>
      </div>
    </FormSection>
  )
})
