"use client";

import { memo } from "react";
import { FileText, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { FormSection } from "@/components/formSection";

export const BasicInfoSection = memo(function BasicInfoSection({ sectionRef, isActive, formData = {}, handlers = {} }) {
    const { handleInputChange } = handlers;

    const planTypes = [
        { label: "Tiered Plan", value: "TIERED" },
        { label: "Recurring Plan", value: "RECURRING" },
        { label: "Lifetime Access", value: "LIFETIME_ACCESS" },
    ];

    return (
        <FormSection
            id="basic"
            title="Basic Information"
            icon={<FileText className="h-5 w-5" />}
            description="Enter the essential details about your subscription plan"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                <div className="flex gap-4">
                    <Input
                        label="Plan Name"
                        labelIcon={<CreditCard className="h-3.5 w-3.5" />}
                        id="name"
                        name="name"
                        placeholder="Enter plan name (e.g., Premium Monthly, Basic Yearly)"
                        value={formData.name || ""}
                        onChange={handleInputChange}
                        required
                        helperText="Choose a clear, descriptive name for your subscription plan"
                        error={!formData.name ? "Plan name is required" : ""}
                        className="mb-0"
                    />
                    <Select
                        label="Plan Type"
                        labelIcon={<CreditCard className="h-3.5 w-3.5" />}
                        name="planType"
                        placeholder="Select plan type"
                        value={formData.planType || ""}
                        onChange={handleInputChange}
                        options={planTypes}
                        required
                        helperText="Choose the type of subscription plan"
                        error={!formData.planType ? "Plan type is required" : ""}
                        className="mb-0"
                    />
                </div>

                <Textarea
                    label="Plan Description"
                    labelIcon={<FileText className="h-3.5 w-3.5" />}
                    id="description"
                    name="description"
                    placeholder="Describe what this subscription plan offers..."
                    value={formData.description || ""}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    helperText="A detailed description that helps users understand the value of this plan"
                    error={!formData.description ? "Plan description is required" : ""}
                />
            </div>
        </FormSection>
    );
});
