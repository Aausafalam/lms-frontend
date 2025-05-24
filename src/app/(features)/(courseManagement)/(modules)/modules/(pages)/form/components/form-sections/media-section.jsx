"use client";

import { memo } from "react";
import { ImageIcon, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormSection } from "./form-section";
import FileUploadField from "@/components/ui/file";

/**
 * MediaSection - A form section component for uploading and managing media content
 *
 * This component handles uploading banner images and embedding YouTube videos
 * for a course module. It provides preview capabilities for both images and videos.
 *
 * @param {Object} props - Component props
 * @param {Object} props.formData - Form data object containing media-related field values
 * @param {Object} props.sectionRef - React ref for scrolling to this section
 * @param {boolean} props.isActive - Whether this section is currently active
 * @param {Object} props.handlers - Object containing event handlers for the form
 * @returns {JSX.Element} Rendered media section
 */
export const MediaSection = memo(function MediaSection({ formData = {}, sectionRef, isActive, handlers = {} }) {
    // Destructure handlers for better readability
    const { handleImageUpload, handleInputChange } = handlers;

    /**
     * Extracts YouTube video ID from different YouTube URL formats
     * @param {string} url - YouTube URL to parse
     * @returns {string|null} YouTube video ID or null if invalid
     */
    const getYoutubeVideoId = (url) => {
        try {
            const parsedUrl = new URL(url);
            let videoId = "";

            // Handle youtube.com format (with v parameter)
            if (url.includes("youtube.com")) {
                videoId = parsedUrl.searchParams.get("v");
            }
            // Handle youtu.be format (short links)
            else if (url.includes("youtu.be")) {
                videoId = parsedUrl.pathname.substring(1);
            }

            return videoId || null;
        } catch (e) {
            // Invalid URL
            return null;
        }
    };

    // Determine if we have a valid YouTube URL to display
    const hasValidYoutubeUrl = formData.introVideo && formData.introVideo.includes("youtube") && getYoutubeVideoId(formData.introVideo);

    return (
        <FormSection id="media" title="Media" icon={<ImageIcon className="h-5 w-5" />} description="Upload images and videos for your module" sectionRef={sectionRef} isActive={isActive}>
            <div className="space-y-6">
                {/* Banner image upload field */}
                <FileUploadField
                    labelIcon={<ImageIcon className="h-3.5 w-3.5" />}
                    label="Banner Image"
                    value={formData.bannerImagePreview || ""}
                    onChange={handleImageUpload}
                    name="bannerImage" // Fixed: was "description" in original
                    className="md:col-span-4"
                />

                <div className="space-y-4">
                    {/* Video URL input field */}
                    <Input
                        label="Introduction Video"
                        labelIcon={<Video className="h-3.5 w-3.5" />}
                        id="introVideo"
                        name="introVideo"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={formData.introVideo || ""}
                        onChange={handleInputChange}
                    />

                    {/* YouTube video preview section */}
                    {hasValidYoutubeUrl ? (
                        <div className="mt-4 rounded-lg overflow-hidden border border-border shadow-md">
                            <div className="aspect-video w-full">
                                <iframe
                                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(formData.introVideo)}`}
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
                            <p className="text-sm text-muted-foreground">Enter a YouTube URL to preview your video</p>
                        </div>
                    )}
                </div>
            </div>
        </FormSection>
    );
});
