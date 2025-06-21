"use client"

import { useState, useEffect } from "react"
import { Settings, Key, ChevronRight, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/components/navigation"

export default function PrivilegeGroupCard({ data }) {
  const { navigate } = useNavigation()
  const [privilegeGroupData, setPrivilegeGroupData] = useState({
    id: "1",
    name: "User Management",
    description: "Permissions related to user account management, creation, editing, and deletion",
    privilegeCount: 8,
    roleCount: 3,
    isActive: true,
    createdAt: "2024-01-15",
  })

  useEffect(() => {
    if (data) {
      setPrivilegeGroupData((prevData) => ({ ...prevData, ...data }))
    }
  }, [data])

  const handleCardClick = () => {
    navigate(`/rbac/privilege-groups/details/${privilegeGroupData.id}`)
  }

  return (
    <div
      className="group relative w-full overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:bg-gray-800/90 dark:hover:bg-gray-800 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500"
      onClick={handleCardClick}
    >
      {/* Gradient Header */}
  

      {/* Card Content */}
      <div className="relative p-6">
        {/* Title and Status */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200 line-clamp-1">
              {privilegeGroupData.name}
            </h3>
            <Badge
              variant={privilegeGroupData.isActive ? "default" : "secondary"}
              className={`text-xs ${
                privilegeGroupData.isActive
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              {privilegeGroupData.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed min-h-[60px]">
            {privilegeGroupData.description || "No description provided"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30">
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/40">
              <Key className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-orange-700 dark:text-orange-300">
                {privilegeGroupData.privilegeCount}
              </div>
              <div className="text-xs text-orange-600 dark:text-orange-400">Privileges</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40">
              <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{privilegeGroupData.roleCount}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">Roles</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Created {new Date(privilegeGroupData.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/rbac/privilege-groups/form/${privilegeGroupData.id}`)
              }}
              className="text-xs text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 font-medium px-3 py-1 rounded-md hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all"
            >
              Edit
            </button>
            <div className="flex items-center justify-center rounded-full h-8 w-8 bg-orange-500 text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 group-hover:scale-110">
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
}
