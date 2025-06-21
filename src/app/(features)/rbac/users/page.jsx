"use client"

import { useState, useMemo } from "react"
import { Plus, Search, Download, Upload, Users, UserCheck, UserX, Clock } from "lucide-react"
import UserTable from "./components/table"
import DeleteUser from "./components/delete"
import { useModalHandler } from "./hooks/useModalHandler"

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedRole, setSelectedRole] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  const { isDeleteModalOpen, selectedUser, handleDeleteClick, handleDeleteConfirm, handleDeleteCancel } =
    useModalHandler()

  // Mock data - replace with actual API call
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      mobile: "+1234567890",
      gender: "MALE",
      status: "ACTIVE",
      profilePic: "/placeholder.svg?height=40&width=40",
      roles: ["Admin", "Manager"],
      lastLogin: "2024-01-15T10:30:00Z",
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      mobile: "+1234567891",
      gender: "FEMALE",
      status: "ACTIVE",
      profilePic: "/placeholder.svg?height=40&width=40",
      roles: ["Manager"],
      lastLogin: "2024-01-14T15:45:00Z",
      createdAt: "2024-01-02T00:00:00Z",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      mobile: null,
      gender: "MALE",
      status: "INACTIVE",
      profilePic: null,
      roles: ["User"],
      lastLogin: "2024-01-10T09:15:00Z",
      createdAt: "2024-01-03T00:00:00Z",
    },
  ]

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === "all" || user.status === selectedStatus
      const matchesRole = selectedRole === "all" || user.roles.some((role) => role === selectedRole)

      return matchesSearch && matchesStatus && matchesRole
    })
  }, [users, searchTerm, selectedStatus, selectedRole])

  const stats = useMemo(() => {
    const total = users.length
    const active = users.filter((u) => u.status === "ACTIVE").length
    const inactive = users.filter((u) => u.status === "INACTIVE").length
    const suspended = users.filter((u) => u.status === "SUSPENDED").length

    return { total, active, inactive, suspended }
  }, [users])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-1">Manage system users and their permissions</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Upload className="w-4 h-4" />
                Import
              </button>
              <a
                href="/rbac/users/form/add"
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add User
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.active}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive Users</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{stats.inactive}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <UserX className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recent Logins</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">24h</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="SUSPENDED">Suspended</option>
                <option value="PENDING">Pending</option>
              </select>

              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
              </select>

              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "table" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <UserTable users={filteredUsers} viewMode={viewMode} onDeleteClick={handleDeleteClick} />
      </div>

      {/* Delete Modal */}
      <DeleteUser
        isOpen={isDeleteModalOpen}
        user={selectedUser}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  )
}

export default UsersPage
