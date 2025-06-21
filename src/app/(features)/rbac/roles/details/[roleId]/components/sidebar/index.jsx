"use client"

import { FileText, Key, Users, Activity, Crown, Shield, UserCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import SidebarMenu from "@/components/sidebarMenu"

export function RoleDetailsSidebar({ activeTab, setActiveTab, roleData }) {
  const navigationItems = [
    { id: "overview", label: "Overview", icon: <FileText className="h-4 w-4" /> },
    { id: "privileges", label: "Privileges", icon: <Key className="h-4 w-4" /> },
    { id: "users", label: "Assigned Users", icon: <Users className="h-4 w-4" /> },
    { id: "activity", label: "Activity", icon: <Activity className="h-4 w-4" /> },
  ]

  const getRoleIcon = (roleName) => {
    const name = roleName.toLowerCase()
    if (name.includes("admin")) return <Crown className="h-6 w-6 text-red-500" />
    if (name.includes("manager")) return <Shield className="h-6 w-6 text-blue-500" />
    return <UserCheck className="h-6 w-6 text-orange-500" />
  }

  const getRoleColor = (roleName) => {
    const name = roleName.toLowerCase()
    if (name.includes("admin")) return "from-red-500 to-red-600"
    if (name.includes("manager")) return "from-blue-500 to-blue-600"
    return "from-orange-500 to-orange-600"
  }

  return (
    <div className="sticky top-8 space-y-6">
      {/* Role Summary Card */}
      {/* <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className={`h-20 bg-gradient-to-r ${getRoleColor(roleData.name)} relative`}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="absolute bottom-3 left-4">
            <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
              {getRoleIcon(roleData.name)}
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <Badge
              variant={roleData.isActive ? "default" : "secondary"}
              className={`text-xs ${
                roleData.isActive
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              {roleData.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{roleData.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{roleData.description}</p>

          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
              <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{roleData.privilegeCount}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">Privileges</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30">
              <div className="text-lg font-bold text-green-700 dark:text-green-300">{roleData.userCount}</div>
              <div className="text-xs text-green-600 dark:text-green-400">Users</div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Navigation Menu */}
      <SidebarMenu navigationItems={navigationItems} onClick={setActiveTab} activeSection={activeTab} />
    </div>
  )
}
