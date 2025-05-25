"use client";

import { memo } from "react";
import { Settings, Tag, BarChart3, FolderOpen, Globe } from "lucide-react";
import { FormSection } from "./form-section";
import { Select } from "@/components/ui/select";

/**
 * Meta Data Section Component
 * Handles course categorization and metadata
 *
 * @param {Object} props - Component props
 * @param {Object} props.formData - Current form data
 * @param {Object} props.handlers - Form event handlers
 * @param {React.RefObject} props.sectionRef - Reference for section scrolling
 * @param {boolean} props.isActive - Whether this section is currently active
 */
export const MetaDataSection = memo(function MetaDataSection({ formData, handlers, sectionRef, isActive }) {
    const { handleInputChange } = handlers;

    // Sample data - in real app, these would come from API
    const tags = [
        { label: "Bestseller", value: "bestseller" },
        { label: "New", value: "new" },
        { label: "Popular", value: "popular" },
        { label: "Trending", value: "trending" },
        { label: "Featured", value: "featured" },
        { label: "Staff Pick", value: "staff-pick" },
    ];

    const difficultyLevels = [
        { label: "Beginner", value: "BEGINNER" },
        { label: "Intermediate", value: "INTERMEDIATE" },
        { label: "Advanced", value: "ADVANCED" },
        { label: "Expert", value: "expert" },
    ];

    const categories = [
        { label: "Programming", value: "f5c81acb-2451-402f-9b6f-a4ee980f44b0" },
        { label: "Design", value: "design" },
        { label: "Business", value: "business" },
        { label: "Marketing", value: "marketing" },
        { label: "Data Science", value: "data-science" },
        { label: "Mobile Development", value: "mobile-dev" },
    ];

    const languages = [
        { label: "English", value: "English" },
        { label: "Hindi", value: "Hindi" },
        { label: "Hinglish", value: "Hinglish" },
        { label: "Spanish", value: "Spanish" },
        { label: "French", value: "French" },
    ];

    return (
        <FormSection
            id="metadata"
            title="Course Metadata"
            icon={<Settings className="h-5 w-5" />}
            description="Configure course categorization and discovery settings"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                {/* Tags */}
                <Select
                    label="Tags"
                    labelIcon={<Tag className="h-3.5 w-3.5" />}
                    name="tags"
                    placeholder="Select course tags"
                    value={formData.tags || []}
                    onChange={handleInputChange}
                    options={tags}
                    isMulti
                    helperText="Tags help students discover your course"
                />

                {/* Difficulty Level */}
                <Select
                    label="Difficulty Level"
                    labelIcon={<BarChart3 className="h-3.5 w-3.5" />}
                    name="difficultyLevel"
                    placeholder="Select difficulty level"
                    value={formData.difficultyLevel || []}
                    onChange={handleInputChange}
                    options={difficultyLevels}
                    isMulti
                    helperText="Indicate the course complexity"
                />

                {/* Categories */}
                <Select
                    label="Categories"
                    labelIcon={<FolderOpen className="h-3.5 w-3.5" />}
                    name="categoryIds"
                    placeholder="Select course categories"
                    value={formData.categoryIds || []}
                    onChange={handleInputChange}
                    options={categories}
                    isMulti
                    helperText="Choose relevant categories for your course"
                />

                {/* Language */}
                <Select
                    label="Course Language"
                    labelIcon={<Globe className="h-3.5 w-3.5" />}
                    name="languageCode"
                    placeholder="Select course language"
                    value={formData.languageCode || ""}
                    onChange={handleInputChange}
                    options={languages}
                    helperText="Primary language used in the course"
                />
            </div>
        </FormSection>
    );
});
