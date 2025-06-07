"use client";

import { memo } from "react";
import { Calendar, Users, Key, CheckCircle } from "lucide-react";
import { FormSection } from "./form-section";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export const AccessControlSection = memo(function AccessControlSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
    const { handleAccessControlSettingsChange } = handlers;

    const accessControlSettings = formData.accessControlSettings || {
        maxAttempts: 1,
        enableAccessCode: false,
        accessCode: "",
        allowedUserGroups: [],
    };

    const userGroupOptions = [
        { label: "All Students", value: "all_students" },
        { label: "Premium Students", value: "premium_students" },
        { label: "Class 12", value: "class_12" },
        { label: "Engineering Students", value: "engineering" },
        { label: "Medical Students", value: "medical" },
    ];

    return (
        <FormSection id="scheduling-access" title="Access Control" icon={<Calendar className="h-5 w-5" />} description="Configure  who can access the exam" sectionRef={sectionRef} isActive={isActive}>
            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                        <Input
                            label="Maximum Attempts"
                            labelIcon={<CheckCircle className="h-3.5 w-3.5" />}
                            id="maxAttempts"
                            name="maxAttempts"
                            type="number"
                            min="1"
                            value={accessControlSettings.maxAttempts || ""}
                            onChange={(e) => handleAccessControlSettingsChange("maxAttempts", Number.parseInt(e.target.value, 10))}
                            placeholder="Enter max attempts"
                            helperText="Number of times a student can attempt"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base flex items-center">
                                <Key className="h-4 w-4 mr-2" />
                                Enable Access Code
                            </Label>
                            <p className="text-sm text-muted-foreground">Require a code to access the exam</p>
                        </div>
                        <Switch checked={accessControlSettings.enableAccessCode || false} onCheckedChange={(checked) => handleAccessControlSettingsChange("enableAccessCode", checked)} />
                    </div>

                    {accessControlSettings.enableAccessCode && (
                        <div className="pl-6">
                            <Input
                                label="Access Code"
                                id="accessCode"
                                name="accessCode"
                                value={accessControlSettings.accessCode || ""}
                                onChange={(e) => handleAccessControlSettingsChange("accessCode", e.target.value)}
                                placeholder="Enter access code"
                                helperText="Students must enter this code to start the exam"
                            />
                        </div>
                    )}

                    <Select
                        label="Allowed User Groups"
                        labelIcon={<Users className="h-3.5 w-3.5" />}
                        name="allowedUserGroups"
                        placeholder="Select user groups"
                        value={accessControlSettings.allowedUserGroups || []}
                        onChange={(e) => handleAccessControlSettingsChange("allowedUserGroups", e.target.value)}
                        options={userGroupOptions}
                        isMulti
                        helperText="Which user groups can access this exam"
                    />
                </div>
            </div>
        </FormSection>
    );
});
