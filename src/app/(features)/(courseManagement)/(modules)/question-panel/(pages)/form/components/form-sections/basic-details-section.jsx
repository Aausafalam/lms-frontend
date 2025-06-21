"use client"

import { memo } from "react"
import { HelpCircle, Tag, Globe, BookOpen, Award } from "lucide-react"
import { Input } from "@/components/ui/input"
import { FormSection } from "@/components/formSection"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"

export const BasicDetailsSection = memo(function BasicDetailsSection({
  sectionRef,
  isActive,
  formData = {},
  handlers = {},
}) {
  const { handleInputChange, handleArrayChange, handleSwitchChange } = handlers

  const questionTypeOptions = [
    { label: "Multiple Choice (MCQ)", value: "MCQ" },
    { label: "True/False", value: "TRUE_FALSE" },
    { label: "Fill in the Blanks", value: "FILL_BLANKS" },
    { label: "Essay/Descriptive", value: "ESSAY" },
    { label: "Numeric Answer", value: "NUMERIC" },
    { label: "Match the Following", value: "MATCH" },
    { label: "Ordering/Sequence", value: "ORDER" },
    { label: "Multiple Select", value: "MULTI_SELECT" },
  ]

  const difficultyOptions = [
    { label: "Very Easy", value: "very_easy" },
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
    { label: "Very Hard", value: "very_hard" },
  ]

  const languageOptions = [
    { label: "English", value: "en" },
    { label: "Hindi", value: "hi" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
  ]

  const categoryOptions = [
    { label: "Mathematics", value: "mathematics" },
    { label: "Science", value: "science" },
    { label: "English", value: "english" },
    { label: "History", value: "history" },
    { label: "Geography", value: "geography" },
    { label: "Computer Science", value: "computer_science" },
    { label: "Physics", value: "physics" },
    { label: "Chemistry", value: "chemistry" },
    { label: "Biology", value: "biology" },
  ]

  const tagOptions = [
    { label: "Important", value: "important" },
    { label: "Conceptual", value: "conceptual" },
    { label: "Practical", value: "practical" },
    { label: "Theory", value: "theory" },
    { label: "Application", value: "application" },
    { label: "Analysis", value: "analysis" },
    { label: "Synthesis", value: "synthesis" },
    { label: "Evaluation", value: "evaluation" },
  ]

  return (
    <FormSection
      id="basic-details"
      title="Basic Details"
      icon={<HelpCircle className="h-5 w-5" />}
      description="Enter the essential details about your question"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Question Type and Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Question Type"
            labelIcon={<HelpCircle className="h-3.5 w-3.5" />}
            name="type"
            value={formData.type || ""}
            onChange={handleInputChange}
            options={questionTypeOptions}
            placeholder="Select question type"
            required
            helperText="Choose the type of question"
            error={!formData.type ? "Question type is required" : ""}
            className="mb-0"
          />
          <Select
            label="Difficulty Level"
            labelIcon={<Award className="h-3.5 w-3.5" />}
            name="difficulty"
            value={formData.difficulty || ""}
            onChange={handleInputChange}
            options={difficultyOptions}
            placeholder="Select difficulty"
            required
            helperText="Question difficulty level"
            error={!formData.difficulty ? "Difficulty is required" : ""}
            className="mb-0"
          />
        </div>

        {/* Question Text */}
        <Textarea
          label="Question Text"
          labelIcon={<HelpCircle className="h-3.5 w-3.5" />}
          id="text"
          name="text"
          placeholder="Enter your question here..."
          value={formData.text || ""}
          onChange={handleInputChange}
          required
          helperText="The main question text that students will see"
          error={!formData.text ? "Question text is required" : ""}
          className="mb-0 border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500"
          rows={4}
        />

        {/* Category and Subject */}
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Category"
            labelIcon={<BookOpen className="h-3.5 w-3.5" />}
            name="category"
            value={formData.category || ""}
            onChange={handleInputChange}
            options={categoryOptions}
            placeholder="Select category"
            required
            helperText="Main subject category"
            error={!formData.category ? "Category is required" : ""}
          />

          <Input
            label="Subject"
            labelIcon={<BookOpen className="h-3.5 w-3.5" />}
            id="subject"
            name="subject"
            placeholder="e.g., Algebra, Biology"
            value={formData.subject || ""}
            onChange={handleInputChange}
            helperText="Specific subject area"
            className="mb-0 border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500"
          />
        </div>

        {/* Language and Tags */}
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Language"
            labelIcon={<Globe className="h-3.5 w-3.5" />}
            name="language"
            value={formData.language || ""}
            onChange={handleInputChange}
            options={languageOptions}
            placeholder="Select language"
            required
            helperText="Question language"
            error={!formData.language ? "Language is required" : ""}
          />
          <Select
            label="Tags"
            labelIcon={<Tag className="h-3.5 w-3.5" />}
            name="tags"
            value={formData.tags || []}
            onChange={(e) => handleArrayChange("tags", e.target.value)}
            options={tagOptions}
            placeholder="Select tags"
            isMulti
            helperText="Tags to categorize the question"
          />
        </div>

        {/* Settings */}
        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div>
              <Label className="text-sm font-medium">Public Question</Label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Make this question available to other instructors
              </p>
            </div>
            <Switch
              checked={formData.isPublic || false}
              onCheckedChange={(checked) => handleSwitchChange("isPublic", checked)}
            />
          </div>
        </div>
      </div>
    </FormSection>
  )
})
