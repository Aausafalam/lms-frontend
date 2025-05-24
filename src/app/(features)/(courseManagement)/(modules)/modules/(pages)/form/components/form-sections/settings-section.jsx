"use client";

import { memo } from "react";
import { Users, Grip, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormSection } from "./form-section";
import { categories, instructors } from "./sample-data";
import { Select } from "@/components/ui/select";

/**
 * Props for the SettingsSection component.
 * @typedef {Object} SettingsSectionProps
 * @property {Object} formData - Current form values for the settings section.
 * @property {number} formData.modulePosition - Position of the module in the course list.
 * @property {Array<{ label: string, value: string }>} formData.categories - Selected category values.
 * @property {Array<{ label: string, value: string }>} formData.instructors - Selected instructors.
 * @property {Object} handlers - Handlers for form interactions.
 * @property {Function} handlers.handleInputChange - Function to handle single input changes.
 * @property {React.RefObject} sectionRef - Ref to scroll/focus this section.
 * @property {boolean} isActive - Whether this section is currently active.
 */

/**
 * Settings section for configuring module-level options like position, categories, and instructors.
 *
 * @param {SettingsSectionProps} props
 * @returns {JSX.Element}
 */
export const SettingsSection = memo(function SettingsSection({ formData, handlers, sectionRef, isActive }) {
    return (
        <FormSection id="settings" title="Settings" icon={<Users className="h-5 w-5" />} description="Configure additional settings for your module" sectionRef={sectionRef} isActive={isActive}>
            <div className="space-y-6">
                {/* Module Position input field */}
                <Input
                    label="Module Position"
                    labelIcon={<Grip className="h-3.5 w-3.5" />}
                    id="modulePosition"
                    name="modulePosition"
                    type="number"
                    min="1"
                    value={formData.modulePosition}
                    onChange={handlers.handleInputChange}
                    helperText="in the course list"
                    className="max-w-36"
                />

                {/* Category selection with multiple options */}
                <Select
                    label="Categories"
                    name="categories"
                    labelIcon={<Tag className="h-3.5 w-3.5" />}
                    options={categories.map((c) => ({ label: c.value, value: c.label }))}
                    value={formData.categories}
                    onChange={handlers.handleInputChange}
                    placeholder="Select categories"
                    isMulti
                />

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
            </div>
        </FormSection>
    );
});
