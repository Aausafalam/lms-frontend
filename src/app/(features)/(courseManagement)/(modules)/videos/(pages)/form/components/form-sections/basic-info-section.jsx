"use client";

import { memo } from "react";
import { FileText, Bookmark, Clock, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormSection } from "@/components/formSection";
import { Select } from "@/components/ui/select";
import VideoFormUtils from "../../utils/constants";

/**
 * Basic Information Section Component
 * @description Handles video name, summary, duration, and code
 */
export const BasicInfoSection = memo(function BasicInfoSection({ sectionRef, isActive, formData = {}, handlers = {}, errors = {} }) {
    const { handleInputChange } = handlers;

    return (
        <FormSection
            id="basic"
            title="Basic Information"
            icon={<FileText className="h-5 w-5" />}
            description="Enter the essential details about your video"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <Input
                        label="Video Name"
                        labelIcon={<Bookmark className="h-3.5 w-3.5" />}
                        id="name"
                        name="name"
                        placeholder="Enter video name"
                        value={formData.name || ""}
                        onChange={handleInputChange}
                        required
                        helperText="Choose a clear, descriptive name for your video"
                        error={errors.name}
                        className="mb-0"
                    />
                    <Select
                        label="Language"
                        labelIcon={<Hash className="h-3.5 w-3.5" />}
                        name="language"
                        placeholder="Select language"
                        value={formData.language || ""}
                        onChange={handleInputChange}
                        options={ VideoFormUtils.languages}
                        helperText="Language of the video"
                        className="mb-0"
                        required
                    />
                </div>

                <Textarea
                    label="Video Summary"
                    labelIcon={<FileText className="h-3.5 w-3.5" />}
                    id="summary"
                    name="summary"
                    placeholder="Brief overview of the video"
                    value={formData.summary || ""}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    helperText="A concise description that appears in video listings"
                    error={errors.summary}
                />
            </div>
        </FormSection>
    );
});
