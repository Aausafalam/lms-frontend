"use client";

import { memo } from "react";
import { User2Icon, Plus, X, Tag } from "lucide-react";
import { FormSection } from "./form-section";
import { Select } from "@/components/ui/select";

export const InstructorsSection = memo(function InstructorsSection({ formData, handlers, sectionRef, isActive }) {
    const { handleInputChange } = handlers;

    // Sample data - in real app, these would come from API
    const instructors = [
        { id: "5ee308d5-9ddb-4380-a01e-05e425b5412b", name: "Dr. Jane Smith", role: "Lead Instructor", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "2", name: "Prof. John Doe", role: "Subject Expert", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "3", name: "Dr. Emily Johnson", role: "Module Designer", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "4", name: "Prof. Michael Brown", role: "Guest Lecturer", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "5", name: "Dr. Sarah Williams", role: "Teaching Assistant", avatar: "/placeholder.svg?height=40&width=40" },
    ];

    return (
        <FormSection id="instructors" title="Lesson Instructors" icon={<User2Icon className="h-5 w-5" />} description="Add instructors for this lesson" sectionRef={sectionRef} isActive={isActive}>
            <div className="space-y-6">
                {/* Instructors */}
                <Select
                    label="Instructors"
                    labelIcon={<Tag className="h-3.5 w-3.5" />}
                    name="instructorIds"
                    placeholder="Select lesson instructor"
                    value={formData.instructorIds || []}
                    onChange={handleInputChange}
                    options={instructors.map((item) => ({ value: item.id, label: item.name }))}
                    isMulti
                    helperText="Instructor list for this module"
                />
            </div>
        </FormSection>
    );
});
