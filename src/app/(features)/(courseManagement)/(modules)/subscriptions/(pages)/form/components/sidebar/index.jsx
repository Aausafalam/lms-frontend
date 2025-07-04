"use client"

import { FileText, DollarSign, Shield, Star, Settings, CreditCard, BookOpen, Tag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import SidebarMenu from "@/components/sidebarMenu"

export function SidebarNavigation({ activeSection, scrollToSection, formData, handlers }) {
  const { handleInputChange } = handlers

  const navigationItems = [
    { id: "basic", label: "Basic Info", icon: <FileText className="h-4 w-4" /> },
    { id: "pricing", label: "Pricing", icon: <DollarSign className="h-4 w-4" /> },
    { id: "access", label: "Access & Trial", icon: <Shield className="h-4 w-4" /> },
    { id: "courses", label: "Courses", icon: <BookOpen className="h-4 w-4" /> },
    { id: "features", label: "Features", icon: <Star className="h-4 w-4" /> },
    { id: "metadata", label: "Metadata", icon: <Tag className="h-4 w-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ]

  const statusOptions = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
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
                name="isActive"
                value={formData.isActive}
                onChange={handlers.handleSwitchChange}
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
