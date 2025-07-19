"use client";

import { ArrowLeft, Edit3, Copy, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { QuestionBadges } from "./question-badges";

export function QuestionHeader({ data, isMobile, onBack, onEdit, onDuplicate, onDelete }) {
    return (
        <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg ${isMobile ? "p-3" : "p-4"}`}>
            <div className={`flex items-center justify-between ${isMobile ? "mb-3" : "mb-4"}`}>
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" onClick={onBack} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        {!isMobile && "Back"}
                    </Button>
                    {!isMobile && <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />}
                    <div>
                        <h1 className={`font-bold text-gray-900 dark:text-white ${isMobile ? "text-lg" : "text-xl"}`}>Question Preview</h1>
                        {!isMobile && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{data.questionId || "Auto-generated ID"}</p>}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    {!isMobile ? (
                        <>
                            <Button variant="outline" size="sm" onClick={onEdit} className="text-xs">
                                <Edit3 className="h-3 w-3 mr-1" />
                                Edit
                            </Button>
                            <Button variant="outline" size="sm" onClick={onDuplicate} className="text-xs">
                                <Copy className="h-3 w-3 mr-1" />
                                Copy
                            </Button>
                            <Button variant="outline" size="sm" onClick={onDelete} className="text-xs text-red-600">
                                <Trash2 className="h-3 w-3 mr-1" />
                                Delete
                            </Button>
                        </>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={onEdit}>
                                    <Edit3 className="h-4 w-4 mr-2" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={onDuplicate}>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={onDelete} className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>

            {/* Question Badges */}
            <QuestionBadges data={data} isMobile={isMobile} />
        </div>
    );
}
