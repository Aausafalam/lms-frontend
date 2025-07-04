"use client";

import { memo } from "react";
import { Shield, Gift, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FormSection } from "@/components/formSection";

export const AccessSection = memo(function AccessSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
    const { handleInputChange, handleSwitchChange } = handlers;

    const accessTypes = [
        { label: "All Features", value: "ALL_FEATURES" },
        { label: "Exam Only", value: "EXAM_ONLY" },
        { label: "Video Only", value: "VIDEO_ONLY" },
        { label: "Read Only Content", value: "READ_ONLY_CONTENT" },
    ];

    const trialUnits = [
        { label: "Day", value: "DAY" },
        { label: "Month", value: "MONTH" },
        { label: "Year", value: "YEAR" },
    ];

    return (
        <FormSection id="access" title="Access & Trial" icon={<Shield className="h-5 w-5" />} description="Define access type and trial settings" sectionRef={sectionRef} isActive={isActive}>
            <div className="space-y-6">
                <Select
                    label="Access Type"
                    labelIcon={<Shield className="h-3.5 w-3.5" />}
                    name="accessType"
                    placeholder="Select access type"
                    value={formData.accessType || ""}
                    onChange={handleInputChange}
                    options={accessTypes}
                    required
                    helperText="What level of access does this plan provide?"
                    error={!formData.accessType ? "Access type is required" : ""}
                />

                <div className="bg-green-50 dark:bg-green-950/10 rounded-lg p-4 border border-green-100 dark:border-green-900/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <Gift className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <Label htmlFor="trialAvailable" className="text-sm font-medium">
                                    Free Trial Available
                                </Label>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Offer a free trial period</p>
                            </div>
                        </div>
                        <Switch id="trialAvailable" checked={formData.trialAvailable || false} onCheckedChange={(checked) => handleSwitchChange("trialAvailable", checked)} />
                    </div>

                    {formData?.trialAvailable && (
                        <div className="space-y-4 mt-4">
                            <p className="text-sm text-green-700 dark:text-green-400 mb-3">
                                <strong>Trial Settings:</strong> Configure the free trial period
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Trial Duration"
                                    labelIcon={<Calendar className="h-3.5 w-3.5" />}
                                    id="trialPeriod.duration"
                                    name="trialPeriod.duration"
                                    type="number"
                                    min="1"
                                    value={formData?.trialPeriod?.duration || ""}
                                    onChange={handleInputChange}
                                    placeholder="Enter trial duration"
                                    helperText="How long the trial lasts"
                                />
                                <Select
                                    label="Trial Unit"
                                    labelIcon={<Calendar className="h-3.5 w-3.5" />}
                                    name="trialPeriod.unit"
                                    placeholder="Select unit"
                                    value={formData?.trialPeriod?.unit || "DAY"}
                                    onChange={handleInputChange}
                                    options={trialUnits}
                                    helperText="Time unit for trial period"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </FormSection>
    );
});
