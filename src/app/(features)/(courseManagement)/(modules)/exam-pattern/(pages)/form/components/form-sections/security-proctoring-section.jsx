"use client";

import { memo } from "react";
import { Shield, Camera, Lock, Eye, AlertTriangle, Monitor } from "lucide-react";
import { FormSection } from "./form-section";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export const SecurityProctoringSection = memo(function SecurityProctoringSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
    const { handleSecuritySettingsChange } = handlers;

    const securitySettings = formData.securitySettings || {
        enableBrowserLockdown: false,
        disableRightClick: true,
        disableCopyPaste: true,
        preventTabSwitching: true,
        enableAIProctoring: false,
        allowedBrowsers: ["chrome", "firefox"],
        maxTabSwitches: 3,
        suspiciousActivityThreshold: 5,
        enableFullScreenMode: true,
        disableVirtualKeyboard: false,
    };

    const browserOptions = [
        { label: "Google Chrome", value: "chrome" },
        { label: "Mozilla Firefox", value: "firefox" },
        { label: "Microsoft Edge", value: "edge" },
        { label: "Safari", value: "safari" },
    ];

    return (
        <FormSection
            id="security-proctoring"
            title="Security & Proctoring"
            icon={<Shield className="h-5 w-5" />}
            description="Configure security measures and proctoring settings"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                <div className="bg-red-50 dark:bg-red-950/10 rounded-lg p-4 border border-red-100 dark:border-red-900/20">
                    <p className="text-sm text-red-700 dark:text-red-400 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Security settings help prevent cheating but may affect user experience. Test thoroughly before deployment.</span>
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                        <Lock className="h-4 w-4 mr-2" />
                        Browser Security
                    </h4>

                    <div className="grid grid-cols-1 gap-4 pl-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Enable Browser Lockdown</Label>
                                <p className="text-sm text-muted-foreground">Restrict browser functionality during exam</p>
                            </div>
                            <Switch checked={securitySettings.enableBrowserLockdown || false} onCheckedChange={(checked) => handleSecuritySettingsChange("enableBrowserLockdown", checked)} />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Disable Right Click</Label>
                                <p className="text-sm text-muted-foreground">Prevent context menu access</p>
                            </div>
                            <Switch checked={securitySettings.disableRightClick || false} onCheckedChange={(checked) => handleSecuritySettingsChange("disableRightClick", checked)} />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Disable Copy/Paste</Label>
                                <p className="text-sm text-muted-foreground">Prevent copying exam content</p>
                            </div>
                            <Switch checked={securitySettings.disableCopyPaste || false} onCheckedChange={(checked) => handleSecuritySettingsChange("disableCopyPaste", checked)} />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Prevent Tab Switching</Label>
                                <p className="text-sm text-muted-foreground">Alert when students switch browser tabs</p>
                            </div>
                            <Switch checked={securitySettings.preventTabSwitching || false} onCheckedChange={(checked) => handleSecuritySettingsChange("preventTabSwitching", checked)} />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Enable Full Screen Mode</Label>
                                <p className="text-sm text-muted-foreground">Force exam to run in full screen</p>
                            </div>
                            <Switch checked={securitySettings.enableFullScreenMode || false} onCheckedChange={(checked) => handleSecuritySettingsChange("enableFullScreenMode", checked)} />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                        <Camera className="h-4 w-4 mr-2" />
                        Proctoring Features
                    </h4>

                    <div className="grid grid-cols-1 gap-4 pl-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Enable AI Proctoring</Label>
                                <p className="text-sm text-muted-foreground">Use AI to detect suspicious behavior</p>
                            </div>
                            <Switch checked={securitySettings.enableAIProctoring || false} onCheckedChange={(checked) => handleSecuritySettingsChange("enableAIProctoring", checked)} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <Select
                        label="Allowed Browsers"
                        labelIcon={<Monitor className="h-3.5 w-3.5" />}
                        name="allowedBrowsers"
                        placeholder="Select allowed browsers"
                        value={securitySettings.allowedBrowsers || []}
                        onChange={(e) => handleSecuritySettingsChange("allowedBrowsers", e.target.value)}
                        options={browserOptions}
                        isMulti
                        helperText="Browsers students can use for the exam"
                    />

                    <Input
                        label="Max Tab Switches Allowed"
                        labelIcon={<Eye className="h-3.5 w-3.5" />}
                        id="maxTabSwitches"
                        name="maxTabSwitches"
                        type="number"
                        min="0"
                        value={securitySettings.maxTabSwitches || ""}
                        onChange={(e) => handleSecuritySettingsChange("maxTabSwitches", Number.parseInt(e.target.value, 10))}
                        placeholder="Enter maximum tab switches"
                        helperText="Number of tab switches before flagging"
                    />
                </div>

                <Input
                    label="Suspicious Activity Threshold"
                    labelIcon={<AlertTriangle className="h-3.5 w-3.5" />}
                    id="suspiciousActivityThreshold"
                    name="suspiciousActivityThreshold"
                    type="number"
                    min="1"
                    value={securitySettings.suspiciousActivityThreshold || ""}
                    onChange={(e) => handleSecuritySettingsChange("suspiciousActivityThreshold", Number.parseInt(e.target.value, 10))}
                    placeholder="Enter threshold for suspicious activities"
                    helperText="Number of suspicious activities before auto-flagging"
                />
            </div>
        </FormSection>
    );
});
