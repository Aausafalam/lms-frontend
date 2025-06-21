"use client"

import { useState } from "react"
import { Shield, Crown, User, Plus, Search, ChevronDown, ChevronRight, Lock, Unlock, Edit, Trash2 } from "lucide-react"

const RolesTab = ({ user }) => {
  const [expandedGroups, setExpandedGroups] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }))
  }

  const getRoleIcon = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return <Crown className="w-4 h-4" />
      case "manager":
        return <Shield className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "manager":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Mock data for user's effective permissions grouped by privilege groups
  const effectivePermissions = [
    {
      id: 1,
      name: "User Management",
      description: "Manage system users and their access",
      privileges: [
        { id: 1, name: "User Create", description: "Create new users", routes: ["POST /api/users"], granted: true },
        {
          id: 2,
          name: "User Read",
          description: "View user information",
          routes: ["GET /api/users", "GET /api/users/:id"],
          granted: true,
        },
        {
          id: 3,
          name: "User Update",
          description: "Update user information",
          routes: ["PUT /api/users/:id"],
          granted: true,
        },
        { id: 4, name: "User Delete", description: "Delete users", routes: ["DELETE /api/users/:id"], granted: false },
      ],
    },
    {
      id: 2,
      name: "Role Management",
      description: "Manage roles and permissions",
      privileges: [
        { id: 5, name: "Role Create", description: "Create new roles", routes: ["POST /api/roles"], granted: true },
        { id: 6, name: "Role Read", description: "View role information", routes: ["GET /api/roles"], granted: true },
        {
          id: 7,
          name: "Role Update",
          description: "Update role information",
          routes: ["PUT /api/roles/:id"],
          granted: false,
        },
        { id: 8, name: "Role Delete", description: "Delete roles", routes: ["DELETE /api/roles/:id"], granted: false },
      ],
    },
    {
      id: 3,
      name: "Content Management",
      description: "Manage application content",
      privileges: [
        {
          id: 9,
          name: "Content Create",
          description: "Create new content",
          routes: ["POST /api/content"],
          granted: true,
        },
        { id: 10, name: "Content Read", description: "View content", routes: ["GET /api/content"], granted: true },
        {
          id: 11,
          name: "Content Update",
          description: "Update content",
          routes: ["PUT /api/content/:id"],
          granted: true,
        },
        {
          id: 12,
          name: "Content Delete",
          description: "Delete content",
          routes: ["DELETE /api/content/:id"],
          granted: true,
        },
      ],
    },
  ]

  const filteredPermissions = effectivePermissions.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.privileges.some((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

    if (selectedFilter === "granted") {
      return matchesSearch && group.privileges.some((p) => p.granted)
    } else if (selectedFilter === "denied") {
      return matchesSearch && group.privileges.some((p) => !p.granted)
    }

    return matchesSearch
  })

  const totalPrivileges = effectivePermissions.reduce((sum, group) => sum + group.privileges.length, 0)
  const grantedPrivileges = effectivePermissions.reduce(
    (sum, group) => sum + group.privileges.filter((p) => p.granted).length,
    0,
  )

  return (
    <div className="space-y-6">
      {/* Role Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Assigned Roles</h3>
          <button className="flex items-center gap-2 px-3 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            <Plus className="w-4 h-4" />
            Assign Role
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.roles.map((role, index) => (
            <div key={index} className={`p-4 rounded-lg border ${getRoleColor(role)}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getRoleIcon(role)}
                  <span className="font-medium">{role}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 hover:bg-white hover:bg-opacity-50 rounded">
                    <Edit className="w-3 h-3" />
                  </button>
                  <button className="p-1 hover:bg-white hover:bg-opacity-50 rounded">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <p className="text-xs opacity-75">Role assigned on {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Permission Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Privileges</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalPrivileges}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Granted</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{grantedPrivileges}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Unlock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Denied</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{totalPrivileges - grantedPrivileges}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Lock className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Effective Permissions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Effective Permissions</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search permissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Permissions</option>
              <option value="granted">Granted Only</option>
              <option value="denied">Denied Only</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredPermissions.map((group) => (
            <div key={group.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {expandedGroups[group.id] ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">{group.name}</h4>
                    <p className="text-sm text-gray-500">{group.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {group.privileges.filter((p) => p.granted).length}/{group.privileges.length} granted
                  </span>
                </div>
              </button>

              {expandedGroups[group.id] && (
                <div className="p-4 space-y-3">
                  {group.privileges.map((privilege) => (
                    <div key={privilege.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            privilege.granted ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          {privilege.granted ? (
                            <Unlock className="w-4 h-4 text-green-600" />
                          ) : (
                            <Lock className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900">{privilege.name}</h5>
                          <p className="text-sm text-gray-500">{privilege.description}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {privilege.routes.map((route, index) => (
                              <span key={index} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                {route}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          privilege.granted ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {privilege.granted ? "Granted" : "Denied"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RolesTab
