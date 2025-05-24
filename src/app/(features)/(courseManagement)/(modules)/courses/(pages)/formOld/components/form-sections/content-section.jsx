"use client";
import { memo } from "react";
import { BookOpen, FileText } from "lucide-react";
import { FormSection } from "./form-section";
import { Textarea } from "@/components/ui/textarea";

/**
 * ContentSection - A form section component for detailed module content
 *
 * This component provides a rich text area for entering detailed module description
 * with word count limits and validations. This section represents the main content
 * area for course module information.
 *
 * @param {Object} props - Component props
 * @param {Object} props.handlers - Object containing event handlers for the form
 * @param {Object} props.formData - Form data object containing content field values
 * @param {Object} props.sectionRef - React ref for scrolling to this section
 * @param {boolean} props.isActive - Whether this section is currently active
 * @returns {JSX.Element} Rendered content section
 */
export const ContentSection = memo(function ContentSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
    // Destructure handlers for better readability
    const { handleInputChange } = handlers;

    // Calculate current word count (fallback to 0 if not available)
    const currentWordCount = formData.longDescription ? formData.longDescription.trim().split(/\s+/).filter(Boolean).length : 0;

    // Determine if we're approaching the word limit (90% or more)
    const isApproachingWordLimit = currentWordCount >= 1800; // 90% of 2000

    return (
        <FormSection id="content" title="Content" icon={<BookOpen className="h-5 w-5" />} description="Provide detailed content for your module" sectionRef={sectionRef} isActive={isActive}>
            <div className="space-y-6">
                {/* Detailed description text area with word count functionality */}
                <Textarea
                    label="Detailed Description"
                    labelIcon={<FileText className="h-3.5 w-3.5" />}
                    id="longDescription"
                    name="longDescription"
                    placeholder="Write detailed description of the module"
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
                {isApproachingWordLimit && <p className="text-[0.8rem] text-yellow-600 dark:text-yellow-400">You are approaching the 2000 word limit. Current count: {currentWordCount} words.</p>}
            </div>
        </FormSection>
    );
});
