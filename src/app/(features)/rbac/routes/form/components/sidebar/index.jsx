"use client"

import { Route, Settings, FileText, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import SidebarMenu from "@/components/sidebarMenu"

export function SidebarNavigation({ activeSection, scrollToSection, formData, handlers }) {
  const { handleInputChange } = handlers

  const navigationItems = [
    { id: "basic", label: "Basic Info", icon: <FileText className="h-4 w-4" /> },
    { id: "configuration", label: "Configuration", icon: <Settings className="h-4 w-4" /> },
    { id: "security", label: "Security", icon: <Shield className="h-4 w-4" /> },
  ]

  const typeOptions = [
    { label: "API", value: "API" },
    { label: "WEB", value: "WEB" },
    { label: "WEBHOOK", value: "WEBHOOK" },
  ]

  return (
    <div className="sticky top-8 max-w-52">
      <SidebarMenu navigationItems={navigationItems} onClick={scrollToSection} activeSection={activeSection} />

      <Card className="overflow-hidden border-0 mt-4 bg-white dark:bg-gray-900">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm flex items-center">
            <Route className="h-4 w-4 mr-2" />
            Route Type
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">Route Type</Label>
              <Select
                name="type"
                value={formData.type || "API"}
                onChange={handleInputChange}
                options={typeOptions}
                placeholder="Select type"
                fieldClassName="py-1 min-h-0 px-3"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
