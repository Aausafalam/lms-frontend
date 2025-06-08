"use client";

import { memo } from "react";
import { User2Icon, Tag } from "lucide-react";
import { FormSection } from "@/components/formSection";
import { Select } from "@/components/ui/select";

export const InstructorsSection = memo(function InstructorsSection({ formData, handlers, sectionRef, isActive }) {
    const { handleInputChange } = handlers;

    // Sample data - in real app, these would come from API
    const instructors = [
        {
            id: "5ee308d5-9ddb-4380-a01e-05e425b5412b",
            name: "Dr. Jane Smith",
            role: "Lead Instructor",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        { id: "2", name: "Prof. John Doe", role: "Subject Expert", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "3", name: "Dr. Emily Johnson", role: "Content Creator", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "4", name: "Prof. Michael Brown", role: "Narrator", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "5", name: "Dr. Sarah Williams", role: "Content Reviewer", avatar: "/placeholder.svg?height=40&width=40" },
    ];

    return (
        <FormSection id="instructors" title="Video Instructors" icon={<User2Icon className="h-5 w-5" />} description="Add instructors for this content" sectionRef={sectionRef} isActive={isActive}>
            <div className="space-y-6">
                {/* Instructors */}
                <Select
                    label="Instructors"
                    labelIcon={<Tag className="h-3.5 w-3.5" />}
                    name="instructorIds"
                    placeholder="Select content instructor"
                    value={formData.instructorIds || []}
                    onChange={handleInputChange}
                    options={instructors.map((item) => ({ value: item.id, label: item.name }))}
                    isMulti
                    helperText="Instructor list for this content"
                />
            </div>
        </FormSection>
    );
});
