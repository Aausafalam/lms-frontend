"use client";

import { memo } from "react";
import { FileText, Calendar, Clock, Globe, Tag, Code, BookOpen, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormSection } from "@/components/formSection";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export const ScheduleTimingSection = memo(function ScheduleTimingSection({ sectionRef, isActive, formData = {}, handlers = {} }) {
    const { handleInputChange, handleArrayChange } = handlers;

    const languageOptions = [
        { label: "English", value: "english" },
        { label: "Hindi", value: "hindi" },
        { label: "Bengali", value: "bengali" },
        { label: "Tamil", value: "tamil" },
        { label: "Telugu", value: "telugu" },
        { label: "Marathi", value: "marathi" },
    ];

    return (
        <FormSection
            id="schedule-timing"
            title="Schedule & Timing"
            icon={<FileText className="h-5 w-5" />}
            description="Enter the essential details of Exam timing and duration"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                {/* Date and Time Configuration */}
                <div className="grid grid-cols-3 gap-4">
                    <Input
                        label="Start Date"
                        labelIcon={<Calendar className="h-3.5 w-3.5" />}
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate || ""}
                        onChange={handleInputChange}
                        helperText="When the exam becomes available"
                        className="mb-0"
                    />

                    <Input
                        label="Start Time"
                        labelIcon={<Clock className="h-3.5 w-3.5" />}
                        id="startTime"
                        name="startTime"
                        type="time"
                        value={formData.startTime || ""}
                        onChange={handleInputChange}
                        helperText="Exam start time"
                        className="mb-0"
                    />

                    <Input
                        label="End Time"
                        labelIcon={<Clock className="h-3.5 w-3.5" />}
                        id="endTime"
                        name="endTime"
                        type="time"
                        value={formData.endTime || ""}
                        onChange={handleInputChange}
                        helperText="Exam end time"
                        className="mb-0"
                    />
                </div>

                {/* Exam Configuration */}
                <div className="grid grid-cols-3 gap-4">
                    <Input
                        label="Duration (Minutes)"
                        labelIcon={<Clock className="h-3.5 w-3.5" />}
                        id="durationInMinutes"
                        name="durationInMinutes"
                        type="number"
                        min="1"
                        value={formData.durationInMinutes || ""}
                        onChange={handleInputChange}
                        placeholder="Enter duration in minutes"
                        required
                        helperText="Total exam duration"
                        error={!formData.durationInMinutes ? "Duration is required" : ""}
                    />
                    <Select
                        label="Language Options"
                        labelIcon={<Globe className="h-3.5 w-3.5" />}
                        name="languageOptions"
                        value={formData.languageOptions || []}
                        onChange={handleInputChange}
                        options={languageOptions}
                        placeholder="Select languages"
                        isMulti
                        helperText="Available languages for the exam"
                    />
                    <Input label="Version" id="version" name="version" value={formData.version || "1.0.0"} onChange={handleInputChange} placeholder="Enter version" helperText="Exam version number" />
                </div>
            </div>
        </FormSection>
    );
});
