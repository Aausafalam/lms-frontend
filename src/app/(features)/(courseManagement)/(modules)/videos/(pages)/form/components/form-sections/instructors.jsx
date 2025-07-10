"use client";

import { memo } from "react";
import { Tag, User2Icon } from "lucide-react";
import { FormSection } from "@/components/formSection";
import { Select } from "@/components/ui/select";

/**
 * Instructors Data Section Component
 * Handles video categorization and metadata
 *
 * @param {Object} props - Component props
 * @param {Object} props.formData - Current form data
 * @param {Object} props.handlers - Form event handlers
 * @param {React.RefObject} props.sectionRef - Reference for section scrolling
 * @param {boolean} props.isActive - Whether this section is currently active
 */
export const InstructorsSection = memo(function InstructorsSection({ formData, handlers, sectionRef, isActive }) {
    const { handleInputChange } = handlers;

    return (
        <FormSection id="instructors" title="Video Instructors" icon={<User2Icon className="h-5 w-5" />} description="Configure video instructors" sectionRef={sectionRef} isActive={isActive}>
            <div className="space-y-6">
                {/* Tags */}
                <Select
                    label="Instructors"
                    labelIcon={<Tag className="h-3.5 w-3.5" />}
                    name="instructorIds"
                    placeholder="Select video instructors"
                    value={formData.instructorIds || []}
                    onChange={handleInputChange}
                    options={[]}
                    optionsUrl={{
                        url: "/instructor?responseType=dropdown",
                    }}
                    isMulti
                    helperText="Instructor list"
                />
            </div>
        </FormSection>
    );
});
