"use client"

import { memo, useState } from "react"
import { ImageIcon, Video, Upload, Link, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { FormSection } from "@/components/formSection"
import FileUploadField from "@/components/ui/file"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import apiConstants from "@/services/utils/constants"
import ApiUtils from "@/services/utils"

/**
 * YouTube video ID extractor utility
 * @param {string} url - YouTube URL
 * @returns {string|null} Video ID or null
 */
const getYoutubeVideoId = (url) => {
  try {
    const parsedUrl = new URL(url)
    let videoId = ""

    if (url.includes("youtube.com")) {
      videoId = parsedUrl.searchParams.get("v")
    } else if (url.includes("youtu.be")) {
      videoId = parsedUrl.pathname.substring(1)
    }

    return videoId || null
  } catch (e) {
    return null
  }
}

/**
 * Media Section Component
 * @description Handles banner image, thumbnail, and intro video uploads/URLs
 */
export const MediaSection = memo(function MediaSection({
  formData = {},
  sectionRef,
  isActive,
  handlers = {},
  errors = {},
}) {
  const { handleImageUpload, handleInputChange, handleVideoUpload } = handlers
  const [videoInputType, setVideoInputType] = useState("url")

  const hasValidYoutubeUrl =
    formData.introVideo &&
    typeof formData.introVideo === "string" &&
    formData.introVideo.includes("youtube") &&
    getYoutubeVideoId(formData.introVideo)

  const hasUploadedVideo = formData.introVideoFile || formData.introVideoPreview

  const clearVideo = () => {
    handleInputChange({ target: { name: "introVideo", value: "" } })
    handleInputChange({ target: { name: "introVideoFile", value: null } })
    handleInputChange({ target: { name: "introVideoPreview", value: "" } })
  }

  return (
    <FormSection
      id="media"
      title="Media Assets"
      icon={<ImageIcon className="h-5 w-5" />}
      description="Upload images and videos to showcase your course"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Banner Image Upload */}
        <FileUploadField
          labelIcon={<ImageIcon className="h-3.5 w-3.5" />}
          label="Banner Image"
          defaultFiles={
            formData.bannerImage && formData.id
              ? [
                  {
                    ...formData.bannerImage,
                    url: `${apiConstants.BACKEND_API_BASE_URL}/course/${formData.id}/getImage?type=bannerImage&token=${ApiUtils.getAuthToken()}`,
                  },
                ]
              : []
          }
          onChange={handleInputChange}
          name="bannerImage"
          helperText="Main course image displayed in course listings (recommended: 1200x600px)"
          required
          uploadPath="/course/banner-image/upload"
          acceptedFormats={["png", "jpg", "jpeg"]}
          error={errors.bannerImage}
        />

        {/* Thumbnail Upload */}
        <FileUploadField
          labelIcon={<ImageIcon className="h-3.5 w-3.5" />}
          label="Course Thumbnail"
          value={formData.thumbnailPreview || ""}
          onChange={handleInputChange}
          defaultFiles={
            formData.thumbnailUrl && !formData.thumbnailUrl?.isDeleted && !formData.thumbnailUrl?.fileId && formData.id
              ? [
                  {
                    ...formData.thumbnailUrl,
                    url: `${apiConstants.BACKEND_API_BASE_URL}/course/${formData.id}/getImage?type=thumbnailUrl&token=${ApiUtils.getAuthToken()}`,
                  },
                ]
              : []
          }
          name="thumbnailUrl"
          helperText="Smaller image for course cards and previews (recommended: 400x300px)"
          uploadPath="/course/thumbnail/upload"
          acceptedFormats={["png", "jpg", "jpeg"]}
          error={errors.thumbnailUrl}
        />

        {/* Introduction Video */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
              <Video className="h-3.5 w-3.5 mr-2" />
              Introduction Video
            </label>

            {(hasValidYoutubeUrl || hasUploadedVideo) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearVideo}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <X className="h-4 w-4 mr-1" />
                Clear Video
              </Button>
            )}
          </div>

          <Tabs value={videoInputType} onValueChange={setVideoInputType} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url" className="flex items-center">
                <Link className="h-4 w-4 mr-2" />
                YouTube URL
              </TabsTrigger>
              <TabsTrigger value="file" className="flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                Upload Video
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4">
              <Input
                placeholder="https://www.youtube.com/watch?v=..."
                value={typeof formData.introVideo === "string" ? formData.introVideo : ""}
                onChange={handleInputChange}
                name="introVideo"
                helperText="Paste a YouTube URL for your course preview video"
              />

              {hasValidYoutubeUrl && (
                <div className="rounded-lg overflow-hidden border border-border shadow-md">
                  <div className="aspect-video w-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYoutubeVideoId(formData.introVideo)}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="file" className="space-y-4">
              <FileUploadField
                label=""
                value={formData.introVideoPreview || ""}
                onChange={handleVideoUpload}
                name="introVideoFile"
                accept="video/*"
                helperText="Upload a video file (MP4, MOV, AVI - max 100MB)"
                showPreview={false}
              />

              {hasUploadedVideo && (
                <div className="rounded-lg overflow-hidden border border-border shadow-md">
                  <div className="aspect-video w-full bg-black">
                    <video controls className="w-full h-full" src={formData.introVideoPreview}>
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {!hasValidYoutubeUrl && !hasUploadedVideo && (
            <div className="border border-dashed rounded-lg p-6 text-center bg-muted/30 dark:bg-gray-800/30">
              <Video className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {videoInputType === "url"
                  ? "Enter a YouTube URL to preview your video"
                  : "Upload a video file to preview"}
              </p>
            </div>
          )}
        </div>
      </div>
    </FormSection>
  )
})
