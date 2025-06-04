"use client";
import { memo } from "react";
import { FileText, Bookmark, Clock, Hash, Package, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormSection } from "./form-section";
import { Select } from "@/components/ui/select";

export const BasicInfoSection = memo(function BasicInfoSection({ sectionRef, isActive, formData = {}, handlers = {} }) {
    const { handleInputChange } = handlers;

    const languages = [
        { label: "English", value: "en" },
        { label: "Spanish", value: "es" },
        { label: "French", value: "fr" },
        { label: "German", value: "de" },
        { label: "Chinese", value: "zh" },
        { label: "Japanese", value: "ja" },
        { label: "Hindi", value: "hi" },
    ];

    return (
        <FormSection
            id="basic"
            title="Basic Information"
            icon={<FileText className="h-5 w-5" />}
            description="Enter the essential details about your content"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                <div className="flex gap-4 mb-0">
                    <Input
                        label="Content Name"
                        labelIcon={<Bookmark className="h-3.5 w-3.5" />}
                        id="name"
                        name="name"
                        placeholder="Enter content name"
                        value={formData.name || ""}
                        onChange={handleInputChange}
                        required
                        helperText="Choose a clear, descriptive name for your content"
                        error={!formData.name ? "Content name is required" : ""}
                        className="mb-0"
                    />
                    <Select
                        label="Language"
                        labelIcon={<Hash className="h-3.5 w-3.5" />}
                        name="language"
                        placeholder="Select language"
                        value={formData.language || ""}
                        onChange={handleInputChange}
                        options={languages}
                        helperText="Language of the content"
                        className="mb-0"
                        required
                    />
                </div>

                <Textarea
                    label="Content Summary"
                    labelIcon={<FileText className="h-3.5 w-3.5" />}
                    id="summary"
                    name="summary"
                    placeholder="Brief overview of the content"
                    value={formData.summary || ""}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    helperText="A concise description that appears in content listings"
                    error={!formData.summary ? "Content summary is required" : ""}
                />
            </div>
        </FormSection>
    );
});
