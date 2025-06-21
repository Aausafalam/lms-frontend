"use client";

import { Settings, FileText, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import SidebarMenu from "@/components/sidebarMenu";

export function SidebarNavigation({ activeSection, scrollToSection, formData, handlers }) {
    const { handleInputChange } = handlers;

    const navigationItems = [
        { id: "basic", label: "Basic Info", icon: <FileText className="h-4 w-4" /> },
        { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
    ];

    const handleSwitchChange = (checked) => {
        handleInputChange({
            target: {
                name: "isActive",
                value: checked,
            },
        });
    };

    return (
        <div className="sticky top-8 max-w-52">
            <SidebarMenu navigationItems={navigationItems} onClick={scrollToSection} activeSection={activeSection} />

            <Card className="overflow-hidden border-0 mt-4 bg-white dark:bg-gray-900">
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-orange-500" />
                        Group Status
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-xs text-gray-600 dark:text-gray-400">Active Status</Label>
                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{formData.isActive ? "Group is active" : "Group is inactive"}</p>
                            </div>
                            <Switch checked={formData.isActive || false} onCheckedChange={handleSwitchChange} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
