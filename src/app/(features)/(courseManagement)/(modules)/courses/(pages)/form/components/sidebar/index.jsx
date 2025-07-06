"use client"

import {
  FileText,
  ImageIcon,
  BookOpen,
  GraduationCap,
  Award,
  BadgeIcon as Certificate,
  Star,
  Settings,
  Paperclip,
  Users,
  User2Icon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch as SwitchComponent } from "@/components/ui/switch"
import { Select } from "@/components/ui/select"
import SidebarMenu from "@/components/sidebarMenu"

/**
 * Sidebar Navigation Component
 * Provides navigation between form sections and course status controls
 *
 * @param {Object} props - Component props
 * @param {string} props.activeSection - Currently active section ID
 * @param {Function} props.scrollToSection - Function to scroll to a section
 * @param {Object} props.formData - Current form data
 * @param {Object} props.handlers - Form event handlers
 */
export function SidebarNavigation({ activeSection, scrollToSection, formData, handlers }) {
  const { handleSwitchChange, handleInputChange } = handlers

  // Navigation items configuration
  const navigationItems = [
    { id: "basic", label: "Basic Info", icon: <FileText className="h-4 w-4" /> },
    { id: "media", label: "Media", icon: <ImageIcon className="h-4 w-4" /> },
    { id: "content", label: "Content", icon: <BookOpen className="h-4 w-4" /> },
    { id: "learning-outcomes", label: "Learning Outcomes", icon: <GraduationCap className="h-4 w-4" /> },
    { id: "prerequisites", label: "Prerequisites", icon: <Award className="h-4 w-4" /> },
    { id: "certificate", label: "Certificate", icon: <Certificate className="h-4 w-4" /> },
    { id: "features", label: "Features", icon: <Star className="h-4 w-4" /> },
    { id: "instructors", label: "Instructors", icon: <User2Icon className="h-4 w-4" /> },
    { id: "metadata", label: "Metadata", icon: <Settings className="h-4 w-4" /> },
    { id: "attachments", label: "Attachments", icon: <Paperclip className="h-4 w-4" /> },
  ]

  // Status options
  const statusOptions = [
    { label: "Draft", value: "draft" },
    { label: "Published", value: "published" },
    { label: "Archived", value: "archive" },
  ]

  return (
    <div className="sticky top-8 w-full max-w-52">
      {/* Navigation Card */}
      <SidebarMenu
        navigationItems={navigationItems}
        activeSection={activeSection}
        onClick={scrollToSection}
        className="mb-4"
      />

      {/* Course Status Card */}
      <Card className="overflow-hidden border-0 bg-white dark:bg-gray-900">
        <CardHeader className="p-3 sm:p-4 pb-2">
          <CardTitle className="text-sm flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Course Status
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-0">
          <div className="space-y-3 sm:space-y-4">
            {/* Status Dropdown */}
            <div>
              <Label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">Publication Status</Label>
              <Select
                name="status"
                value={formData.status || "draft"}
                onChange={handleInputChange}
                options={statusOptions}
                placeholder="Select status"
                fieldClassName="py-1 min-h-0 px-3 text-sm"
              />
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center justify-between">
              <Label
                htmlFor="isFeatured"
                className="cursor-pointer text-xs text-gray-600 dark:text-gray-400 font-normal"
              >
                Featured Course
              </Label>
              <SwitchComponent
                name="isFeatured"
                onCheckedChange={(data) => handleSwitchChange("isFeatured", data)}
                id="isFeatured"
                checked={formData.isFeatured}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
