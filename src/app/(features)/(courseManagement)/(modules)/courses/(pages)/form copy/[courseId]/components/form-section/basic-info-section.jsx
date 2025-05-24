"use client";
import { memo } from "react";
import { FileText, Bookmark, Clock, BarChart4, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { FormSection } from "./form-section";
import { difficultyLevels, tags } from "./sample-data";
import { Select } from "@/components/ui/select";

/**
 * BasicInfoSection - A form section component for collecting basic module information
 *
 * This component is part of a multi-section form for course module creation.
 * It handles the collection of essential information like title, description,
 * publication date, duration, difficulty level, and tags.
 *
 * @param {Object} props - Component props
 * @param {Object} props.sectionRef - React ref for scrolling to this section
 * @param {boolean} props.isActive - Whether this section is currently active
 * @param {Object} props.formData - Form data object containing all field values
 * @param {Object} props.handlers - Object containing event handlers for the form
 * @returns {JSX.Element} Rendered form section
 */
export const BasicInfoSection = memo(function BasicInfoSection({ sectionRef, isActive, formData = {}, handlers = {} }) {
    // Destructure handlers for better readability
    const { handleInputChange } = handlers;

    return (
        <FormSection
            id="basic"
            title="Basic Information"
            icon={<FileText className="h-5 w-5" />}
            description="Enter the basic details about your course module"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                {/* Title field */}
                <Input
                    label="Title"
                    labelIcon={<Bookmark className="h-3.5 w-3.5" />}
                    id="title"
                    name="title"
                    placeholder="Enter module title"
                    value={formData.title || ""}
                    onChange={handleInputChange}
                    required
                />

                {/* Short description field */}
                <Textarea
                    label="Short Description"
                    labelIcon={<FileText className="h-3.5 w-3.5" />}
                    id="shortDescription"
                    name="shortDescription"
                    placeholder="Brief overview of the module"
                    value={formData.shortDescription || ""}
                    onChange={handleInputChange}
                    required
                />

                {/* Date and duration fields - arranged in a responsive grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Published At"
                        labelIcon={<CalendarIcon className="h-3.5 w-3.5" />}
                        id="publishedAt"
                        name="publishedAt"
                        placeholder="Pick a date"
                        value={formData.publishedAt || ""}
                        onChange={handleInputChange}
                        type="date"
                        required
                    />

                    <Input
                        label="Estimated Duration"
                        labelIcon={<Clock className="h-3.5 w-3.5" />}
                        id="estimatedDuration"
                        name="estimatedDuration"
                        min="1"
                        value={formData.estimatedDuration || ""}
                        onChange={handleInputChange}
                        placeholder="Enter estimated duration (in hours)"
                        required
                    />
                </div>

                {/* Difficulty level selector */}
                <Select
                    label="Difficulty Level"
                    labelIcon={<BarChart4 className="h-3.5 w-3.5" />}
                    id="difficulty"
                    name="difficulty"
                    placeholder="Select difficulty level"
                    value={formData.difficulty || ""}
                    onChange={handleInputChange}
                    options={difficultyLevels.map((item) => ({
                        label: item.label,
                        value: item.value,
                    }))}
                    isMulti
                />

                {/* Tags multi-selector */}
                <Select
                    label="Tags"
                    labelIcon={<Tag className="h-3.5 w-3.5" />}
                    id="tags"
                    name="tags"
                    placeholder="Select tags"
                    value={formData.tags || []}
                    onChange={handleInputChange}
                    options={tags.map((tag) => ({ label: tag.name, value: tag.id }))}
                    isMulti
                />
            </div>
        </FormSection>
    );
});
