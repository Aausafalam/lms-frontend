"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { Copy, Eye, EyeOff, School, Trash2, BookOpen, Package, LayoutDashboard } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/lib/hooks/useQuery";

const QuestionFormHeader = ({ children, togglePreview, previewVisible, questionId }) => {
    const { courseId, examId } = useQueryParams();

    const breadcrumbItems = [
        {
            title: "Courses",
            href: "/courses",
            icon: <Package className="h-3.5 w-3.5" />,
        },
        {
            title: "Course Details",
            href: `/courses/details/${courseId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Exam Details",
            href: `/exams/details/${examId}?courseId=${courseId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        questionId && {
            title: "Question details",
            href: `/questions/details/${questionId}?courseId=${courseId}&examId=${examId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: questionId ? `Edit Question ${questionId}` : "Add Question",
            href: questionId ? `/questions/${questionId}` : "/questions/add",
            icon: <BookOpen className="h-3.5 w-3.5" />,
        },
    ].filter(Boolean);

    return (
        <div className="flex items-center justify-between mb-4">
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center gap-3">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={togglePreview}
                                className="rounded-full h-9 w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                {previewVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>{previewVisible ? "Hide Preview" : "Show Preview"}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full h-9 w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Duplicate Question</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Question</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {children}
            </div>
        </div>
    );
};

export default QuestionFormHeader;
