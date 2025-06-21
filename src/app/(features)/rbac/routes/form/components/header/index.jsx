"use client"

import { Breadcrumb } from "@/components/Breadcrumb"
import { Shield, Route, Copy, Trash2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

const RouteFormHeader = ({ routeId }) => {
  const breadcrumbItems = [
    {
      title: "RBAC Management",
      href: "/rbac",
      icon: <Shield className="h-3.5 w-3.5" />,
    },
    {
      title: "API Routes",
      href: "/rbac/routes",
      icon: <Route className="h-3.5 w-3.5" />,
    },
    {
      title: routeId ? `Edit Route` : "Add Route",
      href: routeId ? `/rbac/routes/form/${routeId}` : "/rbac/routes/form/add",
      icon: <Route className="h-3.5 w-3.5" />,
    },
  ]

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex items-center gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Duplicate Route</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {routeId && (
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
              <TooltipContent>Delete Route</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  )
}

export default RouteFormHeader
