"use client";

import { FileText, ImageIcon, BookOpen, GraduationCap, Award, Settings, Paperclip, Users, User2Icon, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import GlobalUtils from "@/lib/utils";

/**
 * Sidebar Navigation Component
 * Provides navigation between form sections and module status controls
 *
 * @param {Object} props - Component props
 * @param {string} props.activeSection - Currently active section ID
 * @param {Function} props.scrollToSection - Function to scroll to a section
 * @param {Object} props.formData - Current form data
 * @param {Object} props.handlers - Form event handlers
 */
export function SidebarNavigation({ activeSection, scrollToSection, formData, handlers }) {
    const { handleSwitchChange, handleInputChange } = handlers;

    // Navigation items configuration
    const navigationItems = [
        { id: "basic", label: "Basic Info", icon: <FileText className="h-4 w-4" /> },
        { id: "media", label: "Media", icon: <ImageIcon className="h-4 w-4" /> },
        { id: "content", label: "Content", icon: <BookOpen className="h-4 w-4" /> },
        { id: "learning-outcomes", label: "Learning Outcomes", icon: <GraduationCap className="h-4 w-4" /> },
        { id: "prerequisites", label: "Prerequisites", icon: <Award className="h-4 w-4" /> },
        { id: "metadata", label: "Metadata", icon: <Settings className="h-4 w-4" /> },
        { id: "instructors", label: "Instructors", icon: <User2Icon className="h-4 w-4" /> },
        { id: "attachments", label: "Attachments", icon: <Paperclip className="h-4 w-4" /> },
        { id: "resources", label: "Resources", icon: <Link2 className="h-4 w-4" /> },
    ];

    // Status options
    const statusOptions = [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archive" },
    ];

    return (
        <div className="sticky top-8 max-w-52">
            {/* Navigation Card */}
            <Card className="overflow-hidden border-0 bg-white dark:bg-gray-900 dark:border-gray-800">
                <CardContent className="p-2">
                    <nav className="space-y-1">
                        {navigationItems.map((item) => (
                            <Button
                                key={item.id}
                                variant="ghost"
                                className={GlobalUtils.cn(
                                    "w-full justify-start text-left mb-1 font-normal transition-all px-2",
                                    activeSection === item.id ? "bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                                )}
                                onClick={() => scrollToSection(item.id)}
                            >
                                <div
                                    className={GlobalUtils.cn(
                                        "mr-2 p-1 rounded-md transition-all",
                                        activeSection === item.id ? "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                                    )}
                                >
                                    {item.icon}
                                </div>
                                <span className="">{item.label}</span>
                            </Button>
                        ))}
                    </nav>
                </CardContent>
            </Card>

            {/* Module Status Card */}
            <Card className="overflow-hidden border-0 mt-4 bg-white dark:bg-gray-900">
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Module Status
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="space-y-4">
                        {/* Status Dropdown */}
                        <div>
                            <Label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">Publication Status</Label>
                            <Select
                                name="status"
                                value={formData.status || "draft"}
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
