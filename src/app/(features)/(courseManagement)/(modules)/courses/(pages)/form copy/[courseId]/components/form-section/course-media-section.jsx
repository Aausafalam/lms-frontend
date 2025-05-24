"use client"

import { memo } from "react"
import { ImageIcon, Video, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CourseFormSection } from "./course-form-section"
import FileUploadField from "@/components/ui/file"
import { Textarea } from "@/components/ui/textarea"

/**
 * CourseMediaSection - A form section component for uploading and managing course media content
 *
 * This component handles uploading course banner images, promotional videos, and preview text
 * for a course. It provides preview capabilities for both images and videos.
 *
 * @param {Object} props - Component props
 * @param {Object} props.formData - Form data object containing media-related field values
 * @param {Object} props.sectionRef - React ref for scrolling to this section
 * @param {boolean} props.isActive - Whether this section is currently active
 * @param {Object} props.handlers - Object containing event handlers for the form
 * @returns {JSX.Element} Rendered media section
 */
export const CourseMediaSection = memo(function CourseMediaSection({
  formData = {},
  sectionRef,
  isActive,
  handlers = {},
}) {
  // Destructure handlers for better readability
  const { handleImageUpload, handleInputChange } = handlers

  /**
   * Extracts YouTube video ID from different YouTube URL formats
   * @param {string} url - YouTube URL to parse
   * @returns {string|null} YouTube video ID or null if invalid
   */
  const getYoutubeVideoId = (url) => {
    if (!url) return null

    try {
      const parsedUrl = new URL(url)
      let videoId = ""

      // Handle youtube.com format (with v parameter)
      if (url.includes("youtube.com")) {
        videoId = parsedUrl.searchParams.get("v")
      }
      // Handle youtu.be format (short links)
      else if (url.includes("youtu.be")) {
        videoId = parsedUrl.pathname.substring(1)
      }

      return videoId || null
    } catch (e) {
      // Invalid URL
      return null
    }
  }

  // Determine if we have a valid YouTube URL to display
  const hasValidPromoVideo = formData.promoVideo && getYoutubeVideoId(formData.promoVideo)

  return (
    <CourseFormSection
      id="media"
      title="Media"
      icon={<ImageIcon className="h-5 w-5" />}
      description="Upload images and videos for your course"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Course banner image upload field */}
        <FileUploadField
          labelIcon={<ImageIcon className="h-3.5 w-3.5" />}
          label="Course Banner Image"
          value={formData.bannerImagePreview || ""}
          onChange={handleImageUpload}
          name="bannerImage"
          helperText="Recommended size: 1920x1080px (16:9 ratio)"
          className="md:col-span-4"
        />

        {/* Course thumbnail image upload field */}
        <FileUploadField
          labelIcon={<ImageIcon className="h-3.5 w-3.5" />}
          label="Course Thumbnail"
          value={formData.thumbnailPreview || ""}
          onChange={handleImageUpload}
          name="thumbnail"
          helperText="Recommended size: 600x400px (3:2 ratio)"
          className="md:col-span-4"
        />

        <div className="space-y-4">
          {/* Promotional video URL input field */}
          <Input
            label="Promotional Video"
            labelIcon={<Video className="h-3.5 w-3.5" />}
            id="promoVideo"
            name="promoVideo"
            placeholder="https://www.youtube.com/watch?v=..."
            value={formData.promoVideo || ""}
            onChange={handleInputChange}
            helperText="Add a compelling video to showcase your course"
          />

          {/* YouTube video preview section */}
          {hasValidPromoVideo ? (
            <div className="mt-4 rounded-lg overflow-hidden border border-border shadow-md">
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeVideoId(formData.promoVideo)}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          ) : (
            // Placeholder when no valid video URL is provided
            <div className="border border-dashed rounded-lg p-6 text-center bg-muted/30 dark:bg-gray-800/30">
              <Video className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Enter a YouTube URL to preview your promotional video</p>
            </div>
          )}
        </div>

        {/* Preview text field */}
        <Textarea
          label="Course Preview Text"
          labelIcon={<FileText className="h-3.5 w-3.5" />}
          id="previewText"
          name="previewText"
          placeholder="Write a compelling preview text that will appear on the course card"
          value={formData.previewText || ""}
          onChange={handleInputChange}
          maxLength={300}
          showWordCount={true}
          helperText="This text will be shown on the course card to attract students"
        />
      </div>
    </CourseFormSection>
  )
})
