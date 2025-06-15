"use client";

import { memo } from "react";
import { Settings, Tag, BarChart3, FolderOpen, Globe, User2Icon } from "lucide-react";
import { FormSection } from "@/components/formSection";
import { Select } from "@/components/ui/select";

/**
 * Instructors Data Section Component
 * Handles course categorization and metadata
 *
 * @param {Object} props - Component props
 * @param {Object} props.formData - Current form data
 * @param {Object} props.handlers - Form event handlers
 * @param {React.RefObject} props.sectionRef - Reference for section scrolling
 * @param {boolean} props.isActive - Whether this section is currently active
 */
export const InstructorsSection = memo(function InstructorsSection({ formData, handlers, sectionRef, isActive }) {
    const { handleInputChange } = handlers;

    // Sample data - in real app, these would come from API
    const instructors = [
        { id: "8e8abe4a-8464-44fe-a572-0037acadabda", name: "Dr. Jane Smith", role: "Lead Instructor", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "2", name: "Prof. John Doe", role: "Subject Expert", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "3", name: "Dr. Emily Johnson", role: "Course Designer", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "4", name: "Prof. Michael Brown", role: "Guest Lecturer", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "5", name: "Dr. Sarah Williams", role: "Teaching Assistant", avatar: "/placeholder.svg?height=40&width=40" },
    ];

    return (
        <FormSection id="instructors" title="Course Instructors" icon={<User2Icon className="h-5 w-5" />} description="Configure course instructors" sectionRef={sectionRef} isActive={isActive}>
            <div className="space-y-6">
                {/* Tags */}
                <Select
                    label="Instructors"
                    labelIcon={<Tag className="h-3.5 w-3.5" />}
                    name="instructorIds"
                    placeholder="Select course instructors"
                    value={formData.instructorIds || []}
                    onChange={handleInputChange}
                    options={instructors.map((item) => ({ value: item.id, label: item.name }))}
                    isMulti
                    helperText="Instructor list"
                />
            </div>
        </FormSection>
    );
});
