"use client"

import { FileText, DollarSign, Shield, Star, Settings, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import SidebarMenu from "@/components/sidebarMenu"

export function SidebarNavigation({ activeSection, scrollToSection, formData, handlers }) {
  const { handleInputChange } = handlers

  const navigationItems = [
    { id: "basic", label: "Basic Info", icon: <FileText className="h-4 w-4" /> },
    { id: "pricing", label: "Pricing", icon: <DollarSign className="h-4 w-4" /> },
    { id: "access", label: "Access & Limits", icon: <Shield className="h-4 w-4" /> },
    { id: "features", label: "Features", icon: <Star className="h-4 w-4" /> },
    { id: "settings", label: "Plan Settings", icon: <Settings className="h-4 w-4" /> },
  ]

  const statusOptions = [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
    { label: "Draft", value: "DRAFT" },
  ]

  return (
    <div className="sticky top-8 max-w-52">
      <SidebarMenu navigationItems={navigationItems} onClick={scrollToSection} activeSection={activeSection} />

      <Card className="overflow-hidden border-0 mt-4 bg-white dark:bg-gray-900">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Plan Status
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">Status</Label>
              <Select
                name="status"
                value={formData.status || "ACTIVE"}
                onChange={handleInputChange}
                options={statusOptions}
                placeholder="Select status"
                fieldClassName="py-1 min-h-0 px-3"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
