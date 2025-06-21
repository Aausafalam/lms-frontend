"use client"

import { useState, useEffect } from "react"
import { Key, Route, ChevronRight, Shield, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/components/navigation"

export default function PrivilegeCard({ data }) {
  const { navigate } = useNavigation()
  const [privilegeData, setPrivilegeData] = useState({
    id: "1",
    name: "User Create",
    description: "Permission to create new user accounts and set initial user properties",
    privilegeGroup: {
      id: "1",
      name: "User Management",
    },
    routes: [
      { id: "1", name: "Create User", method: "POST", endPoint: "/users" },
      { id: "2", name: "Validate User", method: "POST", endPoint: "/users/validate" },
    ],
    roleCount: 3,
    isActive: true,
    createdAt: "2024-01-15",
  })

  useEffect(() => {
    if (data) {
      setPrivilegeData((prevData) => ({ ...prevData, ...data }))
    }
  }, [data])

  const handleCardClick = () => {
    navigate(`/rbac/privileges/details/${privilegeData.id}`)
  }

  const getMethodColor = (method) => {
    const colors = {
      GET: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      PUT: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      DELETE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      PATCH: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    }
    return colors[method] || "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
  }

  return (
    <div
      className="group relative w-full overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:bg-gray-800/90 dark:hover:bg-gray-800 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500"
      onClick={handleCardClick}
    >
      {/* Gradient Header */}
    

      {/* Card Content */}
      <div className="relative p-6">
        {/* Title and Group */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200 line-clamp-1">
              {privilegeData.name}
            </h3>
            <Badge
              variant="outline"
              className="text-xs bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-800"
            >
              {privilegeData.privilegeGroup?.name}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed min-h-[40px]">
            {privilegeData.description || "No description provided"}
          </p>
        </div>

        {/* Routes Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              Associated Routes
            </h4>
            <Badge variant="secondary" className="text-xs">
              {privilegeData.routes?.length || 0} routes
            </Badge>
          </div>
          <div className="space-y-2 h-20 overflow-y-auto">
            {privilegeData.routes?.slice(0, 2).map((route, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-md bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center space-x-2">
                  <Route className="h-3 w-3 text-gray-500" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                    {route.endPoint}
                  </span>
                </div>
                <Badge className={`text-xs px-2 py-0.5 ${getMethodColor(route.method)}`}>{route.method}</Badge>
              </div>
            ))}
            {privilegeData.routes?.length > 2 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-1">
                +{privilegeData.routes.length - 2} more routes
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
            <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/40">
              <Shield className="h-3 w-3 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-blue-700 dark:text-blue-300">{privilegeData.roleCount}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">Roles</div>
            </div>
          </div>

          <div className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30">
            <div className="p-1.5 rounded-md bg-green-100 dark:bg-green-900/40">
              <Lock className="h-3 w-3 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-green-700 dark:text-green-300">
                {privilegeData.isActive ? "Active" : "Inactive"}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">Status</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Created {new Date(privilegeData.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/rbac/privileges/form/${privilegeData.id}`)
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
