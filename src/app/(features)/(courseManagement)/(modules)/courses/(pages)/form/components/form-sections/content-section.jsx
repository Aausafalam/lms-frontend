"use client"
import { memo } from "react"
import { BookOpen, FileText } from "lucide-react"
import { FormSection } from "./form-section"
import { Textarea } from "@/components/ui/textarea"

export const ContentSection = memo(function ContentSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
  // Destructure handlers for better readability
  const { handleInputChange } = handlers

  // Calculate current word count (fallback to 0 if not available)
  const currentWordCount = formData.longDescription
    ? formData.longDescription.trim().split(/\s+/).filter(Boolean).length
    : 0

  // Determine if we're approaching the word limit (90% or more)
  const isApproachingWordLimit = currentWordCount >= 1800 // 90% of 2000

  return (
    <FormSection
      id="content"
      title="Content"
      icon={<BookOpen className="h-5 w-5" />}
      description="Provide detailed content for your course"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Detailed description text area with word count functionality */}
        <Textarea
          label="Detailed Description"
          labelIcon={<FileText className="h-3.5 w-3.5" />}
          id="longDescription"
          name="longDescription"
          placeholder="Write detailed description of the course"
          value={formData.longDescription || ""}
          onChange={handleInputChange}
          spellCheck={true}
          minRows={12}
          maxWords={2000} // Ensure this is passed as a number if the component expects it
          showWordCount={true}
          maxLength={20000} // Character limit (approx 10x word limit for safety)
          className={isApproachingWordLimit ? "border-yellow-300 focus:ring-yellow-500" : ""}
          aria-describedby="description-help"
        />

        {/* Warning for approaching word limit */}
        {isApproachingWordLimit && (
          <p className="text-[0.8rem] text-yellow-600 dark:text-yellow-400">
            You are approaching the 2000 word limit. Current count: {currentWordCount} words.
          </p>
        )}
      </div>
    </FormSection>
  )
})
