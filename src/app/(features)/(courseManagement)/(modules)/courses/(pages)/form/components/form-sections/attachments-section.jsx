"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Paperclip, X, Plus, FileText, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormSection } from "@/components/formSection"
import { Textarea } from "@/components/ui/textarea"

/**
 * Attachments Section Component
 * Manages course attachments and resources
 *
 * @param {Object} props - Component props
 * @param {Object} props.handlers - Form event handlers
 * @param {Object} props.formData - Current form data with attachments array
 * @param {React.RefObject} props.sectionRef - Reference for section scrolling
 * @param {boolean} props.isActive - Whether this section is currently active
 */
export const AttachmentsSection = memo(function AttachmentsSection({
  handlers = {},
  formData = { attachments: [] },
  sectionRef,
  isActive,
}) {
  const { handleAttachmentChange, removeAttachment, addAttachment } = handlers

  // Animation configuration
  const listItemAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  }

  // Ensure attachments array exists
  const attachments = Array.isArray(formData.attachments) ? formData.attachments : []

  return (
    <FormSection
      id="attachments"
      title="Course Attachments"
      icon={<Paperclip className="h-5 w-5" />}
      description="Add supplementary materials and resources for your course"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Guidance Box */}
        <div className="bg-green-50 dark:bg-green-950/10 rounded-lg p-4 border border-green-100 dark:border-green-900/20">
          <p className="text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span>Add PDFs, worksheets, code files, or other resources that complement your course content.</span>
          </p>
        </div>

        {/* Attachments List */}
        <div className="space-y-6">
          {attachments.map((attachment, index) => (
            <motion.div
              key={index}
              {...listItemAnimation}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                  Attachment {index + 1}
                </h4>
                {attachments.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAttachment(index)}
                    className="h-8 w-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                    aria-label={`Remove attachment ${index + 1}`}
                    title="Remove this attachment"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                {/* Title */}
                <Input
                  placeholder="Attachment title (e.g., Course Workbook, Code Examples)"
                  value={attachment.title || ""}
                  onChange={(e) => handleAttachmentChange(index, "title", e.target.value)}
                  aria-label={`Attachment ${index + 1} title`}
                />

                {/* Description */}
                <Textarea
                  placeholder="Brief description of this attachment"
                  value={attachment.description || ""}
                  onChange={(e) => handleAttachmentChange(index, "description", e.target.value)}
                  aria-label={`Attachment ${index + 1} description`}
                  rows={2}
                />

                {/* File Upload */}
                <Input
                  type="file"
                  onChange={(e) => handleAttachmentChange(index, "file", e.target.files?.[0])}
                  aria-label={`Attachment ${index + 1} file`}
                  accept=".pdf,.doc,.docx,.zip,.txt,.js,.py,.html,.css"
                />
              </div>
            </motion.div>
          ))}

          {/* Empty State */}
          {attachments.length === 0 && (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <Paperclip className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p>No attachments added yet.</p>
              <p className="text-sm">Add resources to enhance your course.</p>
            </div>
          )}

          {/* Add Button */}
          <Button
            variant="outline"
            onClick={addAttachment}
            className="mt-2 bg-green-50 text-green-600 border-green-200 hover:bg-green-100 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/30 dark:hover:bg-green-950/30"
            aria-label="Add attachment"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Attachment
          </Button>
        </div>
      </div>
    </FormSection>
  )
})
