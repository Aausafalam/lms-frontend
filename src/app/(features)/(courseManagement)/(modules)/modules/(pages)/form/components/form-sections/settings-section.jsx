"use client";

import { memo } from "react";
import { Users, Tag } from "lucide-react";
import { FormSection } from "@/components/formSection";
import { instructors, tags } from "./sample-data";
import { Select } from "@/components/ui/select";

export const SettingsSection = memo(function SettingsSection({ formData, handlers, sectionRef, isActive }) {
    return (
        <FormSection id="settings" title="Settings" icon={<Users className="h-5 w-5" />} description="Configure additional settings for your module" sectionRef={sectionRef} isActive={isActive}>
            <div className="space-y-6">
                {/* Instructor selection with multiple options */}
                <Select
                    name="instructors"
                    label="Instructors"
                    labelIcon={<Users className="h-3.5 w-3.5" />}
                    options={instructors.map((i) => ({ label: i.name, value: i.id }))}
                    value={formData.instructors}
                    onChange={handlers.handleInputChange}
                    placeholder="Select instructors"
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
                    onChange={handlers.handleInputChange}
                    options={tags.map((tag) => ({ label: tag.name, value: tag.id }))}
                    isMulti
                />
            </div>
        </FormSection>
    );
});
