"use client";

import { memo } from "react";
import { FileText, Bookmark, Clock, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormSection } from "@/components/formSection";

/**
 * Basic Information Section Component
 * @description Handles lesson name, summary, duration, and code
 */
export const BasicInfoSection = memo(function BasicInfoSection({ sectionRef, isActive, formData = {}, handlers = {}, errors = {} }) {
    const { handleInputChange } = handlers;

    return (
        <FormSection
            id="basic"
            title="Basic Information"
            icon={<FileText className="h-5 w-5" />}
            description="Enter the essential details about your lesson"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <Input
                        label="Lesson Name"
                        labelIcon={<Bookmark className="h-3.5 w-3.5" />}
                        id="name"
                        name="name"
                        placeholder="Enter lesson name"
                        value={formData.name || ""}
                        onChange={handleInputChange}
                        required
                        helperText="Choose a clear, descriptive name for your lesson"
                        error={errors.name}
                        className="mb-0"
                    />
                    <Input
                        label="Estimated Duration (hours)"
                        labelIcon={<Clock className="h-3.5 w-3.5" />}
                        id="duration"
                        name="duration"
                        type="number"
                        min="1"
                        value={formData.duration || ""}
                        onChange={handleInputChange}
                        placeholder="Enter estimated duration"
                        required
                        helperText="Total time needed to complete the lesson"
                        error={errors.duration}
                        className="mb-0"
                    />
                </div>

                <Textarea
                    label="Lesson Summary"
                    labelIcon={<FileText className="h-3.5 w-3.5" />}
                    id="summary"
                    name="summary"
                    placeholder="Brief overview of the lesson"
                    value={formData.summary || ""}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    helperText="A concise description that appears in lesson listings"
                    error={errors.summary}
                />
            </div>
        </FormSection>
    );
});
