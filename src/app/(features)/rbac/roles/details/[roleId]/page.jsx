"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Breadcrumb } from "@/components/Breadcrumb"
import { Shield, UserCheck, Edit, Copy, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useNavigation } from "@/components/navigation"
import { RoleDetailsContent } from "./components/content"
import { RoleDetailsSidebar } from "./components/sidebar"
import { sampleRoleDetailsData } from "./utils/seeds"

const RoleDetailsPage = () => {
  const { roleId } = useParams()
  const { navigate } = useNavigation()
  const [activeTab, setActiveTab] = useState("overview")

  // In a real app, you would fetch the role data here
  const roleData = sampleRoleDetailsData

  const breadcrumbItems = [
    {
      title: "RBAC Management",
      href: "/rbac",
      icon: <Shield className="h-3.5 w-3.5" />,
    },
    {
      title: "Roles",
      href: "/rbac/roles",
      icon: <UserCheck className="h-3.5 w-3.5" />,
    },
    {
      title: roleData.name,
      href: `/rbac/roles/details/${roleId}`,
      icon: <UserCheck className="h-3.5 w-3.5" />,
    },
  ]

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate(`/rbac/roles/form/${roleId}`)}
                  className="rounded-full h-9 w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800 hover:border-orange-300"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit Role</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-9 w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800 hover:border-orange-300"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Duplicate Role</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete Role</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <RoleDetailsSidebar activeTab={activeTab} setActiveTab={setActiveTab} roleData={roleData} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"> */}
            <RoleDetailsContent activeTab={activeTab} roleData={roleData} />
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default RoleDetailsPage
