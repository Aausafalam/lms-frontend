"use client";

import { FileText, ImageIcon, FileAudio, Link, User2Icon, Settings, Paperclip } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import SidebarMenu from "@/components/sidebarMenu";

export function SidebarNavigation({ activeSection, scrollToSection, formData, handlers }) {
    const { handleInputChange } = handlers;

    const navigationItems = [
        { id: "basic", label: "Basic Info", icon: <FileText className="h-4 w-4" /> },
        { id: "media", label: "Media", icon: <ImageIcon className="h-4 w-4" /> },
        { id: "content", label: "Description", icon: <FileAudio className="h-4 w-4" /> },
        { id: "transcript", label: "Transcript", icon: <FileText className="h-4 w-4" /> },
        { id: "instructors", label: "Instructors", icon: <User2Icon className="h-4 w-4" /> },
        { id: "metadata", label: "Metadata", icon: <Settings className="h-4 w-4" /> },
        { id: "attachments", label: "Attachments", icon: <Paperclip className="h-4 w-4" /> },
    ];

    const statusOptions = [
        { label: "Draft", value: "DRAFT" },
        { label: "Published", value: "PUBLISHED" },
        { label: "Archived", value: "ARCHIVED" },
    ];

    return (
        <div className="sticky top-8 max-w-52">
            <SidebarMenu navigationItems={navigationItems} activeSection={activeSection} onClick={scrollToSection} />

            <Card className="overflow-hidden border-0 mt-4 bg-white dark:bg-gray-900">
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm flex items-center">
                        <FileAudio className="h-4 w-4 mr-2" />
                        Video Status
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="space-y-4">
                        <div>
                            <Label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">Publication Status</Label>
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
