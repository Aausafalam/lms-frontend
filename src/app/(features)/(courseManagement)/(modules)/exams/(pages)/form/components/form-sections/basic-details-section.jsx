"use client";

import { memo } from "react";
import { FileText, Calendar, Clock, Globe, Tag, Code, BookOpen, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormSection } from "@/components/formSection";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export const BasicDetailsSection = memo(function BasicDetailsSection({ sectionRef, isActive, formData = {}, handlers = {} }) {
    const { handleInputChange, handleArrayChange } = handlers;

    const examTypeOptions = [
        { label: "Practice Test", value: "practice" },
        { label: "Mock Test", value: "mock" },
        { label: "Final Exam", value: "final" },
        { label: "Quiz", value: "quiz" },
        { label: "Assessment", value: "assessment" },
    ];

    const tagOptions = [
        { label: "Important", value: "important" },
        { label: "Beginner", value: "beginner" },
        { label: "Advanced", value: "advanced" },
        { label: "Competitive", value: "competitive" },
        { label: "Practice", value: "practice" },
    ];

    return (
        <FormSection
            id="basic-details"
            title="Basic Details"
            icon={<FileText className="h-5 w-5" />}
            description="Enter the essential details about your exam"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Exam Name"
                        labelIcon={<BookOpen className="h-3.5 w-3.5" />}
                        id="name"
                        name="name"
                        placeholder="Enter exam name"
                        value={formData.name || ""}
                        onChange={handleInputChange}
                        required
                        helperText="Choose a clear, descriptive name for your exam"
                        error={!formData.name ? "Exam name is required" : ""}
                        className="mb-0"
                    />

                    <Input
                        label="Exam Code"
                        labelIcon={<Code className="h-3.5 w-3.5" />}
                        id="examCode"
                        name="examCode"
                        placeholder="Enter exam code"
                        value={formData.examCode || ""}
                        onChange={handleInputChange}
                        required
                        helperText="Unique identifier for the exam"
                        error={!formData.examCode ? "Exam code is required" : ""}
                        className="mb-0"
                    />
                </div>

                <Textarea
                    label="Description"
                    labelIcon={<FileText className="h-3.5 w-3.5" />}
                    id="description"
                    name="description"
                    placeholder="Write description about the exam"
                    value={formData.description || ""}
                    onChange={handleInputChange}
                    helperText="Optional description about the exam"
                    className="mb-0"
                />

                {/* Exam Configuration */}
                <div className="grid grid-cols-2 gap-4">
                    <Select
                        label="Exam Type"
                        labelIcon={<Settings className="h-3.5 w-3.5" />}
                        name="examType"
                        value={formData.examType || ""}
                        onChange={handleInputChange}
                        options={examTypeOptions}
                        placeholder="Select exam type"
                        required
                        helperText="Type of examination"
                        error={!formData.examType ? "Exam type is required" : ""}
                    />

                    {/* Tags */}
                    <Select
                        label="Tags"
                        labelIcon={<Tag className="h-3.5 w-3.5" />}
                        name="tags"
                        value={formData.tags || []}
                        onChange={(e) => handleArrayChange("tags", e.target.value)}
                        options={tagOptions}
                        placeholder="Select tags"
                        isMulti
                        helperText="Tags to categorize the exam"
                    />
                </div>
            </div>
        </FormSection>
    );
});
