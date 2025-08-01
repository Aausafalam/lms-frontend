"use client";

import { memo } from "react";
import { Settings, UserCheck, CheckCircle, XCircle } from "lucide-react";
import { FormSection } from "@/components/formSection";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const SettingsSection = memo(function SettingsSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
    const { handleInputChange } = handlers;

    const handleSwitchChange = (checked) => {
        handleInputChange({
            target: {
                name: "status",
                value: checked ? "ACTIVE" : "INACTIVE",
            },
        });
    };

    return (
        <FormSection
            id="settings"
            title="Role Settings"
            icon={<Settings className="h-5 w-5" />}
            description="Configure the status and behavior of this role"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${formData.status === "ACTIVE" ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-900/30"}`}>
                            {formData.status === "ACTIVE" ? <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" /> : <XCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />}
                        </div>
                        <div>
                            <Label className="text-sm font-medium">Active Status</Label>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {formData.status === "ACTIVE" ? "This role is active and can be assigned to users" : "This role is inactive and cannot be assigned"}
                            </p>
                        </div>
                    </div>
                    <Switch checked={formData.status === "ACTIVE" || false} onCheckedChange={handleSwitchChange} />
                </div>

                <div className="bg-orange-50 dark:bg-orange-950/10 rounded-lg p-4 border border-orange-100 dark:border-orange-900/20">
                    <p className="text-sm text-orange-700 dark:text-orange-400 flex items-center gap-2">
                        <UserCheck className="h-4 w-4" />
                        <span>
                            {formData.status === "ACTIVE"
                                ? "Active roles can be assigned to users and will grant the selected privileges."
                                : "Inactive roles are hidden from user assignment and will not grant any privileges."}
                        </span>
                    </p>
                </div>
            </div>
        </FormSection>
    );
});
