"use client";

import { memo } from "react";
import { File, ImageIcon, Video, X } from "lucide-react";
import { FormSection } from "./form-section";
import FileUploadField from "@/components/ui/file";
import { useQueryParams } from "@/lib/hooks/useQuery";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const MediaSection = memo(function MediaSection({ formData = {}, sectionRef, isActive, handlers = {} }) {
    const { handleInputChange } = handlers;
    const { courseId, moduleId, lessonId } = useQueryParams();
    /**
     * Extracts YouTube video ID from different YouTube URL formats
     * @param {string} url - YouTube URL to parse
     * @returns {string|null} YouTube video ID or null if invalid
     */
    const getYoutubeVideoId = (url) => {
        try {
            const parsedUrl = new URL(url);
            let videoId = "";

            if (url.includes("youtube.com")) {
                videoId = parsedUrl.searchParams.get("v");
            } else if (url.includes("youtu.be")) {
                videoId = parsedUrl.pathname.substring(1);
            }

            return videoId || null;
        } catch (e) {
            return null;
        }
    };

    // Check for valid YouTube URL
    const hasValidYoutubeUrl = formData.video && typeof formData.video === "string" && formData.video.includes("youtube") && getYoutubeVideoId(formData.video);

    // Check for uploaded video file
    const hasUploadedVideo = formData.videoFile || formData.videoPreview;

    return (
        <FormSection id="media" title="Media Assets" icon={<ImageIcon className="h-5 w-5" />} description="Upload thumbnail image for your content" sectionRef={sectionRef} isActive={isActive}>
            <div className="space-y-6">
                <FileUploadField
                    labelIcon={<ImageIcon className="h-3.5 w-3.5" />}
                    label="Thumbnail Image"
                    value={formData.thumbnailPreview || ""}
                    onChange={handleInputChange}
                    name="thumbnailUrl"
                    helperText="Image displayed in content listings (recommended: 400x300px)"
                    required
                    uploadPath={`/course/${courseId}/module/${moduleId}/lesson/${lessonId}/video/thumbnail/upload`}
                    acceptedFormats={["png", "jpg", "jpeg"]}
                />

                {/* Introduction Video - URL or File Upload */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                            <Video className="h-3.5 w-3.5 mr-2" />
                            Content <span className="text-red-600 ml-2">*</span>
                        </label>

                        {/* Clear Video Button */}
                        {(hasValidYoutubeUrl || hasUploadedVideo) && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    handleInputChange({ target: { name: "video", value: "" } });
                                    handleInputChange({ target: { name: "videoFile", value: null } });
                                    handleInputChange({ target: { name: "videoPreview", value: "" } });
                                }}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                            >
                                <X className="h-4 w-4 mr-1" />
                                Clear Video
                            </Button>
                        )}
                    </div>
                    <div className="space-y-4">
                        <FileUploadField
                            label=""
                            value={formData.videoPreview || ""}
                            onChange={handleInputChange}
                            name="videoUrl"
                            accept="video/*"
                            helperText="Upload a video file (MP4, MOV, AVI - max 100MB)"
                            showPreview={false}
                            uploadPath={`/course/${courseId}/module/${moduleId}/lesson/${lessonId}/video/source/upload`}
                            acceptedFormats={["mp4", "webm", "ogg", "mov", "avi", "mkv"]}
                        />

                        {/* Video File Preview */}
                        {hasUploadedVideo && (
                            <div className="rounded-lg overflow-hidden border border-border shadow-md">
                                <div className="aspect-video w-full bg-black">
                                    <video controls className="w-full h-full" src={formData.videoPreview}>
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-center py-4">
                        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600"></div>
                        <div className="px-4 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">OR</div>
                        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600"></div>
                    </div>
                    <div className="space-y-4">
                        <Input
                            placeholder="https://www.youtube.com/watch?v=..."
                            value={typeof formData.video === "string" ? formData.video : ""}
                            onChange={handleInputChange}
                            name="video"
                            helperText="Paste a YouTube URL for video"
                        />

                        {/* YouTube Video Preview */}
                        {hasValidYoutubeUrl && (
                            <div className="rounded-lg overflow-hidden border border-border shadow-md">
                                <div className="aspect-video w-full">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${getYoutubeVideoId(formData.video)}`}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </FormSection>
    );
});
