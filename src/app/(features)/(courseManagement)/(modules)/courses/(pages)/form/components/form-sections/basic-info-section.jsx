"use client";
import { memo } from "react";
import { FileText, Bookmark, Clock, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormSection } from "./form-section";

/**
 * Basic Information Section Component
 * Handles course name, summary, duration, and  code
 * All fields are required for course creation
 */
export const BasicInfoSection = memo(function BasicInfoSection({ sectionRef, isActive, formData = {}, handlers = {} }) {
    const { handleInputChange } = handlers;

    return (
        <FormSection
            id="basic"
            title="Basic Information"
            icon={<FileText className="h-5 w-5" />}
            description="Enter the essential details about your course"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                {/* Course Name - Required */}
                <Input
                    label="Course Name *"
                    labelIcon={<Bookmark className="h-3.5 w-3.5" />}
                    id="name"
                    name="name"
                    placeholder="Enter course name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    required
                    helperText="Choose a clear, descriptive name for your course"
                    error={!formData.name ? "Course name is required" : ""}
                />

                <div className="flex gap-4 mb-0">
                    {/* Course Code - Required */}
                    <Input
                        label="Course Code *"
                        labelIcon={<Hash className="h-3.5 w-3.5" />}
                        id="code"
                        name="code"
                        placeholder="e.g., CS101, WEB-DEV-2024"
                        value={formData.code || ""}
                        onChange={handleInputChange}
                        required
                        helperText="Unique identifier for your course"
                        error={!formData.code ? "Course code is required" : ""}
                        className="mb-0"
                    />
                    {/* Duration - Required */}
                    <Input
                        label="Estimated Duration (hours) *"
                        labelIcon={<Clock className="h-3.5 w-3.5" />}
                        id="duration"
                        name="duration"
                        type="number"
                        min="1"
                        value={formData.duration || ""}
                        onChange={handleInputChange}
                        placeholder="Enter estimated duration"
                        required
                        helperText="Total time needed to complete the course"
                        error={!formData.duration || formData.duration < 1 ? "Duration is required and must be at least 1 hour" : ""}
                        className="mb-0"
                    />
                </div>

                {/* Summary - Required */}
                <Textarea
                    label="Course Summary *"
                    labelIcon={<FileText className="h-3.5 w-3.5" />}
                    id="summary"
                    name="summary"
                    placeholder="Brief overview of the course"
                    value={formData.summary || ""}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    helperText="A concise description that appears in course listings"
                    error={!formData.summary ? "Course summary is required" : ""}
                />
            </div>
        </FormSection>
    );
});
