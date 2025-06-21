"use client"

import { useState } from "react"
import { Shield, Search, X, Users, ChevronDown, ChevronUp } from "lucide-react"

const RolesSection = ({ data, onChange, errors, clearError, availableRoles = [] }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedRole, setExpandedRole] = useState(null)
  const selectedRoles = data.selectedRoles || []

  const handleRoleToggle = (roleId) => {
    const updatedRoles = selectedRoles.includes(roleId)
      ? selectedRoles.filter((id) => id !== roleId)
      : [...selectedRoles, roleId]

    onChange({ selectedRoles: updatedRoles })
    clearError("roles")
  }

  const filteredRoles = availableRoles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getSelectedRoleDetails = () => {
    return availableRoles.filter((role) => selectedRoles.includes(role.id))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Role Assignment</h3>
            <p className="text-sm text-gray-500">Assign roles to define user permissions</p>
          </div>
        </div>

        {/* Selected Roles Summary */}
        {selectedRoles.length > 0 && (
          <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Selected Roles ({selectedRoles.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {getSelectedRoleDetails().map((role) => (
                <div
                  key={role.id}
                  className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-orange-200"
                >
                  <span className="text-sm text-gray-700">{role.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRoleToggle(role.id)}
                    className="text-orange-500 hover:text-orange-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Search roles..."
            />
          </div>
        </div>

        {/* Available Roles */}
        <div className="space-y-3">
          {filteredRoles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Shield className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No roles found</p>
            </div>
          ) : (
            filteredRoles.map((role) => (
              <div
                key={role.id}
                className={`border rounded-lg transition-all ${
                  selectedRoles.includes(role.id)
                    ? "border-orange-200 bg-orange-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedRoles.includes(role.id)}
                          onChange={() => handleRoleToggle(role.id)}
                          className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                      </label>
                      <div>
                        <h4 className="font-medium text-gray-900">{role.name}</h4>
                        <p className="text-sm text-gray-500">{role.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          role.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {role.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {expandedRole === role.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Role Details */}
                  {expandedRole === role.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Privileges:</span>
                          <span className="ml-2 text-gray-600">{role.privileges?.length || 0} assigned</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Users:</span>
                          <span className="ml-2 text-gray-600">{role.userCount || 0} assigned</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Created:</span>
                          <span className="ml-2 text-gray-600">
                            {role.createdAt ? new Date(role.createdAt).toLocaleDateString() : "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Priority:</span>
                          <span className="ml-2 text-gray-600">{role.priority || "Normal"}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {errors.roles && <p className="mt-2 text-sm text-red-600">{errors.roles}</p>}
      </div>
    </div>
  )
}

export default RolesSection
