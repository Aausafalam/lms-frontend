"use client"

import { memo } from "react"
import { FileText, Clock, Hash, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { FormSection } from "./form-section"
import { Select } from "@/components/ui/select"

export const BasicInfoSection = memo(function BasicInfoSection({ sectionRef, isActive, formData = {}, handlers = {} }) {
  const { handleInputChange } = handlers

  const languageOptions = [
    { label: "English", value: "English" },
    { label: "Hindi", value: "Hindi" },
    { label: "Bengali", value: "Bengali" },
    { label: "Telugu", value: "Telugu" },
    { label: "Marathi", value: "Marathi" },
    { label: "Tamil", value: "Tamil" },
    { label: "Urdu", value: "Urdu" },
    { label: "Gujarati", value: "Gujarati" },
    { label: "Kannada", value: "Kannada" },
    { label: "Odia", value: "Odia" },
    { label: "Punjabi", value: "Punjabi" },
    { label: "Malayalam", value: "Malayalam" },
    { label: "Assamese", value: "Assamese" },
  ]

  return (
    <FormSection
      id="basic"
      title="Basic Information"
      icon={<FileText className="h-5 w-5" />}
      description="Enter the essential details about your exam"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <Input
          label="Exam Name"
          labelIcon={<FileText className="h-3.5 w-3.5" />}
          id="examName"
          name="examName"
          placeholder="Enter exam name"
          value={formData.examName || ""}
          onChange={handleInputChange}
          required
          helperText="Choose a clear, descriptive name for your exam"
          error={!formData.examName ? "Exam name is required" : ""}
        />

        <Input
          label="Exam Code"
          labelIcon={<Hash className="h-3.5 w-3.5" />}
          id="examCode"
          name="examCode"
          placeholder="Enter exam code"
          value={formData.examCode || ""}
          onChange={handleInputChange}
          required
          helperText="A unique code to identify this exam"
          error={!formData.examCode ? "Exam code is required" : ""}
        />

        <div className="flex gap-4 mb-0">
          <Input
            label="Duration (minutes)"
            labelIcon={<Clock className="h-3.5 w-3.5" />}
            id="durationInMinutes"
            name="durationInMinutes"
            type="number"
            min="1"
            value={formData.durationInMinutes || ""}
            onChange={handleInputChange}
            placeholder="Enter exam duration"
            required
            helperText="Total time allowed for the exam"
            error={
              !formData.durationInMinutes || formData.durationInMinutes < 1
                ? "Duration is required and must be at least 1 minute"
                : ""
            }
            className="mb-0"
          />

          <Select
            label="Language Options"
            labelIcon={<Globe className="h-3.5 w-3.5" />}
            name="languageOptions"
            placeholder="Select available languages"
            value={formData.languageOptions || []}
            onChange={handleInputChange}
            options={languageOptions}
            isMulti
            helperText="Languages available for this exam"
          />
        </div>
      </div>
    </FormSection>
  )
})
