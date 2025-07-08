"use client";

import { memo } from "react";
import { Settings, Tag, BarChart3, FolderOpen, Globe } from "lucide-react";
import { FormSection } from "@/components/formSection";
import { Select } from "@/components/ui/select";

/**
 * Meta Data Section Component
 * Handles module categorization and metadata
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

    return (
        <FormSection
            id="metadata"
            title="Module Metadata"
            icon={<Settings className="h-5 w-5" />}
            description="Configure module categorization and discovery settings"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                {/* Tags */}
                <Select
                    label="Tags"
                    labelIcon={<Tag className="h-3.5 w-3.5" />}
                    name="tags"
                    placeholder="Select module tags"
                    value={formData.tags || []}
                    onChange={handleInputChange}
                    options={tags}
                    isMulti
                    helperText="Tags help students discover your module"
                />

                {/* Categories */}
                <Select
                    label="Categories"
                    labelIcon={<FolderOpen className="h-3.5 w-3.5" />}
                    name="categoryIds"
                    placeholder="Select module categories"
                    value={formData.categoryIds || []}
                    onChange={handleInputChange}
                    options={[]}
                    optionsUrl={{
                        url: "/category?responseType=dropdown",
                    }}
                    isMulti
                    helperText="Choose relevant categories for your module"
                />
            </div>
        </FormSection>
    );
});
