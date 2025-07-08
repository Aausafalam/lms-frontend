"use client";

import { memo } from "react";
import { Users, Tag } from "lucide-react";
import { FormSection } from "@/components/formSection";
import { Select } from "@/components/ui/select";

export const InstructorsSection = memo(function InstructorsSection({ formData, handlers, sectionRef, isActive }) {
    const { handleInputChange } = handlers;

    const instructors = [
        { id: "8e8abe4a-8464-44fe-a572-0037acadabda", name: "Dr. Jane Smith", role: "Lead Instructor" },
        { id: "2", name: "Prof. John Doe", role: "Subject Expert" },
        { id: "3", name: "Dr. Emily Johnson", role: "Module Designer" },
        { id: "4", name: "Prof. Michael Brown", role: "Guest Lecturer" },
        { id: "5", name: "Dr. Sarah Williams", role: "Teaching Assistant" },
    ];

    return (
        <FormSection id="instructors" title="Lesson Instructors" icon={<Users className="h-5 w-5" />} description="Add instructors for this lesson" sectionRef={sectionRef} isActive={isActive}>
            <div className="space-y-6">
                <Select
                    label="Instructors"
                    labelIcon={<Tag className="h-3.5 w-3.5" />}
                    name="instructorIds"
                    placeholder="Select lesson instructor"
                    value={formData.instructorIds || []}
                    onChange={handleInputChange}
                    options={instructors.map((item) => ({ value: item.id, label: item.name }))}
                    isMulti
                    helperText="Instructor list for this lesson"
                />
            </div>
        </FormSection>
    );
});
