import React from "react";
import { ArrowLeft, Edit, Copy, Trash2, Clock, BookOpen, Users, Star } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export const Header = ({ data = {}, isMobile, onBack, onEdit, onDuplicate, onDelete, showBackButton = true, badges = [], className = "" }) => {
    // Default badge configurations
    const defaultBadges = [
        { key: "number", label: data.number ? data.number : null, icon: BookOpen, variant: "default" },
        { key: "duration", label: data.duration ? data.duration + " Min" : null, icon: Clock, variant: "secondary" },
        { key: "difficulty", label: data.difficulty, icon: Star, variant: "outline" },
        { key: "students", label: data.studentCount ? `${data.studentCount} students` : null, icon: Users, variant: "secondary" },
    ];

    // Merge custom badges with default ones
    const allBadges = [...defaultBadges, ...badges].filter((badge) => badge.label);

    return (
        <div className={`flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:items-center ${className}`}>
            {/* Left Section - Back Button and Content */}
            <div className="flex items-start gap-3 min-w-0 flex-1">
                {/* Back Button */}
                {showBackButton && (
                    <div className="flex-shrink-0 mt-1">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="bg-white dark:bg-gray-900 p-2 rounded-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-none" onClick={onBack}>
                                        <ArrowLeft className="w-4 h-4 text-orange-600" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>Go Back</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                )}

                {/* Title and Summary Section */}
                <div className="min-w-0 flex-1">
                    {/* Title and Badges Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-0">
                        {data.name && <h1 className="text-lg font-semibold tracking-tight bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent truncate">{data.name}</h1>}

                        {/* Badges */}
                        {!isMobile && allBadges.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {allBadges.map((badge, index) => {
                                    const IconComponent = badge.icon;
                                    return (
                                        <Badge key={badge.key || index} variant={badge.variant} className={`${badge.className} bg-white border-none text-gray-800 shadow-sm hover:shadow-md `}>
                                            {IconComponent && <IconComponent className="w-3 h-3 mr-1" />}
                                            {badge.label}
                                        </Badge>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Summary */}
                    {data.summary ||
                        (data.description && (
                            <p className="text-muted-foreground text-[0.8rem] text-gray-600 dark:text-gray-400 line-clamp-2">{data.summary || data.description || "Lesson summary will appear here"}</p>
                        ))}
                </div>
            </div>

            {/* Right Section - Action Buttons */}
            {/* {!isMobile && (
                <div className="flex items-center gap-2 flex-shrink-0 self-start sm:self-center">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={onEdit}
                                    className="rounded-full h-9 w-9 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit Details</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={onDuplicate}
                                    className="rounded-full h-9 w-9 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Duplicate Lesson</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={onDelete}
                                    className="rounded-full h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete Lesson</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            )} */}
        </div>
    );
};

// Example usage component
const ExampleUsage = () => {
    const sampleData = {
        name: "Introduction to React Hooks",
        summary: "Learn the fundamentals of React Hooks including useState, useEffect, and custom hooks with practical examples.",
        lessonNumber: 5,
        duration: "45 min",
        difficulty: "Intermediate",
        studentCount: 128,
    };

    const customBadges = [{ key: "category", label: "JavaScript", variant: "outline", className: "bg-blue-50 text-blue-700 border-blue-200" }];

    const handleBack = () => console.log("Back clicked");
    const handleEdit = () => console.log("Edit clicked");
    const handleDuplicate = () => console.log("Duplicate clicked");
    const handleDelete = () => console.log("Delete clicked");

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold mb-4">Lesson Header Examples</h2>

            {/* Full Example */}
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <h3 className="text-lg font-semibold mb-3">Full Example with All Features</h3>
                <Header data={sampleData} badges={customBadges} onBack={handleBack} onEdit={handleEdit} onDuplicate={handleDuplicate} onDelete={handleDelete} />
            </div>

            {/* Minimal Example */}
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <h3 className="text-lg font-semibold mb-3">Minimal Example</h3>
                <Header
                    data={{ name: "Basic HTML Structure", summary: "Learn the basic structure of HTML documents" }}
                    showBackButton={false}
                    onEdit={handleEdit}
                    onDuplicate={handleDuplicate}
                    onDelete={handleDelete}
                />
            </div>

            {/* No Badges Example */}
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <h3 className="text-lg font-semibold mb-3">Custom Badges Only</h3>
                <Header
                    data={{ name: "Advanced CSS Animations", summary: "Master complex CSS animations and transitions" }}
                    badges={[
                        { key: "level", label: "Advanced", variant: "default", className: "bg-red-100 text-red-800" },
                        { key: "type", label: "Workshop", variant: "secondary" },
                    ]}
                    onBack={handleBack}
                    onEdit={handleEdit}
                    onDuplicate={handleDuplicate}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default ExampleUsage;
