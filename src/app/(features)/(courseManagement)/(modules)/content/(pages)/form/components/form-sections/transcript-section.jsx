"use client"
import { memo } from "react"
import { FileText } from "lucide-react"
import { FormSection } from "./form-section"
import { Textarea } from "@/components/ui/textarea"

export const TranscriptSection = memo(function TranscriptSection({
  handlers = {},
  formData = {},
  sectionRef,
  isActive,
}) {
  const { handleInputChange } = handlers

  const currentWordCount = formData.transcript
    ? formData.transcript
        .replace(/<[^>]*>/g, "")
        .trim()
        .split(/\s+/)
        .filter(Boolean).length
    : 0

  return (
    <FormSection
      id="transcript"
      title="Content Transcript"
      icon={<FileText className="h-5 w-5" />}
      description="Provide a transcript for your audio or video content"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <Textarea
          label="Transcript"
          labelIcon={<FileText className="h-3.5 w-3.5" />}
          id="transcript"
          name="transcript"
          placeholder="Enter the full transcript of your audio or video content"
          value={formData.transcript || ""}
          onChange={handleInputChange}
          spellCheck={true}
          minRows={12}
          showWordCount={true}
          helperText="Full transcript helps with accessibility and searchability"
        />

        <p className="text-sm text-gray-500 dark:text-gray-400">Current word count: {currentWordCount} words</p>
      </div>
    </FormSection>
  )
})
