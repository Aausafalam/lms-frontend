"use client"

import { memo } from "react"
import { Shield, X, Crown, User } from "lucide-react"
import { Select } from "@/components/ui/select"
import { FormSection } from "@/components/formSection"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export const RolesSection = memo(function RolesSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
  const { handleInputChange } = handlers
  const [searchTerm, setSearchTerm] = useState("")

  const availableRoles = [
    {
      label: "Administrator - Full system access",
      value: "1",
      name: "Administrator",
      description: "Full system access",
    },
    { label: "Manager - Management level access", value: "2", name: "Manager", description: "Management level access" },
    {
      label: "Instructor - Course management access",
      value: "3",
      name: "Instructor",
      description: "Course management access",
    },
    { label: "Student - Basic learning access", value: "4", name: "Student", description: "Basic learning access" },
    {
      label: "Content Creator - Content creation access",
      value: "5",
      name: "Content Creator",
      description: "Content creation access",
    },
  ]

  const getRoleIcon = (roleName) => {
    switch (roleName?.toLowerCase()) {
      case "administrator":
        return <Crown className="w-4 h-4" />
      case "manager":
        return <Shield className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getRoleColor = (roleName) => {
    switch (roleName?.toLowerCase()) {
      case "administrator":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
      case "manager":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "instructor":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const selectedRoles = formData.roles || []

  const removeRole = (index) => {
    const updatedRoles = selectedRoles.filter((_, i) => i !== index)
    handleInputChange({
      target: {
        name: "roles",
        value: updatedRoles,
      },
    })
  }

  return (
    <FormSection
      id="roles"
      title="Roles & Permissions"
      icon={<Shield className="h-5 w-5" />}
      description="Assign roles to define user permissions"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <Select
          label="Assign Roles"
          labelIcon={<Shield className="h-3.5 w-3.5" />}
          name="roles"
          placeholder="Select roles to assign"
          value={formData.roles?.map((role) => role?.id) || []}
          onChange={handleInputChange}
          options={availableRoles}
          isMulti
          required
          helperText="Choose which roles this user should have"
          error={!formData.roles?.length ? "At least one role is required" : ""}
        />

        {selectedRoles.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Assigned Roles</h4>
            <div className="space-y-2">
              {selectedRoles.map((role, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getRoleColor(role.name)}`}>{getRoleIcon(role.name)}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{role.name}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{role.description}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRole(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50 dark:bg-blue-950/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/20">
          <p className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>
              Roles define what actions users can perform in the system. Select appropriate roles based on the user's
              responsibilities.
            </span>
          </p>
        </div>
      </div>
    </FormSection>
  )
})
