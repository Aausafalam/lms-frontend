"use client";
import { memo } from "react";
import { BookOpen, FileText } from "lucide-react";
import { FormSection } from "@/components/formSection";
import { Textarea } from "@/components/ui/textarea";

/**
 * Content Section Component
 * Handles detailed lesson description
 *
 * @param {Object} props - Component props
 * @param {Object} props.handlers - Form event handlers
 * @param {Object} props.formData - Current form data
 * @param {React.RefObject} props.sectionRef - Reference for section scrolling
 * @param {boolean} props.isActive - Whether this section is currently active
 */
export const ContentSection = memo(function ContentSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
    const { handleInputChange } = handlers;

    // Calculate current word count
    const currentWordCount = formData.description
        ? formData.description
              .replace(/<[^>]*>/g, "")
              .trim()
              .split(/\s+/)
              .filter(Boolean).length
        : 0;

    // Check if approaching word limit
    const isApproachingWordLimit = currentWordCount >= 1800; // 90% of 2000

    return (
        <FormSection
            id="content"
            title="Lesson Content"
            icon={<BookOpen className="h-5 w-5" />}
            description="Provide detailed information about your lesson content"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                {/* Detailed Description */}
                <Textarea
                    label="Detailed Description"
                    labelIcon={<FileText className="h-3.5 w-3.5" />}
                    id="description"
                    name="description"
                    placeholder="Write a comprehensive description of your lesson content, structure, and what students will learn"
                    value={formData.description || ""}
                    onChange={handleInputChange}
                    spellCheck={true}
                    minRows={12}
                    maxWords={2000}
                    showWordCount={true}
                    maxLength={20000}
                    className={isApproachingWordLimit ? "border-yellow-300 focus:ring-yellow-500" : ""}
                    helperText="Detailed lesson information that helps students understand what they'll learn"
                />

                {/* Word count warning */}
                {isApproachingWordLimit && <p className="text-sm text-yellow-600 dark:text-yellow-400">You are approaching the 2000 word limit. Current count: {currentWordCount} words.</p>}
            </div>
        </FormSection>
    );
});
