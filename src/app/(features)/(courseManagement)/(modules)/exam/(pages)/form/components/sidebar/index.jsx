"use client";

import { Calendar, FileText, Layers, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import SidebarMenu from "@/components/sidebarMenu";

export function SidebarNavigation({ activeSection, scrollToSection, formData, handlers }) {
    const { handleInputChange } = handlers;

    const navigationItems = [
        { id: "basic-details", label: "Basic Details", icon: <FileText className="h-4 w-4" /> },
        { id: "schedule-timing", label: "Schedule & Timing", icon: <Calendar className="h-4 w-4" /> },
        { id: "exam-pattern", label: "Exam Pattern", icon: <Layers className="h-4 w-4" /> },
    ];

    const statusOptions = [
        { label: "Draft", value: "DRAFT" },
        { label: "Published", value: "PUBLISHED" },
        { label: "Scheduled", value: "SCHEDULED" },
        { label: "Completed", value: "COMPLETED" },
        { label: "Cancelled", value: "CANCELLED" },
    ];

    return (
        <div className="sticky top-8 max-w-56">
            <SidebarMenu activeSection={activeSection} navigationItems={navigationItems} onClick={scrollToSection} />
            <Card className="overflow-hidden border-0 mt-4 bg-white dark:bg-gray-900">
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Exam Status
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="space-y-4">
                        <div>
                            <Label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">Current Status</Label>
                            <Select
                                name="status"
                                value={formData.status || "DRAFT"}
                                onChange={handleInputChange}
                                options={statusOptions}
                                placeholder="Select status"
                                fieldClassName="py-1 min-h-0 px-3"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
