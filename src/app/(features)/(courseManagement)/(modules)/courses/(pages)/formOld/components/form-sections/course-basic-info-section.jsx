"use client"
import { memo } from "react"
import { FileText, Bookmark, Clock, BarChart4, Tag, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "lucide-react"
import { CourseFormSection } from "./course-form-section"
import { difficultyLevels, tags, categories } from "./course-sample-data"
import { Select } from "@/components/ui/select"

/**
 * CourseBasicInfoSection - A form section component for collecting basic course information
 *
 * This component is part of a multi-section form for course creation.
 * It handles the collection of essential information like title, description,
 * publication date, duration, difficulty level, categories, and tags.
 *
 * @param {Object} props - Component props
 * @param {Object} props.sectionRef - React ref for scrolling to this section
 * @param {boolean} props.isActive - Whether this section is currently active
 * @param {Object} props.formData - Form data object containing all field values
 * @param {Object} props.handlers - Object containing event handlers for the form
 * @returns {JSX.Element} Rendered form section
 */
export const CourseBasicInfoSection = memo(function CourseBasicInfoSection({
  sectionRef,
  isActive,
  formData = {},
  handlers = {},
}) {
  // Destructure handlers for better readability
  const { handleInputChange } = handlers

  return (
    <CourseFormSection
      id="basic"
      title="Basic Information"
      icon={<FileText className="h-5 w-5" />}
      description="Enter the basic details about your course"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Title field */}
        <Input
          label="Course Title"
          labelIcon={<Bookmark className="h-3.5 w-3.5" />}
          id="title"
          name="title"
          placeholder="Enter course title"
          value={formData.title || ""}
          onChange={handleInputChange}
          required
        />

        {/* Short description field */}
        <Textarea
          label="Short Description"
          labelIcon={<FileText className="h-3.5 w-3.5" />}
          id="shortDescription"
          name="shortDescription"
          placeholder="Brief overview of the course (appears in search results)"
          value={formData.shortDescription || ""}
          onChange={handleInputChange}
          required
        />

        {/* Date and duration fields - arranged in a responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Launch Date"
            labelIcon={<CalendarIcon className="h-3.5 w-3.5" />}
            id="launchDate"
            name="launchDate"
            placeholder="Pick a date"
            value={formData.launchDate || ""}
            onChange={handleInputChange}
            type="date"
            required
          />

          <Input
            label="Total Duration"
            labelIcon={<Clock className="h-3.5 w-3.5" />}
            id="totalDuration"
            name="totalDuration"
            min="1"
            value={formData.totalDuration || ""}
            onChange={handleInputChange}
            placeholder="Enter total duration (in hours)"
            required
          />
        </div>

        {/* Language selector */}
        <Select
          label="Language"
          labelIcon={<Globe className="h-3.5 w-3.5" />}
          id="language"
          name="language"
          placeholder="Select course language"
          value={formData.language || ""}
          onChange={handleInputChange}
          options={[
            { label: "English", value: "english" },
            { label: "Spanish", value: "spanish" },
            { label: "French", value: "french" },
            { label: "German", value: "german" },
            { label: "Chinese", value: "chinese" },
            { label: "Japanese", value: "japanese" },
            { label: "Korean", value: "korean" },
            { label: "Arabic", value: "arabic" },
          ]}
        />

        {/* Difficulty level selector */}
        <Select
          label="Difficulty Level"
          labelIcon={<BarChart4 className="h-3.5 w-3.5" />}
          id="difficulty"
          name="difficulty"
          placeholder="Select difficulty level"
          value={formData.difficulty || ""}
          onChange={handleInputChange}
          options={difficultyLevels.map((item) => ({
            label: item.label,
            value: item.value,
          }))}
        />

        {/* Categories multi-selector */}
        <Select
          label="Categories"
          labelIcon={<Tag className="h-3.5 w-3.5" />}
          id="categories"
          name="categories"
          placeholder="Select categories"
          value={formData.categories || []}
          onChange={handleInputChange}
          options={categories.map((category) => ({
            label: category.label,
            value: category.value,
          }))}
          isMulti
        />

        {/* Tags multi-selector */}
        <Select
          label="Tags"
          labelIcon={<Tag className="h-3.5 w-3.5" />}
          id="tags"
          name="tags"
          placeholder="Select tags"
          value={formData.tags || []}
          onChange={handleInputChange}
          options={tags.map((tag) => ({ label: tag.name, value: tag.id }))}
          isMulti
        />
      </div>
    </CourseFormSection>
  )
})
