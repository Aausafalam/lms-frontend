"use client";

import { FileText, Settings, Layers, Clock, Globe, Cog, Shield, Calendar, BarChart3, Accessibility, Mail, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch as SwitchComponent } from "@/components/ui/switch";
import { Select } from "@/components/ui/select";
import SidebarMenu from "@/components/sidebarMenu";

/**
 * Sidebar Navigation Component
 * Provides navigation between form sections and examPattern status controls
 *
 * @param {Object} props - Component props
 * @param {string} props.activeSection - Currently active section ID
 * @param {Function} props.scrollToSection - Function to scroll to a section
 * @param {Object} props.formData - Current form data
 * @param {Object} props.handlers - Form event handlers
 */
export function SidebarNavigation({ activeSection, scrollToSection, formData, handlers }) {
    const { handleSwitchChange, handleInputChange } = handlers;

    const navigationItems = [
        { id: "basic", label: "Basic Info", icon: <FileText className="h-4 w-4" /> },
        { id: "sections", label: "Exam Sections", icon: <Layers className="h-4 w-4" /> },
        { id: "global-settings", label: "Global Settings", icon: <Settings className="h-4 w-4" /> },
        { id: "security-proctoring", label: "Security & Proctoring", icon: <Shield className="h-4 w-4" /> },
        { id: "scheduling-access", label: "Access Control", icon: <Calendar className="h-4 w-4" /> },
        { id: "attempt-rules", label: "Attempt Rules", icon: <Clock className="h-4 w-4" /> },
        { id: "results-analytics", label: "Results & Analytics", icon: <BarChart3 className="h-4 w-4" /> },
        { id: "notifications", label: "Notifications", icon: <Mail className="h-4 w-4" /> },
        { id: "ui-config", label: "UI Configuration", icon: <Globe className="h-4 w-4" /> },
    ];

    const statusOptions = [
        { label: "Draft", value: "DRAFT" },
        { label: "Published", value: "PUBLISHED" },
        { label: "Archived", value: "ARCHIVED" },
    ];

    return (
        <div className="sticky top-8 w-full max-w-52">
            {/* Navigation Card */}
            <SidebarMenu navigationItems={navigationItems} activeSection={activeSection} onClick={scrollToSection} className="mb-4" />

            {/* ExamPattern Status Card */}
            <Card className="overflow-hidden border-0 bg-white dark:bg-gray-900">
                <CardHeader className="p-3 sm:p-4 pb-2">
                    <CardTitle className="text-sm flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Exam Pattern Status
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0">
                    <div className="space-y-3 sm:space-y-4">
                        {/* Status Dropdown */}
                        <div>
                            <Label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">Publication Status</Label>
                            <Select
                                name="status"
                                value={formData.status || "DRAFT"}
                                onChange={handleInputChange}
                                options={statusOptions}
                                placeholder="Select status"
                                fieldClassName="py-1 min-h-0 px-3 text-sm"
                            />
                        </div>

                        {/* Featured Toggle */}
                        <div className="flex items-center justify-between">
                            <Label htmlFor="isFeatured" className="cursor-pointer text-xs text-gray-600 dark:text-gray-400 font-normal">
                                Featured Exam Pattern
                            </Label>
                            <SwitchComponent name="isFeatured" onCheckedChange={(data) => handleSwitchChange("isFeatured", data)} id="isFeatured" checked={formData.isFeatured} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
