"use client";

import { memo } from "react";
import { Bookmark, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormSection } from "./form-section";
import { Textarea } from "@/components/ui/textarea";

export const BasicInfoSection = memo(function BasicInfoSection({ sectionRef, isActive, formData = {}, handlers = {} }) {
    const { handleInputChange } = handlers;
    return (
        <FormSection
            id="basic"
            title="Basic Information"
            icon={<FileText className="h-5 w-5" />}
            description="Enter the essential details about your exam pattern"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-4">
                <div className="flex gap-4 mb-0">
                    <Input
                        label="Exam Pattern Name"
                        labelIcon={<Bookmark className="h-3.5 w-3.5" />}
                        id="name"
                        name="name"
                        placeholder="Enter exam pattern  name"
                        value={formData.name || ""}
                        onChange={handleInputChange}
                        required
                        helperText="Choose a clear, descriptive name for your exam pattern"
                        error={!formData.name ? "Exam Pattern name is required" : ""}
                        className="mb-0"
                    />
                </div>
                <Textarea
                    label="Description"
                    labelIcon={<FileText className="h-3.5 w-3.5" />}
                    id="description"
                    name="description"
                    placeholder="write description about exam pattern"
                    value={formData.description || ""}
                    onChange={handleInputChange}
                    required
                    helperText="A description know about exam pattern"
                    error={!formData.description ? "Description is required" : ""}
                    className="mt-0"
                />
            </div>
        </FormSection>
    );
});
