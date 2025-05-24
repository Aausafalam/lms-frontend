"use client"

import { memo } from "react"
import { Settings, Globe, Calendar, Eye, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CourseFormSection } from "./course-form-section"
import { Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

/**
 * CourseSettingsSection - A form section component for configuring course settings
 *
 * This component allows course creators to configure various settings for their course,
 * including visibility, enrollment options, and certificate settings.
 *
 * @param {Object} props - Component props
 * @param {Object} props.formData - Current form values for the settings section
 * @param {Object} props.handlers - Handlers for form interactions
 * @param {Object} props.sectionRef - Ref to scroll/focus this section
 * @param {boolean} props.isActive - Whether this section is currently active
 * @returns {JSX.Element} Rendered settings section
 */
export const CourseSettingsSection = memo(function CourseSettingsSection({
  formData = {},
  handlers = {},
  sectionRef,
  isActive,
}) {
  // Destructure handlers for better readability
  const { handleInputChange, handleSwitchChange } = handlers

  return (
    <CourseFormSection
      id="settings"
      title="Course Settings"
      icon={<Settings className="h-5 w-5" />}
      description="Configure additional settings for your course"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Visibility settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Visibility
          </h3>

          <Select
            label="Course Status"
            id="courseStatus"
            name="courseStatus"
            value={formData.courseStatus || "draft"}
            onChange={handleInputChange}
            options={[
              { label: "Draft", value: "draft" },
              { label: "Published", value: "published" },
              { label: "Archived", value: "archived" },
              { label: "Coming Soon", value: "comingSoon" },
            ]}
          />

          {formData.courseStatus === "comingSoon" && (
            <Input
              label="Release Date"
              labelIcon={<Calendar className="h-3.5 w-3.5" />}
              id="releaseDate"
              name="releaseDate"
              type="date"
              value={formData.releaseDate || ""}
              onChange={handleInputChange}
            />
          )}

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              name="featured"
              checked={formData.featured || false}
              onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
            />
            <Label htmlFor="featured">Feature this course on homepage</Label>
          </div>
        </div>

        {/* Enrollment settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Enrollment
          </h3>

          <div className="flex items-center space-x-2">
            <Switch
              id="enrollmentOpen"
              name="enrollmentOpen"
              checked={formData.enrollmentOpen || false}
              onCheckedChange={(checked) => handleSwitchChange("enrollmentOpen", checked)}
            />
            <Label htmlFor="enrollmentOpen">Open for enrollment</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="limitEnrollment"
              name="limitEnrollment"
              checked={formData.limitEnrollment || false}
              onCheckedChange={(checked) => handleSwitchChange("limitEnrollment", checked)}
            />
            <Label htmlFor="limitEnrollment">Limit enrollment</Label>
          </div>

          {formData.limitEnrollment && (
            <Input
              label="Maximum Students"
              id="maxStudents"
              name="maxStudents"
              type="number"
              min="1"
              placeholder="e.g. 100"
              value={formData.maxStudents || ""}
              onChange={handleInputChange}
              className="max-w-xs"
            />
          )}

          <div className="flex items-center space-x-2">
            <Switch
              id="selfPaced"
              name="selfPaced"
              checked={formData.selfPaced || false}
              onCheckedChange={(checked) => handleSwitchChange("selfPaced", checked)}
            />
            <Label htmlFor="selfPaced">Self-paced course</Label>
          </div>

          {!formData.selfPaced && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Start Date"
                labelIcon={<Calendar className="h-3.5 w-3.5" />}
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate || ""}
                onChange={handleInputChange}
              />

              <Input
                label="End Date"
                labelIcon={<Calendar className="h-3.5 w-3.5" />}
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate || ""}
                onChange={handleInputChange}
              />
            </div>
          )}
        </div>

        {/* Certificate settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Award className="h-4 w-4" />
            Certificate
          </h3>

          <div className="flex items-center space-x-2">
            <Switch
              id="certificateEnabled"
              name="certificateEnabled"
              checked={formData.certificateEnabled || false}
              onCheckedChange={(checked) => handleSwitchChange("certificateEnabled", checked)}
            />
            <Label htmlFor="certificateEnabled">Enable course completion certificate</Label>
          </div>

          {formData.certificateEnabled && (
            <Input
              label="Minimum Completion Percentage"
              id="minCompletionPercentage"
              name="minCompletionPercentage"
              type="number"
              min="1"
              max="100"
              placeholder="e.g. 80"
              value={formData.minCompletionPercentage || ""}
              onChange={handleInputChange}
              className="max-w-xs"
            />
          )}
        </div>

        {/* Additional settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Additional Settings
          </h3>

          <div className="flex items-center space-x-2">
            <Switch
              id="discussionEnabled"
              name="discussionEnabled"
              checked={formData.discussionEnabled || false}
              onCheckedChange={(checked) => handleSwitchChange("discussionEnabled", checked)}
            />
            <Label htmlFor="discussionEnabled">Enable discussion forum</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="reviewsEnabled"
              name="reviewsEnabled"
              checked={formData.reviewsEnabled || false}
              onCheckedChange={(checked) => handleSwitchChange("reviewsEnabled", checked)}
            />
            <Label htmlFor="reviewsEnabled">Allow student reviews</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="downloadableResources"
              name="downloadableResources"
              checked={formData.downloadableResources || false}
              onCheckedChange={(checked) => handleSwitchChange("downloadableResources", checked)}
            />
            <Label htmlFor="downloadableResources">Offer downloadable resources</Label>
          </div>
        </div>
      </div>
    </CourseFormSection>
  )
})

function Award(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}
